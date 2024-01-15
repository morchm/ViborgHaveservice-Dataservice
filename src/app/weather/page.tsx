"use client";
import { useState, useEffect, FormEvent, ReactElement } from "react";
import useRequestData from "@/hooks/useRequestData";
import Navbar from "@/components/Navbar";
import { OpenWeatherResponse } from "@/interfaces/interface";
import LeafletMap from "./LeafletMap";
import Error from "@/components/Error";
import Loading from "@/components/Loading";

export default function weather() {
  // --- useRequest
  const { data, isLoading, error, makeRequest } =
    useRequestData<OpenWeatherResponse>();
  const { data: dataDAWA, makeRequest: makeRequestDAWA } =
    useRequestData<any>();

  // --- useState
  const [zip, setZip] = useState("4000");

  // --- useEffect - GET
  useEffect(() => {
    if (zip.length === 4) {
      makeRequest(
        "https://api.openweathermap.org/data/2.5/forecast?zip=" +
          zip +
          ",dk&appid=ce9282584cfaaac68fda86f7e2e24f70&units=metric",
        "GET"
      );
    }
  }, [zip]);

  useEffect(() => {
    makeRequestDAWA(
      "https://api.dataforsyningen.dk/postnumre/autocomplete?q=" + zip,
      "GET"
    );
  }, [zip]);

  // ----- ORDEN PÅ 40 ENTRIES -----
  function createDays(data: OpenWeatherResponse) {
    // Lav 2 arrays: Den ene er for dage og den anden er for temperaturerne.
    const dayWeather = [<></>];
    let dayTemp: [JSX.Element];

    // Loop igennem alle 40 entries i listen ( 5 dage gange (24 timer : 3 timer) )
    data.list.forEach((e, i, a) => {
      // For at finde ud af, hvilken dag vi er på
      let dayIndex = Math.floor(i / 8);

      let date = new Date(e.dt_txt);

      // Check om en ny dag er startet
      if (i % 8 === 0) {
        // Tøm temperatur-arrayet, hvis det er den næste dag. Den bliver reassigned til en NY array, so alle dage har deres unikke temperatur.
        // Hvis ikke vi laver en ny, vil alle dage have den samme temperatur
        dayTemp = [<></>];

        // Lav en ny div for hver ny dag i starten af den nye dag. Altså kolonnerne for hver dag
        dayWeather[dayIndex] = (
          <div className="w-full flex flex-col justify-center my-5">
            <p className="text-center m-auto font-bold text-xl">
              Dato: {date.toLocaleDateString()}
            </p>
            <section className="text-center grid grid-cols-2 m-auto">
              {/* Beskrivelser */}
              <div>
                <h3 className="font-bold">{e.weather[0].description}</h3>
                <p>Solopgang: {new Date(data.city.sunrise * 1000).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})} || Solnedgang {new Date(data.city.sunset * 1000).toLocaleTimeString([],{ hour: "2-digit", minute: "2-digit"})}</p>
                <p>Luftfugtighed: {e.main.humidity} || Lufttryk: {e.main.pressure}</p>
              </div>

              {/* Vejr-ikon */}
                <img src={"https://openweathermap.org/img/wn/" + e.weather[0].icon + "@2x.png"} className="w-20 m-auto"/>
            </section>
            <div
              key={e.dt}
              className=" bg-neutral-200 border-t-4 border-t-orange-300 rounded m-1 w-full flex justify-evenly">
              {dayTemp}
            </div>
          </div>
        );
      }

      // Find ud af hvilken temperatur-info der passer til hvert individuel dag.
      let tempDataIndex = i - dayIndex * 8;

      // Lav en ny div for hver af de 40 entries for temperatur-arrayet
      dayTemp[tempDataIndex] = (
        <div key={i} className="temp text-center p-3 text-sm">
          <p>
            {Math.round(e.main.temp)} °C <br />
            {date.toLocaleTimeString()} <br/>
          </p>
          
        </div>
      );
    });

    // Return all days
    return dayWeather;
  }

  return (
    <>
      <Navbar />
      {error && <Error />}
      {isLoading && <Loading />}
      <div className="grid grid-cols-2">
        {/* Map */}
        <section>
          {data && (
            <LeafletMap position={[data.city.coord.lat, data.city.coord.lon]} />
          )}
        </section>

        {/* Data */}
        <section className="flex flex-wrap">
          <h1 className="font-bold text-3xl my-2 m-auto">Vejret</h1>
          <div className="flex flex-col w-full items-center text-center p-5">
            <input
              type="text"
              className="shadow-lg rounded-full text-center border m-auto"
              list="listPostnr"
              placeholder="Indtast postnummer"
              value={zip}
              maxLength={4}
              required
              pattern="[0-9]{4}"
              onChange={e => {
                setZip(e.currentTarget.value);
              }}
            />
            {data && <p>Vejret for: {data.city.name}</p>}
          </div>

          <datalist id="listPostnr">
            {dataDAWA?.map((p: any) => (
              <option value={p.postnummer.nr} key={p.postnummer.nr}>
                {p.tekst} {p.by}
              </option>
            ))}
          </datalist>

          {data && createDays(data)}
        </section>
      </div>
    </>
  );
}
