import { formatNumberWithCommas } from "@/components/utils/formats/formatNumbers";
import Form from "@/components/views/invesment/deposit/Form";
import useAxios from "@/hooks/useAxios";
import MainLayout from "@/layouts/main";
import { useTranslation } from "react-i18next";

const Deposit = () => {
  const i18n = useTranslation()
  const { data } = useAxios<{ limit: number; deposits: number }>({
    url: "users/current-deposit",
    method: "get",
    defaultValue: {
      limit: 0,
      deposits: 0,
    },
  });

  const rest = (data?.limit || 0) - (data?.deposits || 0);
  return (
    <div>
      <div className="flex flex-col">
        <p className="font-bold text-xl">
          {i18n.t('portfolio_view.add_value.adding_value_generates_up_to')}
        </p>
        <small>{i18n.t('portfolio_view.add_value.you_can_add_value')}</small>
        <small>{i18n.t('portfolio_view.add_value.current')}: ${formatNumberWithCommas(data?.deposits, 0)} USD</small>
        <small>{i18n.t('portfolio_view.add_value.remaining')}: ${formatNumberWithCommas(rest, 0)} USD</small>
      </div>
      <div className="mt-8">
        <Form />
      </div>
    </div>
  );
};

const Container = () => {
  return (
    <MainLayout>
      <Deposit />
    </MainLayout>
  );
};

export default Container;
