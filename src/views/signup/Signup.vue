<template>
  <div>
    <h1>Signup Form</h1>
    <form @submit.prevent="signup" id="sign-up-form">
      <b-form-group label="Enter your user id">
        <b-form-input type="text" v-model="uid"></b-form-input>
      </b-form-group>
      <b-form-group label="Enter your password">
        <b-form-input v-validate="'required|min:6|max:14'" type="password" v-model="password" name="password" placeholder="Password" ref="password"></b-form-input>
      </b-form-group>
      <b-form-group label="Enter your password again">
        <b-form-input v-validate="'required|confirmed:password'" type="password" v-model="confirmPassword" name="password_confirmation" placeholder="Password, Again" data-vv-as="password"></b-form-input>
      </b-form-group>
      <b-form-group label="Enter your position">
        <b-select v-model="position" :options="positionOptions"></b-select>
      </b-form-group>
      <b-form-group label="Enter your role">
        <b-select v-model="role" :options="roleOptions"></b-select>
      </b-form-group>
      <div class="alert alert-danger" v-show="errors.any()">
        <div v-if="errors.has('password')">
          {{ errors.first('password') }}
        </div>
        <div v-if="errors.has('password_confirmation')">
          {{ errors.first('password_confirmation') }}
        </div>
      </div>
      <b-button size="lg" variant="success" type="submit" :disabled='isDisabled'>Signup</b-button>
    </form>
  </div>
</template>

<script>
import SignUpAPI from '../../service/SignUpAPI'

export default {
  name: 'Signup',
  data () {
    return {
      uid: '',
      password: '',
      confirmPassword: '',
      role: '',
      position: '',
      positionOptions: [
        {text: '개발자', value: 'developer'},
        {text: '기획자', value: 'director'},
        {text: '디자이너', value: 'designer'}
      ],
      roleOptions: [
        {text: '일반', value: 'member'},
        {text: '관리자', value: 'admin'}
      ],
      duringLogin: false
    }
  },
  methods: {
    signup () {
      const uid = this.uid;
      const password = this.password;
      const position = this.position;
      const role = this.role;

      if (!uid || !password || !position || !role || this.errors.any()) {
        return false
      }

      SignUpAPI.signup(uid, password, position, role)
        .then(res => this.goToPages(res.data))
        .catch(err => {
          alert('Signup fail!', err);
          this.duringLogin = false
        });
      this.duringLogin = true;
      console.log('waiting')
    },
    goToPages (data) {
      this.$store.commit('setId', data.id);
      this.$store.commit('setAuth', true);
      this.$store.commit('setKey', 'temp_key');
      this.$router.push({
        name: 'Login'
      })
    }
  },
  computed: {
    isDisabled () {
      return this.duringLogin
    }
  }
}
</script>

<style scoped>
  #sign-up-form {
    padding: 0 500px;
    margin-bottom: 100px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
