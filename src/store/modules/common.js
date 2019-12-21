const store = {
    namespaced: true,
    state: {
        showAlert: false,
        alertMessage: '',

        showConfirm: false,
        confirmMessage: '',
        confirmYesButtonText: '',
        confirmNoButtonText: '',
        confirmYesFunction: null,
        confirmNoFunction: null,

        nowScrollTop: 0,
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

        showConfirm: (state, {confirmMessage, confirmYesButtonText, confirmNoButtonText, confirmYesFunction, confirmNoFunction}) => {
            state.showConfirm = true;
            state.confirmMessage = confirmMessage;
            state.confirmYesButtonText = confirmYesButtonText;
            state.confirmNoButtonText = confirmNoButtonText;
            state.confirmYesFunction = confirmYesFunction;
            state.confirmNoFunction = confirmNoFunction;
        },

        closeConfirm: (state) => {
            state.showConfirm = false;
            state.confirmMessage = '';
            state.confirmYesButtonText = '';
            state.confirmNoButtonText = '';
            state.confirmYesFunction = null;
            state.confirmNoFunction = null;
        },

        setNowScrollTop: (state) => {
            state.nowScrollTop = window.scrollY;
        }
    }
};

export default store;
