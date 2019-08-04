import {signup} from "../../api/SignupAPI"
import {SET_ID, SET_AUTH, SET_TOKEN} from "../../consts/userType"

export default {
    name: 'Signup',
    data() {
        return {
            uid: '',
            password: '',
            confirmPassword: '',
            name: '',
            accessCode: '',
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
        onSubmit() {
            const uid = this.uid;
            const upassword = this.password;
            const uname = this.name;
            const uclass = this.classSelect;
            const ujob = this.jobSelect;
            const accessCode = this.accessCode;

            if (!uid || !upassword || !uname || !uclass || !ujob || !accessCode || this.errors.any()) {
                return false
            }

            signup(uid, upassword, uname, uclass, ujob, accessCode)
                .then(res => {
                    this.goToPages(res.data)
                })
                .catch(err => {
                    alert('Signup fail!', err);
                    this.duringLogin = false
                });

            this.duringLogin = true;
            console.log('waiting')
        },
        goToPages(data) {
            this.$store.commit(SET_ID, data.id);
            this.$store.commit(SET_AUTH, true);
            this.$store.commit(SET_TOKEN, 'temp_key');
            this.$router.push({
                name: 'Login'
            })
        },
        idDuplicateCheck() {
            alert("아이디 중복확인")
        }
    },
    computed: {
        isDisabled() {
            return this.duringLogin
        }
    }
}
