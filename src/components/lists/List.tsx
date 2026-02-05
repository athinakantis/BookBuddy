import { List } from "@/types/lists";
import { HTMLAttributes } from "react";
import Card from "@/components/ui/Card";
import { useNavigate } from "react-router-dom";
import BookCard from "@/components/books/BookCard";

type ListPreviewProps = Readonly<
  HTMLAttributes<HTMLDivElement> & {
    list: List;
  }
>;

export default function ListPreview(props: ListPreviewProps) {
  const navigate = useNavigate();
  const {
    list: { name, id, description, books },
  } = props;
  return (
    <Card
      className="bg-card-muted hover:cursor-pointer space-y-4 max-w-200"
      onClick={() => navigate(`/lists/${id}`)}
    >
      <div>
        <h2>{name}</h2>
        {description && <p className="text-sm">{description}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {books?.length > 0 ? (
          books.map((book) => <BookCard key={book.id} book={book} className="max-w-none"/>)
        ) : (
          <div className="w-full p-4 rounded-md border-accent-muted relative transition-all hover:cursor-default text-center justify-center items-center space-y-4 flex h-full min-h-20">
            <p className="italic">List empty</p>
          </div>
        )}
      </div>
    </Card>
  );
}
