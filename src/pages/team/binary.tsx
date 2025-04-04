import MainLayout from "@/layouts/main";
import { NuqsAdapter } from "nuqs/adapters/next/pages";
import dynamic from "next/dynamic";
import { Spinner } from "@heroui/react";

const BinaryChart = dynamic(() => import("@/components/views/charts/BinaryChart"), {
  ssr: false,
  loading: () => <Spinner />,
});

const DirectMe = () => {
  return (
    <NuqsAdapter>
      <MainLayout>
        <div className="h-full">
          <BinaryChart />
        </div>
      </MainLayout>
    </NuqsAdapter>
  );
};

export default DirectMe;
