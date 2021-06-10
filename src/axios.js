import axios from "axios";

// Base URL for the back-end deployment in Heroku
const instance = axios.create({
    baseURL: "https://dry-eyrie-79068.herokuapp.com"
});

export default instance;
