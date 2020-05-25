
import React, { useContext, useEffect } from "react";
// import Styled from "styled-components";
// import { AuthContext } from "../App";
import SideBar from "./Partials/SideBar";
import SnippetDataContext, { LIST_SNIPPET, GET_SNIPPET_EDIT, LOADING, IN_EDIT, DELETE_SNIPPET, LOAD_TAGS } from "../store/reducer/SnippetContext";
import ModalDataContext, { SHOW_MODAL } from "../store/reducer/ModalContex";

import { Layout, Card, Col, Row, Spin, Alert } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { removeExtra } from "./_helpers/helper";
import Modal from "./Partials/Modal";

const { Content } = Layout;

export default function Home() {
  // const { state } = useContext(AuthContext);
  const { snippetState, snippetDispatch } = useContext(SnippetDataContext);
  const { modalDispatch } = useContext(ModalDataContext);

  let getSnippets = () => {
    snippetDispatch({
      type: LOADING
    });
    snippetDispatch({
      type: LIST_SNIPPET
    });
    snippetDispatch({
      type: LOAD_TAGS
    });
  }

  let openModal = (snippet) => {

    snippetDispatch({
      type: GET_SNIPPET_EDIT,
      payload: snippet
    });

    snippetDispatch({
      type: IN_EDIT,
      payload: true
    })

    modalDispatch({
      type: SHOW_MODAL
    });

  }

  let deleteSnippet = (snippet) => {
    snippetDispatch({
      type: DELETE_SNIPPET,
      payload: snippet
    })
  }

  useEffect(() => {
    getSnippets();
  }, []);

  // const { avatar_url, name, public_repos, followers, following } = state.user
  let { isLoading, snippets } = snippetState;
  return (
    <>
      <Layout>
        <SideBar />
        <Layout style={{ margin: "20px" }}>
          {isLoading ? <Spin /> :
            <Content>
              <Modal />
              <div className="site-card-wrapper">
                <Row gutter={16}>
                  {
                    !snippets.length ? <Col span={10} > <Alert message="No Snippet Found" type="info" /> </Col> : snippets.map((snippet, i) => {
                      return (
                        <Col span={6} key={i} style={{ marginBottom: "10px" }} >
                          <Card title={removeExtra(snippet.title, 15)} style={{ marginTop: "5px !important" }} bordered={false}
                            actions={[
                              <DeleteOutlined key="delete" onClick={() => deleteSnippet(snippet)} />,
                              <EditOutlined key="edit" onClick={() => openModal(snippet)} />,
                            ]}
                          >
                            {removeExtra(snippet.description, 30)}
                          </Card>
                        </Col>
                      );
                    })
                  }

                </Row>
              </div>
            </Content>
          }
        </Layout>
      </Layout>

    </>
  );
}
