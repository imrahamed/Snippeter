import React, { useContext } from "react";
import { Drawer, Form, Button, Col, Row, Input, Select, Checkbox } from 'antd';
import ModalDataContext, { HIDE_MODAL } from "../../store/reducer/ModalContex";
import SnippetDataContext, { SNIPPET_EDITTING, ADD_SNIPPET, CLEAR_INPUT } from "../../store/reducer/SnippetContext";


const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default function Modal() {
    const { modalState, modalDispatch } = useContext(ModalDataContext);
    const { snippetState, snippetDispatch } = useContext(SnippetDataContext);
    let onClose = () => {
        modalDispatch({
            type: HIDE_MODAL
        });
        clearInput();
    }
    let handleChange = (value) => {
        snippetDispatch({
            type: SNIPPET_EDITTING,
            payload: { tags: value }
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


    let addSippet = () => {
        snippetDispatch({
            type: ADD_SNIPPET
        });
        onClose();
    }

    let handleDataChange = (e) => {
        snippetDispatch({
            type: SNIPPET_EDITTING,
            payload: { [e.target.name]: e.target.value }
        });
    }

    let { snippet, title, tags, isPublic, description } = snippetState.snippet;
    return (
        <>
            <Drawer
                title="Create A Snippet"
                width={500}
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
                            // rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input name="title" placeholder="Please enter snippet title" value={title} onChange={(e) => handleDataChange(e)} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="snippet"
                            >
                                <Input.TextArea name="snippet" value={snippet} onChange={(e) => handleDataChange(e)} rows={6} placeholder="please enter your snippet" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Description"
                            >
                                <Input.TextArea rows={4} value={description} onChange={(e) => handleDataChange(e)} name="description" placeholder="please enter description" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Public"
                            >
                                <Checkbox name="isPublic" onChange={(e) => togglePublic(isPublic)} checked={isPublic} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="tags"
                                label="Tags"
                            >
                                <Select mode="tags" style={{ width: '100%' }} name="tags" onChange={handleChange} tokenSeparators={[',']} >
                                    {children}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}


//defaultValue={['a10', 'c12']}