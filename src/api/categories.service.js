import axios from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export async function getAllCategories() {
  try {
    const res = await instance.get('/categories/');
    return res.data;
  } catch (err) {
    throw err.response.data
  }
}