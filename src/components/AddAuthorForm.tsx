import React, { useState } from "react";
import Input from "./custom/Input";
import Button from "./custom/Button";
import { Plus } from "lucide-react";
import { ADD_AUTHOR } from "@/graphql/mutations/authors";
import { useMutation } from "@apollo/client/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authorFormSchema } from "@/domain/authors/authorSchema";
import { useUI } from "@/context/useUI";

export default function AddAuthorForm() {
  const [addAuthor] = useMutation(ADD_AUTHOR);
  const {openToast} = useUI();
  const form = useForm({
    resolver: zodResolver(authorFormSchema),
    defaultValues: { name: "" },
  });
  const [isAdding, setIsAdding] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const onSubmit = async (name: { name: string }) => {
    try {
      await addAuthor({ variables: { name } });
      openToast({
        type: "success",
        content: { title: "Author was added!" },
      });
    } catch (error) {
      openToast({
        type: "error",
        content: { title: "Failed to add author" },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="authorName">Name</label>
      <div className="flex gap-2">
        <Input id="authorName" {...register("name")} error={!!errors.name} errorMessage={errors.name?.message} />
        {!isAdding && (
          <Button
            variant="secondary"
            className="hover:text-bg"
            disabled={isAdding}
          >
            <Plus />
          </Button>
        )}
      </div>
    </form>
  );
}
