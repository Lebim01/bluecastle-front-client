import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { IoMdArrowDropdown } from "react-icons/io";

const UserDropdown = () => {
  const { data: session } = useSession();
  const { t } = useTranslation();

  const onAction = (key: any) => {
    if (key == "logout") {
      signOut();
    }
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <div className="border rounded-lg px-2 py-1 flex gap-1 items-center cursor-pointer">
          <span className="capitalize hidden md:inline">
            {session?.user?.name}
          </span>
          <span>
            {" "}
            <IoMdArrowDropdown />{" "}
          </span>
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Profile Actions"
        variant="flat"
        disabledKeys={["profile"]}
        onAction={onAction}
      >
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">{t("logged_as")}</p>
          <p className="font-semibold">{session?.user?.email}</p>
        </DropdownItem>
        <DropdownItem key="settings" as={Link} href="/profile">
          {t("menu.profile")}
        </DropdownItem>
        <DropdownItem key="logout" color="danger">
          {t("logout")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
