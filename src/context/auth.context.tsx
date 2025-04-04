import LoadingScreen from "@/layouts/loading";
import axiosInstance from "@/services";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FC, ReactNode, useMemo } from "react";

type Props = {
  children: ReactNode;
};

const AuthContext: FC<Props> = (props) => {
  const router = useRouter();
  const { data, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      signOut();
      router.replace("/login");
    },
  });

  const axiosInited = useMemo(() => {
    if (status == "authenticated") {
      axiosInstance.defaults.headers.Authorization = `Bearer ${data?.accessToken}`;
      return true;
    }
    return false;
  }, [status]);

  if (!axiosInited) return <LoadingScreen />;

  return props.children;
};

export default AuthContext;
