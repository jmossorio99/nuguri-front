import axios from "axios";

const instance = axios.create({
    baseURL: "https://dry-eyrie-79068.herokuapp.com"
});

export default instance;
