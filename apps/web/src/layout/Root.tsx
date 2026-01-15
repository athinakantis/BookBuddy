import Button from "@/components/custom/Button";
import Toast from "@/components/custom/Toast";
import Header from "@/components/Header";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useUI } from "@/context/useUI";
import { BookOpen, ChevronLeft } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Root() {
  const { toast } = useUI();
  return (
    <div className="min-h-screen relative">
      <Header />

      <div className="mx-4">
      <Outlet />
      </div>

      {toast && <Toast toast={toast} />}
    </div>
  );
}
