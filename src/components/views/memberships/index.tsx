import useAxios from "@/hooks/useAxios";
import Package from "./components/Packages";
import { membershipRecord, Memberships } from "@/constants";
import { useTranslation } from "react-i18next";

const Membership = () => {
  const { data: membership } = useAxios<{ membership: Memberships }>({ url: 'users/current-membership', method: 'get' })
  const i18n = useTranslation()
  const membershipObject = membershipRecord(i18n)
  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

      <Package
        image="/img/memberships/1.png"
        title={i18n.t('purchases.membership.basic')}
        period="mensual"
        pricing={100}
        type="p-100"
        active={membership?.membership || null}
        beneficios={membershipObject['p-100'].pros}
      />
      <Package
        image="/img/memberships/2.png"
        title={i18n.t('purchases.membership.medium')}
        period="trimestral"
        pricing={300}
        type="p-300"
        active={membership?.membership || null}
        beneficios={membershipObject['p-300'].pros}
      />
      <Package
        image="/img/memberships/3.png"
        title={i18n.t('purchases.membership.advanced')}
        period="semestral"
        pricing={500}
        type="p-500"
        active={membership?.membership || null}
        beneficios={membershipObject['p-500'].pros}
      />
      <Package
        image="/img/memberships/4.png"
        title={i18n.t('purchases.membership.pro')}
        period="anual"
        pricing={1000}
        type="p-1000"
        active={membership?.membership || null}
        beneficios={membershipObject['p-1000'].pros}
      />
    </div>
  );
};

export default Membership;
