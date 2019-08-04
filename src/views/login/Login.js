import {login} from "../../api/LoginAPI"

export default {
    name: 'Login',
    data() {
        return {
            uid: '',
            password: '',
            duringLogin: false,
            fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
            url: '@/assets/logo.png'
        }
    },
    methods: {
        onSubmit() {
            const uid = this.uid;
            const password = this.password;

            if (!uid || !password) {
                return false
            }

            login(uid, password)
                .then(res => {
                    this.goToPages(res.data)
                })
                .catch(err => {
                    alert('Login fail!', err);
                    this.duringLogin = false
                });

            this.duringLogin = true;
            console.log('waiting')
        },
        goToPages(data) {
            this.$store.commit('setId', data.id);
            this.$store.commit('setAuth', true);
            this.$store.commit('setToken', data.key);
            this.$router.push({
                path: '/'
            })
        }
    },
    computed: {
        isDisabled() {
            return this.duringLogin
        }
    }
}
