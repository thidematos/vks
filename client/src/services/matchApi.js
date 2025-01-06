import axios from "axios";
import { format } from "date-fns";

export async function createMatchApi({ stringJson, stringJsonl }) {
  const res = await axios.post("/api/v1/match", {
    match: {
      stringJson,
      stringJsonl,
    },
  });

  return res.data.data;
}

export async function getMatchsApi() {
  const res = await axios.get(`/api/v1/match`);

  return res.data.data.match;
}
