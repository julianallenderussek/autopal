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
          <h1>Auto Listing</h1>
          <div className="auto_listing_card">
            <div className="info_container">
              <h1>{listing.make}</h1>
              <h1>{listing.model}</h1>
              <h1>{listing.year}</h1>
              <h1>{listing.city}</h1>
              <h1>{listing.state}</h1>
              <h1>{listing.country}</h1>
              <h1>{listing.createdAt}</h1>
              <h1>{listing.owner.email}</h1>
              <h1>{listing.owner_first_name}</h1>
              <Link to={`/appointment_scheduler/${id}`}>
                <button>Make Appointment</button>
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
