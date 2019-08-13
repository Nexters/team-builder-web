// 확인 후 다시 작업
import {ACTIONS, GETTERS, MUTATIONS} from '@/store/types';

const store = {
  namespaced: true,
  state: {
    tags: {
      id: 0,
      name: '최대다섯자',
      type: DEVELOPER,
    }
  },
  selected: [
    {
      id: 0
    }
  ]
},

