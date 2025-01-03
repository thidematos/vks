function Card({ children }) {
  return (
    <div className="font-montserrat 0 rounded border border-violet-700 bg-slate-300 p-4 shadow-lg">
      {children}
    </div>
  );
}

export default Card;
