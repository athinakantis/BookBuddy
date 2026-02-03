import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function Root() {

  return (
    <div className="min-h-screen relative">
      <Header />

      <main className="flex gap-4 justify-center space-y-8 mb-50 mx-4 flex-col md:flex-row">
        <Outlet />
      </main>

      <Toaster position="top-right" richColors closeButton/>
    </div>
  );
}
