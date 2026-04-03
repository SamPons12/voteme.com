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

export async function registerUser(email, password, token) {
  try {
    const res = await api.post('/auth/register', {
      email,
      password,
      token
    });
    return res.data;
  } catch (err) {
    throw err.response.data
  }
}

export async function verifyEmail(token) {
  try {
    const res = await api.get(`/auth/verify-email?token=${token}`);
    return res.data;
  } catch (err) {
    throw err.response.data
  }
}
