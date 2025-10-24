
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/home'

import JobItem from './components/JobItem/jobitem';
import Jobs from './components/Jobs/jobs';
import Login from './components/Login/login';
import NotFound from './components/NotFound/notfound'
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
    

    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/jobitem/:id" element={<JobItem/>}/>
    <Route path="/jobs" element={<Jobs/>}/>
    <Route path="/login" element={<Login/>}/> 
    <Route path="/notfound" element={<NotFound/>}/>
  </Routes>
    </BrowserRouter>
    
  );
};

export default App;




//login page:

// 1.when user name and password is correct,then jwt token is release that will be stored in localstorage.
// 2.then the page will navigate to the home page


//Home page

//when autheticated user clicks on jobs button page should navigated to the jobs page

//jobs page

//1.functions will be call in useeffect(getProfileDetails())  -----api call in useEffect
//2.getprofiledetails will be store in profileResults         -----store response in state
//3.profileResults will shown in ui                           -----state data showed in UI
