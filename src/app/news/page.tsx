"use client";
import Navbar from "@/components/Navbar";
import useRequestData from "@/hooks/useRequestData";
import { useEffect, useState } from "react";
import { NewsAPIResponse, NewsAPI } from "@/interfaces/interface";
import Link from "next/link";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

export default function News() {
  // --- useRequest
  const { data, isLoading, error, makeRequest } =
    useRequestData<NewsAPIResponse>();

  // --- useState
  const [search, setSearch] = useState("bitcoin");
  const [language, setLanguage] = useState("en");
  const [sortBy, setSortBy] = useState("relevancy");

  // --- useEffect
  useEffect(() => {
    makeRequest(
      "https://newsapi.org/v2/everything?q=" +
        search +
        "&language=" +
        language +
        "&sortBy=" +
        sortBy +
        "&apiKey=4317cd71220a455aa2817f065604b3c9",
      "GET"
    );
  }, [search, language, sortBy]);

  return (
    <main className="bg-neutral-100 ">
      {error && <Error />}
      {isLoading && <Loading />}

      <Navbar />
      <div className="flex justify-center">
        {/* --- Search */}
        <label className="my-auto">Search: </label>
        <input
          type="search"
          onChange={e => setSearch(e.currentTarget.value)}
          value={search}
          placeholder="Search..."
          className="text-center w-80 m-5 p-2 rounded-full shadow-sm"
        />

        {/* --- Language */}
        <label className="my-auto mx-3">Language:</label>
        <select
          name="language"
          id="language"
          defaultValue={"en"}
          onChange={e => setLanguage(e.currentTarget.value)}
          className="rounded-full w-32 my-auto p-2">
          <option value="en">English</option>
          <option value="de">German</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="ar">Arabic</option>
        </select>

        {/* --- SortBy */}
        <label className="my-auto mx-3">Sort by:</label>
        <select
          name="sort"
          id="sort"
          defaultValue={"relevancy"}
          onChange={e => setSortBy(e.currentTarget.value)}
          className="rounded-full w-32 my-auto p-2">
          <option value="relevancy">Relevancy</option>
          <option value="popularity">Popularity</option>
          <option value="publishedAt">Published at</option>
        </select>
      </div>
      <article className="flex flex-wrap justify-center">
        {data &&
          data.articles.map(e => (
            // Article card
            <div className="max-w-80 border-t-4 border-t-orange-400 rounded shadow-md m-4">
              <img
                src={e.urlToImage || "/images/placeholder-image.jpg"}
                className="w-full"
              />
              <section className="px-4 py-1">
                <h2 className="font-bold text-xl">{e.title}</h2>
                <p className="text-sm my-1">
                  Written by:{" "}
                  <span className="font-bold text-gray-500">{e.author}</span>
                </p>
                <p>{e.description}</p>
              </section>
              <button className="mt-2 mb-5">
                <Link
                  href={e.url}
                  target="_blank"
                  className="mainGreenBackground text-white hover:bg-green-600 transition-colors m-3 p-1 rounded my-3">
                  Read more...
                </Link>
              </button>
            </div>
          ))}
      </article>
    </main>
  );
}
