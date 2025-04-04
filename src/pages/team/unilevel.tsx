import MainLayout from "@/layouts/main";
import DirectChart2 from "@/components/views/charts/DirectChart";
import NoSSR from "@/components/NoSSR";

const DirectMe = () => {
  return (
    <MainLayout>
      <NoSSR>
        <DirectChart2 />
      </NoSSR>
    </MainLayout>
  );
};

export default DirectMe;
