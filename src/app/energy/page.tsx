"use client";
import Navbar from "@/components/Navbar";
import useRequestData from "@/hooks/useRequestData";
import { useEffect, useState } from "react";
import { Elspot, ElspotResponse } from "@/interfaces/interface";
import { start } from "repl";

export default function EnergiData() {
  const { data, isLoading, error, makeRequest } =
    useRequestData<ElspotResponse>();

    const [ area, setArea ] = useState("dk1")
    const [ startDate, setStartDate ] = useState("2023-12-01T00:00")
    const [ endDate, setEndDate ] = useState("2023-12-31T00:00")


  // --- useRequest
  useEffect(() => {
    makeRequest(
      "https://api.energidataservice.dk/dataset/Elspotprices?offset=0&start=" + startDate +"&end=" + endDate + "&filter=%7B%22PriceArea%22:[%22" + area + "%22]%7D&sort=HourUTC%20DESC",
      "GET"
    );
  }, [startDate, endDate, area]);

  return (
    <>
      <Navbar />
      <h1 className="text-6xl text-center my-3">Energidata for Danmark</h1>

      {/* Søgefelter */}
      <div className="text-center">

        <label>Start dato: </label>
        <input type="date"
        onChange={e => setStartDate(e.currentTarget.value)}
        value={startDate} 
        className="text-center w-80 m-5 p-2 rounded-full shadow-md"/>

        <label>Slut dato: </label>
        <input type="date"
        onChange={e => setEndDate(e.currentTarget.value)} 
        value={endDate}
        className="text-center w-80 m-5 p-2 rounded-full shadow-md"/>

        <label>Area: </label>
        <select name="areaDK" id="areaDK"
        onChange={ e => setArea(e.currentTarget.value)} 
        className="text-center w-80 m-5 p-2 rounded-full shadow-md">
          <option value="dk1">DK1 - Vest Danmark</option>
          <option value="dk2">DK2 - Øst Danmark</option>
        </select>

        <p >Priser mellem datoerne: <span className="font-bold text-blue-500">{startDate}</span>  og <span className="font-bold text-blue-500">{endDate}</span></p>
        <p>Area: <span className="font-bold text-blue-500">{area}</span></p>
      </div>

      {/* Data-card */}
      <article className="flex flex-wrap justify-center">
        {data &&
          data.records.map(e => (
            <div className="w-80 shadow-md p-5 border-t-4 border-t-purple-600 m-3 text-center">
              <p>Tid: <span className="text-gray-400">{e.HourDK}</span> </p>
              <p>Pris: {Math.round(e.SpotPriceDKK)} DKK / {Math.round(e.SpotPriceEUR)} EUR per MWh</p>
            </div>
          ))}
      </article>
    </>
  );
}
