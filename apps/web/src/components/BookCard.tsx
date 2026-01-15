import { Check, X } from "lucide-react";
import { DragEvent } from "react";
import { Book } from "../types/books";
import Button from "./custom/Button";
import Rating from "./Rating";
import { useMutation } from "@apollo/client/react";
import { REMOVE_BOOK, UPDATE_BOOK_STATUS } from "@/graphql/mutations/books";
import { useNavigate } from "react-router-dom";
import { GET_BOOKS } from "@/graphql/queries/books";
import Card from "./Card";
import { useUI } from "@/context/useUI";

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  const { title, status, author, rating, id } = book;

  const { openToast } = useUI();
  const [removeBook] = useMutation(REMOVE_BOOK, {
    refetchQueries: [GET_BOOKS],
  });
  const [updateStatus] = useMutation(UPDATE_BOOK_STATUS, {
    refetchQueries: [GET_BOOKS],
  });
  const navigate = useNavigate();

  const handleRemove = () => {
    try {
      openToast({
        content: {
          title: `Are you sure you want to remove ${title}?`,
          confirm: true,
        },
        onConfirm: () => removeBook({ variables: { bookId: id } }),
      });
    } catch (error) {
      openToast({
        content: { title: "Failed to remove book" },
        type: "error",
      });
    }
  };

  function handleDragStart(e: DragEvent) {
    console.log(`dragging...`);
    e.stopPropagation();
    try {
      e.dataTransfer.setData(
        "application/json",
        JSON.stringify({ bookId: id })
      );
    } catch (err) {
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
        navigate(`/book/${book.id}`);
      }}
    >
      <div className="mb-4">
        <p className="font-semibold text-lg max-w-[90%]">{title}</p>
        <p>{author.name}</p>
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

      {/* REMOVE BOOK */}
      <Button
        className="top-2 right-2 absolute border-none p-2"
        variant="icon"
        onClick={(e) => {
          e.stopPropagation();
          handleRemove();
        }}
      >
        <X size={14} />
      </Button>
    </Card>
  );
}
