import "./notfound.css"
import Header from "../Header/header"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const NotFound=()=>{
    const navigate=useNavigate();
    const token=localStorage.getItem("jwt_token")

    useEffect(()=>{
        jwtTokenChecking()

    },[])

    function jwtTokenChecking(){
        
        if (token === null){
            navigate("/login")
        }
    }

    return(
        <div>
            <Header/>
            <h1>Not Found</h1>
        </div>
    )
}
export default NotFound