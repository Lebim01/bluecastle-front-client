import { useState } from "react";
import {
  Button,
  Input,
  Checkbox,
  Link,
  Avatar,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import axiosInstance from "@/services";
import { useTranslation } from "react-i18next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import fs from "fs";
import path from "path";
import LanguageDropdown from "@/components/LanguageDropdown";


type Props = {
  is_valid: boolean;
  user: {
    name: string;
  };
  userid: string;
  position: string;
  flags: Record<string, string>;
  countries: Record<string, string>;
};

export const getServerSideProps = (async ({ req }) => {
  const [, , userid, position] = req.url!.split("/");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/users/reference/${userid}/${position}`
    ).then((r) => r.json());
    if (res.statusCode == 500) throw new Error("redirect");
    const filePath = path.join(process.cwd(), "public", "countries-codes.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const flags = JSON.parse(fileContents);
    const countriesRes = await fetch("https://flagcdn.com/en/codes.json");
    const countries = await countriesRes.json();
    return {
      props: { is_valid: true, user: res, userid, position, flags, countries },
    };
  } catch (err) {
    return redirect("/login");
  }
}) satisfies GetServerSideProps<Props>;

export default function Component(props: Props) {
  const {i18n, t}  = useTranslation();
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [error, setErrors] = useState<Record<string, string>>({});

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));

    if (/\s/.test(data.username as string)) {
      setErrors({
        username: i18n.t('sign_up.username_no_spaces'),
      });
      return;
    }

    if (data.email != data.confirmEmail) {
      setErrors({
        confirmEmail: "errors_confirm_email",
      });
      return;
    }

    if (data.password != data.confirmPassword) {
      setErrors({
        confirmPassword: "errors_confirm_password",
      });
      return;
    }
    const pais = Object.entries(props.countries).find(
      ([code, name]) => name === data.country
    )?.[0];
    if(!pais) {
      setErrors({
        country: i18n.t('sign_up.select_country')
      })
    }

    setErrors({});
    setLoading(true);

    try {
      const pais = Object.entries(props.countries).find(
        ([code, name]) => name === data.country
      )?.[0];
     
      await axiosInstance.post("auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        sponsor_id: props.userid,
        side: props.position,
        country: pais || "Sin Pais",
        username: data.username,
        phone: ((data.code as string) + data.phone) as string,
      });

      if (status != "authenticated") {
        signIn("credentials", {
          username: data.email,
          password: data.password,
          redirect: false,
        }).then(() => {
          router.replace("/");
        });
        
      } else {
        setLoading(false);
        toast.success(i18n.t('sign_up.user_registered_success'));
        router.replace("/");
      }
    } catch (err: any) {
      if (err.response?.data?.message == "USER_ALREADY_EXISTS") {
        setErrors({
          confirmEmail: "errors_user_exists",
        });
      } else {
        setErrors({
          network: "error",
        });
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full relative w-full items-center justify-center min-h-screen">
      <div className="absolute top-4 right-4">
        <LanguageDropdown />
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex w-full max-w-lg flex-col gap-4 itex-center justify-center rounded-large px-8 pb-10 pt-6">
          <div className="flex flex-col gap-4 items-center">
            <Image src="/img/logo-inverse.svg" width={100} height={80} alt="" />
            <p className="pb-4 text-left text-xl font-semibold">
              {i18n.t('sign_up.signup_title')}
            </p>
          </div>
          <div className="text-2xl">
            <span>{i18n.t('sign_up.referred_by')}:</span>{" "}
            <span className="text-primary">{props.user.name}</span>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              isRequired
              label={i18n.t('sign_up.full_name')}
              name="name"
              //type="text"
              color="default"
              onKeyDown={() => {}}
            />
            {error.username && (
              <span className="text-red-400 text-center">
                {t(error.username as any)}
              </span>
            )}
            <Input
              isRequired
              label={i18n.t('sign_up.username')}
              color="default"
              name="username"
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\s/g, "");
              }}
            />

            <Input
              isRequired
              label={i18n.t('sign_up.email')}
              name="email"
              type="email"
              color="default"
            />
            {error.confirmEmail && (
              <span className="text-red-400 text-center">
                {t(error.confirmEmail as any)}
              </span>
            )}
            <Input
              isRequired
              label={i18n.t('sign_up.confirm_email')}
              name="confirmEmail"
              type="email"
              color="default"
            />
            <Input
              isRequired
              endContent={
                <div className="flex items-center">
                  <button type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <FaRegEyeSlash className="pointer-events-none text-2xl text-default-400" />
                    ) : (
                      <FaRegEye className="pointer-events-none text-2xl text-default-400" />
                    )}
                  </button>
                </div>
              }
              label={i18n.t('sign_up.password')}
              name="password"
              type={isVisible ? "text" : "password"}
            />
            <Input
              isRequired
              endContent={
                <div className="flex items-center">
                  <button type="button" onClick={toggleConfirmVisibility}>
                    {isConfirmVisible ? (
                      <FaRegEyeSlash className="pointer-events-none text-2xl text-default-400" />
                    ) : (
                      <FaRegEye className="pointer-events-none text-2xl text-default-400" />
                    )}
                  </button>
                </div>
              }
              label={i18n.t('sign_up.confirm_password')}
              name="confirmPassword"
              type={isConfirmVisible ? "text" : "password"}
            />
            {error.confirmPassword && (
              <span className="text-red-400 text-center">
                {t(error.confirmPassword as any)}
              </span>
            )}
            <Autocomplete
              isRequired
              label={i18n.t('sign_up.country')}
              color="default"
              name="country"
            >
              {Object.entries(props.countries).map(([code, name]) => (
                <AutocompleteItem
                  key={code}
                  startContent={
                    <Avatar
                      alt={name}
                      src={`https://flagcdn.com/16x12/${code.toLowerCase()}.png`}
                      className="w-6 h-6"
                    />
                  }
                  value={code}
                >
                  {name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
            <div className="flex gap-1">
              <Autocomplete
                isRequired
                label={i18n.t('sign_up.code')}
                color="default"
                name="code"
                className="max-w-[130px]"
              >
                {Object.entries(props.flags).map(([code, name]) => (
                  <AutocompleteItem
                    key={code}
                    startContent={
                      <Avatar
                        alt={name}
                        src={`https://flagcdn.com/16x12/${code.toLowerCase()}.png`}
                        className="w-6 h-6"
                      />
                    }
                  >
                    {typeof name === "string" && name.startsWith("+")
                      ? name
                      : `+${name}`}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <Input
                isRequired
                label={i18n.t('sign_up.phone')}
                color="default"
                name="phone"
                type="number"
                maxLength={10}
              />
            </div>
            <div className="flex items-center">
              <Checkbox isRequired className="py-4" size="sm"></Checkbox>
              <span>
                {i18n.t('sign_up.accept_terms')}&nbsp;
                <Link href="/public/terms_es.pdf" size="sm" target="_blank">
                  {i18n.t('sign_up.terms')}
                </Link>
                &nbsp;{i18n.t('sign_up.and')}&nbsp;
                <Link
                  href="/public/privacy_policy_es.pdf"
                  size="sm"
                  target="_blank"
                >
                  {i18n.t('sign_up.privacy_policy')}
                </Link>
              </span>
            </div>
            <Button color="primary" type="submit" size="lg" isLoading={loading}>
              {i18n.t('sign_up.register')}
            </Button>
            {error.network && (
              <span className="text-red-400 text-center">
                {t("errors_network")}
              </span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
