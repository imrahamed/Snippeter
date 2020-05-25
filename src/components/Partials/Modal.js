import React, { useContext, useState } from "react";
import { Drawer, Form, Button, Col, Row, Input, Select, Checkbox, Alert } from 'antd';
import ModalDataContext, { HIDE_MODAL } from "../../store/reducer/ModalContex";
import SnippetDataContext, { SNIPPET_EDITTING, ADD_SNIPPET, CLEAR_INPUT, ADD_TAG, SEARCH_TAG } from "../../store/reducer/SnippetContext";
import { getUnique } from "../_helpers/helper";

import { SnippetSchema } from "../YupSchema/Snippet";

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
    let onClose = () => {
        modalDispatch({
            type: HIDE_MODAL
        });
        clearInput();
    }
    let handleChange = (value) => {
        setErrors({ ...errors, tags: "" });
        let newTags = [];
        var selectedTags = snippetState.tags.filter((item) => {
            return item.id === value;
        });

        if (!selectedTags.length) {
            snippetDispatch({
                type: ADD_TAG,
                payload: { id: JSON.stringify(Math.floor(Date.now()/1000) ), name: value }
            });
            newTags = [...snippetState.snippet.tags, { id: JSON.stringify(Math.floor(Date.now()/1000) ), name: value }];
        } else {
            newTags = [...snippetState.snippet.tags, ...selectedTags];
        }

        snippetDispatch({
            type: SNIPPET_EDITTING,
            payload: { tags: newTags }
        });
    }

    let handleDeselect = (value) => {
        setErrors({ ...errors, tags: "" });
        let newTags = snippetState.snippet.tags.filter(item => item.id !== value);
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
        if (snippetState.snippet.tags && snippetState.snippet.tags.length) {
            newTags = [...snippetState.tags, ...snippetState.snippet.tags];
            newTags = getUnique(newTags, "id");
        } else {
            newTags = [...snippetState.tags];
        }
        newTags.map(option => {
            childOptions.push(<Option key={option.id} value={option.id} >{option.name}</Option>)
        });
        return childOptions;
    }

    let addSippet = async () => {
        try {
            await SnippetSchema.validate(snippetState.snippet, { abortEarly: false });
            snippetDispatch({
                type: ADD_SNIPPET
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

    let seletedTags = (selectedTags) => {
        let newTags = [];
        if (selectedTags) {
            newTags = [].concat(selectedTags).map(item => item.id);
        }
        return newTags;
    }

    let handleSearch = (value) => {
        snippetDispatch({
            type: SEARCH_TAG,
            payload: value
        });
    }

    let { snippet, title, tags, isPublic, description } = snippetState.snippet;
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
                                label="snippet"
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
                                <Select mode="tags" style={{ width: '100%' }} value={seletedTags(tags)} name="tags" optionFilterProp={"children"}
                                    onSelect={handleChange} onDeselect={handleDeselect} onSearch={handleSearch} filterOption={true} tokenSeparators={[',']}  >
                                    {loadTags()}
                                </Select>
                                {errors.tags && errors.tags.length ? <Alert message={errors.tags} type="error" style={{ marginTop: "5px" }} /> : null}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}

