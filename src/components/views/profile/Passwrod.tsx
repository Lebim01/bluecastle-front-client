import { useState, ChangeEvent, FormEvent } from "react";
import { Form, Input, Button, Spacer, Card, CardBody, InputOtp } from "@heroui/react";
import { useTranslation } from "react-i18next";
import axiosInstance from "@/services";
import toast from "react-hot-toast";

interface PasswordValues {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
  code: string;
}

interface PasswordErrors {
  [key: string]: string;
}

const Password = () => {
  const i18n = useTranslation()
  const [values, setValues] = useState<PasswordValues>({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
    code: "",
  });

  const [errors, setErrors] = useState<PasswordErrors>({});
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isValidCode, setIsValidCode] = useState(false);
  const [loading, setLoading] = useState(false)
  const [activating, setActivating] = useState(false);
  const validate = (): boolean => {
    const newErrors: PasswordErrors = {};
    if (!values.password)
      newErrors.password = i18n.t('errors.current_password_required');
    if (!values.newPassword) {
      newErrors.newPassword = i18n.t('errors.new_password_required');
    } else if (values.newPassword.length < 8) {
      newErrors.newPassword = i18n.t('errors.password_min_length');
    }
    if (values.newPassword !== values.confirmNewPassword) {
      newErrors.confirmNewPassword = i18n.t('errors.passwords_do_not_match');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault();
    try {
      if (validate()) {
        const change = await axiosInstance.post('users/change-password', {
          previous_password: values.password,
          new_password: values.newPassword
        })

      setLoading(false)
      toast.success("Contraseña actualizada con éxito")
      }
      
    } catch (error) {
      console.error("No se pudo actualizar la contraseña", error)
      setLoading(false)
      toast.error("No se pudo actualizar la contraseña")
    }
    
  };

  return (
    <div className="border border-1 p-4 relative rounded-lg border-[#3f3f3f]">
      <Form onSubmit={handleSubmit}>
        <Input
          className=""
          type="password"
          label={i18n.t('profile_view.actual_password')}
          name="password"
          value={values.password}
          onChange={handleChange}
          errorMessage={errors.password}
          isInvalid={!!errors.password}
          variant="bordered"
        />
        <Spacer y={1} />
        <Input
          className=""
          type="password"
          label={i18n.t('profile_view.new_password')}
          name="newPassword"
          value={values.newPassword}
          onChange={handleChange}
          errorMessage={errors.newPassword}
          isInvalid={!!errors.newPassword}
          variant="bordered"
        />
        <Spacer y={1} />
        <Input
          className=""
          type="password"
          label={i18n.t('profile_view.confirm_new_password')}
          name="confirmNewPassword"
          value={values.confirmNewPassword}
          onChange={handleChange}
          errorMessage={errors.confirmNewPassword}
          isInvalid={!!errors.confirmNewPassword}
          variant="bordered"
        />
        <Spacer y={1} />
       
        <Spacer y={1} />
        <Button type="submit" color="primary" disabled={loading} isLoading={loading}>
        {i18n.t('profile_view.update_password')}
        </Button>
      </Form>
    </div>
  );
};

export default Password;
