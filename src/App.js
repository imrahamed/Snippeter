import React, { createContext, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { initialState, reducer } from "./store/reducer";
import Protected from "./components/_helpers/Protected";
import { Layout } from 'antd';
import NavBar from "./components/Partials/NavBar";
import NavDataContext, { NavReducer, navInitialState } from "./store/reducer/NavContext";
import SnippetDataContext, { SnippetReducer, snippetInitialState } from "./store/reducer/SnippetContext";
import ModalDataContext, { ModalReducer, modalInitialState } from "./store/reducer/ModalContex";

const { Footer } = Layout;

export const AuthContext = createContext();


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(process.env);

  const [navState, navDispatch] = useReducer(NavReducer, navInitialState);
  const [snippetState, snippetDispatch] = useReducer(SnippetReducer, snippetInitialState);
  const [modalState, modalDispatch] = useReducer(ModalReducer, modalInitialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <ModalDataContext.Provider value={{ modalState, modalDispatch }}>
        <NavDataContext.Provider value={{ navState, navDispatch }}>
          <SnippetDataContext.Provider value={{ snippetState, snippetDispatch }}>
            <Layout className="layout" >
              <Router>
                <NavBar />
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Protected exact path="/" component={Home} />
                </Switch>
              </Router>
              <Footer style={{ textAlign: 'center' }}>Snippeter © 2020</Footer>
            </Layout>
          </SnippetDataContext.Provider>
        </NavDataContext.Provider>
      </ModalDataContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;