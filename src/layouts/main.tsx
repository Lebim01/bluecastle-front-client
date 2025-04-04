import LayoutNavbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/views/Footer";
import AuthContext from "@/context/auth.context";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <AuthContext>
      <div className="min-h-screen flex flex-col">
        <LayoutNavbar />
        <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] 2xl:grid-cols-[400px_1fr] flex-1">
          <div className="hidden xl:block">
            <Sidebar />
          </div>
          <div className="p-4 w-screen lg:w-auto 2xl:p-8">{children}</div>
        </div>
        <Footer />
      </div>
    </AuthContext>
  );
};

export default MainLayout;
