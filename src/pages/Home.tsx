import List from "@/components/List";

export default function Home() {

  return (
    <>
      <div className="flex gap-4 justify-center flex-wrap mt-8">
        <List
          filter={{ status: "UNREAD" }}
          listName="Readlist"
        />
        <List
          filter={{ status: "READING" }}
          listName="Currently reading"
          limit={2}
        />
        <List
          filter={{ status: "READ" }}
          listName="Read Books"
          orderBy="FINISHED_AT"
        />
      </div>
    </>
  );
}
