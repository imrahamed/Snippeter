import React, { useContext, useState } from 'react'
import { Layout, Checkbox, Form, Col, Row, Input, Button, AutoComplete, Select, Tag } from 'antd';
import SnippetDataContext, { UPDATE_QUERY, CLEAR_QUERY, LIST_SNIPPET, LOADING, SEARCH_TAG } from "../../store/reducer/SnippetContext";
import { getAllSnippets, getTags } from "../../services/Snippet";
import { filterArray, getUnique } from "../_helpers/helper";


const { Sider } = Layout;
const { Option } = Select;

export default function SideBar() {
    let { snippetState, snippetDispatch } = useContext(SnippetDataContext)
    let { query: { searchText, isGlobalSearch, tags } } = snippetState;
    let [tagName, setTagName] = useState("");


    let handleQueryChange = (e) => {
        snippetDispatch({
            type: UPDATE_QUERY,
            payload: { [e.target.name]: e.target.value }
        });
    }

    let handleEnterKey = (e) => {
        if (e.keyCode === 13 && searchText.trim().length) {
            searchCall();
        }
    }

    let searchCall = async () => {
        snippetDispatch({
            type: LOADING,
        });
        let snippets = await getAllSnippets({ searchText, tags });
        snippetDispatch({
            type: LIST_SNIPPET,
            payload: snippets
        });
    }

    let handleSearchClick = async () => {
        searchCall()
    }

    let handleCheckBoxChange = async () => {
        snippetDispatch({
            type: UPDATE_QUERY,
            payload: { isGlobalSearch: !isGlobalSearch }
        });
    }

    let clearFilters = async () => {
        snippetDispatch({
            type: CLEAR_QUERY
        });
        // searchCall();
    }

    let loadTags = () => {
        let childOptions = [];
        let newTags = [];
        if (tags) {
            newTags = filterArray(snippetState.tags, tags)
        } else {
            newTags = snippetState.tags;
        }
        newTags.map(option => {
            childOptions.push(<Option key={option._id} value={option._id} >{option.name}</Option>)
        });
        return childOptions;
    }

    let handleSearch = async (value) => {
        setTagName(value);
        let searchedTags = await getTags({ searchText: value });
        snippetDispatch({
            type: SEARCH_TAG,
            payload: searchedTags
        });
    }

    let handleSelect = async (value) => {
        setTagName(value);
        let newTags = [];
        var selectedTags = snippetState.tags.filter((item) => {
            return item._id === value;
        }) || [];
        newTags = [...tags, ...selectedTags];
        newTags = getUnique(newTags, "_id");
        snippetDispatch({
            type: UPDATE_QUERY,
            payload: { tags: newTags }
        });
        setTagName("");
        let searchedTags = await getTags();
        snippetDispatch({
            type: SEARCH_TAG,
            payload: searchedTags
        });

    }

    let handleDeselect = (value) => {
        let newTags = tags.filter(item => item._id !== value._id);
        snippetDispatch({
            type: UPDATE_QUERY,
            payload: { tags: newTags }
        });
    }
    let removeTag = (e, tag) => {
        e.preventDefault();
        handleDeselect(tag);
    }

    let listTags = () => {
        return (tags && tags.map(tag => {
            return (<Tag key={tag._id} closable onClose={(e) => removeTag(e, tag)} color="green"> {tag.name}</Tag>)
        }));
    }


    return (
        <Sider width={400} style={{ height: "100vh", backgroundColor: "#385A78" }} className="">
            <Form layout="horizontal" hideRequiredMark>
                <Row gutter={16} style={{ margin: "30px 10px" }}>
                    <Col span={24}>

                        <Input name="searchText" placeholder="Please enter snippet search key..." onKeyUp={handleEnterKey} onChange={(e) => handleQueryChange(e)} value={searchText} />
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
                        <AutoComplete
                            style={{ width: "100%" }}
                            placeholder="Search Snippet By Tags"
                            onSearch={handleSearch}
                            onSelect={(e) => handleSelect(e)}
                            value={tagName}
                        >
                            {loadTags()}
                        </AutoComplete>
                    </Col>
                    <Col span={24}>
                        <Form.Item>
                            {listTags()}
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Button type="primary" onClick={handleSearchClick}   > Search</Button>
                        <Button type="primary" onClick={clearFilters} style={{ float: "right" }}>Clear Filters</Button>
                    </Col>
                </Row>
            </Form>

        </Sider >
    )
}
