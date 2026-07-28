"use client";

import Image from "next/image";
import LinearProgress from "@mui/material/LinearProgress";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ProfilePic from "./ProfilePic";
import Alert from "./Alert";
import Modal from "./Modal";

import { getQuotes, saveQuote } from "../utils/quotes/quoteActions";
import { resetQuotesState } from "../utils/quotes/quoteSlice";
import type { AppDispatch, RootState } from "../utils/store";

import {
  addQuoteSchema,
  type AddQuoteFormValues,
  type AddQuoteFormOutput,
} from "../lib/validation/quote";

import "../scss/addquote.scss";

const AddQuote = () => {
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, success } = useSelector(
    (state: RootState) => state.quotes,
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddQuoteFormValues, undefined, AddQuoteFormOutput>({
    resolver: zodResolver(addQuoteSchema),
    mode: "onSubmit",
    defaultValues: {
      content: "",
      file: null,
    },
  });

  useEffect(() => {
    return () => {
      dispatch(resetQuotesState());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setValue("file", selectedFile, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setImagePreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  const closeImagePreview = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview(null);

    setValue("file", null, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = async (values: AddQuoteFormOutput) => {
    const formData = new FormData();

    formData.append("content", values.content);

    if (values.file) {
      formData.append("file", values.file);
    }

    try {
      await dispatch(saveQuote(formData)).unwrap();

      reset({
        content: "",
        file: null,
      });

      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      setImagePreview(null);

      await dispatch(getQuotes());
    } catch (error) {
      console.error("Unable to save quote:", error);
    }
  };

  return (
    <>
      {loading && <LinearProgress />}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {!isSubmitting && ((error && error !== "Network Error") || success) && (
          <Alert {...(error || success)} />
        )}

        <section className="add-quote flex">
          <ProfilePic />

          <div className="quote-input relative flex-1">
            <textarea
              placeholder="Add your favorite quote, excerpt etc."
              className="quotes-text"
              aria-invalid={Boolean(errors.content)}
              {...register("content")}
            />

            {errors.content && (
              <div className="field-error" role="alert">
                {errors.content.message}
              </div>
            )}

            {imagePreview && (
              <div className="img-container">
                <button
                  type="button"
                  className="image-preview-button"
                  onClick={() => setShowModal(true)}
                  aria-label="Open image preview"
                >
                  <Image
                    src={imagePreview}
                    alt="Selected quote preview"
                    width={640}
                    height={360}
                    unoptimized
                  />
                </button>

                <button
                  type="button"
                  className="remove-image-button"
                  onClick={closeImagePreview}
                  aria-label="Remove selected image"
                >
                  <i className="fa fa-times-circle" />
                </button>
              </div>
            )}

            {errors.file && (
              <div className="field-error" role="alert">
                {errors.file.message}
              </div>
            )}

            <div className="absolute w-[100%]">
              <ul className="flex justify-between items-center">
                <li>
                  <label
                    htmlFor="quotefileInput"
                    className="cursor-pointer"
                    aria-label="Select an image"
                  >
                    <i className="fa fa-image text-xl" />
                  </label>

                  <input
                    type="file"
                    id="quotefileInput"
                    className="quote-file-input"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleFileSelect}
                  />
                </li>

                <li>
                  <button
                    type="submit"
                    className="btn btn-small mt-2"
                    disabled={loading || isSubmitting}
                  >
                    {loading || isSubmitting ? "Posting..." : "Post"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </form>

      <Modal
        open={showModal}
        close={() => setShowModal(false)}
        content={imagePreview}
      />
    </>
  );
};

export default AddQuote;
