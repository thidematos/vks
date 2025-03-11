import Title from "../../ui/Title";

function OverviewLogo() {
  return (
    <div className="flex h-[50%] flex-row items-center justify-center gap-4">
      <img src="/helmet-logo.png" className="h-full" />
      <div className="pt-2">
        <Title>Overview</Title>
      </div>
    </div>
  );
}

export default OverviewLogo;
