import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@apollo/client/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Input from "./custom/Input";
import Select from "./custom/Select";
import Button from "./custom/Button";
import Rating from "./Rating";

import { ADD_BOOK, UPDATE_BOOK } from "@/graphql/mutations/books";
import { GET_BOOK, GET_BOOKS } from "@/graphql/queries/books";
import { GET_AUTHORS } from "@/graphql/queries/authors";
import { ADD_AUTHOR } from "@/graphql/mutations/authors";

import { bookFormSchema } from "@/domain/books/bookSchema";
import { initialBookValues } from "@/domain/books/bookDefaults";
import { mapBookToForm } from "@/domain/books/bookMapper";

import { AddBookInput, GetBookData } from "@/types/books";
import { Author, GetAuthorsData } from "@/types/authors";
import { useUI } from "@/context/useUI";
import { cn, toCapitalized } from "@/lib/utils";
import Textarea from "./custom/Textarea";

export default function BookForm() {
  const { bookId } = useParams();
  const isEdit = Boolean(bookId);
  const navigate = useNavigate();
  const { openToast } = useUI();
  const [newAuthor, setNewAuthor] = useState("");
  const redirectState = useLocation().state;

  if (redirectState)
    Object.assign(initialBookValues, {
      status: redirectState,
    });

  const form = useForm<AddBookInput>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: initialBookValues,
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = form;
  const status = watch("status");
  const authorId = watch("authorId");

  const { data } = useQuery(GET_BOOK, {
    variables: { bookId },
    skip: !isEdit,
  });

  const { data: authorsData, refetch: authorsRefetch } = useQuery(GET_AUTHORS);

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [GET_BOOKS],
  });

  const [updateBook] = useMutation(UPDATE_BOOK, {
    refetchQueries: [GET_BOOKS],
  });

  const [addAuthor] = useMutation(ADD_AUTHOR);

  /** Populate form when editing */
  useEffect(() => {
    if (isEdit && (data as GetBookData)?.book) {
      reset(mapBookToForm((data as GetBookData).book));
    }

    if (!isEdit) {
      reset(initialBookValues);
    }
  }, [isEdit, data, reset]);

  /** Submit handler */
  const onSubmit = async (input: AddBookInput) => {
    try {
      if (isEdit) {
        await updateBook({ variables: { input: { ...input, id: bookId } } });
      } else {
        await addBook({ variables: { input } });
        openToast({
          type: "success",
          content: { title: "Book was added!" },
        });
      }
      reset(initialBookValues);
      navigate("/");
    } catch (err) {
      openToast({
        type: "error",
        content: { title: `Failed to ${isEdit ? "update" : "add"} book` },
      });
      console.error(err);
    }
  };

  /** Add author inline */
  const handleAddAuthor = async () => {
    try {
      const result = await addAuthor({ variables: { name: newAuthor } });
      const id = (result.data as any).addAuthor.id;

      setNewAuthor("");
      setValue("authorId", id);
      authorsRefetch();
    } catch (err) {
      openToast({ content: { title: "Could not add author" }, type: "error" });
    }
  };

  // useEffect(() => {
  //   console.log("form.getValues():", form.getValues());
  // }, [form.getValues()]);

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "bg-card p-4 shadow-lg rounded-md max-w-150 grow",
        "[&>div:has(>input,>.select):not(.actions)]:mb-2",
        "[&_label]:block",
        !isEdit && "mx-auto"
      )}
    >
      <h2 className="mb-4">{isEdit ? "Update" : "Add"} Book</h2>

      <div className="space-y-2 my-10">
        <div
          className={cn(
            "flex flex-wrap gap-x-4",
            "[&>_div]:grow [&>_div]:flex [&>_div]:flex-col [&>_div]:max-w-[50%] "
          )}
        >
          {/* TITLE */}
          <div>
            <label htmlFor="title">Title</label>
            <Input
              id="title"
              {...register("title")}
              error={!!errors.title}
              errorMessage={errors.title?.message}
            />
          </div>

          {/* AUTHOR */}
          <div>
            <label htmlFor="authorId">Author</label>
            <Select
              error={!!errors.authorId}
              errorMessage={errors.authorId?.message}
              onSelect={(value) => form.setValue("authorId", value)}
              id="authorId"
              options={(authorsData as GetAuthorsData)?.authors.map((a) => ({
                value: a.id,
                label: a.name,
              }))}
              {...register("authorId")}
            >
              <p>
                {
                  (authorsData as any)?.authors.find(
                    (author: Author) => author.id === form.getValues("authorId")
                  )?.name
                }
              </p>
            </Select>
          </div>
        </div>

        {/* ADD NEW AUTHOR */}
        {authorId === "new" && (
          <div>
            <>
              <label htmlFor="newAuthor">Author name</label>
              <div className="flex gap-2">
                <Input
                  id="newAuthor"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                />
                <Button type="button" onClick={handleAddAuthor}>
                  Add
                </Button>
              </div>
            </>
          </div>
        )}

        {/* STATUS */}
        <div>
          <label htmlFor="status">Status</label>
          <Select
            id="status"
            error={!!errors.status}
            errorMessage={errors.status?.message}
            onSelect={(value) => form.setValue("status", value)}
            options={["READ", "READING", "UNREAD"].map((o) => ({
              value: o,
              label: toCapitalized(o),
            }))}
          >
            <p>{toCapitalized(watch("status"))}</p>
          </Select>
        </div>

        {/* REVIEW */}
        {watch("status") === "READ" && (
          <div>
            <label htmlFor="review">Review</label>
            <Textarea
              id="review"
              {...register("review")}
              maxLength={500}
              className="h-20"
              error={!!errors.review}
              errorMessage={errors.review?.message}
            />
          </div>
        )}

        {/* RATING */}
        {status === "READ" && (
          <>
            <p>Rating</p>
            <Rating
              className="justify-center"
              rating={watch("rating") ?? 0}
              setRating={(num) => setValue("rating", num)}
            />
          </>
        )}
      </div>

      {/* ACTIONS */}
      <div className="actions flex gap-2 mt-10 justify-end">
        <Button type="button" variant="error" onClick={() => navigate("/")}>
          Cancel
        </Button>
        <Button type="submit">{isEdit ? "Update book" : "Add book"}</Button>
      </div>
    </form>
  );
}
