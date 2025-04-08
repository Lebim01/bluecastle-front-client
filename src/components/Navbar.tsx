import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/react";
import Image from "next/image";
import { useState } from "react";
import UserDropdown from "./UserDropdown";
import { ROUTES } from "@/routes";
import { RouteGroup, RouteNormal } from "./Sidebar";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "./LanguageDropdown";

export const AcmeLogo = () => {
  return (
    <Link href="/">
      <Image src="/img/logo-inverse.png" height={30} width={100} alt="logo" />
    </Link>
  );
};

const LayoutNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const i18n = useTranslation();

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      maxWidth="full"
      className=""
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="xl:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <LanguageDropdown />

        <NavbarItem>
          <UserDropdown />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-[#18181b] pb-[env(safe-area-inset-bottom)]" style={{ width: '100vw', maxWidth: '100%', height: '100dvh', overflowY: 'auto' }}>

        {ROUTES(i18n).map((route, index) => (
          <NavbarMenuItem key={route.key}>
            {route.children ? (
              <RouteGroup key={route.key} route={route} />
            ) : (
              <RouteNormal key={route.key} route={route} />
            )}
          </NavbarMenuItem>
        ))}

      </NavbarMenu>
    </Navbar>
  );
};

export default LayoutNavbar;
