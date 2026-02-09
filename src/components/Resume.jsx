import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Resume.css';
import imgRectangle5 from '../images/resume/rectangle5.png';

const Resume = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="resume-container" data-node-id="2409:571">
      <div className="resume-content" data-node-id="2409:572">
        {/* About me Section */}
        <div className="resume-section-header" data-node-id="2409:573">
          <p className="resume-section-title" data-node-id="2409:574">About me</p>
        </div>

        <div className="resume-about-card" data-node-id="2409:575">
          <div className="resume-about-image-wrapper" data-node-id="2409:576">
            <img alt="" src={imgRectangle5} className="resume-about-image" />
          </div>
          <div className="resume-about-content" data-node-id="2409:577">
            <div className="resume-about-text-container" data-node-id="2409:578">
              <div className="resume-name-card" data-node-id="2409:579">
                <p className="resume-name" data-node-id="2409:580">Sabhya Singhal</p>
                <p className="resume-role" data-node-id="2409:581">Product Designer | Living for experiences!</p>
              </div>
              <div className="resume-description-card" data-node-id="2409:582">
                <div className="resume-description-text" data-node-id="2409:583">
                  <p>
                    <span className="resume-description-bold">UX Designer specializing in intuitive, high-impact experiences that drive customer retention and business growth</span>
                    <br />
                    <span className="resume-description-normal">I bring product thinking into every design decision and am always looking to actively collaborate across design, product, and business where I see a strong vision.</span>
                  </p>
                  <p className="resume-description-spacing">&nbsp;</p>
                  <p className="resume-description-normal">
                    Something "about me"
                    <br />
                    I treat my brain like software—always updating it. From tracking design trends to learning a new language to sharpen cognition, and experimenting to find faster, smarter ways to work and understand where I truly excel.  Basically, I enjoy building for a company, for users, and myself—everything in between.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="resume-experience-section" data-node-id="2409:584">
          <div className="resume-section-header" data-node-id="2409:585">
            <p className="resume-section-title" data-node-id="2409:586">Experience</p>
          </div>

          {/* Magicpin Experience */}
          <div className="resume-experience-card" data-node-id="2409:587">
            <div className="resume-experience-header" data-node-id="2409:588">
              <p className="resume-experience-company" data-node-id="2409:589">Magicpin | Oct 23' - Sept 25'</p>
              <p className="resume-experience-position" data-node-id="2409:590">Product Designer</p>
            </div>
            <ul className="resume-experience-list" data-node-id="2409:591">
              <li><span>Enhanced search suggesters and results by making them intent-aware, reducing drop-offs by 57% and significantly increasing conversions </span></li>
              <li><span>Led end-to-end design for food and fashion delivery products (magicNow, magic9), driving revenue growth by improving brand positioning and optimizing item widget content hierarchy across the app. </span></li>
              <li><span>Simplified magicPay checkout: Identified the problem of information overload and redesigned magicPay flow, increasing daily average users by 24% and reducing transaction time by 27%.  </span></li>
              <li><span>Revisited merchant portal food delivery: Conducted user research and usability testing and incorporated those insights leading to better delivery experience for merchants and reduced support tickets by 48%.  </span></li>
              <li><span>Optimized voucher and delivery checkout flow by implementing progressive disclosure, reducing cognitive load and information overload, resulting in an average of 30% decrease in checkout completion time and significantly improving user experience. </span></li>
              <li><span>Developed a comprehensive Design System, reducing design time by 20% and improving cross-functional collaboration between design and technology, further establishing consistency in UI. </span></li>
              <li><span>Enhanced merchant portal dashboards, streamlining discount creation and incorporating 15+ actionable insights from user feedback. </span></li>
              <li><span>Redesigned Easy Rewards to boost user interaction, with increased redemptions.</span></li>
            </ul>
          </div>

          {/* Flying Saints Experience */}
          <div className="resume-experience-card resume-experience-card-small" data-node-id="2409:592">
            <div className="resume-experience-header" data-node-id="2409:593">
              <p className="resume-experience-company" data-node-id="2409:594">Flying Saints | Jan 23' - April 23'</p>
              <p className="resume-experience-position" data-node-id="2409:595">UI/UX Designer</p>
            </div>
            <ul className="resume-experience-list" data-node-id="2409:596">
              <li><span>Acquired 2 new clients through compelling design pitches. Contributed to multiple live website and mobile app projects.</span></li>
            </ul>
          </div>

          {/* NapEazy Experience */}
          <div className="resume-experience-card resume-experience-card-small" data-node-id="2409:597">
            <div className="resume-experience-header" data-node-id="2409:598">
              <p className="resume-experience-company" data-node-id="2409:599">NapEazy</p>
              <p className="resume-experience-position" data-node-id="2409:600">UX </p>
            </div>
            <ul className="resume-experience-list" data-node-id="2409:601">
              <li><span>Acquired 2 new clients through compelling design pitches. Contributed to multiple live website and mobile app projects.</span></li>
            </ul>
          </div>

          {/* Newton School Experience */}
          <div className="resume-experience-card resume-experience-card-small" data-node-id="2409:602">
            <div className="resume-experience-header" data-node-id="2409:603">
              <p className="resume-experience-company" data-node-id="2409:604">Newton School | June 22' - August 22'</p>
              <p className="resume-experience-position" data-node-id="2409:605">Graphic Designer</p>
            </div>
            <ul className="resume-experience-list" data-node-id="2409:606">
              <li><span>Acquired 2 new clients through compelling design pitches. Contributed to multiple live website and mobile app projects.</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
