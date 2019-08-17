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
                    title: 'asd아이디어 제목',
                    content: '아이디어 내용',
                    file: '',
                    selected: false,
                    type: 'IDEA',
                    orderNumber: 1,
                    favorite: true,
                    tags : [
                        {
                            id: 1,
                            name: '서버개발자',
                            type: 'DEVELOPER'
                        },
                        {
                            id: 2,
                            name: 'GUI디자인',
                            type: 'DESIGNER'
                        },
                        {
                            id: 3,
                            name: '서버개발자',
                            type: 'DEVELOPER'
                        },
                        {
                            id: 4,
                            name: '서버개발자',
                            type: 'DEVELOPER'
                        },
                        {
                            id: 5,
                            name: '서버개발자',
                            type: 'DEVELOPER'
                        },
                        {
                            id: 6,
                            name: '서버개발자',
                            type: 'DEVELOPER'
                        }
                    ],
                    author: {
                        name: '이관호',
                        nextersNumber: 0,
                        position: '개발자'
                    },
                    createdAt:'2019-01-01 11:11:11',
                    updatedAt:''
                },
              {
                id:2,
                title: 'xcv아이디어 제목2',
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
                    type: 'DEVELOPER'
                  }
                ],
                author: {
                  name: '허지인',
                  nextersNumber: 0,
                  position: '디자이너'
                },
                createdAt:'2019-02-02 11:11:11',
                updatedAt:''
              },
              {
                id:3,
                title: 'okh아이디어 제목3',
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
                    type: 'DEVELOPER'
                  }
                ],
                author: {
                  name: '최인혁',
                  nextersNumber: 0,
                  position: '개발자'
                },
                createdAt:'2019-03-03 11:11:11',
                updatedAt:''
              }
            ]
        }
    }
}