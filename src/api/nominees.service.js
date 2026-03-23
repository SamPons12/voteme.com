import { api } from "@/lib/axios-config"

export async function getNomineesBycategory(categoryId) {
  try {
    const res = await api.get(`nominees/category/${categoryId}`)
    return res.data.data
  } catch (err) {
    throw err.response.data
  }
}

export const getAllNominees = async () => {
  try {
    const response = await api.get('/nominees');
    return response.data.data;
  } catch (err) {
    throw err.response.data
  }
}

export const getNomineeById = async (nomineeId) => {
  try {
    const response = await api.get(`/nominees/${nomineeId}`);
    return response.data.data;
  } catch (err) {
    throw err.response.data
  }
}

export const createNominee = async (formData) => {
  try {
    const response = await api.post('/nominees', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data
  } catch (err) {
    throw err.response.data
  }
}

export const updateNominee = async (nomineeId, formData) => {
  try {
    const response = await api.put(`/nominees/${nomineeId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (err) {
    throw err.response.data
  }
}

export const deleteNominee = async (nomineeId) => {
  try {
    const response = await api.delete(`/nominees/${nomineeId}`);
    return response.data;
  } catch (err) {
    throw err.response.data
  }
}