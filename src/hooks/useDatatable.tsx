/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";

type Props = {
  url: string;
};

type ResponseDatatable = {
  data: any[];
  totalRecords: number;
};

const PAGE_SIZE = 20;

const useDatatable = <T,>(props: Props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const nextPage = () => {
    setPage((page) => page + 1);
  };

  const prevPage = () => {
    setPage((page) => {
      if (page - 1 > 0) {
        return page - 1;
      }
      return page;
    });
  };

  const getData = async (page: number) => {
    try {
      setLoading(true);
      const _url = new URL(props.url);
      _url.searchParams.append("page", page.toString());
      const res = await axios.get<ResponseDatatable>(_url.toString());
      setTotalPages(Math.ceil(res.data.totalRecords / PAGE_SIZE));
      setData(res.data.data);
    } catch (err) {
      setTotalPages(1);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(page);
  }, [page]);

  return {
    page,
    setPage,
    nextPage,
    prevPage,
    data,
    totalPages,
    loading,
  };
};

export default useDatatable;
