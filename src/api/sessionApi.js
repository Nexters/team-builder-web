import api from './index';

export function getSession() {
    // return api.get('session'); TODO: 실제 API 호출
    return new Promise((resolve, reject) => setTimeout(() => resolve(getMockData()), 100));
}

//TODO: MockData 설정
function getMockData() {
    return {
        session: {
            id: 1,
            session: 15,
            period: '',
            headerImageUrl: 'url',
            tags:[
                {
                    id: 1,
                    name: '서버개발자',
                    type: ''
                }
            ],
            ideas:[
                {
                    id:1,
                    title: '아이디어 제목',
                    content: '아이디어 내용',
                    file: '',
                    selected: false,
                    type: 'IDEA',
                    orderNumber: 1,
                    favorite: false,
                    tags : [
                        {
                            id: 1,
                            name: '서버개발자',
                            type: ''
                        }
                    ],
                    author: {
                        name: '',
                        nextersNumber: 0,
                        position: ''
                    },
                    createdAt:'',
                    updatedAt:''
                },
              {
                id:2,
                title: '아이디어 제목2',
                content: '아이디어 내용2',
                file: '',
                selected: false,
                type: 'IDEA',
                orderNumber: 2,
                favorite: false,
                tags : [
                  {
                    id: 1,
                    name: '서버개발자',
                    type: ''
                  }
                ],
                author: {
                  name: '',
                  nextersNumber: 0,
                  position: ''
                },
                createdAt:'',
                updatedAt:''
              },
              {
                id:3,
                title: '아이디어 제목3',
                content: '아이디어 내용3',
                file: '',
                selected: false,
                type: 'IDEA',
                orderNumber: 3,
                favorite: false,
                tags : [
                  {
                    id: 1,
                    name: '서버개발자',
                    type: ''
                  }
                ],
                author: {
                  name: '최인혁',
                  nextersNumber: 0,
                  position: '개발자'
                },
                createdAt:'2019-01-01 11:11:11',
                updatedAt:''
              }
            ]
        }
    }
}