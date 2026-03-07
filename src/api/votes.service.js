import axios from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export async function saveVotes(votes, userToken) {
  try {
    instance.defaults.headers.authorization = `Bearer ${userToken}`
    const res = instance.post('/votes/save', {
      votes,
    })
    return res;
  } catch (err) {
    throw err.response.data
  }
}