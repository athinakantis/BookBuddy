import List from "./List";

export default function Lists() {
  
  return (
    <section className="space-y-4 grow">
      <List
        filter={{ status: "READING" }}
        listName="Currently reading"
        limit={2}
      />
      <List
        filter={{ status: "UNREAD" }}
        listName="Readlist"
        limit={1}
      />
      <List
        filter={{ status: "READ" }}
        listName="Read Books"
        orderBy="FINISHED_AT"
        limit={1}
      />
    </section>);
}