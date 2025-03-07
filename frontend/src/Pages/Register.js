import "../styles/RegisterLogin.css"
import {useRef} from "react";
import {REGISTER_MUTATION} from "../graphqlServices/AllServices";
import { useMutation } from "@apollo/client";
import { handleError } from "@apollo/client/link/http/parseAndCheckHttpResponse";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const[register,{data,loading,error}]=useMutation(REGISTER_MUTATION);
  
  const handleSubmit= async(event)=>{
    event.preventDefault();

    const username = userNameRef.current.value;
    const email= emailRef.current.value;
    const password = passwordRef.current.value;

    try{
      if(username.trim()!=null && email.trim()!=null && password.trim()!=null){
        const response=await register({variables:{username,email,password}});
        
        if(response.data.register.isRegistered)
        {
          alert("Registered Successfully..!");
          navigate("/");
        }

      }
    }
    catch(err){
      console.log("Error message  :::"+err);
      alert("Register failed.. Please try again");
    }


  }
  return (
    <div className="MainContainer">
      <div className="RegisterLoginContainer">
        <div className="header">
          <h1>ConQuest: Indian Edition</h1>
        </div>
        <div className="form-container">
          <h2>Welcome</h2>
          <form onSubmit={handleSubmit}>
            {/* <!-- Username Field --> */}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Enter your username" ref={userNameRef}/>
            </div>
            {/* <!-- Email Field --> */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" ref={emailRef}/>
            </div>
            {/* <!-- Password Field --> */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" ref={passwordRef}/>
            </div>
            {/* <!-- Login Button --> */}
            <button type="submit" className="login-button">Sign Up</button>

          </form>
        </div>
      </div>

    </div>)
}