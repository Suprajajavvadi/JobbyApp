import "./jobs.css";
import axios from "axios";
import Header from "../Header/header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { IoBagHandleSharp } from "react-icons/io5";
import { FcRating } from "react-icons/fc";

const Jobs = () => {

  const [profileResults, setProfileResults] = useState({});
  const [jobResults, setJobResults] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt_token");
  
  const jobOptions = ["FULLTIME", "PARTTIME", "INTERNSHIP", "FREELANCE"];
  const [selectedJobs, setSelectedJobs] = useState("");

  const[minimumPackage,setMinimumPackage]=useState("")
  const[search,setSearch]=useState("")
  const handleChange = (job, checked) => {
    let jobsArray = selectedJobs ? selectedJobs.split(", ") : [];

    if (checked) {
      jobsArray.push(job); // add job
    } else {
      jobsArray = jobsArray.filter((j) => j !== job); // remove job
    }

    setSelectedJobs(jobsArray.join(","));

  };
  console.log(selectedJobs)

  useEffect(()=>{
    jwtTokenChecking()
  },[])

  useEffect(() => {
    getProfileDetails();
    getJobDetails();
    
    
  }, [selectedJobs,minimumPackage,search]);

  function jwtTokenChecking(){
        
        if (token === null){
            navigate("/login")
        }
    }

  function handleJobItem(id) {
    navigate(`/jobItem/${id}`);
  }
  

  const getJobDetails = () => {
    axios
      .get(`/jobs?employment_type=${selectedJobs}&minimum_package=${minimumPackage}&search=${search}`, 
        {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          // Add other custom headers here
        },
      })
      .then((response) => {
        setJobResults(response.data.jobs);
        //console.log(response.data.jobs)
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
  };

  const getProfileDetails = () => {
    axios
      .get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          // Add other custom headers here
        },
      })
      .then((response) => {
        setProfileResults(response.data.profile_details);
        //console.log(response.data.profile_details); // Handle success
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
  };
  //console.log(profileResults)


  function handleSalaryRange(e){
    const salaryRangeValue=e.target.value
    setMinimumPackage(salaryRangeValue)

  }

  function handleSearchItem(e){
    const searchValue=e.target.value
    setSearch(searchValue)
  }

return (
    <div className="jobs-bg-container">
      <Header />
      <div className="profile-jobs-container">
        <div className="profile-side-div">
          {profileResults && (
            <div className="profile-card">
              <img src={profileResults.profile_image_url} />
              <h1>{profileResults["name"]}</h1>
              <p>{profileResults["short_bio"]}</p>
            </div>
          )}
          <hr />
          
          <div className="employment-container">
            <h3>Type of employment</h3>
            {jobOptions.map((job) => (
        <label key={job}>
          <input
            type="checkbox"
            checked={selectedJobs.includes(job)}
            onChange={(e) => handleChange(job, e.target.checked)}
          />
          {job}
        </label>
      ))}
            
          </div>
          <hr />
          <div className="salary-container">
            <h3>Salary Range</h3>
            <div className="label-container">
              <input type="radio" name="salary-range" value="1000000" onChange={(e)=>handleSalaryRange(e)} />
              <label className="label-name">10LPA and above</label>
            </div>
            <div className="label-container">
              <input type="radio" name="salary-range" value="2000000" onChange={(e)=>handleSalaryRange(e)}/>
              <label className="label-name">20LPA and above</label>
            </div>
            <div className="label-container">
              <input type="radio" name="salary-range" value="3000000"onChange={(e)=>handleSalaryRange(e)}/>
              <label className="label-name">30LPA and above</label>
            </div>
            <div className="label-container">
              <input type="radio" name="salary-range" value="4000000" onChange={(e)=>handleSalaryRange(e)}/>
              <label className="label-name">40LPA and above</label>
            </div>
          </div>
        </div>

         
        <div className="job-results-container" >
          <input type="search" onChange={(e)=>handleSearchItem(e)}/>
          {jobResults && (
            <div>
              {jobResults.map((item) => (
                <div
                
                  key={item.id}
                  className="jobResults-item"
                  onClick={() => {
                    handleJobItem(item.id);
                  }}
                >
                  <div className="jobs-logo-title-container">
                    <div className="logo">
                      <img src={item.company_logo_url} className="logo" />
                    </div>

                    <div>
                      <h1 className="job-title">{item.title}</h1>
                      <div className="icon-location">
                        <FcRating />
                        <p>{item.rating}</p>
                      </div>
                    </div>
                  </div>
                  <div className="location-employment-salary-div">
                    <div className="icon-location">
                      <FaLocationDot />
                      <p>{item.location}</p>
                    </div>
                    <div className="icon-location">
                      <IoBagHandleSharp />
                      <p>{item.employment_type}</p>
                    </div>
                  <p className="salary">{item.package_per_annum}</p>
                  </div>
                  <hr/>
                  <h3>Description</h3>
                  <p>{item.job_description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Jobs;
