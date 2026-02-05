import { GET_LISTS } from "@/graphql/queries/lists";
import { GetListsResponse } from "@/types/lists";
import { useQuery } from "@apollo/client/react";
import ListPreview from "./List";

export default function Lists() {
  const { data } = useQuery<GetListsResponse>(GET_LISTS)
  const lists = data?.lists;

  return lists?.map(list => <ListPreview key={list.id} list={list} />)
}