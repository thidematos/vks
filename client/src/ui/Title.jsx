function Title({ text, variation = "main" }) {
  const variations = {
    main: "text-5xl text-purple-900",
    secondary: "text-2xl text-purple-800",
    tertiary: "text-lg text-purple-700",
  };

  return (
    <h1 className={`font-vks ${variations[variation]} text-purple-800`}>
      {text}
    </h1>
  );
}

export default Title;
