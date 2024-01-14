"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import useRequestData from "@/hooks/useRequestData";
import { FormEvent, useEffect, useState } from "react";
import { Review, ReviewPOST } from "../../../interfaces/interface";
import Error from "@/components/Error";
import Loading from "@/components/Loading";

export default function reviewsEdit({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const id = searchParams.id;

  // --- useRequest
  const { data, isLoading, error, makeRequest } = useRequestData<Review>();
  const {
    data: dataPUT,
    isLoading: isLoadingPUT,
    error: errorPUT,
    makeRequest: makeRequestPUT,
  } = useRequestData<ReviewPOST>();

  // --- useStates
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  // --- useEffect
  useEffect(() => {
    makeRequest("http://localhost:5023/reviews/" + id, "GET");
  }, []);

  useEffect(() => {
    if (data) {
      setAuthor(data.author);
      setContent(data.content);
    }
  }, [data]);

  // --- handleSubmit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newReview = {
      author: author,
      content: content,
    };

    makeRequestPUT(
      "http://localhost:5023/reviews/admin/" + id,
      "PUT",
      newReview
    );
  };

  return (
    <div className="max-w-screen-2xl bg-neutral-100 h-screen">
      <Navbar />
      {error && <Error />}
      {isLoading && <Loading />}
      <div className="p-10">
        <Link
          href="/reviewsAdmin"
          className="mainGreenBackground text-white hover:bg-green-600 transition-colors p-3 rounded my-8">
          Tilbage
        </Link>
        <h1 className="text-center text-3xl font-bold mt-18">Reviews Edit</h1>

        {dataPUT && (
          <div>
            <h2>{dataPUT.message}</h2>
            <p>Navn: {dataPUT.review.author}</p>
            <p>Anmeldelse: {dataPUT.review.content}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="text-center">
          <div className="flex flex-col m-auto my-5 max-w-lg">
            <label>Navn</label>
            <input
              type="text"
              placeholder="Indtast dit fulde navn..."
              onInput={(e: React.FormEvent<HTMLInputElement>) =>
                setAuthor(e.currentTarget.value)
              }
              value={author}
              required
              className="p-2"
            />
          </div>

          <div className="flex flex-col m-auto my-5 max-w-lg">
            <label>Anmeldelse</label>
            <textarea
              rows={10}
              placeholder="Indtast din anmeldelse..."
              onInput={(e: React.FormEvent<HTMLTextAreaElement>) =>
                setContent(e.currentTarget.value)
              }
              value={content}
              required
              className="p-2"
            />
          </div>

          <button
            type="submit"
            className="mainGreenBackground text-white hover:bg-green-600 transition-colors p-3 rounded my-8">
            Ret anmeldelse
          </button>
        </form>
      </div>
    </div>
  );
}
