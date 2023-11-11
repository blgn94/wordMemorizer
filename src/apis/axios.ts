import axios from 'axios';
export default axios.create({
    baseURL: 'https://wordmemorizer-5bbc2-default-rtdb.asia-southeast1.firebasedatabase.app/'
})