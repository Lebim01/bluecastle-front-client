import { useEffect, useState } from "react";
import useTimer from "@/hooks/useTimer";
import dayjs from "dayjs";
import { BsClock, BsWallet } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";
import useClipboard from "@/hooks/useClipboard";
import { currencyIcon } from "./ButtonSwapCurrency";

import classNames from "classnames";
import useAxios from "@/hooks/useAxios";
import { PaymentLink, User } from "@/types/User";
import { Memberships } from "@/constants";
import toast from "react-hot-toast";
import axiosInstance from "@/services";
import { Input } from "@heroui/react";
import ButtonDota from "@/components/utils/cards/ButtonDota";

const FormPay = ({
  type,
  createPaymentLink,
  loading,
  actualizar,
}: {
  type: Memberships;
  createPaymentLink: (type: Memberships) => void;
  loading: boolean;
  actualizar: () => void;
}) => {
  const { copy } = useClipboard();
  const [amount, setAmount] = useState(0);
  const [amountChanged, setAmountChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: user } = useAxios<User>({ url: "users/me", method: "get" });
  const { data: payment_link, refetch } = useAxios<PaymentLink>({
    url: "users/qr-membership",
    method: "get",
  });

  const convertToTimestamp = (date: any): Date | null => {
    if (!date) return null;
    if (typeof date === "string") return new Date(date);
    if (date.seconds) return new Date(date.seconds * 1000);
    return null;
  };
  useEffect(() => {
    refetch();
  }, [loading]);
  const address = payment_link && payment_link?.address;
  const amountcrypto = payment_link && payment_link?.amount;
  const expires_at = convertToTimestamp(payment_link?.expires_at);
  const qr = payment_link && payment_link && payment_link?.qrcode_url;

  const isExpired = expires_at ? dayjs(expires_at).isBefore(dayjs()) : false;

  const resetPayment = async () => {
    if (!user?.id) return;
    setIsLoading(true);
    try {
      const response = await axiosInstance.delete("users/qr-membership");
      setIsLoading(false);
      actualizar();
    } catch (error) {
      toast.error("No se pudo iniciar el pago");
      setIsLoading(false);
      console.error("no se pudo reiniciar el pago", error);
    }
  };

  /**
   * Calcular monto pendiente a pagar
   */
  // const calculatePenfindAmount = async () => {
  //   // Obtener el monto total
  //   const totalAmount = Number(payment_link?.amount)

  //   try {
  //     // Obtener el monto ya pagado
  //     const paidAmount = await getPaidAmount(
  //       user.id ? user.id : '',
  //       address ? address : ''
  //     )

  //     // Obtener el faltante
  //     const result: number = totalAmount - paidAmount

  //     // Redondearlo
  //     const decimals = 8
  //     const roundedNumber =
  //       Math.ceil(result * Math.pow(10, decimals)) / Math.pow(10, decimals)

  //     if (paidAmount > 0) setAmountChanged(true)
  //     setAmount(roundedNumber)
  //   } catch (e) {
  //     console.error('Error al calcular el monto pendiente: ', e)
  //     setAmount(totalAmount)
  //   }
  // }

  useEffect(() => {
    if (address && payment_link && payment_link) {
      setAmount(Number(payment_link?.amount) || 0);
    }
  }, [address, amountcrypto]);

  // Obtener tiempo que se ocupa
  const timer = useTimer(
    expires_at && !amountChanged ? expires_at.getTime() : undefined
  );

  if (!user) return;

  return (
    <>
      <div className="flex flex-1 flex-col space-y-2 items-center">
        <span>{user.email}</span>

        {isExpired && !amountChanged ? null : (
          <div>
            <img
              src={qr || "/img/noqr.webp"}
              className={classNames("h-[150px] w-[150px]")}
            />
          </div>
        )}

        {user && (
          <>
            <Input
              readOnly
              startContent={<BsWallet />}
              value={
                isExpired && !amountChanged ? "" : address || "Sin direccion"
              }
              className={classNames()}
              onClick={() => copy(address || "")}
              endContent={
                <button
                  className="bg-gray-600 p-2 rounded-lg hover:cursor-pointer hover:bg-gray-300"
                  onClick={() => copy(address!)}
                >
                  <FiCopy />
                </button>
              }
            />
            <Input readOnly value={"BEP20"} label="Red" />
          </>
        )}

        <div
          className={
            !(isExpired || amountChanged)
              ? "grid grid-cols-[30%_1fr] gap-x-4 w-full"
              : "grid gap-x-4 w-full"
          }
        >
          {!(isExpired || amountChanged) ? (
            <Input readOnly startContent={<BsClock />} value={timer} />
          ) : null}
          <Input
            readOnly
            startContent={currencyIcon["USDT"]}
            value={isExpired && !amountChanged ? "" : amount.toFixed(2)}
            endContent={
              <div className="flex items-center space-x-2">
                <span>{"USDT"}</span>{" "}
                <button
                  className="bg-gray-600 p-2 rounded-lg hover:cursor-pointer hover:bg-gray-300"
                  onClick={() => copy(amount.toFixed(2) || "")}
                >
                  <FiCopy />
                </button>
              </div>
            }
          />
        </div>

        <div className="w-full flex justify-end"></div>
      </div>
      {amountChanged ? (
        <div>
          <p className="text-red-400 font-bold text-center">
            Se detectó un pago
            <br />
            que no cubre la totalidad,
            <br />
            favor de pagar el resto.
          </p>
        </div>
      ) : null}
      {isExpired && !amountChanged ? (
        <div>
          <p className="text-red-400 font-bold text-center">
            QR de pago caducado.
          </p>
        </div>
      ) : null}
      {!amountChanged && (
        <ButtonDota
          disabled={loading || isLoading}
          onClick={resetPayment}
          classNames="!bg-red-500 text-white"
        >
          Cancelar
        </ButtonDota>
      )}
      <div>
        <p className="text-center">
          La membresia se activará automaticamente
          <br />
          despues de confirmar el pago.
        </p>
      </div>
      {isExpired && !amountChanged ? (
        <div className="flex justify-center w-full ">
          <ButtonDota
            loading={loading}
            disabled={!isExpired}
            onClick={() => createPaymentLink(type)}
            classNames="flex w-full text-lg items-center justify-center p-1 h-14 "
          >
            CALCULAR DE NUEVO
          </ButtonDota>
        </div>
      ) : null}
    </>
  );
};

export default FormPay;
