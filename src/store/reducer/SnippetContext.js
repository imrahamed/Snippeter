import { createContext } from "react";

export const ADD_SNIPPET = "ADD_SNIPPET";
export const UPDATE_SNIPPET = "UPDATE_SNIPPET";
export const GET_SNIPPET_EDIT = "GET_SNIPPET_EDIT";
export const SNIPPET_EDITTING = "SNIPPET_EDITTING";
export const LIST_SNIPPET = "LIST_SNIPPET";
export const LIST_PUBLIC_SNIPPET = "LIST_PUBLIC_SNIPPET";
export const DELETE_SNIPPET = "DELETE_SNIPPET";
export const LOADING = "LOADING";
export const CLEAR_INPUT = "CLEAR_INPUT";
export const IN_EDIT = "IN_EDIT";
export const CLEAR_STATE = "CLEAR_STATE";
export const LOAD_TAGS = "LOAD_TAGS";
export const ADD_TAG = "ADD_TAG";
export const SEARCH_TAG = "SEARCH_TAG";
export const CLEAR_QUERY = "CLEAR_QUERY";
export const UPDATE_QUERY = "UPDATE_QUERY";
export const ERROR_LOADING = "ERROR_LOADING";
export const TAGS_LOADING = "TAGS_LOADING";
export const TAGS_LOADED = "TAGS_LOADED";

export const snippetData = {
    id: "",
    user: "",
    snippet: "",
    isPublic: false,
    title: "",
    tags: [],
    description: "",
    created_at: ""
}

let initialQuery = {
    searchText: "",
    offset: 0,
    limit: 10,
    isGlobalSearch: false,
    tags: []
}

export const snippetInitialState = {
    isLoading: false,
    snippets: [],
    snippet: {},
    isEdit: false,
    tags: [],
    query: initialQuery,
    tagSaving: false
}



let addSnippet = (state, data) => {
    let newSnippets = [...state.snippets];
    if (state.isEdit) {
        let indexToUpdate = newSnippets.findIndex(item => item._id === data._id);
        if (indexToUpdate !== -1) {
            newSnippets[indexToUpdate] = data;
        }
    } else {
        newSnippets = [...newSnippets, data];
    }
    return { ...state, snippets: newSnippets, snippet: {}, isLoading: false };
}

let updateSnippet = (state, data) => {
    let updatedSnippets = [...state.snippets];
    let indexToUpdate = updatedSnippets.findIndex(item => item.id === data.id);
    if (indexToUpdate !== -1) {
        updatedSnippets[indexToUpdate] = data;
    }
    return { ...state, snippets: [...updatedSnippets], isLoading: false };
}

let deleteSnippet = (state, data) => {
    return { ...state, snippets: state.snippets.filter(item => item._id !== data), isLoading: false }
}

let loadSnippets = (state, data) => {
    return { ...state, snippets: [...data], isLoading: false };
}

let selectSnippet = (state, data) => {
    let selectedSnippet = {};
    if (data) {
        selectedSnippet = data;
    } else {
        selectedSnippet = snippetData;
    }
    return { ...state, snippet: selectedSnippet, isLoading: false }
}

let snippetChange = (state, data) => {
    return { ...state, snippet: { ...state.snippet, ...data } };
}

let loadTags = (state, data) => {
    return { ...state, tags: data };
}

let addTag = (state, data) => {
    return { ...state, tags: [...state.tags].concat(data), tagSaving: false };
}

let searchTag = (state, data) => {
    return { ...state, tags: data };
}

let updateQuery = (state, data) => {
    return { ...state, query: { ...state.query, ...data } };
}

export const SnippetReducer = (state, action) => {
    switch (action.type) {
        case ADD_SNIPPET:
            return addSnippet(state, action.payload.data);
        case UPDATE_SNIPPET:
            return updateSnippet(state, action.payload);
        case LOADING:
            return { ...state, isLoading: true };
        case DELETE_SNIPPET:
            return deleteSnippet(state, action.payload.data);
        case LIST_SNIPPET:
            return loadSnippets(state, action.payload.data);
        case GET_SNIPPET_EDIT:
            return selectSnippet(state, action.payload);
        case SNIPPET_EDITTING:
            return snippetChange(state, action.payload);
        case CLEAR_INPUT:
            return { ...state, snippet: snippetData };
        case IN_EDIT:
            return { ...state, isEdit: action.payload };
        case CLEAR_STATE:
            return snippetInitialState;
        case LOAD_TAGS:
            return loadTags(state, action.payload.data);
        case ADD_TAG:
            return addTag(state, action.payload.data);
        case SEARCH_TAG:
            return searchTag(state, action.payload.data);
        case CLEAR_QUERY:
            return { ...state, query: initialQuery };
        case UPDATE_QUERY:
            return updateQuery(state, action.payload);
        case ERROR_LOADING:
            return { ...state, isLoading: false }
        case TAGS_LOADING:
            return { ...state, tagSaving: true }
        case TAGS_LOADED:
            return { ...state, tagSaving: false }
        default:
            return state;
    }
}

const SnippetDataContext = createContext(snippetInitialState);

export default SnippetDataContext;
