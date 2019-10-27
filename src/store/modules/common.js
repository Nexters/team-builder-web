const store = {
    namespaced: true,
    state: {
        showAlert: false,
        alertMessage: '',

        showConfirm: false,
        confirmMessage: '',
        confirmYesFunction: null,
        confirmNoFunction: null
    },

    mutations: {
        showAlert: (state, {alertMessage}) => {
            state.showAlert = true;
            state.alertMessage = alertMessage;
        },

        closeAlert: (state) => {
            state.showAlert = false;
            state.alertMessage = '';
        },

        showConfirm: (state, {confirmMessage, confirmYesFunction, confirmNoFunction}) => {
            state.showComfirm = true;
            state.confirmMessage = confirmMessage;
            state.confirmYesFunction = confirmYesFunction;
            state.confirmNoFunction = confirmNoFunction;
        },

        closeConfirm: (state) => {
            state.showComfirm = false;
            state.confirmMessage = '';
            state.confirmYesFunction = null;
            state.confirmNoFunction = null;
        }

    }
};

export default store;
