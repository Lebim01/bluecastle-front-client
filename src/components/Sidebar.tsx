/* eslint-disable @typescript-eslint/no-explicit-any */
import { ROUTES, Route } from "@/routes";
import { Link, Accordion, AccordionItem } from "@heroui/react";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const RouteNormal = ({ route }: { route: Route }) => {
  const router = useRouter();
  return (
    <li key={route.key}>
      <Link
        href={route.route}
        isDisabled={route.disabled}
        className={classNames(
          "flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group transition-all",
          router.pathname == route.route && "font-bold bg-gray-900"
        )}
      >
        {route.icon}
        <span className="ms-3">{route.display}</span>
      </Link>
    </li>
  );
};

export const RouteGroup = ({ route }: { route: Route }) => {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState<any>(
    router.pathname.startsWith(route.route) ? new Set(["1"]) : []
  );
  const itemClasses = {
    trigger: "hover:bg-gray-700 rounded-lg px-2",
  };
  return (
    <li key={route.key}>
      <Accordion
        selectedKeys={selectedKeys}
        isCompact
        itemClasses={itemClasses}
        className="px-0"
        isDisabled={route.disabled}
        onSelectionChange={setSelectedKeys}
      >
        <AccordionItem
          key="1"
          aria-label={route.display}
          title={route.display}
          startContent={route.icon}
        >
          <div className="pl-8">
            {route.children?.map((route) => (
              <RouteNormal key={route.key} route={route} />
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </li>
  );
};

const Sidebar = () => {
  const i18n = useTranslation();
  return (
    <div className="h-full px-4 py-4 overflow-y-auto border-divider border-r">
      <ul className="space-y-2 font-medium">
        {ROUTES(i18n).map((route) =>
          route.children ? (
            <RouteGroup key={route.key} route={route} />
          ) : (
            <RouteNormal key={route.key} route={route} />
          )
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
