import axios from "axios";
import { format } from "date-fns";

export async function createMatchApi(match) {
  const res = await axios.post("/api/v1/match", {
    match: match,
  });

  console.log(format(res.data.data.timestamp, "dd/MM/yyyy - HH:mm"));

  return res.data.data;
}

export async function getMatchsApi() {
  const res = await axios.get(`/api/v1/match`);

  return res.data.data.match;
}
