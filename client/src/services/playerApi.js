import axios from "axios";

export async function getPlayersAPI() {
  const res = await axios.get("/api/v1/players");

  return res.data.data.players;
}
