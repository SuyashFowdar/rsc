import {Company} from "../../../model/index.js";
import {json, error} from '@sveltejs/kit';

export async function GET() {
    try {
        const companyList = await Company.find().select(['id', 'name']);

        return json(companyList);
    } catch (e) {
        return error(e);
    }
};