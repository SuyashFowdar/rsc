import {error} from '@sveltejs/kit';

export async function get(fetch, url) {
    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
        return error(response.status, data.message);
    }

    return data;
}

export async function post(fetch, url, body) {
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    });

    const data = await response.json();

    if (!response.ok) {
        return error(response.status, data.message);
    }

    return data;
};

export async function save(url, body) {
    const response = await fetch(url + '/save', {
        method: "POST",
        body: JSON.stringify(body),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    });

    const data = await response.json();

    if (!response.ok) {
        return error(response.status, data.message);
    }

    return data;
};

export async function put(url, body) {
    const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {"Content-type": "application/json;"}
    });

    const data = await response.json();

    if (!response.ok) {
        return error(response.status, data.message);
    }

    return data;
};

export async function remove(url, body) {
    const response = await fetch(url, {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: {"Content-type": "application/json;"}
    });

    const data = await response.json();

    if (!response.ok) {
        return error(response.status, data.message);
    }

    return data;
};

export async function uploadFile(url, formData) {
    const response = await fetch(url, {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    if (!response.ok) {
        return error(response.status, data.message);
    }

    return data;
};
