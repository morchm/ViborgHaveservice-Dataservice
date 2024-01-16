"use client";
import useRequestData from "../../../hooks/useRequestData";
import { useState, useEffect, HTMLInputTypeAttribute } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Review, ReviewDELETE } from "@/interfaces/interface";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

export default function reviewsAdmin() {
  // --- useRequests ---
  const { data, isLoading, error, makeRequest } = useRequestData<[Review]>();
  const {
    data: dataDELETE,
    isLoading: isLoadingDELETE,
    error: errorDELETE,
    makeRequest: makeRequestDELETE,
  } = useRequestData<ReviewDELETE>();

  // --- GET alle reviews ---
  useEffect(() => {
    makeRequest("http://localhost:5023/reviews", "GET");
  }, [dataDELETE]);

  //  --- HandleDelete ---
  const handleDelete = (review: Review) => {
    if (
      window.confirm(
        "Er du sikker på du vil slette anmeldelsen fra: " + review.author + "?"
      )
    ) {
      makeRequestDELETE(
        "http://localhost:5023/reviews/admin/" + review._id,
        "DELETE"
      );
    }
  };

  return (
    <>
      <Navbar />
      {error && <Error />}
      {isLoading && <Loading />}
      <div className="flex flex-col justify-center max-w-screen-xl m-auto">
        <h1 className="mt-20 mb-10 text-center font-bold text-3xl">
          Reviews - Admin
        </h1>

        {/* --- Opret ny anmeldelse --- */}
        <Link
          href="reviewsCreate"
          className="mainGreenBackground text-center text-white hover:bg-green-600 w-50 p-3 mb-5 rounded  m-auto">
          Skriv en ny anmeldelse..
        </Link>

        {/* --- Table --- */}
        <table className="max-w-4xl m-auto mb-10">
          <thead className="mainGreenBackground text-white my-5">
            <tr>
              <td className="p-2">ID</td>
              <td className="p-2">Forfatter</td>
              <td className="p-2">Anmeldelse</td>
              <td>RET</td>
              <td className="px-2">SLET</td>
            </tr>
          </thead>

          <tbody className="my-5">
            {data &&
              data.map(p => (
                <tr>
                  <td className="px-5">{p._id}</td>
                  <td className="px-5">{p.author}</td>
                  <td className="px-5 py-2">"{p.content}"</td>
                  <td className="my-2">
                    <Link
                      href={{
                        pathname: "/reviews/reviewsEdit",
                        query: { id: p._id },
                      }}>
                      <FaRegEdit className="text-4xl hover:text-blue-600" />
                    </Link>
                  </td>
                  <td className="px-2">
                    <button onClick={() => handleDelete(p)}>
                      <MdOutlineDeleteOutline className="text-4xl hover:text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
