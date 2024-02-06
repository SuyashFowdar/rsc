import _ from 'lodash';
import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';
import { get } from '../../../lib/utils/http.js';

export async function load({ params, fetch }) {
    const data = await get(fetch, '/list/' + params.modelName);

    data.modelName = params.modelName;

    return data;
}
