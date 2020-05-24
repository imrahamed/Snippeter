import React, { useContext } from "react";
import { Layout, Menu } from 'antd';
import NavDataContext from "../../store/reducer/NavContext";
import ModalDataContext, { SHOW_MODAL } from "../../store/reducer/ModalContex";
import SnippetDataContext, { IN_EDIT, CLEAR_STATE, GET_SNIPPET_EDIT } from "../../store/reducer/SnippetContext";
import { AuthContext } from "../../App";
import { UPDATE_NAV } from "../../store/reducer/NavContext";
import { Link } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';



const { Header } = Layout;

export default function NavBar() {
    const { state, dispatch } = useContext(AuthContext);
    const { navState, navDispatch } = useContext(NavDataContext);
    const {  modalDispatch } = useContext(ModalDataContext);
    const {  snippetDispatch } = useContext(SnippetDataContext);

    let navClick = (item) => {
        navDispatch({
            type: UPDATE_NAV,
            payload: item
        });
    }

    let removeEdit = () => {
        snippetDispatch({
            type: IN_EDIT,
            payload: false
        });
    }

    let openModal = () => {
        modalDispatch({
            type: SHOW_MODAL
        })
    }

    let logOut = () => {
        dispatch({
            type: "LOGOUT"
        });
        snippetDispatch({
            type: CLEAR_STATE
        });
    }

    
    let loadFormData = () => {
        snippetDispatch({
            type: GET_SNIPPET_EDIT
        });
    }

    let { selectedMenu } = navState;
    let { isLoggedIn } = state;
    let menuItems = [
        {
            name: "home",
            title: "Home",
            right: false,
            auth: true,
            path: "/",
            id: 1,
            click: (id) => {
                navClick(id);
            }
        },
        {
            name: "logout",
            title: "Logout",
            right: true,
            auth: true,
            path: null,
            id: 3,
            click: (id) => {
                navClick(id);
                logOut();
            }
        },
        {
            name: "add",
            title: <PlusOutlined />,
            right: true,
            auth: true,
            path: null,
            id: 2,
            click: (id) => {
                navClick(id);
                removeEdit();
                loadFormData();
                openModal();
            }
        },
        {
            name: "login",
            title: "Login",
            right: true,
            auth: false,
            path: "/login",
            id: 4,
            click: (id) => {
                navClick(id);
            }
        }
    ];

    let genrateMenu = () => {
        let itemsMenu = isLoggedIn ? menuItems.filter(item => item.auth) : menuItems.filter(item => !item.auth)
        return itemsMenu.map(item => {
            if (isLoggedIn && !item.auth) {
                return null;
            }
            return (
                <Menu.Item key={item.id} onClick={() => item.click(item.id)} style={{ float: item.right ? 'right' : 'left' }} >
                    {item.path ? <Link to={item.path}>{item.title}</Link> : item.title}
                </Menu.Item>
            )
        });
    }

    return (
        <Header>
            <div className="logo" />
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={[JSON.stringify(selectedMenu)]} >
                {/* <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item style={{ float: "right" }} key="2">Add</Menu.Item>
                <Menu.Item style={{ float: "right" }} key="3">Logout</Menu.Item> */}
                {genrateMenu()}
            </Menu>
        </Header>
    )
}


