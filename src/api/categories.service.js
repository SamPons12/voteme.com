import { api } from "@/lib/axios-config";

export async function getAllCategories() {
  try {
    const res = await api.get('/categories/');
    return res.data;
  } catch (err) {
    throw err.response.data
  }
}

export const createCategory = async (payload) => {
  try {
    const response = await api.post('/categories', payload);
    const result = await response.data;
    return result
  } catch (err) {
    throw err.response
  }
}

export const deleteCategory = async (categoryId) => {
  try {
    const response = await api.delete(`/categories/${categoryId}`);
    const result = await response.data;
    return result;
  } catch (err) {
    throw err.response
  }
}

export const updateCategory = async (categoryId, payload) => {
  try {
    const response = await api.put(`/categories/${categoryId}`, payload);
    const result = await response.data;
    return result;
  } catch (err) {
    throw err.response
  }
}