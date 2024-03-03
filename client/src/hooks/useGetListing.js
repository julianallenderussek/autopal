import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const useGetListing = (id) => {
  const [listing, setListing] = useState(null);
  
  const { token } = useContext(AppContext);

  const fetchListing = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auto_listings/${id}`, {
        headers: {
          "authorization": token
        }
      })
      setListing(response.data.autoListing)

      console.log(response.data);
    } catch(err) {
      console.log("Error", err)
    }
  }

  useEffect(() => {
    fetchListing(id)
  }, [])


  return {listing, setListing}
};

export default useGetListing;
