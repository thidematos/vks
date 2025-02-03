import { useRemote } from "./../../context/RemoteProvider";

function New() {
  const { getRemoteState } = useRemote();

  const data = getRemoteState();

  if (data) console.log(JSON.parse(data));

  return <div></div>;
}

export default New;
