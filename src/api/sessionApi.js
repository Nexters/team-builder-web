import api from './index';
import {TAG_TYPE} from "@/consts/TagType";

export function getSession({sessionNumber}) {

    //TODO: 공통으로 헤더 설정해주거나 state에서 가져와야함
    const token = 'eyJhbGciOiJIUzI1NiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAE3OTQvCMAyA4f-Ss4VlH93HTXS3oaLOgyLSrhkU3DraDgTxv9t58pY8vIG8QTsHFZjOm4lsDyvQwkOFGedRVkRJsoJ51iokPFGpQJJM5qRYKhFZoXjHBPaZLHlBcU7L-dJ6cj7Moxjob6OXJ-t28yDJBi7LgNY8l-S4b-pHe6qPgSbjtNdmDLytL3WzP_y4syQ8qXX4DuIISxYVDPMzplWKVYbXW3ve3OHzBToSYkjSAAAA.yWB7l1WJ0Wmdz3c2qGNhJFIE92cmaRqVhkipk49GMYU'
    Object.assign(api.defaults, {headers: {authorization: token}});

    return api.get(`apis/sessions/${sessionNumber}`);
    // return new Promise((resolve, reject) => setTimeout(() => resolve(getMockData()), 100));
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
                {id: 1, name: '최대다섯자', type: TAG_TYPE.DISABLED},
                {id: 2, name: '최대다섯자', type: TAG_TYPE.DISABLED},
                {id: 3, name: '최대다섯자', type: TAG_TYPE.DISABLED},
                {id: 4, name: '최대다섯자', type: TAG_TYPE.DISABLED},
                {id: 5, name: '디자이너용', type: TAG_TYPE.DESIGNER},
                {id: 6, name: 'GUI', type: TAG_TYPE.DESIGNER},
                {id: 7, name: 'UX', type: TAG_TYPE.DESIGNER},
                {id: 8, name: '개발자전용', type: TAG_TYPE.DEVELOPER},
                {id: 9, name: '서버개발자', type: TAG_TYPE.DEVELOPER},
                {id: 10, name: '웹개발자', type: TAG_TYPE.DEVELOPER},
                {id: 11, name: 'iOS', type: TAG_TYPE.DEVELOPER},
                {id: 12, name: 'Android', type: TAG_TYPE.DEVELOPER},
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