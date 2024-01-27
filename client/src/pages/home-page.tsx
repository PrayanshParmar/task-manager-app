import React from "react";
import Navbar from "../components/navbar";

const Home = () => {
  
  return (
    <main className=" w-full h-full bg-zinc-950 text-white">
      <Navbar />
      <section
        id="hero-section"
        className=" sm:mt-20 w-full h-fit flex justify-center"
      >
        <div className="h-full m-auto px-3   w-full flex flex-col text-center items-center gap-2 sm:gap-4">
          <h1 className=" text-2xl sm:text-3xl ">
            An open source <span className=" text-blue-500">Task Manager</span>
          </h1>
          <p className=" text-gray-500 max-w-[570px] w-full break-words text-base  sm:text-xl ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusant
            incidunt quo et consequatur minus rerum quaerat eligendi numquam.
          </p>

          <a href="/login">
            <button className=" text-base sm:text-xl w-28 h-11 bg-blue-500 text-white border border-blue-500 rounded-md hover:bg-blue-600 ">
              Get Started
            </button>
          </a>
        </div>
      </section>
    </main>
  );
};

export default Home;
