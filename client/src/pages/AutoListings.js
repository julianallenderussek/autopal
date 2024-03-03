import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import "./AutoListings.css"
import { AppContext } from "../context/AppContext";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const AutoListings = () => {

  const [autoListings, setAutoListings] = useState([]); 
  const [filters, setFilters] = useState({
    status: "published"
  });
  
  const  { setToken, token } = useContext(AppContext)
  
  const fetchAutoListings = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auto_listings?status=${filters['status']}`, {
        headers: {
          "authorization": token
        }
      })
      if (response.status === 200) {
        console.log(response.data)
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
          
          <section className="auto_listings_grid">
            {
              autoListings.map((listing) => {
                console.log(listing);
                return (
                <Link to={`/auto_listing/${listing._id}`}>  
                  <div className="auto_listing_card">
                  <div style={{

                  }} className="auto_listing_image_holder">
                    
                  </div>
                      <div className="auto_listing_card_info_container">
                        <div style={{display: "flex"}}>
                          <label>Make:</label>              
                          <h2>{listing.make}</h2>
                        </div>
                        <h2>{listing.model}</h2>
                        <h2>{listing.year}</h2>
                        <h2>{listing.model}</h2>
                        <h2>{listing.city}</h2>
                        <h2>{listing.state}</h2>
                        <h2>{listing.country}</h2>
                        <h2>{listing.owner.first_name}</h2>
                        <h2>{listing.owner.email}</h2>
                      </div>
                  </div>
                </Link>
                )
              })
            } 
          </section>
        </section>
      </main>
    </>
  );
};

export default AutoListings;

