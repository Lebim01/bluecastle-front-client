import MainLayout from "@/layouts/main";
import dynamic from "next/dynamic";

const DetailTicket = dynamic(() => import("@/components/views/support/chat"), {
  ssr: false,
});

const ChatId = () => {
  return (
    <MainLayout>
      <DetailTicket />
    </MainLayout>
  );
};

export default ChatId;
