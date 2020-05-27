
import React, { useContext, useEffect } from "react";
// import Styled from "styled-components";
// import { AuthContext } from "../App";
import SideBar from "./Partials/SideBar";
import SnippetDataContext, { LIST_SNIPPET, GET_SNIPPET_EDIT, LOADING, IN_EDIT, DELETE_SNIPPET, LOAD_TAGS, ERROR_LOADING } from "../store/reducer/SnippetContext";
import ModalDataContext, { SHOW_MODAL } from "../store/reducer/ModalContex";

import { Layout, Card, Col, Row, Spin, Alert } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { removeExtra } from "./_helpers/helper";
import Modal from "./Partials/Modal";
import { getAllSnippets, getTags, deleteSnippetsById } from "../services/Snippet";

const { Content } = Layout;

export default function Home() {
  // const { state } = useContext(AuthContext);
  const { snippetState, snippetDispatch } = useContext(SnippetDataContext);
  const { modalDispatch } = useContext(ModalDataContext);

  let getSnippets = async () => {
    snippetDispatch({
      type: LOADING
    });
    try {
      let snippets = await getAllSnippets();
      let tags = await getTags();
      snippetDispatch({
        type: LIST_SNIPPET,
        payload: snippets
      });
      snippetDispatch({
        type: LOAD_TAGS,
        payload: tags
      });
    } catch (err) {
      snippetDispatch({
        type: ERROR_LOADING
      })
    }
  }

  let openModal = async (snippet) => {

    try {
      let tags = await getTags();

      snippetDispatch({
        type: LOAD_TAGS,
        payload: tags
      });

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
    } catch (e) {
      console.log(e)
    }

  }

  let deleteSnippet = async (snippet) => {
    let deletedSnippet = await deleteSnippetsById(snippet._id);
    snippetDispatch({
      type: DELETE_SNIPPET,
      payload: deletedSnippet
    });
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
