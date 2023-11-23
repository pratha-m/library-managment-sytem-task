import React from 'react'
import {useNavigate} from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate=useNavigate();
  return (
    <div className='homePage'>
       
       <div className="imgCont">
         <img src="https://2023.ifla.org/wp-content/uploads/2022/12/38034177801_4007989bcd_k.jpg" alt="" />
       </div>
       <div className="textCont">
          <div className="innText">
            <div className="homeHead">Turn the Page to a New Reading Experience</div>
            <div className="homePara">Let's Get Started on Your Digital Library Adventure!</div>
            <div className="homeExploreBtn">
              <button onClick={()=>{navigate("/library")}}>Go To Library</button>
            </div>
          </div>
       </div>
    </div>
  )
}

export default Home