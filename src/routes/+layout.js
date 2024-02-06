import {get} from '../lib/utils/http.js';
import { browser } from '$app/environment';

export async function load({ fetch, params }) {
    let selectedCompanyId = 0;

    if (browser && localStorage.selectedCompanyId) selectedCompanyId = localStorage.selectedCompanyId;

    const data = await get(fetch, '/api/models/' + selectedCompanyId);

    return { models: data, modelName: params && params.modelName ? params.modelName : '' };
}