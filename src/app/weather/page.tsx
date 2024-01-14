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
    makeRequest(
      "https://api.openweathermap.org/data/2.5/forecast?zip=" +
        zip +
        ",dk&appid=ce9282584cfaaac68fda86f7e2e24f70&units=metric",
      "GET"
    );
    makeRequestDAWA(
      "https://api.dataforsyningen.dk/postnumre/autocomplete?q=" + zip,
      "GET"
    );
  }, [zip]);

  function createDays(data: OpenWeatherResponse) {
    // Initialize two arrays. One for the days and one for the temperatures.
    const dayWeather = [<></>];
    let dayTemp: [JSX.Element];
    let minMax: { min: number; max: number };

    // Loop through all 40 entries in the list ( 5 days times (24 hours divided by 3 hours) )
    data.list.forEach((e, i, a) => {
      // Figure out which day we are on
      let dayIndex = Math.floor(i / 8);

      //   Check if we are at the start of a new day
      if (i % 8 === 0) {
        //  Clear the temperatures array when we move to a new day. We reassign it to a NEW array so that each day has an unique temperature array.
        //  If we don't and instead use only one array but override the values then each day will have the same temperatures.
        dayTemp = [<></>];

        minMax = {
          min: a.reduce(
            (a, b) => Math.min(a, Math.round(b.main.temp)),
            Infinity
          ),
          max: a.reduce(
            (a, b) => Math.max(a, Math.round(b.main.temp)),
            -Infinity
          ),
        };
        console.log(minMax);

        // Create a new div for a new day at the start of a new day. This day contains the corresponding temperature entries
        dayWeather[dayIndex] = (
          <div
            key={e.dt}
            className="day min-h-32 bg-green-200 rounded m-1 w-full flex justify-evenly">
            {dayTemp}
          </div>
        );
      }

      //   Figure out which temperature index for each individual day
      let tempDataIndex = i - dayIndex * 8;

      //   Create div for each of the 40 entries for temperature
      dayTemp[tempDataIndex] = (
        <div key={i} className="temp bg-red-200 w-1/12">
          {" "}
          {Math.round(e.main.temp)} °C
        </div>
      );
    });

    // Return all the days
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
                setZip(e.target.value);
                //   setValid(e.target.checkValidity());
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
