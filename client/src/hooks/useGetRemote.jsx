function useGetRemote() {
  const matchStr = localStorage.getItem("remote-data");

  const match = JSON.parse(matchStr);

  return match;
}

export { useGetRemote };
