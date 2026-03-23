import { api } from "@/lib/axios-config"

export const getAllEditions = async () => {
  try {
    const response = await api.get('/editions');
    return response.data.data;
  } catch (err) {
    throw err.response.data
  }
}

export const getActiveEditionCategories = async () => {
  try {
    const response = await api.get('/editions/active/categories');
    return response.data.data;
  } catch (err) {
    throw err.response.data
  }
}

export const createEdition = async (payload) => {
  try {
    const response = await api.post('/editions', payload);
    return response.data
  } catch (err) {
    throw err.response.data
  }
}

export const deleteEdition = async (editionId) => {
  try {
    const response = await api.delete(`/editions/${editionId}`);
    return response.data;
  } catch (err) {
    throw err.response.data
  }
}

export const updateEdition = async (editionId, payload) => {
  try {
    const response = await api.put(`/editions/${editionId}`, payload);
    return response.data;
  } catch (err) {
    throw err.response.data
  }
}

// Edition Categories
export const getEditionCategories = async (editionId) => {
  try {
    const response = await api.get(`/editions/${editionId}/categories`);
    return response.data.data;
  } catch (err) {
    throw err.response.data
  }
}

// Edition Category Nominees
export const getEditionCategoryNominees = async (editionCategoryId) => {
  try {
    const response = await api.get(`/editions/${editionCategoryId}/nominees`);
    return response.data.data;
  } catch (err) {
    throw err.response.data
  }
}

export const getAvailableNominees = async (editionCategoryId) => {
  try {
    const response = await api.get(`/editions/${editionCategoryId}/available-nominees`);
    return response.data.data;
  } catch (err) {
    throw err.response.data
  }
}

export const addNomineeToEditionCategory = async (editionCategoryId, nomineeId) => {
  try {
    const response = await api.post(`/editions/${editionCategoryId}/nominees`, { nomineeId });
    return response.data;
  } catch (err) {
    throw err.response.data
  }
}

export const removeNomineeFromEditionCategory = async (id) => {
  try {
    const response = await api.delete(`/editions/${id}/nominee`);
    return response.data;
  } catch (err) {
    throw err.response.data
  }
}

// Edition Categories Management
export const getAvailableCategoriesForEdition = async (editionId) => {
  try {
    const response = await api.get(`/editions/${editionId}/available-categories`);
    return response.data.data;
  } catch (err) {
    throw err.response.data
  }
}

export const addCategoryToEdition = async (editionId, categoryId) => {
  try {
    const response = await api.post(`/editions/${editionId}/categories/${categoryId}`);
    return response.data;
  } catch (err) {
    throw err.response.data
  }
}

export const removeCategoryFromEdition = async (editionId, categoryId) => {
  try {
    const response = await api.delete(`/editions/${editionId}/categories/${categoryId}`);
    return response.data;
  } catch (err) {
    throw err.response.data
  }
}
