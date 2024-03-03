import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import "./AutoListings.css"
import { AppContext } from "../context/AppContext";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const MyAutoListings = () => {

  const [autoListings, setAutoListings] = useState([]); 
  const [filters, setFilters] = useState({
    status: "published"
  });
  
  const  { setToken, token } = useContext(AppContext)
  
  const fetchAutoListings = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auto_listings/user/my_listings`, {
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
          <h1 className="auto_listings_tit">Auto Listings</h1>
          
          <section className="auto_listings_grid">
            {
              autoListings.map((listing) => {
                console.log(listing);
                return (
                <Link to={`/auto_listing/${listing._id}`} className="listing_link">  
                  <div className="auto_listing_card">
                  <div style={{

                  }} className="auto_listing_image_holder">
                    
                  </div>
                      <div className="auto_listing_card_info_container">
                        <div style={{display: "flex"}}>
                          <label className="car_info">Brand: </label>              
                          <h2 className="car_info">{listing.make}</h2>
                        </div>
                        <p className="car_info">{listing.model}</p>
                        <p className="car_info">{listing.year}</p>
                        <p className="car_info">{listing.model}</p>
                        <p className="car_info">{listing.city}</p>
                        <p className="car_info">{listing.state}</p>
                        <p className="car_info">{listing.country}</p>
                        <p className="car_info">{listing.owner.first_name}</p>
                        <p className="car_info">{listing.owner.email}</p>
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

export default MyAutoListings;

