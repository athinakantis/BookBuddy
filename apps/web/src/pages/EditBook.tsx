import AuthorForm from "@/components/AuthorForm";
import BookForm from "@/components/BookForm";
import Card from "@/components/Card";

export default function EditBook() {
  return (
    <div className="flex gap-4 justify-center">
      <BookForm />
      <AuthorForm />
    </div>
  );
}