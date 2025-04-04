import {
  Form,
  Input,
  Select,
  SelectItem,
  Button,
  Tabs,
  Tab,
} from "@heroui/react";
import MainLayout from "@/layouts/main";
import { useState } from "react";
import Profile from "../components/views/profile/Profile";
import Password from "../components/views/profile/Passwrod";
import Billing from "@/components/views/profile/Wallet";
import useAxios from "@/hooks/useAxios";
import { useSession } from "next-auth/react";
import { User } from "@/types/User";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const i18n = useTranslation()
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  // const { data: user } = useSession()

  // Real-time password validation
  const getPasswordError = (value: string) => {
    if (value.length < 4) {
      return "Password must be 4 characters or more";
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return "Password needs at least 1 uppercase letter";
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return "Password needs at least 1 symbol";
    }

    return null;
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const data: any = Object.fromEntries(new FormData(e.currentTarget));

    // Custom validation checks
    const newErrors: any = {};

    // Password validation
    const passwordError = getPasswordError(data.password.toString());

    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Username validation
    if (data.name === "admin") {
      newErrors.name = "Nice try! Choose a different username";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    if (data.terms !== "true") {
      setErrors({ terms: "Please accept the terms" });

      return;
    }

    // Clear errors and submit
    setErrors({});
    setSubmitted(data);
  };
  const Options = ["profile", "password"];
  return (
    <MainLayout>
      <div className="mt-4">
        <Tabs aria-label="Options radius">
          <Tab key="profile" title={i18n.t('profile_view.profile')}>
            <div className="px-4 py-6">
              <Profile />
            </div>
          </Tab>
          <Tab key="password" title={i18n.t('profile_view.password')}>
            <div className="px-4 py-6 max-w-lg">
              <Password />
            </div>
          </Tab>
          <Tab key="wallet" title={i18n.t('profile_view.wallet')}>
            <div className="px-4 py-6 max-w-lg">
              <Billing />
            </div>
          </Tab>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
