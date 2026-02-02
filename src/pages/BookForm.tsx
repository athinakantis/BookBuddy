import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@apollo/client/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Input from "@/components/custom/Input";
import Select from "@/components/custom/Select";
import Button from "@/components/custom/Button";
import Rating from "@/components/Rating";

import { ADD_BOOK, UPDATE_BOOK } from "@/graphql/mutations/books";
import { GET_BOOK, GET_BOOKS } from "@/graphql/queries/books";
import { GET_AUTHORS } from "@/graphql/queries/authors";
import { ADD_AUTHOR, REMOVE_AUTHOR } from "@/graphql/mutations/authors";

import { bookFormSchema } from "@/domain/books/bookSchema";
import { initialBookValues } from "@/domain/books/bookDefaults";
import { mapBookToForm } from "@/domain/books/bookMapper";

import { AddBookInput, GetBookData } from "@/types/books";
import { Author, GetAuthorsData } from "@/types/authors";
import { useUI } from "@/context/useUI";
import { cn, toCapitalized } from "@/lib/utils";
import Textarea from "@/components/custom/Textarea";
import Separator from "@/components/custom/Separator";
import { useDebounce } from "@/hooks/useDebounce";
import Results from "@/components/custom/Results";
import { Plus, X } from "lucide-react";
import Spinner from "@/components/Spinner";
import AddAuthorForm from "@/components/AddAuthorForm";

export default function BookForm() {
  const { bookId } = useParams();
  const [isAddingAuthor, setIsAddingAuthor] = useState(false);
  const isEdit = Boolean(bookId);
  const navigate = useNavigate();
  const { openToast } = useUI();
  const [authorSearch, setAuthorSearch] = useState("");
  const { debouncedValue, loading: loadingDebounce } = useDebounce(
    authorSearch,
    500,
  );
  const redirectState = useLocation().state;
  const form = useForm({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      ...initialBookValues,
      ...(redirectState ?? {}),
    },
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
  const formAuthor = watch("author");

  const { data } = useQuery(GET_BOOK, {
    variables: { bookId },
    skip: !isEdit,
  });

  const {
    data: searchedAuthorsData,
    refetch: searchedAuthorsRefetch,
    loading: searchedAuthorsLoading,
  } = useQuery(GET_AUTHORS, {
    variables: { search: debouncedValue },
  });
  const {
    data: authorsData,
    refetch: authorsRefetch,
    loading: authorsLoading,
  } = useQuery(GET_AUTHORS, {
    variables: { limit: 10 },
  });
  const searchedAuthors =
    ((searchedAuthorsData as GetAuthorsData)?.authors.items as Author[]) ?? [];
  const authors =
    ((authorsData as GetAuthorsData)?.authors.items as Author[]) ?? [];
  const totalAuthorCount = (authorsData as GetAuthorsData)?.authors.totalCount;
  const [addBook] = useMutation(ADD_BOOK, {
    onCompleted: () => navigate("/"),
  });
  const [updateBook] = useMutation(UPDATE_BOOK, {
    refetchQueries: [GET_BOOKS],
    onCompleted: () => navigate("/"),
  });
  const [addAuthor] = useMutation(ADD_AUTHOR, {
    onCompleted: (result) =>
      setValue("author", {
        id: (result as any).addAuthor.id,
        name: (result as any).addAuthor.name,
      }),
  });
  const [removeAuthor] = useMutation(REMOVE_AUTHOR);

  /** Populate form when editing */
  useEffect(() => {
    if (isEdit && (data as GetBookData)?.book) {
      reset(mapBookToForm((data as GetBookData).book));
    }
    if (!isEdit) {
      reset({
        ...initialBookValues,
        ...(redirectState ?? {}),
      });
    }
  }, [isEdit, data, reset]);

  /** Submit handler */
  const onSubmit = async (input: AddBookInput) => {
    try {
      const { author, ...rest } = input;
      if (isEdit) {
        await updateBook({
          variables: {
            input: { id: bookId, authorId: author.id, ...rest },
          },
        });
      } else {
        await addBook({
          variables: { input: { id: bookId, authorId: author.id, ...rest } },
        });
      }
      openToast({
        type: "success",
        content: { title: `Book was ${isEdit ? "updated" : "added"}!` },
      });
      reset({
        ...initialBookValues,
        ...(redirectState ?? {}),
      });
    } catch (err) {
      openToast({
        type: "error",
        content: { title: `Failed to ${isEdit ? "update" : "add"} book` },
      });
      console.error(err);
    }
  };

  /** Add author inline */
  const handleAddAuthor = async (newAuthor: Author) => {
    try {
      setAuthorSearch("");
      setValue("author", { name: newAuthor.name, id: newAuthor.id });
      authorsRefetch();
    } catch (err) {
      console.log(err);
      openToast({ content: { title: "Could not add author" }, type: "error" });
    }
  };
  useEffect(() => {
    console.log("errors:", errors);
  }, [errors]);
  /** Add author inline */
  const handleRemoveAuthor = async (author: Author) => {
    openToast({
      content: {
        title: `Are you sure you want to remove ${author.name}?`,
      },
      onConfirm: async () => {
        try {
          await removeAuthor({ variables: { id: author.id } });
          void authorsRefetch();
        } catch (err) {
          console.log(err);
          openToast({
            content: { title: "Could not remove author" },
            type: "error",
          });
        }
      },
    });
  };

  useEffect(() => {
    console.log("errors:", errors);
  }, [errors]);

  // Refetch authors when search has been updated and debounced
  useEffect(() => {
    if (debouncedValue) {
      searchedAuthorsRefetch({
        search: debouncedValue,
      });
    }
  }, [debouncedValue]);

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "bg-card shadow-sm rounded-md grow max-w-150 w-full",
        "[&>div:has(>input,>.select):not(.actions)]:mb-2",
        "[&>_div:not(.separator)]:p-6",
        "[&_h2]:mb-4",
        "[&_label]:block",
      )}
    >
      <div className="space-y-2">
        <h2>Book Details</h2>

        <div
          className={cn(
            "flex flex-wrap gap-x-4",
            "[&>_div]:grow [&>_div]:flex [&>_div]:flex-col [&>_div]:max-w-[50%] ",
          )}
        >
          {/* TITLE */}
          <div>
            <label htmlFor="title">Title</label>
            <Input
              id="title"
              {...register("title")}
              error={!!errors.title}
              errorMessage={errors.title?.message?.toString()}
            />
          </div>

          {/* STATUS */}
          <div>
            <label htmlFor="status">Status</label>
            <Select
              id="status"
              error={!!errors.status}
              errorMessage={errors.status?.message?.toString()}
              onSelect={(value) => form.setValue("status", value)}
              options={["READ", "READING", "UNREAD"].map((o) => ({
                value: o,
                label: toCapitalized(o),
              }))}
            >
              <p>{toCapitalized(watch("status"))}</p>
            </Select>
          </div>
        </div>

        {/* REVIEW */}
        {watch("status") === "READ" && (
          <div>
            <label htmlFor="review">Review</label>
            <Textarea
              id="review"
              {...register("review")}
              className="h-20"
              error={!!errors.review}
              errorMessage={errors.review?.message?.toString()}
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

      <Separator aria-hidden />

      <div>
        <h2>Choose Author</h2>

        <input
          type="hidden"
          {...register("author.id")}
        />
        <input
          type="hidden"
          {...register("author.name")}
        />

        {formAuthor.name && (
          <div className="flex gap-2">
            <p className="text-lg">{formAuthor.name}</p>
            <Button
              type="button"
              variant="error"
              aria-label="Remove author"
              onClick={() => form.setValue("author", { id: "", name: "" })}
            >
              <X
                size={15}
                aria-hidden
              />
            </Button>
          </div>
        )}

        {isAddingAuthor && <AddAuthorForm onCancel={() => setIsAddingAuthor(false)} onCompleted={(newAuthor: Author) => handleAddAuthor(newAuthor)} />}
        {!isAddingAuthor && (
          <div className="flex flex-wrap gap-1 mt-8">
            {authors.length > 0 &&
              authors.map((author) => (
                <div
                  key={`author-badge-${author.id}`}
                  className={"flex rounded-md"}
                >
                  <Button
                    type="button"
                    onClick={() => setValue("author", author)}
                    variant={watch("author.id") === author.id ? "success" : "primary"}
                    className="rounded-tr-none rounded-br-none transition-colors"
                  >
                    {author.name}
                  </Button>
                  <Button
                    className="rounded-tl-none rounded-bl-none"
                    variant="error"
                    type="button"
                    onClick={() => handleRemoveAuthor(author)}
                    aria-label="Delete author"
                  >
                    <X
                      size={8}
                      aria-hidden
                    />
                  </Button>
                </div>
              ))}
            <Button
              type="button"
              onClick={() => setIsAddingAuthor(true)}
              aria-label="Add a new author"
            >
              <Plus
                size={12}
                aria-hidden
              />
            </Button>
          </div>
        )}

        {totalAuthorCount > 10 && (
          <div className="relative mt-8">
            <div>
              <label htmlFor="author-search">Search</label>
              <Input
                id="author-search"
                onChange={(e) => setAuthorSearch(e.target.value)}
              ></Input>
            </div>

            {loadingDebounce && <Spinner className="mt-4" />}
            {!loadingDebounce && debouncedValue && authorSearch && (
              <>
                {searchedAuthors?.length > 0 && (
                  <Results
                    options={searchedAuthors.map((author) => ({
                      value: author.id,
                      label: author.name,
                    }))}
                    name="author-search"
                    onSelect={(option) => {
                      setValue("author", {
                        name: option.label,
                        id: option.value,
                      });
                      setAuthorSearch("");
                    }}
                  />
                )}

                {authors?.length === 0 && (
                  <div className="flex gap-2 px-2 pt-4">
                    No results found for {authorSearch}.
                    <Button
                      type="button"
                      onClick={() =>
                        addAuthor({ variables: { name: authorSearch } })
                      }
                    >
                      Create author
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* ACTIONS */}
      <div className="actions flex gap-2 mt-10 justify-end">
        <Button
          type="button"
          variant="error"
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
        <Button type="submit">{isEdit ? "Update book" : "Add book"}</Button>
      </div>
    </form>
  );
}
