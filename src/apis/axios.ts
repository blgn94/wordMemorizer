import axios from 'axios';
export default axios.create({
    baseURL: process.env.FIREBASE_REALTIME_DATABASE_URL
})