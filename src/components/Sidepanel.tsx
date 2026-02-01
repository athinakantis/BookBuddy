import QuickActions from "./QuickActions";
import Statistics from "./Statistics";

export default function SidePanel() {
  return (
    <aside className="md:max-w-75 relative top-5 flex gap-4 flex-col sm:flex-row md:flex-col">
      <QuickActions />
      <Statistics />
    </aside>
  );
}