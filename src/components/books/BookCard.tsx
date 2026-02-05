import { Check } from "lucide-react";
import { DragEvent, HTMLAttributes } from "react";
import { Book } from "@/types/books";
import Button from "@/components/custom/Button";
import Rating from "@/components/ui/Rating";
import { useMutation } from "@apollo/client/react";
import { UPDATE_BOOK_STATUS } from "@/graphql/mutations/books";
import { useNavigate } from "react-router-dom";
import { GET_BOOKS } from "@/graphql/queries/books";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type BookCardProps = Readonly<HTMLAttributes<HTMLDivElement> & {
  book: Book;
}>;

export default function BookCard(props: BookCardProps) {
  const { title, status, author, rating, id } = props.book;
  const { className, ...rest } = props;

  const [updateStatus] = useMutation(UPDATE_BOOK_STATUS, {
    refetchQueries: [GET_BOOKS],
  });
  const navigate = useNavigate();


  function handleDragStart(e: DragEvent) {
    e.stopPropagation();
    try {
      e.dataTransfer.setData(
        "application/json",
        JSON.stringify({ bookId: id, status })
      );
    } catch (err) {
      console.log(err)
      e.dataTransfer.setData("text/plain", String(id));
    }
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/book/${id}`);
      }}
      className={cn("max-w-80 hover:cursor-pointer", className)}
      {...rest}
    >
      <div className="mb-4 space-y-1">
        <p className="font-semibold text-xl max-w-[90%] leading-[1.2]">{title}</p>
        <p className="italic">{author.name}</p>
      </div>


      {/* RATING / ACTIONS */}
      <div className="flex gap-2 flex-wrap mt-auto">
        {rating ? (
          <Rating
            readOnly
            rating={rating}
          />
        ) : (
          <>
            {status === "READING" && (
              <Button
                variant="primary"
                className="pr-3"
                onClick={(e) => {
                  e.stopPropagation();
                  updateStatus({ variables: { status: "READ", bookId: id } });
                }}
              >
                <Check size={15} />
                Mark as read
              </Button>
            )}
            {status === "UNREAD" && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  updateStatus({
                    variables: { status: "READING", bookId: id },
                  });
                }}
              >
                start reading
              </Button>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
