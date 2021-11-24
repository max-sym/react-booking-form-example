import React from "react"
import { Layout } from "@/components/layout"
import { BookingForm } from "@/components/booking-form"
import { WiMoonWaningCrescent4 } from "react-icons/wi"

const Background = () => (
  <div className="absolute top-0 left-0 right-0" style={{ height: "100vh" }}>
    <img
      src="https://source.unsplash.com/DKix6Un55mw/1920x1080"
      className="w-full h-full object-cover"
      style={{
        objectPosition: "50% 100%",
        transform: "scaleX(-100%)",
      }}
      alt="Night Sea"
    />
    <div className="bg-gradient-to-l from-transparent to-black absolute top-0 left-0 bottom-0 right-96 opacity-90"></div>
  </div>
)

const SecondBackground = () => (
  <div className="relative z-10 flex mt-32">
    <div className="">
      <h3 className="text-4xl text-white font-title-2">{"View Our Promo"}</h3>
      <p className="text-xl text-white mt-2">
        {"Everything you need to see is here 🌙"}
      </p>
      <button className="bg-purple-900 hover:bg-purple-500 transition border-purple-500 border rounded-full appearance-none px-8 py-2 font-title-2 text-3xl text-white mt-6">
        {"Take a Look"}
      </button>
    </div>
  </div>
)

const Main = () => (
  <main className="pt-24 py-8 relative z-10">
    <div className="flex justify-center items-center">
      <div className="text-white text-4xl">
        <WiMoonWaningCrescent4 />
      </div>
      <h2 className="text-center uppercase font-bold font-title-2 text-white text-5xl tracking-widest">
        {"The Night Boat"}
      </h2>
    </div>
    <p className="text-center text-white text-xl mt-4">
      {"Order a boat for you and your friends today, 4 free spots left!"}
    </p>
    <div className="mt-16 w-full mx-auto">
      <BookingForm />
    </div>
  </main>
)

const Home = () => (
  <Layout>
    <div className="px-64">
      <Background />
      <Main />
      <SecondBackground />
    </div>
  </Layout>
)

export default Home
