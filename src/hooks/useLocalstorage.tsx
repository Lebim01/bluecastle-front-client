import { useEffect, useState } from "react";

export const useLocalstorage = <T,>(name: string, key?: any) => {
  const [value, setValue] = useState<T | null | undefined>(undefined);

  useEffect(() => {
    const val = localStorage.getItem(name);
    setValue(val ? (val as T) : null);
  }, [key]);

  return value;
};
