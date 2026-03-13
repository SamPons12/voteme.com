import { api } from "@/lib/axios-config";

export async function loginUser(email, password) {
  try { 
    const res = await api.post('/auth/login', {
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
     const res = await api.post('/auth/register', {
      email,
      password
    });
    return res.data;
  } catch (err) {
    throw err.response.data
  }
   
}