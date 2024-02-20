import axios from "axios";

const api = axios.create({
    baseURL: "https://demos.inbonis.com/api-coach-es-informa",
});

export default api;
