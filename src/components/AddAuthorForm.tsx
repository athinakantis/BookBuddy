import { useState } from "react";
import Input from "./custom/Input";
import Button from "./custom/Button";
import { ADD_AUTHOR } from "@/graphql/mutations/authors";
import { useMutation } from "@apollo/client/react";
import { Author } from "@/types/authors";
import { toast } from "sonner";

type AddAuthorFormProps = Readonly<{
  onCancel: () => void;
  onCompleted: (newAuthor: Author) => void;
}>

export default function AddAuthorForm(props: AddAuthorFormProps) {
  const { onCancel, onCompleted } = props;
  const [authorName, setAuthorName] = useState("");
  const [addAuthor] = useMutation(ADD_AUTHOR, {
    onCompleted: (result) =>
      onCompleted((result as any).addAuthor)
  });

  const onSubmit = async () => {
    try {
      await addAuthor({ variables: { name: authorName } });
      toast.success("Author was added!");
      onCancel();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add author")
    }
  };

  return (
    <div>
      <label htmlFor="authorName">Name</label>
      <div className="flex gap-2">
        <Input
          autoFocus
          id="authorName"
          onChange={(e) => setAuthorName(e.target.value)}
        />
        <Button type="button" onClick={() => onSubmit()}>Add</Button>
        <Button type="button" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}
