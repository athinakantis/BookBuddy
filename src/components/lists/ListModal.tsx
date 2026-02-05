import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQuery } from "@apollo/client/react";
import { ListPlus, Minus, Plus } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import { GET_LISTS } from "@/graphql/queries/lists";
import Button from "../custom/Button";
import { GetListsResponse, List } from "@/types/lists";
import { ADD_TO_LIST, REMOVE_FROM_LIST } from "@/graphql/mutations/lists";
import { toast } from "sonner";
import { useEffect } from "react";

type AddToListModalProps = Readonly<{
  bookId: string;
}>;

export default function ListModal({ bookId }: AddToListModalProps) {
  const { data, loading, error } = useQuery<GetListsResponse>(GET_LISTS, {
    variables: {
      bookId,
    },
  });
  const lists = data?.lists as List[];
  const [addToList] = useMutation(ADD_TO_LIST, {
    refetchQueries: [GET_LISTS]
  });
  const [removeFromList] = useMutation(REMOVE_FROM_LIST, {
    refetchQueries: [GET_LISTS]
  });


  const handleAddToList = async (listId: string) => {
    await addToList({ variables: { listId, bookId } })
    toast.success("Book was added to list!")
  }
  const handleRemoveFromList = async (listId: string) => {
    await removeFromList({ variables: { listId, bookId } })
    toast.success("Book was removed from list!")
  }

  useEffect(() => {
    if (error)
      toast.error("Failed to load lists")
  }, [error]);

  return (
    <Dialog>
      <DialogTrigger className="flex">
        <ListPlus
          aria-hidden
          size={20}
        />
        Add To List
      </DialogTrigger>
      <DialogContent className="max-w-100">
        <DialogHeader>
          <DialogTitle>Add Book To List</DialogTitle>
          {loading && <Spinner />}
        </DialogHeader>
        <ul className="space-y-2">
          {lists?.length > 0 &&
            lists?.map((list) => (
              <li
                key={list.id}
                className="flex justify-between border-b border-accent/20 text-sm"
              >
                {list.name}
                <Button
                  className="bg-transparent p-1"
                  aria-label={`Add book to ${list.name}`}
                  onClick={
                    list.hasBook
                      ? () => handleRemoveFromList(list.id)
                      : () => handleAddToList(list.id)
                  }
                >
                  {list.hasBook ? <Minus size={15} /> : <Plus size={15} />}
                </Button>
              </li>
            ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
