import React, { useContext, useRef, useState } from "react";
import Header from "../components/Header";
import "./Login.css"
import { Link } from "react-router-dom";
import axios from 'axios';
import { AppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
  
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const { token, setToken, user, setUser } = useContext(AppContext) 

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    state: "",
    country: "",
    price: "",
    milage: "",
    status: "draft"
  });

  const handleInput = (e) => {
    console.log(e.target.name)
    const newFormData = {...formData}
    newFormData[`${e.target.name}`] = e.target.value
  
    setFormData(newFormData)
    console.log(newFormData)
    let valid = true
    for (const [key, value] of Object.entries(newFormData)){ 
      if (value.length <= 0) {
        valid = false
      }
    }
      
    if (valid) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }

  const handleSubmit = async (e) => {
    console.log("Submitting")
    console.log(`${process.env.REACT_APP_API_URL}`)
    console.log(formData)
    
    console.log(formData)
    // try {
    //   const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, formData)
    //   console.log(response)
    //   if (response.status === 201) {
    //     setToken(response.data.token)
    //     navigate("/")
    //   }
    // } catch(error) {
    //   if (error.response.status === 400) {
    //     console.log(error.response.data.error)
    //     setErrorMessage(error.response.data.error)
    //     return
    //   }
    // }
    
  }


  return (
    <>
      <Header/>
      <main className="main_container">
        <img className="login_car_image" src="/images/login_car.jpeg" alt="bmw"></img>
          
          <div className="login_form_container">
            <h3>Create a new listing</h3>
            <label>Make</label>
            <input name="make" onChange={handleInput} type="text"/>
            
            <label>model</label>
            <input name="model" onChange={handleInput} type="text"/>
            
            <label>Year</label>
            <input name="year" onChange={handleInput} type="number"/>
          
            <label>City</label>
            <input name="city" onChange={handleInput}  type="text"/>
            
            <label>State</label>
            <input name="state" onChange={handleInput}  type="text"/>

            <label>Country</label>
            <input name="country" onChange={handleInput}  type="text"/>
            
            <label>Price</label>
            <input 
              onChange={handleInput}
              type="number" id="phone" name="price" 
            />

            <label>Milage</label>
            <input 
              onChange={handleInput}
              type="number" id="milage" name="milage" 
            />
            
            <label>Status</label>
            <select name="milage" onChange={handleInput}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="closed">Closed</option>
            </select>
            

            <div className="button_container">
              <button 
                disabled={isDisabled}
                onClick={() => {
                  handleSubmit()
                }}
              >
                Login
              </button>
            </div>
            {
              errorMessage ? <p>{errorMessage}</p> : <></>
            }
          </div>
          
        
      </main>
    </>
  );
};

export default CreateListing;

