import { Spinner } from "@heroui/react";

const LoadingScreen = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
};

export default LoadingScreen;
