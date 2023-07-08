import React from "react";
import about from "./../../assets/about.jpg";
import "./About.css";

const About = () => {
  return (
    <div className="about">
      <div className="about-container">
        <div className="about-image">
          <img src={about} alt="" />
        </div>
        <div className="about-info">
          <h1>About Us</h1>
          <p>
            We are a group of people who hope to provide assistance in various
            sciences for free or at nominal prices , We have a great group of
            teachers who have the experience and skill to explain what you want
            to understand and by using this website , you can learn alot of
            science , Math , Languages , programming , Computer and we have a
            lot of offers and more ...
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
