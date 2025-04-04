/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Button, Input, Link, Form } from "@heroui/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { NuqsAdapter } from "nuqs/adapters/next/pages";
import { useQueryState } from "nuqs";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [error] = useQueryState("error");
  const [loading, setLoading] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (status == "authenticated") {
      router.push("/");
    }
    setLoading(false);
  }, [status]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setLoading(true);

    signIn("credentials", {
      username: data.email,
      password: data.password,
    });
  };

  return (
    <div className="flex h-full w-full items-center justify-center min-h-screen">
      <div className="flex w-full max-w-sm flex-col gap-8 rounded-large px-16 pb-20 pt-16  border">
        <img src="/img/logo-inverse.svg" alt="" />
        <Form
          className="flex flex-col gap-4"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
            size="lg"
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <FaRegEyeSlash className="pointer-events-none text-2xl text-default-400" />
                ) : (
                  <FaRegEye className="pointer-events-none text-2xl text-default-400" />
                )}
              </button>
            }
            label="Password"
            labelPlacement="outside"
            name="password"
            size="lg"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <div className="flex w-full justify-end px-1 py-2">
            <Link className="text-default-500" href="/forgot_password" size="sm">
              {t("forgot_password")}
            </Link>
          </div>
          <Button
            className="w-full"
            color="primary"
            type="submit"
            isLoading={loading}
          >
            {t("login")}
          </Button>

          {error && (
            <span className="text-red-400 text-center">
              {t("errors_invalid_credentials")}
            </span>
          )}
        </Form>
      </div>
    </div>
  );
};

const Container = () => {
  return (
    <NuqsAdapter>
      <LoginPage />
    </NuqsAdapter>
  );
};

export default Container;
