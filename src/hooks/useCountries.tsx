import fetchCountries from "@/services/fetchCountries";
import { useEffect, useState } from "react";

export default function useCountries(): { data: any[]; loading: boolean } {
  const [loading, setLoading] = useState(false);
  const [countries, set] = useState([]);

  useEffect(() => {
    setLoading(true);
    /*fetchCountries()
      .then((data) => {
        set(data);
      })
      .finally(() => {
        setLoading(false);
      });*/
  }, []);

  return {
    data: countries ?? [],
    loading,
  };
}
