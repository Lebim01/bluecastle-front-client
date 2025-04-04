"use client";
import MainLayout from "@/layouts/main";
import TradingViewWidget from "../components/views/trading/TradingView";
import Dashboard from "../components/views/dashboard/Dashboard";

export default function Home() {
  return (
    <MainLayout>
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <TradingViewWidget />
        <Dashboard />
      </main>
    </MainLayout>
  );
}
