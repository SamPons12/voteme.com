import { api } from "@/lib/axios-config";

export async function getAllVotes() {
  try {
    const res = await api.get('/votes');
    return res.data.votes;
  } catch (err) {
    throw err.response;
  }
}

export async function getUserVotes() {
  try {
    const res = await api.get('/votes/mine');
    return res.data.votes;
  } catch (err) {
    throw err.response;
  }
}

export async function saveVotes(votes) {
  try {
    const res = api.post('/votes/save', {
      votes,
    })
    return res;
  } catch (err) {
    throw err.response
  }
}