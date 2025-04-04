import axiosInstance from "@/services";
import { useState } from "react";

type Props = {
  url: string;
  method: "post" | "get" | "put";
};

const useMutation = <T,>({ url, method = "get" }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const exec = async (postData?: Record<string, any>) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await (method == "get"
        ? axiosInstance[method](`${process.env.NEXT_PUBLIC_URL_API}/${url}`)
        : axiosInstance[method](
            `${process.env.NEXT_PUBLIC_URL_API}/${url}`,
            postData
          ));
      return response.data;
    } catch (err: any) {
      console.error(err);
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    exec,
    error,
  };
};

export default useMutation;
