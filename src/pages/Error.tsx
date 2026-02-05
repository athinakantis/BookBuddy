import Card from "@/components/ui/Card";
import Button from "@/components/custom/Button";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

export default function GeneralError() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      <Header />

      <main className="flex gap-4 justify-center space-y-8 mb-50 mx-4 flex-col md:flex-row">
        <Card className="w-fit">
          <h2>Something went wrong</h2>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => navigate("/")}>Home</Button>
            <Button onClick={() => navigate(-1)}>Back</Button>
          </div>
        </Card>
      </main>

      <Toaster
        position="top-right"
        richColors
        closeButton
      />
    </div>
  );
}
