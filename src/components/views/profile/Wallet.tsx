import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Form, Input, Button, Spacer } from "@heroui/react";
import { useTranslation } from "react-i18next";

interface WalletValues {
  wallet_usdt: string;
  code: string;
}

interface WalletErrors {
  [key: string]: string;
}

const Billing = () => {
  const i18n = useTranslation()
  const [values, setValues] = useState<WalletValues>({
    wallet_usdt: "",
    code: "",
  });
  const [errors, setErrors] = useState<WalletErrors>({});
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isValidCode, setIsValidCode] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const validate = (): boolean => {
    const newErrors: WalletErrors = {};
    if (!values.wallet_usdt) {
      newErrors.wallet_usdt = i18n.t('errors.wallet_address_required');
    }
    // } else if (!validateWallet(values.wallet_usdt)) {
    //   newErrors.wallet_usdt = "La dirección de la wallet no es válida";
    // }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Limpiar error al escribir
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate() && isValidCode) {
      console.log("Información de la wallet enviada:", values);
      // Aquí puedes agregar la lógica para actualizar la wallet
    }
  };

  const handleCodeVerification = () => {
    // Aquí puedes agregar la lógica para verificar el código
    if (values.code === "123456") { // Ejemplo de verificación
      setIsValidCode(true);
      setIsAuthenticating(false);
      console.log("Código válido");
    } else {
      setErrors((prev) => ({ ...prev, code: i18n.t('errors.incorrect_verification_code') }));
    }
  };

  const requestVerificationCode = () => {
    setIsUnlocking(true);
    console.log("Solicitud de código de verificación enviada");
    setTimeout(() => {
      setIsAuthenticating(true);
      setIsUnlocking(false);
    }, 2000); // Simulación de tiempo de espera para el código
  };

  return (
    <div className="border border-1 p-4 relative rounded-lg border-[#3f3f3f]">
      <Form onSubmit={handleSubmit}>
        <Input
          className="max-w-xs"
          label={i18n.t('profile_view.wallet_address')}
          name="wallet_usdt"
          value={values.wallet_usdt}
          onChange={handleChange}
          errorMessage={errors.wallet_usdt}
          isInvalid={!!errors.wallet_usdt}
          variant="bordered"
        />
        <Spacer y={1} />
        {isAuthenticating && (
          <>
            <Input
              className="max-w-xs"
              type="text"
              label={i18n.t('profile_view.verification_code')}
              name="code"
              value={values.code}
              onChange={handleChange}
              errorMessage={errors.code}
              isInvalid={!!errors.code}
              variant="bordered"
            />
            <Spacer y={1} />
            <Button type="button" color="primary" onClick={handleCodeVerification}>
              {i18n.t('profile_view.confirm_code')}
            </Button>
          </>
        )}
        <Spacer y={1} />
        <Button
          type="button"
          color="primary"
          disabled={isUnlocking || isAuthenticating}
          onClick={requestVerificationCode}
        >
          {i18n.t('profile_view.request_verification_code')}
        </Button>
        <Spacer y={1} />
        <Button type="submit" color="primary" disabled={!isValidCode}>
          {i18n.t('profile_view.save_information')}
        </Button>
      </Form>
    </div>
  );
};

export default Billing;
