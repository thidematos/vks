function Title({ children, variation = "main" }) {
  const variations = {
    main: "text-4xl text-purple-700",
    secondary: "text-2xl text-purple-800",
    tertiary: "text-lg text-purple-900",
  };

  return <h1 className={`font-vks ${variations[variation]} `}>{children}</h1>;
}

export default Title;
