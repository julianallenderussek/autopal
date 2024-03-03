import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import "./AutoListings.css";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import "./Appointments.css";

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

    const updateAppointment = (id) => {
      
      const dataToUpdate = {
        status: appointmentStatuses[id]
      }

      try {
        const response = axios.put(`${process.env.REACT_APP_API_URL}/auto_listings/${id}`, dataToUpdate, {
          headers: {
              'authorization': token}`,
              'Content-Type': 'application/json' // Adjust the content type according to your API requirements
          });
      })
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
                                        <h1>{appointment.createdAt}</h1>
                                        <h1>{appointment._id}</h1>
                                        {role === "buyer" ? (
                                            <>
                                                <h1>Seller info</h1>
                                                <h1>
                                                    {
                                                        appointment.seller
                                                            .first_name
                                                    }{" "}
                                                    {
                                                        appointment.seller
                                                            .last_name
                                                    }
                                                </h1>
                                                <h1>
                                                    {appointment.seller.phone}
                                                </h1>
                                                <h1>
                                                    {appointment.seller.email}
                                                </h1>
                                                <h1>
                                                    {appointment.seller.phone}
                                                </h1>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        {role === "seller" ? (
                                            <>
                                                <h1>Buyer info</h1>
                                                <h1>
                                                    {
                                                        appointment.buyer
                                                            .first_name
                                                    }{" "}
                                                    {
                                                        appointment.buyer
                                                            .last_name
                                                    }
                                                </h1>
                                                <h1>
                                                    {appointment.buyer.phone}
                                                </h1>
                                                <h1>
                                                    {appointment.buyer.email}
                                                </h1>
                                                <h1>
                                                    {appointment.buyer.phone}
                                                </h1>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>

                                    <div className="card_section"></div>

                                    <div className="card_section">
                                        <label>
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
                                                <button onClick={() => updateAppointment(appointment._id)}>Change Status</button>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        {
                                          role === "buyer" ? (
                                            <h1>{appointment.status}</h1>    
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
