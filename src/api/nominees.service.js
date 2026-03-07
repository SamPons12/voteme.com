import axios from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export async function getNomineesBycategory(categoryId) {
  try {
    const res = await instance.get(`nominees/${categoryId}`)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}