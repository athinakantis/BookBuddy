import BookCard from "@/components/books/BookCard";
import Spinner from "@/components/ui/Spinner";
import { GET_BOOKS_BY_STATUS } from "@/graphql/queries/books";
import { GET_LIST } from "@/graphql/queries/lists";
import { toCapitalized } from "@/lib/utils";
import { Book } from "@/types/books";
import { List as ListType } from "@/types/lists";
import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router-dom";

export default function List() {
  const { status, listId } = useParams();

  const query = listId ? GET_LIST : GET_BOOKS_BY_STATUS;
  const variables = listId
    ? { variables: { id: listId } }
    : { variables: { status: status } };

  const { loading, error, data } = useQuery<{
    booksByStatus: Book[];
    list?: ListType;
  }>(query, variables);

  const list = data?.list;
  const books = listId ? data?.list?.books : data?.booksByStatus;
  console.log("books:", books);
  if (!books) return null;

  return (
    <div className="bg-bg-muted max-w-400 mx-auto p-4 rounded-md">
      <h2 className="mb-4 flex">
        {list ? `${list.name}` : `${toCapitalized(status!)} books`}{" "}
        <span className="text-sm bg-bg-muted px-2 rounded-full  text-accent h-fit ml-1 border">
          {books.length}{" "}
        </span>
      </h2>

      {loading && <Spinner />}

      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {books?.length > 0 ? (
          books.map((book: Book) => (
            <BookCard
              book={book}
              key={book.id}
              className="w-full max-w-none grow"
            />
          ))
        ) : (
          <>List is empty</>
        )}
      </div>
    </div>
  );
}
