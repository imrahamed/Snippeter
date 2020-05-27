import { headers, handleResponse } from "./_helpers";
let ENDPOINT = "http://localhost:5001/api";

export let getAllSnippets = (params) => {
    let URL = `${ENDPOINT}/snippet?`;
    if (params && params.searchText && params.searchText.trim().length) { URL += `search=${params.searchText}` };
    if (params && params.tags && params.tags.length) {
        let searchTags = params.tags.map(tag => tag._id).join(",");
        URL += `tags=${searchTags}`;
    }
    return fetch(`${URL}`, { method: "GET", headers: headers() }).then(handleResponse)
}

export let getSnippetsById = (id) => {
    return fetch(`${ENDPOINT}/snippet/${id}`, { method: "GET", headers: headers() }).then(handleResponse)
}

export let deleteSnippetsById = (id) => {
    return fetch(`${ENDPOINT}/snippet/${id}`, { method: "DELETE", headers: headers() }).then(handleResponse)
}

export const addSnippet = (data) => {
    let tags = data.tags.map(item => item._id);
    data.tags = tags;
    return fetch(`${ENDPOINT}/snippet`, { method: "POST", headers: headers(), body: JSON.stringify(data) }).then(handleResponse)
}

export const updateSnippet = (data, id) => {
    let tags = data.tags.map(item => item._id);
    data.tags = tags;
    return fetch(`${ENDPOINT}/snippet/${id}`, { method: "PUT", headers: headers(), body: JSON.stringify(data) }).then(handleResponse)
}

export const addTags = (data) => {
    return fetch(`${ENDPOINT}/tag`, { method: "POST", headers: headers(), body: JSON.stringify({ name: data }) }).then(handleResponse)
}

export const getTags = (params) => {
    let url = `${ENDPOINT}/tag?`;
    if (params && params.searchText) { url += `search=${params.searchText}` };
    return fetch(url, { method: "GET", headers: headers() }).then(handleResponse)
}


