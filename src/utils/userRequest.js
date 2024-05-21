import axios from "axios";
const userurl = import.meta.env.VITE_USER_BASE_URL
const userRequest = axios.create({
    baseURL : userurl
})

export default userRequest