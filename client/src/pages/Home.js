import React, { useContext } from "react";
import Header from "../components/Header";
import "./Home.css"
import { AppContext } from "../context/AppContext";

const Home = () => {

  return (
    <>
      <Header/>
      <main className="main_container">
        <section className="hero_holder">
          <img className="hero_image" src="/images/bmw.jpg" alt="bmw"></img>
          <div className="hero_card">
            <h1>Welcome to Autopal</h1>
            <h3></h3>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;

