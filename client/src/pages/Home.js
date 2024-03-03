import React, { useContext } from "react";
import "./Home.css"
import { AppContext } from "../context/AppContext";
import Header from "../components/Header";

const Home = () => {

  return (
    <>
      <Header/>
      <main className="main_container">
        <section className="hero_holder">
          <img className="hero_image" src="/images/car image.webp" alt="bmw"></img>
          <div className="hero_card">
            <h1>Welcome to Autopal</h1>
            <h3>Drive Your Dreams: Find Your Perfect Ride Today</h3>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;

