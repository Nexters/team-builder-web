import axios from 'axios'

export default {
  async signup (uid, password, position, role) {
    let params = new URLSearchParams();
    params.append('id', uid);
    params.append('password', password);
    params.append('position', position);
    params.append('role', role);

    return axios.get('https://my-json-server.typicode.com/leekwanho/fakedata/signup', params)
      .then(res => { return res })
      .catch(err => console.error(err))
  }
}
