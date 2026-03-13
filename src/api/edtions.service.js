import { api } from "@/lib/axios-config"

export const getAllEditions = async () => {
  try {
    const response = await api.get('/editions');
    const editions = await response.data;
    return editions;
  } catch (err) {
    throw err
  }
}

export const getActiveEditionCategories = async () => {
  try {
    const response = await api.get('/editions/active/categories');
    const categories = await response.data;
    return categories;
  } catch (err) {
    throw err
  }
}

export const deleteEdition = async (editionId) => {
  try {
    
  } catch (err) {
    throw err
  }
}