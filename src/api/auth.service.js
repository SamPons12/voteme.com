import axios from "axios"
const instance = axios.create({
  baseURL: import.meta.env.API_URL,
  timeout: 2000,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

export async function loginUser(email, password) {
  try {
    const data = await instance.post('/login', {
      email,
      password
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function registerUser(email, password) {
  try {
    const res = await instance.post('/register', {
      email,
      password
    });
    return res;
  } catch (error) {
    console.log(error)
  }
}