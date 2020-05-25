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

export const snippetData = {
    id: new Date().toISOString(),
    user: "",
    snippet: "",
    isPublic: false,
    title: "",
    tags: [],
    description: "",
    created_at: ""
}

let sampleData = [
    {
        id: 1,
        user: 2,
        snippet: "Test snippet",
        isPublic: true,
        title: "Test title 1",
        tags: [
            {
                id: "3",
                name: "React"
            },
            {
                id: "4",
                name: "Html"
            },
        ],
        description: "Test",
        created_at: "2020-05-24T11:36:56.383Z"
    },
    {
        id: 2,
        user: 2,
        snippet: "Test snippet2",
        isPublic: true,
        title: "Test title 2",
        tags: [{
            id: "2",
            name: "Node"
        }],
        description: "Test",
        created_at: "2020-05-24T11:36:56.383Z"
    },
    {
        id: 3,
        user: 2,
        snippet: "Test snippet3",
        isPublic: true,
        title: "Test title 3",
        tags: [{
            id: "1",
            name: "Java Script"
        }],
        description: "Test",
        created_at: "2020-05-24T11:36:56.383Z"
    }
]


let sampleTags = [
    {
        id: "1",
        name: "Java Script"
    },
    {
        id: "2",
        name: "Node"
    },
    {
        id: "3",
        name: "React"
    },
    {
        id: "4",
        name: "Html"
    },
    {
        id: "5",
        name: "Css"
    },
    {
        id: "6",
        name: "R"
    },
];

export const snippetInitialState = {
    isLoading: false,
    snippets: [],
    snippet: {},
    isEdit: false,
    tags: []
}



let addSnippet = (state) => {
    let newSnippets = [...state.snippets];
    if (state.isEdit) {
        let indexToUpdate = newSnippets.findIndex(item => item.id === state.snippet.id);
        if (indexToUpdate !== -1) {
            newSnippets[indexToUpdate] = state.snippet;
        }
    } else {
        newSnippets = [...newSnippets, state.snippet];
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
    return { ...state, snippets: state.snippets.filter(item => item.id !== data.id), isLoading: false }
}

let loadSnippets = (state, data) => {
    ///change to data to work later
    return { ...state, snippets: [...sampleData], isLoading: false };
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
    return { ...state, tags: sampleTags };
}

let addTag = (state, data) => {
    console.log({ ...state, tags: { ...state.tags, ...data } }, "her");
    return { ...state, tags: { ...state.tags, ...data } };
}

export const SnippetReducer = (state, action) => {
    switch (action.type) {
        case ADD_SNIPPET:
            return addSnippet(state);
        case UPDATE_SNIPPET:
            return updateSnippet(state, action.payload);
        case LOADING:
            return { ...state, isLoading: true };
        case DELETE_SNIPPET:
            return deleteSnippet(state, action.payload);
        case LIST_SNIPPET:
            return loadSnippets(state, action.payload);
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
            return loadTags(state, action.payload);
        case ADD_TAG:
            return addTag(state, action.payload);
        default:
            return state;
    }
}

const SnippetDataContext = createContext(snippetInitialState);

export default SnippetDataContext;
