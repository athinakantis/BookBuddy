import { useQuery } from "@apollo/client/react";
import Card from "@/components/ui/Card";
import { GetListsResponse } from "@/types/lists";
import { GET_LISTS } from "@/graphql/queries/lists";
import { Link } from "react-router-dom";

export default function MyLists() {
  const { data } = useQuery<GetListsResponse>(GET_LISTS);
  const lists = data?.lists;
  return (
    <Card className="bg-card-muted">
      <h2>Lists</h2>
      {lists?.map((list) => (
        <Link
          key={list.id}
          to={`/lists/${list.id}`}
          className="hover:underline underline-offset-2 text-sm"
        >
          {list.name}
        </Link>
      ))}
    </Card>
  );
}
