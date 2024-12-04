import axios from "axios"

const api = axios.create({
  baseURL: "https://foodapi-vxv3.onrender.com"
})

export default api
