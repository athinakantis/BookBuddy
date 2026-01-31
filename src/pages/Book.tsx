import Button from "@/components/custom/Button";
import Rating from "@/components/Rating";
import Spinner from "@/components/Spinner";
import { GET_BOOK } from "@/graphql/queries/books";
import { cn } from "@/lib/utils";
import { Book as BookType } from "@/types/books";
import { useMutation, useQuery } from "@apollo/client/react";
import { useNavigate, useParams } from "react-router-dom";
import { useUI } from "@/context/useUI";
import { REMOVE_BOOK } from "@/graphql/mutations/books";
import { EllipsisVertical, Pen, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function Book() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { openToast } = useUI();
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { bookId },
  });
  const book = (data as any)?.book as BookType;
  const [removeBook] = useMutation(REMOVE_BOOK);

  const handleRemove = () => {
    try {
      openToast({
        content: {
          title: `Are you sure you want to remove ${title}?`,
        },
        onConfirm: async () => {
          await removeBook({ variables: { bookId } });
          openToast({
            content: {
              title: "Book was removed!",
            },
            type: "success",
          });
          navigate(-1);
        },
      });
    } catch (error) {
      console.log(error);
      openToast({
        content: { title: "Failed to remove book" },
        type: "error",
      });
    }
  };

  if (loading) return <Spinner />;
  if (!book) return <>Book not found</>;

  const { title, status, author, rating, finished_at, review, started_at } =
    book;

  return (
    <div
      className={cn(
        "bg-bg-clear p-4 rounded-sm shadow-sm relative",
        "mx-auto w-100",
      )}
    >

      {/* Book Title */}
      <div className="mb-4">
        <h2 className="max-w-[90%]">{title}</h2>
        <p>{author.name}</p>
      </div>

      {/* Book Details - Status, Review, Rating */}
      <div className="space-y-4 my-10">
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

        {status === "READ" && (
          <>
            <div
              className={cn(
                "text-sm",
                "[&_>div]:border-b [&_>div]:border-b-accent-muted/20 [&_>div]:mb-4 [&_>div]:flex [&_>div]:justify-between [&_>div]:w-full [&_>div]:items-center **:h-fit",
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
      </div>

      {status === "UNREAD" && <Button variant="success" className="justify-self-end">Start Reading</Button>}

      {/* Options Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="absolute top-4 right-4 data-[state='open']:bg-accent-muted/40"
            variant="icon"
            aria-label="Open book options"
          >
            <EllipsisVertical
              aria-hidden
              size={20}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="bg-bg-clear border-accent-muted/40 outline-2 outline-accent-muted/40 **:[[role='menuitem']]:focus:bg-accent-muted/20 **:[[role='menuitem']]:hover:cursor-pointer"
        >
          <DropdownMenuItem onSelect={() => navigate(`/book/${bookId}/edit`)}>
            <Pen />
            Edit</DropdownMenuItem>
          <DropdownMenuItem onSelect={handleRemove}>
            <XCircle />Remove</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
