import QuickActions from "./QuickActions";
import Statistics from "./Statistics";

export default function SidePanel() {
  return (
    <aside className="max-w-75 relative top-5 space-y-4">
      <QuickActions />
      <Statistics />
    </aside>
  );
}