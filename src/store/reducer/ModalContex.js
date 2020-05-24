import { createContext } from "react";

export const TOGGLE_MOODAL = "TOGGLE_MOODAL";
export const HIDE_MODAL = "HIDE_MODAL";
export const SHOW_MODAL = "SHOW_MODAL";

export const modalInitialState = { visible: false };

const ModalDataContext = createContext(modalInitialState);

const setToggle = (state, data) => {
    const newState = { ...state, visible: data ? data : !state.visible };
    return newState;
}

const hideModal = (state) => {
    const newState = { ...state, visible: false };
    return newState;
}

const showModal = (state) => {
    const newState = { ...state, visible: true };
    return newState;
}

export const ModalReducer = (state, action) => {
    switch (action.type) {
        case TOGGLE_MOODAL:
            return setToggle(state, action.payload);
        case HIDE_MODAL:
            return hideModal(state);
        case SHOW_MODAL:
            return showModal(state);
        default:
            return state;
    }
};


export default ModalDataContext;