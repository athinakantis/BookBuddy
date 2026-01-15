import Card from "./Card";
import Search from "./Search";

export default function AuthorForm() {

  return (
    <Card className="w-80 bg-bg-clear p-4 rounded-md">
      <h3>Authors</h3>
      <Search className="mt-2" />

      <p>Most popular authors</p>
      
    </Card>
  );
}