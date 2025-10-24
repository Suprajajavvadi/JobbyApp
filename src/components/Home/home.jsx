
import "./home.css"
import {Link} from "react-router-dom"
import Header from "../Header/header"
import {useEffect} from "react"
import { useNavigate } from "react-router-dom"

const Home=()=>{
    const navigate=useNavigate()
    const jwtToken=localStorage.getItem("jwt_token")
    console.log(jwtToken) 

    useEffect(()=>{
        jwtTokenChecking()
   },[])

    function jwtTokenChecking(){
        
        if (jwtToken === null){
            navigate("/login")
        }
    }


    const handleFindJobs=()=>{
        navigate("/jobs")
    }


    return(
        <div className="home-bg-container">
            <Header/>
            <div className="home-page-content">
                <h1 className="find-job-heading">Find The job that fits your life</h1>
                <p className="find-job-paragraph">Millions of people are searching of jobs</p>
                <button onClick={handleFindJobs} className="find-jobs-btn">Find Jobs</button>
            </div>
        </div>
    )
}


export default Home

