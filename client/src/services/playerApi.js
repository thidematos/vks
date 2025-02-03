import axios from "axios";

export async function getPlayersAPI() {
  const res = await axios.get("/api/v1/players");

  return res.data.data.players;
}

export async function postPlayersLanesAPI(lanes) {
  const res = await axios.post("/api/v1/players/define-lanes", {
    lanes: lanes,
  });

  return res.data.data.players;
}
