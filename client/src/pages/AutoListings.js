import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import "./Home.css"
import { AppContext } from "../context/AppContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AutoListings = () => {

  const [autoListings, setAutoListings] = useState([]);
  
  const  { setToken, token } = useContext(AppContext)
  
  const fetchAutoListings = async () => {
    try {
      const response = await (await axios.get(`${process.env.REACT_APP_API_URL}/auto_listings`, {
        "headers": {
          "authorization": token
        }
      }))
      if (response.status === 200) {
        setAutoListings(response.data.autoListings)
      }
    } catch(error) {
      console.log(error)
      if (error.response.status === 400) {
        console.log(error.response.data.error)
        return
      }
    }
  }

  useEffect(()=>{
   fetchAutoListings() 
  }, [])


  return (
    <>
      <Header/>
      <main className="main_container">
        <section className="hero_holder">
          <h1>Auto Listings</h1>
          {
            autoListings.map((listing) => {
              return (
              <h1>Super Listing</h1>)
            })
          } 
        </section>
      </main>
    </>
  );
};

export default AutoListings;

