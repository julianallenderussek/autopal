import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import "./AutoListing.css"
import useGetListing from "../hooks/useGetListing";

const AutoListing = () => {
  
  const { id } = useParams();

  const {  token } = useContext(AppContext)

  const { listing} = useGetListing(id)

  if (!listing) {
    return <h1>Loading</h1>
  }

  return (
    <> 
        <Header/>
        <main className="middle_section">
          <h1 className="auto_listing_tit">Auto Listing</h1>
          <div className="auto_listing_card">
            <div className="info_container">
              <p className="car_listing_info">{listing.make}</p>
              <p className="car_listing_info">{listing.model}</p>
              <p className="car_listing_info">{listing.year}</p>
              <p className="car_listing_info">{listing.city}</p>
              <p className="car_listing_info">{listing.state}</p>
              <p className="car_listing_info">{listing.country}</p>
              <p className="car_listing_info">{listing.createdAt}</p>
              <p className="car_listing_info">{listing.owner.email}</p>
              <p className="car_listing_info">{listing.owner_first_name}</p>
              <Link to={`/appointment_scheduler/${id}`}>
                <button className="make_app_button">Make Appointment</button>
              </Link>
            </div>
            <div className="auto_listing_image">
              <img/>
            </div>
          </div>
        </main>      
    </>
  );
};

export default AutoListing;
