import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import "./AutoListings.css"
import { AppContext } from "../context/AppContext";
import axios from 'axios';

const SellerAppointments = () => {

  const [appointments, setAppointments] = useState([]); 
  
  const  { setToken, token } = useContext(AppContext)
  
  const fetchAppointments = async () => {
    
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/appointments/user`, {
        headers: {
          "authorization": token
        }
    })
    console.log(response)


  }

  useEffect(()=>{
    fetchAppointments() 
  }, [])


  return (
    <>
      <Header/>
      <main className="main_container">
        <section className="hero_holder">
          <h1>Appointments</h1>
          
          <section className="auto_listings_grid">
            
          </section>
        </section>
      </main>
    </>
  );
};

export default SellerAppointments;

