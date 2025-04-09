import "../styles/RegisterLogin.css"
import {useRef} from "react";
import {LOGIN_MUTATION} from "../graphqlServices/AllServices";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

export default function Login() {

  //const userName = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const[login,{data,loading,error}]=useMutation(LOGIN_MUTATION);
  
  const handleSubmit= async(event)=>{
    event.preventDefault();

    const email= emailRef.current.value;
    const password = passwordRef.current.value;

    try{
      if(email.trim()!=null && password.trim()!=null){
        const response=await login({variables:{email,password}});
        
        if(response.data.login.token)
        {
          console.log("Login :::"+response.data.login.user.email);
          localStorage.setItem("email",response.data.login.user.email);
          localStorage.setItem("username",response.data.login.user.username);
          localStorage.setItem("token",response.data.login.token);
          alert("Logined Successfully..!");
          navigate("/Dashboard");
        }

      }
    }
    catch(err){
      console.error(err);
      alert("Login failed.. Please try again");
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
            {/* <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Enter your username" ref={userName}/>
            </div> */}
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
            <button type="submit" className="login-button">Log In</button>

          </form>
          <div className="options">
            <a onClick={()=>navigate("/Register")}>Sign Up</a>
            <a href="#">Forgot Password?</a>
          </div>
        </div>
      </div>

    </div>)
}