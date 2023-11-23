import React from 'react'
import "../about/about.css";
import "./contact.css";

const Contact = () => {
  return (
    <div className="contactPage">
    <section className="contact" id="contactPage">
    <div className="contactPageHead">Contact <span>Us</span></div>
    <div className="contactPageMain">
       <div className="contactPageImage"></div>
       <div className="contactPageTextContent">
           <form className="contactForm">
               <input type="text" id="name" placeholder="Name"/>
               <input type="email" id="email" placeholder="Email"/>
               <textarea id="message" placeholder="Message"></textarea>
               <button className="contactUsBtn">Submit</button>
           </form>
       </div>
    </div>
    </section>
    </div>
  )
}

export default Contact