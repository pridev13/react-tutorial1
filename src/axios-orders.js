import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://reactburger-6efcf.firebaseio.com/'
});

export default instance;