import axios from "axios";
import { jwtDecode } from "jwt-decode";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (err) {
    console.log(err)
    return true
  }

}

export const hasUserVoted = async (token) => {
  try {
    instance.defaults.headers.authorization = `Bearer ${token}`
    const response = await instance.post('/votes/me')
    const data = await response.data;

    if (!data.userVoted) {
      return false
    }

    return true;
  } catch (err) {
    throw err.response
  }
}