import MainLayout from "@/layouts/main";
import { Button } from "@heroui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Error500 = () => {
  const { status } = useSession();

  if (status != "authenticated") {
    return (
      <div>
        Ocurrio un problema, dirigete a login <Link href="/login">enlace</Link>
      </div>
    );
  }

  const logout = () => {
    signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  };

  return (
    <MainLayout>
      <div className="flex flex-col">
        <div>Ocurrio un problema, intenta cerrar e iniciar sesión de nuevo</div>
        <div>
          <Button onPress={logout}>Cerrar sesión</Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Error500;
