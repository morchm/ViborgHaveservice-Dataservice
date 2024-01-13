"use client"
import { useState, useEffect, FormEvent } from "react";
import useRequestData from "@/hooks/useRequestData";
import Navbar from "@/components/Navbar";
import { ReviewPOST, Review } from "@/interfaces/interface";

export default function reviewsCreate(){

    // --- useRequest
    const { data, isLoading, error, makeRequest } = useRequestData<ReviewPOST>();

    // --- useStates
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");

    // --- handleSubmit
    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
    
        const newReview = {author, content};
    
        makeRequest("http://localhost:5023/reviews/admin", "POST", newReview);
      };


    return(
        <div className="max-w-screen-2xl bg-neutral-100 h-screen">
            <Navbar/>

            <h1 className="text-center text-3xl font-bold mt-20">Reviews - Create new review</h1>

            {data && (
                <div>
                    <h2>Anmeldelse oprettet!</h2>
                    <p>Navn: {data.review.author}</p>
                    <p>Anmeldelse: {data.review.content}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="text-center">
                <div className="flex flex-col m-auto my-5 max-w-lg">
                    <label>Navn</label>
                    <input 
                        type="text"
                        placeholder="Indtast dit fulde navn..."
                        onInput={(e: React.FormEvent<HTMLInputElement>) => setAuthor(e.currentTarget.value)}
                        value={author}
                        required 
                        className="p-2"/>
                </div>

                <div className="flex flex-col m-auto my-5 max-w-lg">
                    <label>Anmeldelse</label>
                    <textarea 
                        rows={10}
                        placeholder="Indtast din anmeldelse..."
                        onInput={(e: React.FormEvent<HTMLTextAreaElement>) => setContent(e.currentTarget.value)}
                        value={content}
                        required 
                        className="p-2"/>
                </div>

                <button type="submit" className="mainGreenBackground text-white hover:bg-green-600 transition-colors p-3 rounded my-8">
                    Post anmeldelse
                </button>


            </form>
        </div>
    )
}