import { Button, Form, Input } from "@heroui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (status == "authenticated") {
      router.push("/");
    }
    setLoading(false);
  }, [status]);

  const handleSubmitOTP = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setLoading(true);

    try {
      setEmail(data.email as string);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_API}/users/recover/otp`,
        {
          email: data.email,
        }
      );
      setShowOTP(true);
    } catch (err) {
      console.error(err);
      toast.error("Correo no existe");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_API}/users/recover/password`,
        {
          email: email,
          password: data.password,
          otp: data.otp,
        }
      );
      toast.success("Contraseña cambiada!");

      setTimeout(() => {
        router.replace("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Hubo un problema");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center min-h-screen">
      <div className="flex w-full max-w-sm flex-col gap-8 rounded-large px-16 pb-20 pt-16  border">
        <img src="/img/logo-inverse.png" alt="" />

        {showOTP ? (
          <Form
            className="flex flex-col gap-4"
            validationBehavior="native"
            onSubmit={handleSubmitPassword}
          >
            <Input
              key="otp"
              isRequired
              label="OTP"
              labelPlacement="outside"
              name="otp"
              placeholder="Enter code"
              variant="bordered"
              size="lg"
            />

            <Input
              key="pass"
              isRequired
              label="Password"
              labelPlacement="outside"
              name="password"
              placeholder="Enter new password"
              variant="bordered"
              size="lg"
            />

            <Input
              key="pass2"
              isRequired
              label="Confirm Password"
              labelPlacement="outside"
              name="confirm_password"
              placeholder="Enter new password"
              variant="bordered"
              size="lg"
            />

            <Button
              className="w-full"
              color="primary"
              type="submit"
              isLoading={loading}
            >
              Recuperar
            </Button>
          </Form>
        ) : (
          <Form
            className="flex flex-col gap-4"
            validationBehavior="native"
            onSubmit={handleSubmitOTP}
          >
            <Input
              key="email"
              isRequired
              label="Email"
              labelPlacement="outside"
              name="email"
              placeholder="Enter your email"
              type="email"
              variant="bordered"
              size="lg"
            />

            <Button
              className="w-full"
              color="primary"
              type="submit"
              isLoading={loading}
            >
              Recuperar
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
