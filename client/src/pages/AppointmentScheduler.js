import React, { useContext, useState } from "react";
import Header from "../components/Header";
import './AppointmentScheduler.css';
import useGetListing from "../hooks/useGetListing";
import { AppContext } from "../context/AppContext";
import { useParams, useNavigate } from "react-router-dom";
import FutureDateTimePicker from "../components/FutureDateTimePicker";
import axios from 'axios';

const AppointmentScheduler = () => {
    const params = useParams();

    const navigate = useNavigate()

    const [buttonDisable, setButtonDisabled] = useState(false);

    const { listing, error } = useGetListing(params.listing_id);
    const { token } = useContext(AppContext)

    const [showPopUp, setShowPopUp] = useState(false);
    
    const currentDate = new Date();
    const minDatePicker = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000));
    const [startDate, setStartDate] = useState(new Date(currentDate.getTime() + (24 * 60 * 60 * 1000)));

    const requestListing = async (e) => {
      try {

        setButtonDisabled(true);

        const formData = {
          seller: listing.owner._id,
          listing: listing._id,
          fromDateTime: startDate,
          toDateTime: startDate
        }

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/appointments`, formData, {
          "headers": {
            "authorization": token
          }
        })
        console.log(response)
        if (response.status === 201) {
          setShowPopUp(true)
          setTimeout(() => {
            navigate('/')
          }, 3000)
        }
        setButtonDisabled(false);

      } catch(error) {
        console.log(error)
        if (error.response.status === 400) {
          console.log(error.response.data.error)
          // setErrorMessage(error.response.data.error)        
          setButtonDisabled(false);
          return
        }
      }
    }


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
        <main>
            <Header />
            <div className='info_wrap'>
              <div className="info_container">
                  <p className='app_info'>{listing.make}</p>
                  <p className='app_info' >{listing.model}</p>
                  <p className='app_info'>{listing.year}</p>
                  <p className='app_info'>{listing.city}</p>
                  <p className='app_info'>{listing.state}</p>
                  <p className='app_info'>{listing.country}</p>
                  <p className='app_info'>{listing.createdAt}</p>
                  <p className='app_info'>{listing.owner.email}</p>
                  <p className='app_info'>{listing.owner_first_name}</p>
              </div>
            </div>
            <button onClick={requestListing}>Request Appointment</button>
            {
              showPopUp ? <h1>Popup</h1> : <></>
            }
        </main>
    );
};

export default AppointmentScheduler;
