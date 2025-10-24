import "./login.css"
import {useState} from "react"
 import axios from 'axios';
 import { useNavigate } from "react-router-dom";

const Login=()=>{
    const[userName,setUserName]=useState("")
    const[password,setPassWord]=useState("")
    const navigate=useNavigate()

    const handleUserName=(e)=>{
        const userInput=e.target.value
        setUserName(userInput)
        //console.log(userInput)
    }

    const handlePassword=(e)=>{
        const inputPassword=e.target.value
        setPassWord(inputPassword)
        //console.log(inputPassword)
    }

    const handleLogin=()=>{
       

        const postData = {
        username:userName,
        password:password
        };

        axios.post('/login', postData)
        .then(response => {
            const jwtToken=response.data.jwt_token
            localStorage.setItem("jwt_token",jwtToken)
            console.log(response.data.jwt_token); // Handle success
            navigate("/")

            
        })
        .catch(error => {
            console.error(error); // Handle error
        });

            }


    return(
        <div className="login-bg-container">
            <div className="login-card">
                <div className="img-container">
                    <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" alt="website-logo" className="website-logo"/>
                </div>
            
            <label className="user-name">Username</label>
           
            <input type="text" onChange={(e)=>{handleUserName(e)}} value={userName} className="user-input" placeholder="username"/>
            <label className="user-name">password</label>
            <input type="password" onChange={(e)=>{handlePassword(e)}} value={password} className="user-input" placeholder="password"/>
            <br/>
            <button onClick={handleLogin} className="login-btn">Login</button>
            </div>
        </div>
    )
}
export default Login