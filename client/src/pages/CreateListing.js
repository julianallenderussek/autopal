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

  const { token, role, setToken, user, setUser } = useContext(AppContext) 

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
    
    let value = e.target.value

    if (e.target.type === "number") {
      value = parseInt(value)
    }

    newFormData[`${e.target.name}`] = value
  
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
    console.log(token)
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auto_listings`, formData, {
        "headers": {
          "authorization": token
        }
      })
      console.log(response)
      if (response.status === 201) {
        setToken(response.data.token)
        navigate("/")
      }
    } catch(error) {
      console.log(error)
      if (error.response.status === 400) {
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error)
        return
      }
    }
    
  }


  return (
    <>
      <Header/>
      <main className="main_container">
        <img className="login_car_image" src="/images/login_car.jpeg" alt="bmw"></img>
          
          <div className="login_form_container">
            <h3 className="create_listing_tit">Create a new listing</h3>
            <label>Make (brand)</label>
            <input name="make" onChange={handleInput} type="text" className="input_listing"/>
            
            <label>model</label>
            <input name="model" onChange={handleInput} type="text" className="input_listing"/>
            
            <label>Year</label>
            <input name="year" onChange={handleInput} type="number" className="input_listing"/>
          
            <label>City</label>
            <input name="city" onChange={handleInput}  type="text" className="input_listing"/>
            
            <label>State</label>
            <input name="state" onChange={handleInput}  type="text" className="input_listing"/>

            <label>Country</label>
            <input name="country" onChange={handleInput}  type="text" className="input_listing"/>
            
            <label>Price</label>
            <input 
              onChange={handleInput}
              type="number" id="phone" name="price" className="input_listing"
            />

            <label>Milage</label>
            <input 
              onChange={handleInput}
              type="number" id="milage" name="milage"
              className="input_listing"
            />
            
            <label>Status</label>
            <select name="status" onChange={handleInput} className="input_listing">
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
                className="input_list_button"
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

