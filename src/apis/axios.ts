import axios from 'axios';
export default axios.create({
    baseURL: "https://wordmemorizer-ca304-default-rtdb.asia-southeast1.firebasedatabase.app/"
})