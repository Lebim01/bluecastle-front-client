import Faq from "@/components/views/support/Faq";
import MainLayout from "@/layouts/main";
import { Button, Modal, ModalContent } from "@heroui/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const FormTopic = dynamic(() => import("@/components/views/support/newform"), {
  ssr: false,
});

const TicketsList = dynamic(() => import("@/components/views/support/list"), {
  ssr: false,
});

const SupportView = () => {
  const [isOpen, setOpen] = useState(false);
const i18n = useTranslation()
  return (
    <MainLayout>
      <Button onPress={() => setOpen(true)}>{i18n.t('faq.open_new_ticket')}</Button>
      <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
        <ModalContent className="pt-8">
          <FormTopic onClose={() => {}} />
        </ModalContent>
      </Modal>

      <div className="card mt-8">
        <TicketsList />
      </div>
      <div className="mt-8">
        <Faq />
      </div>
    </MainLayout>
  );
};

export default SupportView;
