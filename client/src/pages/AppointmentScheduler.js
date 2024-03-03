import React, { useContext } from "react";
import Header from "../components/Header";
import useGetListing from "../hooks/useGetListing";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import FutureDateTimePicker from "../components/FutureDateTimePicker";

const AppointmentScheduler = () => {
    const params = useParams();

    console.log("the listing", params.listing_id);

    const { listing, error } = useGetListing(params.listing_id);

    console.log("WAZAUO", listing, error);

    if (!listing) {
      
      if (error)
      {
        console.log("HERE IN COMPONENT", error)
      }
      return <>
        <Header />
        {
          error ? <h1>{error.response.data.message}</h1> : <></>
        }
      </>
    }

    return (
        <>
            <Header />
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
            </div>

            <FutureDateTimePicker/>
        </>
    );
};

export default AppointmentScheduler;
