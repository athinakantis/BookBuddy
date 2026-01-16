import {
  Book,
  BookFilterInput,
  BookOrderBy,
  BookStatus,
  OrderDirection,
} from "@/types/books";
import BookCard from "./BookCard";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client/react";
import { UPDATE_BOOK_STATUS } from "@/graphql/mutations/books";
import { GET_BOOKS } from "@/graphql/queries/books";
import { useState } from "react";
import Button from "./custom/Button";
import { Plus } from "lucide-react";
import Spinner from "./Spinner";
import { toCapitalized } from "@/lib/utils";

type ListProps = {
  listName: string;
  filter: BookFilterInput;
  orderDirection?: OrderDirection;
  orderBy?: BookOrderBy;
  limit?: number;
};

export default function List(props: ListProps) {
  const { listName } = props;
  const { filter, orderBy = "CREATED_AT", orderDirection = "DESC" } = props;
  const { loading, error, data, refetch } = useQuery(GET_BOOKS, {
    variables: {
      filter,
      orderBy: { field: orderBy, direction: orderDirection },
      limit: 1,
    },
  });
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [updateStatus] = useMutation(UPDATE_BOOK_STATUS, {
    refetchQueries: [GET_BOOKS],
  });

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const raw =
      e.dataTransfer.getData("application/json") ||
      e.dataTransfer.getData("text/plain");

    if (!raw) return;

    let bookId: string | undefined;

    try {
      bookId = JSON.parse(raw)?.bookId;
    } catch {
      bookId = raw;
    }

    if (!bookId) return;
    updateStatus({ variables: { status, bookId } });
    refetch();
    setActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setActive(false);
  };

  const books = (data as any)?.books.books as Book[];
  const totalBooks = (data as any)?.books.total;
  if (!books) return <>no books</>;

  return (
    <section
      className="bg-card-muted p-4 rounded-lg relative flex flex-col hover:pointer h-fit min-w-80"
      data-set-status={listName}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="mb-4 flex justify-between">
        <h2>{`${listName} (${totalBooks})`}</h2>
        <Button
          className="bg-bg p-1 h-fit"
          variant="primary"
          onClick={(e) => {
            e.stopPropagation();
            navigate(
              "/books/new",
              filter.status ? { state: filter.status } : {}
            );
          }}
        >
          <Plus size={20} />
        </Button>
      </div>
      {!loading && (
        <ul className="flex gap-2 flex-col grow">
          {totalBooks >= 1 ? (
            books.map((book) => {
              if (active)
                return (
                  <div className="w-full rounded-md border-2 border-accent border-dashed h-30 text-accent flex items-center justify-center font-semibold">{`Drop into ${toCapitalized(
                    filter.status ?? ""
                  )}`}</div>
                );

              return (
                <li key={book.id}>
                  <BookCard book={book} />
                </li>
              );
            })
          ) : (
            <div className="w-60 p-4 rounded-md border-accent-muted relative transition-all hover:cursor-pointer text-center justify-center items-center space-y-4 flex h-full">
              <p>List empty</p>
            </div>
          )}

          {/* SEE ALL */}
          {totalBooks > 1 && (
            <Button
              onClick={() => navigate(`/lists/${filter.status}`)}
              variant="secondary"
              className="justify-center hover:text-bg"
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
