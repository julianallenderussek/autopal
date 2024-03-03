import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import "./AutoListings.css";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import "./Appointments.css";
import chevroletImage from "./chevrolet.jpeg"; // Import the image


const SellerAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const { setToken, token, role } = useContext(AppContext);

    const [appointmentStatuses, setAppointmentStatuses] = useState({});
    
    const fetchAppointments = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/appointments/user`,
            {
                headers: {
                    authorization: token,
                },
            }
        );

        if (response.status === 200) {
            setAppointments(response.data.appointments);
            let statuses = {}
            for (let i = 0; i < response.data.appointments.length; i++) {
              const appointment = response.data.appointments[i];
              statuses[appointment._id] = appointment.status
            }
            console.log("STATUSES", statuses)
            setAppointmentStatuses({...statuses})
        }
    };

    const updateAppointment = async (id) => {
      
      const dataToUpdate = {
        status: appointmentStatuses[id]
      }

      try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/appointments/${id}`, dataToUpdate, {
          headers: {
              'Authorization': token,
              'Content-Type': 'application/json'
          }
        })

        if (response.status === 201) {
          fetchAppointments()
        }
        
      } catch (err) {
        console.log(err)
      }

    }

    const handleInput = (e) => {
      const id = e.target.id
      const value = e.target.value

      console.log(e.target.id, e.target.value)
      const newStatuses = {...appointmentStatuses}
      newStatuses[id] = value
      console.log("updated", newStatuses)
      setAppointmentStatuses(newStatuses)
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <>
            <Header />
            <main className="main_container">
                <section className="hero_holder">
                    <h1 className="page_title">Appointments</h1>
                    <section className="auto_listings_grid">
                        {appointments.map((appointment) => {
                            // console.log("THE APPOINTMENT ", appointment);
                            return (
                                <div className="appointment_card">
                                    <div className="card_section">
                                        <p className="seller_info">Appointment Information:</p> 
                                        <p>Created on: {appointment.createdAt}</p>
                                        <p>ID: {appointment._id}</p>
                                        {role === "buyer" ? (
                                            <>
                                                <p className="seller_info">Seller information:</p>
                                                <p>
                                                    {
                                                        appointment.seller
                                                            .first_name
                                                    }{" "}
                                                    {
                                                        appointment.seller
                                                            .last_name
                                                    }
                                                </p>
                                                <p>
                                                    {appointment.seller.phone}
                                                </p>
                                                <p>
                                                    {appointment.seller.email}
                                                </p>
                                                <p>
                                                    {appointment.seller.phone}
                                                </p>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        {role === "seller" ? (
                                            <>
                                                <p className="seller_info">Buyer information:</p>
                                                <p>
                                                    {
                                                        appointment.buyer
                                                            .first_name
                                                    }{" "}
                                                    {
                                                        appointment.buyer
                                                            .last_name
                                                    }
                                                </p>
                                                <p>
                                                    {appointment.buyer.phone}
                                                </p>
                                                <p>
                                                    {appointment.buyer.email}
                                                </p>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>

                                    <div className="card_section">
                                        <img src={chevroletImage} alt="chevrolet" className='appt_img' width={400} height={300}/> {Image}
                                    </div>

                                    <div className="card_section">
                                        <label className="seller_info">
                                            Current Appointment Status
                                        </label>
                                        {role === "seller" ? (
                                            <>
                                                <select onChange={(e, appointment) => handleInput(e)}
                                                    value={appointmentStatuses[appointment._id]}
                                                    id={appointment._id}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="canceled">Canceled</option>
                                                    <option value="closed">Closed</option>
                                                </select>
                                                <button onClick={() => updateAppointment(appointment._id)} className="status_btn">Change Status</button>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        {
                                          role === "buyer" ? (
                                            <p className="status_app">{appointment.status}</p>    
                                          ) : <></>
                                        }
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                </section>
            </main>
        </>
    );
};

export default SellerAppointments;
