import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-3ac9b-default-rtdb.firebaseio.com/'
});

export default instance;


'https://my-burger-react-3a887.firebaseio.com/'