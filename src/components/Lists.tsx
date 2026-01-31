import List from "./List";

export default function Lists() {
  return (
    <section className="bg-card-muted p-4 rounded-md space-y-2 shadow-sm">
      <div className="flex flex-col gap-8">
        <List
          filter={{ status: "READING" }}
          listName="Currently reading"
          limit={2}
        />
        <List
          filter={{ status: "UNREAD" }}
          listName="Readlist"
        />
        <List
          filter={{ status: "READ" }}
          listName="Read Books"
          orderBy="FINISHED_AT"
        />
      </div>
    </section>);
}