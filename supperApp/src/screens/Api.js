import axios from "axios";

const API = axios.create({ baseURL: "https://supper-makan-apa-app.herokuapp.com"})

export default API;