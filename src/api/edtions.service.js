import { api } from "@/lib/axios-config"

export const getAllEditions = async () => {
  try {
    const response = await api.get('/editions');
    const editions = await response.data;
    return editions;
  } catch (err) {
    throw err.response
  }
}

export const getActiveEditionCategories = async () => {
  try {
    const response = await api.get('/editions/active/categories');
    const categories = await response.data;
    return categories;
  } catch (err) {
    throw err.response
  }
}

export const createEdition = async (payload) => {
  try {
    const response = await api.post('/editions', payload);
    const result = await response.data;
    return result
  } catch (err) {
    throw err.response
  }
}

export const deleteEdition = async (editionId) => {
  try {
    const response = await api.delete(`/editions/${editionId}`);
    const result = await response.data;
    return result;
  } catch (err) {
    throw err.response
  }
}

export const updateEdition = async (editionId, payload) => {
  try {
    const response = await api.put(`/editions/${editionId}`, payload);
    const result = await response.data;
    return result;
  } catch (err) {
    throw err.response
  }
}