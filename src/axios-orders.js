import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-burger-builder-b5025-default-rtdb.firebaseio.com/'
});

export default instance;