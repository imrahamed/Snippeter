import { headers } from "./_helpers";

export let getAllSnippets = () => {
    return fetch("http://localhost:5001/api/snippet", { method: "GET", headers: headers() }).then(res => res.json())
}

export let getSnippetsById = (id) => {
    return fetch(`http://localhost:5001/api/snippet/${id}`, { method: "GET", headers: headers() }).then(res => res.json())
}


export let deleteSnippetsById = (id) => {
    return fetch(`http://localhost:5001/api/snippet/${id}`, { method: "DELETE", headers: headers() }).then(res => res.json())
}

export const addSnippet = (data) => {
    return fetch("http://localhost:5001/api/snippet", { method: "POST", headers: headers(), body: JSON.stringify(data) }).then(res => res.json())
}

export const updateSnippet = (data, id) => {
    return fetch(`http://localhost:5001/api/snippet/${id}`, { method: "PUT", headers: headers(), body: JSON.stringify(data) }).then(res => res.json())
}

export const addTags = (data) => {
    return fetch(`http://localhost:5001/api/tag`, { method: "POST", headers: headers(), body: JSON.stringify({ name: data }) }).then(res => res.json())
}

export const getTags = (params) => {
    let url = `http://localhost:5001/api/tag?`;
    if (params && params.searchText) { url += `search=${params.searchText}` };
    return fetch(url, { method: "GET", headers: headers() }).then(res => res.json())
}
