import { useNavigate } from "react-router-dom";
import Card from "./Card";
import Button from "./custom/Button";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <Card className="bg-card-muted space-y-2 sm:w-fit">
      <h2>Quick Actions</h2>
      <div className="flex gap-2 flex-wrap">
        <Button variant="secondary" onClick={() => navigate(`/books/new`)}>Add New Book</Button>
        <Button variant="secondary">Create new list</Button>
      </div>
    </Card>
  );
}