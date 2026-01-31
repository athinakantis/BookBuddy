import {
  Book,
  BookFilterInput,
  BookOrderBy, OrderDirection
} from "@/types/books";
import BookCard from "./BookCard";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client/react";
import { UPDATE_BOOK_STATUS } from "@/graphql/mutations/books";
import { GET_BOOKS } from "@/graphql/queries/books";
import { useState } from "react";
import Button from "./custom/Button";
import Spinner from "./Spinner";
import { toCapitalized } from "@/lib/utils";

type ListProps = Readonly<{
  listName: string;
  filter: BookFilterInput;
  orderDirection?: OrderDirection;
  orderBy?: BookOrderBy;
  limit?: number;
}>;

export default function List(props: ListProps) {
  const { listName, limit, filter, orderBy = "CREATED_AT", orderDirection = "DESC" } = props;
  const { loading, data, refetch } = useQuery(GET_BOOKS, {
    variables: {
      filter,
      orderBy: { field: orderBy, direction: orderDirection },
      limit: limit ?? 2,
    },

  });
  const navigate = useNavigate();
  const [canDrop, setCanDrop] = useState(false);
  const [updateStatus] = useMutation(UPDATE_BOOK_STATUS, {
    refetchQueries: [GET_BOOKS],
  });

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
      className="bg-card-muted rounded-lg relative flex flex-col grow hover:pointer h-full w-full space-y-2"
      data-set-status={listName}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <h2 className="flex">{listName}<span className="text-sm bg-bg-muted px-2 rounded-full  text-accent h-fit ml-1">{totalBooks} </span></h2>

      {!loading && (
        <ul className="flex gap-2 grow flex-wrap">
          {totalBooks >= 1 &&
            books.map((book) => {
              if (canDrop) return null;
              return (
                <li key={book.id}>
                  <BookCard book={book} className="w-80 grow" />
                </li>
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

          {/* SEE ALL */}
          {totalBooks > 2 && (
            <Button
              onClick={() => navigate(`/lists/${filter.status}`)}
              variant="secondary"
              className="justify-center hover:text-bg bg-accent-active"
            >
              See all
            </Button>
          )}
        </ul>
      )}
      {loading && <Spinner />}
    </section>
  );
}
