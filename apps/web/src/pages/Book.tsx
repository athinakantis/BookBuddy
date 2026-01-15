import Button from "@/components/custom/Button";
import Rating from "@/components/Rating";
import Spinner from "@/components/Spinner";
import { GET_BOOK } from "@/graphql/queries/books";
import { cn, toCapitalized } from "@/lib/utils";
import { Book as BookType } from "@/types/books";
import { useQuery } from "@apollo/client/react";
import { useNavigate, useParams } from "react-router-dom";
import Badge from "@/components/custom/Badge";

export default function Book() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { bookId },
  });
  const book = (data as any)?.book as BookType;

  if (loading) return <Spinner />;
  if (!book) return <>Book not found</>;

  const { title, status, author, rating, finished_at, review, started_at } =
    book;

  return (
    <div
      className={cn(
        "bg-card p-4 rounded-sm shadow-md relative",
        "w-fit mx-auto min-w-100"
      )}
    >
      <div className="mb-4">
        <h2 className="max-w-[90%]">{title}</h2>
        <p>{author.name}</p>
      </div>

      <div className="space-y-4 my-10">
        {(status === "READING" || status == "READ") && (
          <div className="text-sm [&_>div]:border-b [&_>div]:border-b-accent-muted/20 [&_>div]:mb-4 [&_>div]:flex [&_>div]:justify-between [&_>div]:w-full [&_>div]:items-center **:h-fit">
            <div>
              <p className="font-semibold">Started at</p>
              <p>{started_at ?? "---"}</p>
            </div>
            <div>
              <p className="font-semibold">Finished at</p>
              <p>{finished_at ?? "---"}</p>
            </div>
          </div>
        )}
        {status === "READ" && (
          <>
            <div
              className={cn(
                "text-sm",
                "[&_>div]:border-b [&_>div]:border-b-accent-muted/20 [&_>div]:mb-4 [&_>div]:flex [&_>div]:justify-between [&_>div]:w-full [&_>div]:items-center **:h-fit"
              )}
            >
              <div className="[&_>div]:my-0 [&_svg]:w-5">
                <p className="font-semibold">Rating</p>
                {rating ? (
                  <Rating
                    className="flex justify-center [&_button:hover]:cursor-default"
                    readOnly
                    rating={rating}
                  />
                ) : (
                  "No rating"
                )}
              </div>
            </div>
            <div className="text-sm">
              <p className="border-b w-full border-accent-muted/20 mb-4 font-semibold">
                Your review
              </p>
              <p className="text-center max-w-[80%] mx-auto">
                {review || "You have not left a review"}
              </p>
            </div>
          </>
        )}

        <Badge
          className="absolute top-3 right-3"
          variant={status === "READ" ? "success" : "info"}
        >
          {toCapitalized(status)}
        </Badge>
      </div>

      <div className="actions justify-self-end">
        <Button onClick={() => navigate(`/book/${bookId}/edit`)}>
          Edit details
        </Button>
      </div>
    </div>
  );
}
