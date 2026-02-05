
import Lists from "@/components/lists/Lists";
import SidePanel from "@/components/Sidepanel";
import StatusLists from "@/components/lists/StatusLists";

export default function Home() {

  return (
    <>
      <SidePanel />
      <div className="space-y-4">
        <StatusLists />
        <Lists />
      </div>
    </>
  );
}
