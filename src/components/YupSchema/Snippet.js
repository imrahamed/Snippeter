import * as Yup from "yup";

export let SnippetSchema = Yup.object().shape({
    title: Yup.string().required().min(2).max(30),
    snippet: Yup.string().required().min(5).max(300),
    description: Yup.string().min(5).max(300),
    isPublic: Yup.boolean().required(),
    tags: Yup.string().required()
});