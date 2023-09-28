import { createStore } from "vuex";

export default createStore({
    state: {
        modals: [],
        columns: [],
    },
    getters: {
        modals: (state) => state.modals,
        columns: (state) => state.columns,
    },
    mutations: {
        SET_MODAL: (state, response) => {
            state.modals.push(response);
        },
        DELETE_MODAL: (state, response) => {
            state.modals.splice(response, 1);
        },
        SET_COLUMN: (state, response) => {
            state.columns.push(response);
        },
    },
    actions: {
        modalAdd: ({ commit }, modalData) => {
            commit("SET_MODAL", modalData);
        },
        modalClose: ({ commit, state }, modalKey = state.modals.length - 1) => {
            commit("DELETE_MODAL", modalKey);
        },
        columnAdd: ({ commit }, columnData) => {
            commit("SET_COLUMN", columnData);
        },
    },
});
