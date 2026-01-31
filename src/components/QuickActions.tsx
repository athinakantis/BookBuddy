import Card from "./Card";
import Button from "./custom/Button";

export default function QuickActions() {
  return (
    <Card className="bg-card-muted space-y-2">
      <h2>Quick Actions</h2>
      <div className="flex gap-2">
        <Button variant="secondary">Add New Book</Button>
        <Button variant="secondary">Create new list</Button>
      </div>
    </Card>
  );
}