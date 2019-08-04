import {signup} from "../../api/SignupAPI"
import {SET_ID, SET_AUTH, SET_TOKEN} from "../../consts/userType"

export default {
    name: 'Info',
    data() {
        return {
            uid: '내아이디',
            curPassword: '',
            newPassword: '',
            confirmPassword: '',
            name: '내이름',
            duringLogin: false,
            classSelect: null,
            classOptions: [
                {value: '15기', text: '15기'},
                {value: '16기', text: '16기'}
            ],
            jobSelect: null,
            jobOptions: [
                {text: '개발자  ', value: 'develop'},
                {text: '디자이너', value: 'designer'}
            ]
        }
    },
    methods: {
        passwordChange() {
            alert("비밀번호 수정")
        },
        infoChange() {
            alert("내정보 수정")
        }
    },
    computed: {
        isDisabled() {
            return this.duringLogin
        }
    }
}
