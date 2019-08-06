import {GETTERS, MUTATIONS, ACTIONS} from "../types";

const store = {
  namespaced: true,
  state: {
    id: 1,
    //content: "",
    //file: "",
    selected : true,
    type: 'IDEA',
    orderNumber: 1,
    favorite: true,
    title: "title",
    tags: [
      {
        id: 1,
        name: "서버 개발자",
        type: 'DEVELOPER'
      }
    ],
    author: {
      name: "origin",
      nextersNumber : 13,
      position: "개발자"
    },
    createdAt: "2019-01-01 11:11:11",
    updatedAt: "2019-01-01 11:11:11",
    searchTerm: "",
    searchList: [

    ],
    ideaList: {
      type: Array,
      default: function () {
        return [];
      }
    },


  },

  getters: {

  },

  mutations: {
    // [MUTATIONS.]
  },

  actions: {

  }


}