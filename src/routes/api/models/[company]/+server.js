import * as models from "../../../../model/index.js";
import {json} from '@sveltejs/kit';
import _ from "lodash";

export async function GET({params}) {
    const modelList = [];

    const companyMap = {
        rsc: { Client: true, Location: true, Route: true, Trip: true, Transaction: true },
        ds: { ProductTransaction: true, Transaction: true, Price: true, Supplier: true, Client: true },
        oil: { ProductTransaction: true, Transaction: true, Price: true, Supplier: true, Client: true }
    };

    if (!params.company) {
        buildModelList(models);
    } else {
        try {
            const company = await models.Company.findById(params.company);

            _.each(companyMap, (modelMap, companyKey) => {
                if (company.name.toLowerCase().includes(companyKey)) {
                    buildModelList(modelMap);
                }
            });
        } catch (e) {
            buildModelList(models);
        }
    }


    return json(modelList);

    function buildModelList(models) {
        _.each(models, (model, name) => {
            if (name !== 'User') {
                modelList.push({
                    name: _.startCase(name),
                    path: _.camelCase(name)
                });
            }
        });
    }
};