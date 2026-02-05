import {
  Book,
  BookFilterInput,
  BookOrderBy, OrderDirection
} from "@/types/books";
import BookCard from "@/components/books/BookCard";
import { useMutation, useQuery } from "@apollo/client/react";
import { UPDATE_BOOK_STATUS } from "@/graphql/mutations/books";
import { GET_BOOKS } from "@/graphql/queries/books";
import { useState } from "react";
import Spinner from "@/components/ui/Spinner";
import { toCapitalized } from "@/lib/utils";

type StatusListProps = Readonly<{
  listName: string;
  filter: BookFilterInput;
  orderDirection?: OrderDirection;
  orderBy?: BookOrderBy;
  limit?: number;
}>;

export default function StatusList(props: StatusListProps) {
  const { listName, limit = 1, filter, orderBy = "CREATED_AT", orderDirection = "DESC" } = props;
  const { loading, data, refetch } = useQuery(GET_BOOKS, {
    variables: {
      filter,
      orderBy: { field: orderBy, direction: orderDirection },
      limit: limit ?? 2,
    },

  });
  const [updateStatus] = useMutation(UPDATE_BOOK_STATUS, {
    refetchQueries: [GET_BOOKS],
  });


  // State, function and event listeners
  // for drag-and-drop functionality.
  // When a book is dragged over the list, mark droppable area.
  const [canDrop, setCanDrop] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setCanDrop(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const raw =
      e.dataTransfer.getData("application/json") ||
      e.dataTransfer.getData("text/plain");

    if (!raw) return;

    let bookId, status: string | undefined;

    try {
      bookId = JSON.parse(raw)?.bookId;
      status = JSON.parse(raw)?.status;
    } catch {
      bookId = raw;
    }

    if (!bookId || filter.status === status) return setCanDrop(false);
    updateStatus({ variables: { status: filter.status, bookId } });
    setCanDrop(false);
    refetch();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setCanDrop(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setCanDrop(false);
  };

  const books = (data as any)?.books.books as Book[];
  const totalBooks = (data as any)?.books.total;
  if (loading) return <Spinner />;

  return (
    <section
      className="bg-card-muted relative flex flex-col hover:pointer h-full space-y-2 p-4 rounded-md shadow-sm"
      data-set-status={listName}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <h2 className="flex">{listName}<span className="text-sm bg-bg-muted px-2 rounded-full  text-accent h-fit ml-1">{totalBooks} </span></h2>

      {!loading && (
        <div className="flex gap-2 grow lg:flex-wrap flex-col lg:flex-row">
          {totalBooks >= 1 &&
            books.map((book) => {
              if (canDrop) return null;
              return (
                <BookCard book={book} className="grow w-full h-fit max-w-none" key={book.id} />
              );
            })}

          {!canDrop && totalBooks === 0 && (
            <div className="w-full p-4 rounded-md border-accent-muted relative transition-all hover:cursor-default text-center justify-center items-center space-y-4 flex h-full min-h-20">
              <p className="italic">List empty</p>
            </div>
          )}

          {canDrop && (
            <div className="w-full rounded-md border-2 border-accent border-dashed h-30 text-accent flex items-center justify-center font-semibold">{`Drop into ${toCapitalized(
              filter.status ?? "",
            )}`}</div>
          )}
        </div>
      )}
      {loading && <Spinner />}
    </section>
  );
}
