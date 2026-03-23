import { api } from "@/lib/axios-config";

export async function getAllCategories() {
  try {
    const res = await api.get('/categories/');
    return res.data.data;
  } catch (err) {
    throw err.response.data
  }
}

export const createCategory = async (payload) => {
  try {
    const response = await api.post('/categories', payload);
    return response.data
  } catch (err) {
    throw err.response.data
  }
}

export const deleteCategory = async (categoryId) => {
  try {
    const response = await api.delete(`/categories/${categoryId}`);
    return response.data;
  } catch (err) {
    throw err.response.data
  }
}

export const updateCategory = async (categoryId, payload) => {
  try {
    const response = await api.put(`/categories/${categoryId}`, payload);
    return response.data;
  } catch (err) {
    throw err.response.data
  }
}