"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import useRequestData from '@/hooks/useRequestData'
import { AboutUs, ServicesImage } from '@/interfaces/interface'


export default function Home() {
  const {data, isLoading, error, makeRequest} = useRequestData<AboutUs>()
  const {data:dataIMG, isLoading:isLoadingIMG, error:errorIMG, makeRequest:makeRequestIMG} = useRequestData<[ServicesImage]>()

  useEffect(()=>{
    makeRequest("http://localhost:5023/aboutus", "GET")
  }, [])

  useEffect(()=>{
    makeRequestIMG("http://localhost:5023/services?limit=2", "GET")
  }, [])


  return (
    <div className='grid grid-cols-2 max-w-screen-2xl p-20 bg-neutral-100 h-screen	'>
      {/* -------- VELKOMMEN SEKTION -------- */}
      <section>
        <h1 className='text-6xl mb-7'>Velkommen til <span className='mainGreenText font-bold'>Viborg Haveservice</span></h1>

        {data && ( 
          <p id='aboutusFrontpage' className='text-gray-500'>{`${data.content}`}</p>
         )}

        <button className='mainGreenBackground text-white hover:bg-green-600 transition-colors p-3 rounded my-8' >
          <Link href="/admin" className='uppercase'>Se alle ydelser</Link>
        </button>
      </section>


      {/* -------- BILLEDER/SERVICES  -------- */}
      <aside className='grid grid-cols-2 mx-3'>

        {/* --- Hent billeder */}
          {dataIMG && dataIMG.map( (e) => 
            <figure className='flex flex-wrap justify-center h-96 mr-5'>
              <Image src={"http://localhost:5023/images/" + e.image} width={200} height={50} alt={e._id} className='rounded min-w-full h-60'/>
             <figcaption>
              <h3 className='font-bold text-xl'>{e.title}</h3>
              <p className='text-gray-500'>{e.content}</p>
             </figcaption>
            </figure>
          )}

      </aside> 
    </div>
  )
}
