import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import "./header.css"

const Header=()=>{
    const navigate=useNavigate()

    function logoutBtn(){
        navigate("/login")
        localStorage.removeItem("jwt_token")

    }

    function jobbyLogo(){
        navigate("/")
    }




    return(
            <div>
                 <div className="navbar">
                <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" alt="jobby-logo" className="jobby-logo" onClick={jobbyLogo}/>

                <div className="link-items">
                     <Link to="/" className="item">Home</Link>
                     <Link to="/jobs" className="item">Jobs</Link>

                </div>
                <button className="logout-btn" onClick={logoutBtn}>logout</button>
               

            </div>
          
            </div>
           
            


       
    )
}
export default Header