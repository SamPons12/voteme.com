import { api } from "@/lib/axios-config";

export async function saveVotes(votes) {
  try {
    const res = api.post('/votes/save', {
      votes,
    })
    return res;
  } catch (err) {
    throw err
  }
}