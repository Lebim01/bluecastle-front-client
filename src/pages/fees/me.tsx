import ComissionsStats from "@/components/views/fees/ComissionsStats";
import ComissionsTable from "@/components/views/fees/ComissionsTable";
import MainLayout from "@/layouts/main";

const FeesMePage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <ComissionsStats />
        <ComissionsTable />
      </div>
    </MainLayout>
  );
};

export default FeesMePage;
