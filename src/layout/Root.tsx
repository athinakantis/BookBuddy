import Toast from "@/components/custom/Toast";
import Header from "@/components/Header";
import SidePanel from "@/components/Sidepanel";
import { useUI } from "@/context/useUI";
import { Outlet } from "react-router-dom";

export default function Root() {
  const { toast } = useUI();

  return (
    <div className="min-h-screen relative">
      <Header />

      <main className="flex gap-4 justify-center space-y-8 mb-50">
        <Outlet />
      </main>

      {toast && <Toast toast={toast} />}
    </div>
  );
}
