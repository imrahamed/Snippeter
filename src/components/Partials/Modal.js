import React, { useContext, useState } from "react";
import { Drawer, Form, Button, Col, Row, Input, Select, Checkbox, Alert, AutoComplete, Tag } from 'antd';
import ModalDataContext, { HIDE_MODAL } from "../../store/reducer/ModalContex";
import SnippetDataContext, { SNIPPET_EDITTING, ADD_SNIPPET, CLEAR_INPUT, ADD_TAG, TAGS_LOADING, SEARCH_TAG } from "../../store/reducer/SnippetContext";
import { getUnique, filterArray } from "../_helpers/helper";

import { SnippetSchema } from "../YupSchema/Snippet";
import { addTags, getTags, updateSnippet, addSnippet } from "../../services/Snippet";

const { Option } = Select;

let initialErros = {
    title: "",
    snippet: "",
    description: "",
    initialErros: "",
    tags: ""
}

export default function Modal() {
    const { modalState, modalDispatch } = useContext(ModalDataContext);
    const { snippetState, snippetDispatch } = useContext(SnippetDataContext);
    let [errors, setErrors] = useState(initialErros);
    let [tagName, setTagName] = useState("");
    let onClose = () => {
        modalDispatch({
            type: HIDE_MODAL
        });
        setTagName("");
        clearInput();
    }

    let handleDeselect = (value) => {
        setErrors({ ...errors, tags: "" });
        let newTags = snippetState.snippet.tags.filter(item => item._id !== value._id);
        snippetDispatch({
            type: SNIPPET_EDITTING,
            payload: { tags: newTags }
        });
    }

    let clearInput = () => {
        snippetDispatch({
            type: CLEAR_INPUT
        });
    }


    let togglePublic = (isPublic) => {
        snippetDispatch({
            type: SNIPPET_EDITTING,
            payload: { isPublic: !isPublic }
        });
    }

    let loadTags = () => {
        let childOptions = [];
        let newTags = [];
        if (snippetState.snippet.tags) {
            newTags = filterArray(snippetState.tags, snippetState.snippet.tags)
        } else {
            newTags = snippetState.tags;
        }
        newTags.map(option => {
            childOptions.push(<Option key={option._id} value={option._id} >{option.name}</Option>)
        });
        return childOptions;
    }

    let addSippet = async () => {

        let newSnippet;
        try {
            await SnippetSchema.validate(snippetState.snippet, { abortEarly: false });
            if (snippetState.isEdit) {
                newSnippet = await updateSnippet(snippetState.snippet, snippetState.snippet._id);
            } else {
                newSnippet = await addSnippet(snippetState.snippet);
            }
            snippetDispatch({
                type: ADD_SNIPPET,
                payload: newSnippet
            });
            onClose();
        } catch (errors) {
            let newErrors = {};
            errors.inner.map(err => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
        }
    }

    let handleDataChange = (e) => {
        setErrors({ ...errors, [e.target.name]: "" });
        snippetDispatch({
            type: SNIPPET_EDITTING,
            payload: { [e.target.name]: e.target.value }
        });
    }

    let handleSearch = async (value) => {
        setTagName(value);
        let searchedTags = await getTags({ searchText: value });
        snippetDispatch({
            type: SEARCH_TAG,
            payload: searchedTags
        });
    }

    let removeTag = (e, tag) => {
        e.preventDefault();
        handleDeselect(tag);
    }

    let listTags = () => {
        return (snippetState.snippet.tags && snippetState.snippet.tags.map(tag => {
            return (<Tag key={tag._id} closable onClose={(e) => removeTag(e, tag)} color="green"> {tag.name}</Tag>)
        }));
    }

    let handleSelect = (value) => {
        setTagName(value);
        setErrors({ ...errors, tags: "" });
        let newTags = [];
        var selectedTags = snippetState.tags.filter((item) => {
            return item._id === value;
        }) || [];
        newTags = [...snippetState.snippet.tags, ...selectedTags];
        newTags = getUnique(newTags, "_id");
        snippetDispatch({
            type: SNIPPET_EDITTING,
            payload: { tags: newTags }
        });
        setTagName("");
    }

    let handleAddTag = async (e) => {
        let newTagValue = e.target.value;
        let eventKey = e.keyCode;
        if (!newTagValue.trim().length || eventKey !== 13) {
            return;
        }
        let findData = snippetState.tags.filter(tag => {
            let newRegex = new RegExp("\\b" + newTagValue + "\\b", "ig");
            return newRegex.test(tag.name);
        });
        if (!findData.length && !snippetState.tagSaving) {
            snippetDispatch({
                type: TAGS_LOADING
            });
            try {
                let newTag = await addTags(newTagValue);
                snippetDispatch({
                    type: ADD_TAG,
                    payload: newTag
                });
                let newTags = [...snippetState.snippet.tags, { ...newTag.data }];
                snippetDispatch({
                    type: SNIPPET_EDITTING,
                    payload: { tags: newTags }
                });
                setTagName("");
                let searchedTags = await getTags();
                snippetDispatch({
                    type: SEARCH_TAG,
                    payload: searchedTags
                });
            } catch (e) {
                console.log(e);
            }

        }
    }

    let { snippet, title, isPublic, description } = snippetState.snippet;
    return (
        <>
            <Drawer
                title="Create A Snippet"
                width={'30%'}
                onClose={onClose}
                visible={modalState.visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button onClick={addSippet} type="primary">
                            Submit
                        </Button>
                    </div>
                }
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Title"
                            >
                                <Input name="title" placeholder="Please enter snippet title" value={title} onChange={(e) => handleDataChange(e)} />
                                {errors.title && errors.title.length ? <Alert message={errors.title} type="error" style={{ marginTop: "5px" }} /> : null}
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Snippet"
                            >
                                <Input.TextArea name="snippet" value={snippet} onChange={(e) => handleDataChange(e)} rows={6} placeholder="please enter your snippet" />
                                {errors.snippet && errors.snippet.length ? <Alert message={errors.snippet} type="error" style={{ marginTop: "5px" }} /> : null}
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Description"
                            >
                                <Input.TextArea rows={4} value={description} onChange={(e) => handleDataChange(e)} name="description" placeholder="please enter description" />
                                {errors.description && errors.description.length ? <Alert message={errors.description} type="error" style={{ marginTop: "5px" }} /> : null}
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Public"
                            >
                                <Checkbox name="isPublic" onChange={(e) => togglePublic(isPublic)} checked={isPublic} />
                                {errors.isPublic && errors.isPublic.length ? <Alert message={errors.isPublic} type="error" style={{ marginTop: "5px" }} /> : null}
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Tags"
                            >
                                <AutoComplete
                                    style={{ width: "100%" }}
                                    placeholder="Snippet Tags"
                                    onSearch={handleSearch}
                                    onSelect={(e) => handleSelect(e)}
                                    value={tagName}
                                    onKeyUp={(e) => handleAddTag(e)}
                                >
                                    {loadTags()}
                                </AutoComplete>

                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item>
                                {listTags()}
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </Drawer>
        </>
    )
}

