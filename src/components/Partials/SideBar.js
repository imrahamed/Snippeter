import React, { useContext } from 'react'
import { Layout, Checkbox, Form, Col, Row, Input, Button } from 'antd';
import SnippetDataContext, { UPDATE_QUERY, CLEAR_QUERY, LIST_SNIPPET } from "../../store/reducer/SnippetContext";


const { Sider } = Layout;

export default function SideBar() {
    let { snippetState, snippetDispatch } = useContext(SnippetDataContext)
    let { query: { searchText, isGlobalSearch } } = snippetState;

    let handleQueryChange = (e) => {
        snippetDispatch({
            type: UPDATE_QUERY,
            payload: { [e.target.name]: e.target.value }
        });
        snippetDispatch({
            type: LIST_SNIPPET
        });
    }

    let handleCheckBoxChange = () => {
        snippetDispatch({
            type: UPDATE_QUERY,
            payload: { isGlobalSearch: !isGlobalSearch }
        });
        snippetDispatch({
            type: LIST_SNIPPET
        });
    }

    let clearFilters = () => {
        snippetDispatch({
            type: CLEAR_QUERY
        });
        snippetDispatch({
            type: LIST_SNIPPET
        });
    }

    return (
        <Sider width={400} style={{ height: "100vh", backgroundColor: "#385A78" }} className="">
            <Form layout="horizontal" hideRequiredMark>
                <Row gutter={16} style={{ margin: "30px 10px" }}>
                    <Col span={24}>

                        <Input name="searchText" placeholder="Please enter snippet search key..." onChange={(e) => handleQueryChange(e)} value={searchText} />
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Globally Search"
                            style={{ fontSize: "24px", fontWeight: "bold" }}
                        >
                            <Checkbox name="isGlobalSearch" onChange={handleCheckBoxChange} checked={isGlobalSearch} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Button type="primary" onClick={clearFilters}>Clear Filters</Button>
                    </Col>
                </Row>
            </Form>

        </Sider>
    )
}
