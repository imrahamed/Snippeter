import { headers } from "./_helpers";
let ENDPOINT = "http://localhost:5001/api";

export let getAllSnippets = () => {
    return fetch(`${ENDPOINT}/snippet`, { method: "GET", headers: headers() }).then(res => res.json())
}

export let getSnippetsById = (id) => {
    return fetch(`${ENDPOINT}/snippet/${id}`, { method: "GET", headers: headers() }).then(res => res.json())
}


export let deleteSnippetsById = (id) => {
    return fetch(`${ENDPOINT}/snippet/${id}`, { method: "DELETE", headers: headers() }).then(res => res.json())
}

export const addSnippet = (data) => {
    let tags = data.tags.map(item => item._id);
    console.log(tags);
    data.tags = tags;
    return fetch(`${ENDPOINT}/snippet`, { method: "POST", headers: headers(), body: JSON.stringify(data) }).then(res => res.json())
}

export const updateSnippet = (data, id) => {
    let tags = data.tags.map(item => item._id);
    console.log(tags);
    data.tags = tags;
    return fetch(`${ENDPOINT}/snippet/${id}`, { method: "PUT", headers: headers(), body: JSON.stringify(data) }).then(res => res.json())
}

export const addTags = (data) => {
    return fetch(`${ENDPOINT}/tag`, { method: "POST", headers: headers(), body: JSON.stringify({ name: data }) }).then(res => res.json())
}

export const getTags = (params) => {
    let url = `${ENDPOINT}/tag?`;
    if (params && params.searchText) { url += `search=${params.searchText}` };
    return fetch(url, { method: "GET", headers: headers() }).then(res => res.json())
}


