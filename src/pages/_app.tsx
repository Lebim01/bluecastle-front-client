import "@/styles/globals.css";
import "nprogress/nprogress.css";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google";
import "@/utils/i18n";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({ weight: ["400", "500", "600"], subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);

    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <HeroUIProvider navigate={router.push}>
        <Toaster position="top-right" />
        <main className={poppins.className}>
          <Component {...pageProps} />
          <input id="copyInput" className="hidden" />
        </main>
      </HeroUIProvider>
    </SessionProvider>
  );
}
