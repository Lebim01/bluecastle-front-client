import GenerateQR from "./GenerateQR";
import ConfirmMessage from "./ConfirmMessage";
import useAxios from "@/hooks/useAxios";
import { PaymentLink, User } from "@/types/User";
import { membershipRecord, Memberships } from "@/constants";
import { Spinner } from "@heroui/react";
import FormPay from "./FormPay";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ShowQR = ({
  type,
  loading,
  createPaymentLink,
  active
}: {
  type: Memberships;
  loading: boolean;
  createPaymentLink: (type: Memberships) => void;
  active: Memberships | null
}) => {
  // Se obtiene el usuario
  const i18n = useTranslation()
  const { data: user } = useAxios<User>({ url: "users/me", method: "get" });
  const { data: payment_link, refetch } = useAxios<PaymentLink>({
    url: "users/qr-membership",
    method: "get",
  });

  useEffect(() => {
    refetch()
    console.log("se ejecuto", loading)
  }, [loading])

  // Sí la fecha de expiración es el siguiente día
  if (!user) return "cargando...";
  const membershipObject = membershipRecord()
  if(active && membershipObject[type]?.order < membershipObject[active]?.order) {
    return(
      <div className="flex items-center justify-center">
      <span className="text-red-700">{i18n.t('purchases.membership.not_available')}</span>
    </div>
    )
  }

  if (active && active == type) return (
    <div className="flex items-center justify-center">
      <span className="text-center">{i18n.t('purchases.membership.availability')}</span>
    </div>
  )
  

  // Sí el pago sigue pendiente
  if (
    payment_link &&
    payment_link.status == "pending" &&
    payment_link.membership_type == type
  )
    return (
      <>
        <FormPay
          type={type}
          loading={loading}
          createPaymentLink={createPaymentLink}
          actualizar={refetch}
        />
      </>
    );

  // Sí el pago fue completado
  if (
    payment_link &&
    payment_link.status == "confirming" &&
    payment_link.membership_type == type
  )
    return <ConfirmMessage />;

  // Sí el pago se completo...
  // if (user.membership_status == 'paid') return null

  // Sí no se a creado la dirección de pago...
  if (!payment_link || !user || payment_link.membership_type != type)
    return (
      <>
        <GenerateQR
          type={type}
          loading={loading}
          createPaymentLink={createPaymentLink}
          refetch={refetch}
          active={active}
        />
      </>
    );

  return <Spinner />;
};

export default ShowQR;
