// --- MANGLER ---
// At få lavet carousel
// Putte filter på background-image

"use client";
import { SetStateAction, useEffect, useState } from "react";
import useRequestData from "@/hooks/useRequestData";
import Navbar from "@/components/Navbar";
import { Review } from "@/interfaces/interface";
import Error from "@/components/Error";
import Loading from "@/components/Loading";

export default function Reviews() {
  const { data, isLoading, error, makeRequest } = useRequestData<[Review]>();

  const [currentIndex, setCurrentIndex] = useState(2);

  useEffect(() => {
    makeRequest("http://localhost:5023/reviews", "GET");
  }, []);

  return (
    <>
      <Navbar />
      {error && <Error />}
      {isLoading && <Loading />}

      <div className="reviewBackground">
        <div className="text-center text-white p-20">
          <h2 className="font-bold text-3xl">Kundeudtalelser</h2>
          {/* --- REVIEWS CARD --- */}
          <div className="carouselContainer py-10">
            {data && Carousel(currentIndex, data, setCurrentIndex)}
          </div>
        </div>
      </div>
    </>
  );
}

// ---------- CAROUSEL COMPONENT ---------
function Carousel(
  currentIndex: number,
  reviews: [Review],
  setIndex: React.Dispatch<SetStateAction<number>>
) {
  // --- Preload min. 3 images
  const nextCurrPrev = [currentIndex - 1, currentIndex, currentIndex + 1];

  // --- Mapping af reviews
  const carouselReviews = nextCurrPrev.map((e, i) => {
    const rev = reviews[e];
    let carouselPos: number;
    switch (i) {
      case 0:
        carouselPos = -100;
        break;
      case 1:
        carouselPos = 0;
        break;
      case 2:
        carouselPos = 100;
        break;
      default:
        carouselPos = -100;
    }

    if (rev)
      return (
        <div className="carousel-slide" style={{left: carouselPos + "%"}} key={rev._id}>
          <p>"{rev.content}"</p>
          <p>- {rev.author}</p>
        </div>
      );
  });

  // --- Runde knapper til prev/curr/next reviews
  const carouselButtons = reviews.map((e, i) => (
    <button
      type="button"
      key={e._id}
      onClick={() => setIndex(i)}
      className={"rounded-full border-white border-2 bg-white p-2 mx-5 my-36 " + (currentIndex == i ? "bg-opacity-100" : "bg-opacity-55")}></button>
  ));

  return (
    <>
      {carouselReviews}
      {carouselButtons}
    </>
  );
}
