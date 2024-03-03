import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";



const useGetListing = async (appointmentData) => {

  const [error, setError] = useState(null);
  
  
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auto_listings/${id}`, {
      headers: {
        "authorization": token
      }
    })
    setListing(response.data.autoListing)
  } catch(err) {
    console.log("Error", err)
    setError(err)
  }
  

  return {listing, setListing, error, setError}
};

export default useGetListing;
