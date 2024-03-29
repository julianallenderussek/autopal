import React, { useContext, useRef, useState } from "react";
import Header from "../components/Header";
import "./Login.css"
import { Link } from "react-router-dom";
import axios from 'axios';
import { AppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';
  
const Login = () => {

  const { setToken, setRole } = useContext(AppContext)
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const handleInput = (e) => {
    const newFormData = {...formData}
    newFormData[`${e.target.name}`] = e.target.value
  
    setFormData(newFormData)
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
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, formData)
      console.log("Congratulations", response.data)
        
      if (response.status === 200) {
        console.log("Congratulations", response.data)
        
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('role', response.data.role)
        setToken(response.data.token)
        setRole(response.data.role)
        navigate("/auto_listings")
      }
    } catch(error) {
      if (error.response.status === 400) {
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error)
      }
    }
    
  }


  return (
    <>
      <Header/>
      <main className="main_container">
        <img className="login_car_image" src="/images/login_car.jpeg" alt="bmw"></img>
          
          <div className="login_form_container">
            <h3 className="create_listing_tit">Sign in to the world's best auto marketplace</h3>
            <label>Email</label>
            <input name="email" onChange={handleInput} type="text" className="input_listing"/>
            <label>Password</label>
            <input onChange={handleInput} name="password" type="password" className="input_listing"/>
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
            <p className="account_message">
              You don't have an account 
            </p>
            <Link to={"/signup"}>Sign up here!</Link>
          </div>
          
        
      </main>
    </>
  );
};

export default Login;

