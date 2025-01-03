import { useLoader } from "../context/LoaderProvider";

function Loader() {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  console.log("apareci");

  return (
    <div className="fixed flex h-screen w-screen flex-col items-center justify-center bg-slate-800/50">
      <img
        src="/biel-loader.png"
        className="animate-spin-slow h-[40%] drop-shadow-md"
      />
    </div>
  );
}

export default Loader;
