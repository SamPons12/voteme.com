import axios from "axios"
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export async function loginUser(email, password) {
  try {
    const res = await instance.post('/auth/login', {
      email,
      password
    });
    return res.data;
  } catch (err) {
    throw err.response.data
  }
    
}

export async function registerUser(email, password) {
  try {
     const res = await instance.post('/auth/register', {
      email,
      password
    });
    return res.data;
  } catch (err) {
    throw err.response.data
  }
   
}