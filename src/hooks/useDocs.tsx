/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/configs/firebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const useDocs = <T,>(
  path: string,
  defaultValue?: any,
  ...compositeFilter: QueryConstraint[]
): null | T[] => {
  const [data, setData] = useState<null | T[]>(defaultValue || null);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, path), ...compositeFilter),
      (snap) => {
        setData(snap.docs.map((r) => ({ ...r.data(), id: r.id } as T)));
      }
    );
    return () => unsub();
  }, [path]);

  return data;
};

export default useDocs;
