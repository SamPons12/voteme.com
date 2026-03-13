import { api } from "@/lib/axios-config"

export async function getNomineesBycategory(categoryId) {
  try {
    const res = await api.get(`nominees/${categoryId}`)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}