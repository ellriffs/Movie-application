import axios from "axios";
const auth = import.meta.env.VITE_ACCESS_TOKEN

 const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${auth}`
    }
  });

  export default instance
