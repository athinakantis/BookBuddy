
import StatusList from "./StatusList";

export default function StatusLists() {

  return (
    <section className="space-y-4 grow max-w-200 grid grid-cols-2 gap-4">
      <StatusList
        filter={{ status: "READING" }}
        listName="Currently reading"
      />
      <StatusList
        filter={{ status: "UNREAD" }}
        listName="Readlist"
      />
      <StatusList
        filter={{ status: "READ" }}
        listName="Read Books"
        orderBy="FINISHED_AT"
      />
    </section>);
}