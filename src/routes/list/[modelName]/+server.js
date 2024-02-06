import {error, json} from '@sveltejs/kit';
import * as models from "../../../model/index.js";
import _ from "lodash";
import moment from 'moment';
import {each, waterfall, parallel} from "async";
import Excel from 'exceljs';

const titleAttrByModel = {
    Client: ['name'],
    Company: ['name'],
    Credit: ['amount', 'date'],
    Employee: ['name'],
    Location: ['name'],
    Route: ['code'],
    Transaction: ['details', 'incoming', 'outgoing'],
    User: ['name'],
    Trip: ['date'],
    Supplier: ['name'],
    Product: ['name', 'brand', 'category'],
    Price: ['product', 'supplier']
};

export async function GET({params}) {
    const modelName = _.upperFirst(params.modelName);

    if (!models[modelName]) {
        return error(404, 'Not found');
    } else if (modelName === 'User') {
        return error(403, 'Not allowed');
    }

    try {
        const {schema, dropdownModels} = await getSchema(modelName);
        const dropdownDataByModelById = await getDropdownData(dropdownModels);
        const originalList = await getList(modelName);
        const result = {originalList, schema, dropdownDataByModelById};

        if (modelName === 'ProductTransaction') {
            result.link = '/productTransaction';
        }

        return json(result);
    } catch (e) {
        return error(500, e.message);
    }
}

export async function PUT({params, request}) {
    const createArr = [],
        updateArr = [],
        modelName = _.upperFirst(params.modelName),
        body = await request.json();

    _.each(body, item => {
        if (item.id) updateArr.push(item);
        else createArr.push(item);
    });

    try {
        return json(await parallel({created, updated}));
    } catch (e) {
        return error(500, e.message);
    }

    async function created() {
        if (createArr.length) {
            const createdArr = JSON.parse(JSON.stringify(await models[modelName].create(createArr)));

            _.each(createdArr, item => {
                _.each(item, (value, key) => {
                    if (_.lowerCase(key).includes('date')) item[key] = moment(value).format('YYYY-MM-DD');
                });
            });

            return createdArr;
        }
    }

    async function updated() {
        if (updateArr.length) {
            const updatedArr = [];

            for (const item of updateArr) {
                await models[modelName].findByIdAndUpdate(item.id, item);
                updatedArr.push(item);
            }

            return updatedArr;
        }
    }
}

export async function POST({params, request}) {
    const modelName = _.upperFirst(params.modelName);

    try {
        const {file} = Object.fromEntries(await request.formData());
        const buffer = Buffer.from(await file.arrayBuffer());
        const {schema} = await getSchema(modelName);
        const list = await loadExcel(schema, buffer);

        return json(list);
    } catch (e) {
        return error(500, e.message);
    }
}

export async function DELETE({params, request}) {
    let modelName = _.upperFirst(params.modelName);

    const ids = await request.json();

    try {
        await models[modelName].findByIdAndDelete(ids[0]);

        return json({success: true});
    } catch (e) {
        return error(500, e.message);
    }
}

function setTitle(modelName, item, schema, dropdownDataByModelById) {
    _.each(titleAttrByModel[modelName], (titleAttr, titleAttrIndex) => {
        let val = item[titleAttr];

        if (schema && schema[titleAttr] && schema[titleAttr].type === 'ObjectId' &&
            dropdownDataByModelById && dropdownDataByModelById[schema[titleAttr].model] &&
            dropdownDataByModelById[schema[titleAttr].model][val]) {
            if (!dropdownDataByModelById[schema[titleAttr].model][val].title) {
                setTitle(schema[titleAttr].model,
                    dropdownDataByModelById[schema[titleAttr].model][val]);
            }

            val = dropdownDataByModelById[schema[titleAttr].model][val].title;
        }

        if (item.hasOwnProperty(titleAttr)) {
            if (titleAttr === 'incoming' || titleAttr === 'outgoing') {
                val = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'MUR',
                    minimumFractionDigits: 2,
                }).format(val || 0);
            }

            if (!titleAttrIndex) item.title = val;
            else item.title += ' - ' + val;
        }
    });
}

async function getSchema(modelName) {
    const schema = {}, dropdownModels = [];

    _.each(models[modelName].schema.paths, (path, key) => {
        if (key !== '__v' && key !== '_id') {  // Exclude the Mongoose version key
            schema[key] = {type: path.instance};

            if (path.instance === 'ObjectId') {
                schema[key].model = path.options.ref;
            } else if (path.instance === 'Array' && path.$embeddedSchemaType &&
                path.$embeddedSchemaType.instance === 'ObjectId') {
                schema[key].model = path.$embeddedSchemaType.options.ref;
            }

            if (schema[key].model && !dropdownModels.includes(schema[key].model)) {
                dropdownModels.push(schema[key].model);
            }
        }
    });

    return {schema, dropdownModels};
}

async function getList(modelName) {
    try {
        const result = [];

        let modelData = await models[modelName].find();

        modelData = JSON.parse(JSON.stringify(modelData));

        _.each(modelData, item => {
            _.each(item, (value, key) => {
                if (_.lowerCase(key).includes('date')) item[key] = moment(value).format('YYYY-MM-DD');
            });

            result.push(item);
        });

        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function getDropdownData(dropdownModels) {
    try {
        const result = {};

        for (const model of dropdownModels) {
            let dropdownModelData = await models[model].find().select(titleAttrByModel[model]);

            dropdownModelData = JSON.parse(JSON.stringify(dropdownModelData));

            result[model] = {};

            _.each(dropdownModelData, dropdownModelItem => {
                setTitle(model, dropdownModelItem);
                result[model][dropdownModelItem.id] = dropdownModelItem;
            });
        }

        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function loadExcel(schema, buffer) {
    return new Promise((resolve, reject) => {
        const workbook = new Excel.Workbook();

        workbook.xlsx.load(buffer).then(() => {
            const colMap = {}, itemList = [];

            workbook.eachSheet(function(worksheet, sheetId) {
                worksheet.eachRow(function(row, rowNumber) {
                    const newItem = {};

                    row.eachCell(function(cell, colNumber) {
                        if (rowNumber === 2 && schema[cell.value]) {
                            colMap[colNumber] = cell.value;
                        } else if (rowNumber > 2 && colMap[colNumber] && !_.isEmpty(_.trim(cell.value))) {
                            newItem[colMap[colNumber]] = cell.value;
                        }
                    });

                    if (!_.isEmpty(newItem)) {
                        itemList.push(_.cloneDeep(newItem));
                    }
                });
            });

            resolve(itemList);
        }).catch((err) => {
            reject(err);
        });
    });
}