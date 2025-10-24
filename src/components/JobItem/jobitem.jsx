import "./jobitem.css";
import Header from "../Header/header";
import { useState, useEffect } from "react";



import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { IoBagHandleSharp } from "react-icons/io5";
import { FcRating } from "react-icons/fc";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";



const JobItem = () => {
  const [jobDetails, setJobDetails] = useState({});
  const [similarJobs, setSimilarJobs] = useState([]);
  const token = localStorage.getItem("jwt_token");
  const { id } = useParams();
  const navigate=useNavigate()

  useEffect(()=>{
    jwtTokenChecking()
  })

  useEffect(() => {
    getJobDetails();
  }, []);

  function jwtTokenChecking(){
        
        if (token === null){
            navigate("/login")
        }
    }

  const getJobDetails = () => {
    axios
      .get(`/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          // Add other custom headers here
        },
      })
      .then((response) => {
        // setJobResults(response.data.jobs)\
        setJobDetails(response.data.job_details);
        setSimilarJobs(response.data.similar_jobs);
        //console.log(response.data)
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
  };

  console.log(jobDetails)
  //console.log(similarJobs);
  return (

    <div className="jobitems-bg-container">
      <Header />

      {jobDetails && (
        <>
          <div key={jobDetails.id} className="jobitems-main-div">
            <div className="jobitem-logo-employment-type-container">
              <img src={jobDetails.company_logo_url} alt="Company Logo" className="company-logo" />
              <div className="jobitem-title-rating">
                <h1 className="jobitem-title">{jobDetails.title}</h1>
                <div className="jobitem-rating">
                  <FcRating />
                  <p>{jobDetails.rating}</p>

                </div>
              </div>
            </div>
            <div className="location-employment-type-container">
              <div className="location-container">
                <FaLocationDot />
                <p>{jobDetails.location}</p>
              </div>
              <div className="location-container">
                <IoBagHandleSharp />
                <p>{jobDetails.employment_type}</p>
              </div>
             
               <p className="package-per-annum">{jobDetails.package_per_annum}</p>
            </div>
            <hr/>

            <div className="jobdescription-visit-container">
              <h3>Description</h3>
              <a
              href={jobDetails.company_website_url}
              target="_blank"
              className="visit-link"

            >
              Visit
              <FaExternalLinkAlt />
            </a>

            </div>
           
            <p>{jobDetails.job_description}</p>

            {/* Uncomment below if life_at_company is always present */}
            {/*         
        <p>{jobDetails.life_at_company.description}</p>
        <img src={jobDetails.life_at_company.image_url} alt="Life at Company" /> */}
             {jobDetails.skills?.length > 0 && (
            <div className="skills-section">

              <h2>Skills</h2>
              <div className="skills-list">
                {jobDetails.skills.map((item) => (
                  <div key={item.name} className="skill-item">
                    <img src={item.image_url} alt={item.name} className="skill-logo"/>
                    <span>{item.name}</span>
                   
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>
        </>
      )}

      <h1 className="similar-jobs-heading">Similar jobs</h1>
      <div className="similar-cards-main-div">
        {similarJobs &&
        similarJobs.map((item) => {
          return (

            <div key={item.id} className="similar-jobs-card">
              <div className="similar-jobs-card-div">
              <img src={item.company_logo_url} className="similar-jobs-icons"/>
              <div className="similar-jobs-employment-rating-container"> 
                <p>{item.title}</p>
                 
                 <div className="similar-jobs-rating-container">
                    <FcRating />
                    <p>{item.rating}</p>
                  </div>
                </div>
             </div>
              <div>
                <h2>Description</h2>
                <p className="similar-jobs-description">{item.job_description}</p>
               </div>
              <div className="similar-jobs-location-employement-type">
                <div className="similar-jobs-location">
                  <FaLocationDot />
                  <p>{item.location}</p>
                </div>
                <div className="similar-jobs-location">
                  <IoBagHandleSharp />
                  <p>{item.employment_type}</p>
                </div>
              </div>
            </div>
          );
        })}
    </div>

  </div>
  );
};
export default JobItem;
