import React from 'react'
import "./about.css";
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="aboutPage">
      <section className="about" id="aboutPage">
        <div className="aboutUsHead">About <span>Us</span></div>
        <div className="aboutUsMainContent">
           <div className="aboutUsImage">
               <img src="https://img.freepik.com/premium-vector/woman-use-pc-desk-with-computer-monitor-working-home-vector-freelancer-business-female_507816-657.jpg?w=2000" alt=""/>
           </div>
           <div className="aboutUsTextContent">
               <p>
               Welcome to DIVERSE READS, a cutting-edge platform dedicated to revolutionizing the way libraries operate and serve their communities. Our passion for knowledge, 
               innovation, and efficiency drives us to provide state-of-the-art solutions tailored to meet the unique needs
                of libraries in the digital age. 
                   
               </p>
               <span className="socialLinks">
                   <ul>
                       <li><Link to="/" className="eachSocialLink"><i className="fa fa-brands fa-linkedin"></i></Link></li>
                       <li><Link to="/" className="eachSocialLink"><i className="fa fa-brands fa-twitter"></i></Link></li>
                       <li><Link to="/" className="eachSocialLink"><i className="fa fa-brands fa-instagram"></i></Link></li>
                   </ul>
               </span>
           </div>
        </div>
   </section>
    </div>
  )
}

export default About