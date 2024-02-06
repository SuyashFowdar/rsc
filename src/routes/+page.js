import {get} from '../lib/utils/http.js';

export async function load({fetch}) {
    const companyList = await get(fetch, '/api/companies');

    companyList.unshift({id: 0, name: 'All'});

    return {
        companyList: companyList
    };
}
