import React, { useContext, useRef, useState } from "react";
import Header from "../components/Header";
import "./Login.css"
import { Link } from "react-router-dom";
import axios from 'axios';
import { AppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const  { setToken, setRole } = useContext(AppContext)

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "seller",
    phone: ""
  });
  
  const handleInput = (e) => {
    console.log(e.target.name)
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
    console.log(formData)
    
    if (formData.password !== formData.password_confirmation) {
      setErrorMessage("Passwords do not match")
    } else {
      setErrorMessage("")
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, formData)
      console.log(response)
      if (response.status === 201) {
        setToken(response.data.token)
        setRole(response.data.role)
        
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('role',response.data.role)
        navigate("/")
      }
    } catch(error) {
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
            <h3>Create an account and join Autopal</h3>
            <label>First Name</label>
            <input name="first_name" onChange={handleInput} type="text"/>
            
            <label>Last Name</label>
            <input name="last_name" onChange={handleInput} type="text"/>
            
            <label>Email</label>
            <input name="email" onChange={handleInput} type="text"/>
          
            <label>Password</label>
            <input onChange={handleInput} name="password" type="password"/>
            
            <label>Password Confirmation</label>
            <input onChange={handleInput} name="password_confirmation" type="password"/>
            
            <label>Phone</label>
            <input 
              onChange={handleInput}
              type="number" id="phone" name="phone" 
            />

            <label>Phone</label>
            <select name="role" onChange={handleInput}>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
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
            <p>
              You don't have an account <Link to={"/signup"}>Register here</Link>
            </p>
          </div>
          
        
      </main>
    </>
  );
};

export default Signup;

