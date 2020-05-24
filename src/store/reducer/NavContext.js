import { createContext } from "react";

export const UPDATE_NAV = "UPDATE_NAV";

export const navInitialState = { selectedMenu: 1 };

const NavDataContext = createContext(navInitialState);

const selectActiveNav = (state, data) => {
    const newState = { ...state, selectedMenu: data };
    return newState;
}

export const NavReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_NAV:
            return selectActiveNav(state, action.payload );
        default:
            return state;
    }
};


export default NavDataContext;