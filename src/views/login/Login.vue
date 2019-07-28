<template>
    <div class="Page2">
        <form @submit.prevent="onSubmit">
            <h1>로그인</h1>
            <label>
                <input placeholder="Enter your ID" v-model="uid">
            </label>
            <label>
                <input placeholder="Enter your password" v-model="password">
            </label>
            <button type="submit" :disabled='isDisabled'>로그인</button>
        </form>
    </div>
</template>

<script>
    import {login} from "../../api/LoginAPI"

    export default {
        name: 'Login',
        data() {
            return {
                uid: '',
                password: '',
                duringLogin: false
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
</script>

<style scoped>

</style>
