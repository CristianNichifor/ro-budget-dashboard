import { Outlet } from "@tanstack/react-router";
import { Header } from "../components/layout/Header";
import { TabNavigation } from "../components/layout/TabNavigation";

export function RootLayout() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="border-b border-slate-200 bg-white">
        <TabNavigation />
      </div>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
      <footer className="mx-auto max-w-6xl px-4 pb-8 text-xs text-slate-400">
        Demo educațional — valorile sunt aproximative și provin din date
        statice; sursele oficiale sunt afișate pe fiecare grafic.
      </footer>
    </div>
  );
}
