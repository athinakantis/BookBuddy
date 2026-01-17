import BookCard from "@/components/BookCard";
import Spinner from "@/components/Spinner";
import { GET_BOOKS_BY_STATUS } from "@/graphql/queries/books";
import { toCapitalized } from "@/lib/utils";
import { Book } from "@/types/books";
import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router-dom";

export default function List() {
  const { status } = useParams();

  const { loading, error, data, refetch } = useQuery(GET_BOOKS_BY_STATUS, {
    variables: {
      status: status?.toUpperCase(),
    },
  });

  const books = (data as any)?.booksByStatus

  return (
    <div className="bg-bg-muted max-w-150 mx-auto">
      <h2 className="mb-4">{`${toCapitalized(status!)} books (${books?.length})`}</h2>

      {loading && <Spinner />}

      <div className="flex gap-4 justify-center flex-wrap" >
        {books?.length > 0 ?
          books.map((book: Book) => (
            <BookCard book={book} key={book.id} />
          ))
          :
          <>List is empty</>
        }
      </div>
    </div>
  );
}
