import { api } from "@/lib/axios-config";

export async function getAllCategories() {
  try {
    const res = await api.get('/categories/');
    return res.data;
  } catch (err) {
    throw err.response.data
  }
}