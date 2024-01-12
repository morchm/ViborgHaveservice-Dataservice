"use client"
import useRequestData from "../../hooks/useRequestData";
import { useState, useEffect, HTMLInputTypeAttribute } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { AboutUs, AboutUsPUT } from "@/interfaces/interface";

export default function Services(){

    // --- useRequests
    const { data, isLoading, error, makeRequest } = useRequestData<AboutUs>();
    const { data:dataPUT, isLoading:isLoadingPUT, error:errorPUT, makeRequest:makeRequestPUT} = useRequestData<AboutUsPUT>();

    // --- useStates
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    // --- GET aboutus-admin
    useEffect(()=>{
        makeRequest("http://localhost:5023/aboutus", "GET")
    }, [])

    useEffect(()=> {
        if (data) {
            setTitle(data.title);
            setContent(data.content);
        }
    }, [data])


    // --- PUT handesubmit
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nyPost = { title: title, content: content }

        makeRequestPUT("http://localhost:5023/aboutus/admin", "PUT", nyPost)
    }

    

    return(
        <div className="max-w-screen-2xl bg-neutral-100 h-full">
                <Navbar/>
            <div className="p-10">
                <Link href="/" className="mainGreenBackground text-white hover:bg-green-600 transition-colors p-3 rounded my-8">Tilbage</Link>
                <h1 className="text-center text-2xl font-bold mb-10">Admin side</h1>

                {/* --- Rettelse godkendt --- */}
                {dataPUT && (
                    <div className="m-auto my-5 max-w-96">
                        <h2 className="text-lg text-center">Velkomst beskeden er rettet!</h2>
                        <p className="my-2">Titel: <br /> <span className="italic text-neutral-400">{dataPUT.about.title}</span> </p>
                        <p>Besked: <br/> <span className="text-sm text-neutral-400">{dataPUT.about.content.length > 100 ? dataPUT.about.content : dataPUT.about.content.slice (0, 100) + " ..."}</span> </p>
                    </div>
                )}

                {/* --- Submit --- */}
                <form onSubmit={handleSubmit} className="text-center">
                    {/* --- Ret titel */}
                    <div className="flex flex-col m-auto max-w-80">
                        <label>Titel</label>
                        <input 
                        type="text"
                        placeholder="Titel"
                        onInput={(e: React.FormEvent<HTMLInputElement>)=> setTitle(e.currentTarget.value)}
                        value={title}
                        className="text-center p-2"
                        />
                    </div>

                    {/* --- Ret content */}
                    <div className="flex flex-col m-auto my-5 max-w-lg">
                        <label>Beskrivelse</label>
                        <textarea 
                        rows={10}
                        placeholder="Content"
                        onInput={(e:React.FormEvent<HTMLTextAreaElement>)=> setContent(e.currentTarget.value)}
                        value={content}
                        className="p-4"
                        />
                    </div>

                    <button type="submit" className="mainGreenBackground text-white hover:bg-green-600 transition-colors p-3 rounded my-8">Ret velkomstbesked</button>
                </form>
            </div>
        </div>
    )
}