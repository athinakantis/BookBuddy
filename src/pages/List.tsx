import BookCard from "@/components/BookCard";
import Spinner from "@/components/Spinner";
import { GET_BOOKS_BY_STATUS } from "@/graphql/queries/books";
import { toCapitalized } from "@/lib/utils";
import { Book } from "@/types/books";
import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router-dom";

export default function List() {
  const { status } = useParams();

  const { loading, error, data } = useQuery<{ booksByStatus: Book[] }>(GET_BOOKS_BY_STATUS, {
    variables: {
      status: status?.toUpperCase(),
    },
  });

  const books = data?.booksByStatus
  if (!books) return null;

  return (
    <div className="bg-bg-muted max-w-400 mx-auto p-4 rounded-md">
      <h2 className="mb-4">{`${toCapitalized(status!)} books (${books.length})`}</h2>

      
      {loading && <Spinner />}

      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" >
        {books?.length > 0 ?
          books.map((book: Book) => (
            <BookCard book={book} key={book.id} className="w-full max-w-none grow" />
          ))
          :
          <>List is empty</>
        }
      </div>
    </div>
  );
}
