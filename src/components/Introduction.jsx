import React, { useRef, useState, useEffect } from 'react';
import './Introduction.css';

// Figma image URLs (valid for 7 days)
const imgMenu = "https://www.figma.com/api/mcp/asset/acd85a33-c6fc-4c7f-a397-754b252f51aa";
const imgRectangle1 = "https://www.figma.com/api/mcp/asset/82abcdc4-9475-482b-97c4-7a74b7b7db84";
const imgImage1 = "https://www.figma.com/api/mcp/asset/6a034b35-5db4-472f-9eec-4f33129d6ca9";
const imgRectangle3 = "https://www.figma.com/api/mcp/asset/f7b8a106-4f2c-4489-badd-73abd968f002";
const imgRectangle4 = "https://www.figma.com/api/mcp/asset/a9ffa723-4ea1-4ed8-8a80-d52d021f759d";
const imgRectangle5 = "https://www.figma.com/api/mcp/asset/ac57eec5-55b0-4d60-bd3a-138e148f408d";
const imgRectangle6 = "https://www.figma.com/api/mcp/asset/32cbde40-5fdb-4345-b6e8-06d1388288ae";
const imgAdvance = "https://www.figma.com/api/mcp/asset/178a31ab-87bf-4910-8079-8897f0021de5";
const imgRectangle7 = "https://www.figma.com/api/mcp/asset/4e896079-51a5-47ec-956e-f44c8fc1d6b1";
const imgWhatsAppImage20241219At111349Pm1 = "https://www.figma.com/api/mcp/asset/4756c326-f60b-4776-85e6-926fb48ebd0f";
const imgWhatsAppImage20241219At111349Pm2 = "https://www.figma.com/api/mcp/asset/327695f4-ca30-4188-a7a0-d37430f670f3";
const imgWhatsAppImage20241219At111349Pm11 = "https://www.figma.com/api/mcp/asset/c3c912ce-e37c-4a82-8ff3-032caee00a29";
const imgWhatsAppImage20241211At45326Pm11 = "https://www.figma.com/api/mcp/asset/d1baca64-15a3-411e-aaf7-b381aba2b731";
const imgWhatsAppImage20241211At45326Pm21 = "https://www.figma.com/api/mcp/asset/1cfbceab-520e-4b31-8be7-f8a8e757b501";
const imgScreenshot20241217At104908Pm1 = "https://www.figma.com/api/mcp/asset/6e535bf3-4327-42c6-8fa1-e499ee024545";
const imgScreenshot20241217At104805Pm1 = "https://www.figma.com/api/mcp/asset/56bb8cbc-5391-4fe0-85ff-51d68eb724c6";
const imgScreenshot20241217At110817Pm1 = "https://www.figma.com/api/mcp/asset/822ce065-c1aa-476b-8cc9-00f588329bee";
const imgScreenshot41 = "https://www.figma.com/api/mcp/asset/a279d95c-3e5d-4012-a6d1-7998fde5a6a4";
const imgSimpleMockupFreeScene11 = "https://www.figma.com/api/mcp/asset/869a6aaa-780c-4667-8766-71e27e396f2e";
const imgF32C13117719167629462De4680C1 = "https://www.figma.com/api/mcp/asset/0f1cb84d-91cb-4f5d-8f5a-eb8a72a33019";
const imgFrame4851 = "https://www.figma.com/api/mcp/asset/fdc81015-ff19-4632-befd-5bd3b653260b";
const img11 = "https://www.figma.com/api/mcp/asset/1a783e53-0e35-4bf8-895d-48266ad82338";
const imgLine1 = "https://www.figma.com/api/mcp/asset/69f707cf-b683-4073-a817-73bb498de360";

const Introduction = () => {
  // Drag functionality for testimonials container scrolling
  const testimonialsRef = useRef(null);
  const [isTestimonialsDragging, setIsTestimonialsDragging] = useState(false);
  const [testimonialsStartX, setTestimonialsStartX] = useState(0);
  const [testimonialsScrollLeft, setTestimonialsScrollLeft] = useState(0);

  const handleTestimonialsMouseDown = (e) => {
    if (!testimonialsRef.current) return;
    setIsTestimonialsDragging(true);
    setTestimonialsStartX(e.pageX - testimonialsRef.current.offsetLeft);
    setTestimonialsScrollLeft(testimonialsRef.current.scrollLeft);
    testimonialsRef.current.style.cursor = 'grabbing';
  };

  const handleTestimonialsMouseLeave = () => {
    setIsTestimonialsDragging(false);
    if (testimonialsRef.current) {
      testimonialsRef.current.style.cursor = 'grab';
    }
  };

  const handleTestimonialsMouseUp = () => {
    setIsTestimonialsDragging(false);
    if (testimonialsRef.current) {
      testimonialsRef.current.style.cursor = 'grab';
    }
  };

  const handleTestimonialsMouseMove = (e) => {
    if (!isTestimonialsDragging || !testimonialsRef.current) return;
    e.preventDefault();
    const x = e.pageX - testimonialsRef.current.offsetLeft;
    const walk = (x - testimonialsStartX) * 2; // Scroll speed multiplier
    testimonialsRef.current.scrollLeft = testimonialsScrollLeft - walk;
  };

  // Touch support for testimonials
  const handleTestimonialsTouchStart = (e) => {
    if (!testimonialsRef.current) return;
    setIsTestimonialsDragging(true);
    setTestimonialsStartX(e.touches[0].pageX - testimonialsRef.current.offsetLeft);
    setTestimonialsScrollLeft(testimonialsRef.current.scrollLeft);
  };

  const handleTestimonialsTouchMove = (e) => {
    if (!isTestimonialsDragging || !testimonialsRef.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - testimonialsRef.current.offsetLeft;
    const walk = (x - testimonialsStartX) * 2;
    testimonialsRef.current.scrollLeft = testimonialsScrollLeft - walk;
  };

  const handleTestimonialsTouchEnd = () => {
    setIsTestimonialsDragging(false);
  };

  // Drag functionality for projects container scrolling
  const projectsRef = useRef(null);
  const [isProjectsDragging, setIsProjectsDragging] = useState(false);
  const [projectsStartX, setProjectsStartX] = useState(0);
  const [projectsScrollLeft, setProjectsScrollLeft] = useState(0);

  const handleProjectsMouseDown = (e) => {
    if (!projectsRef.current) return;
    setIsProjectsDragging(true);
    setProjectsStartX(e.pageX - projectsRef.current.offsetLeft);
    setProjectsScrollLeft(projectsRef.current.scrollLeft);
    projectsRef.current.style.cursor = 'grabbing';
  };

  const handleProjectsMouseLeave = () => {
    setIsProjectsDragging(false);
    if (projectsRef.current) {
      projectsRef.current.style.cursor = 'grab';
    }
  };

  const handleProjectsMouseUp = () => {
    setIsProjectsDragging(false);
    if (projectsRef.current) {
      projectsRef.current.style.cursor = 'grab';
    }
  };

  const handleProjectsMouseMove = (e) => {
    if (!isProjectsDragging || !projectsRef.current) return;
    e.preventDefault();
    const x = e.pageX - projectsRef.current.offsetLeft;
    const walk = (x - projectsStartX) * 2; // Scroll speed multiplier
    projectsRef.current.scrollLeft = projectsScrollLeft - walk;
  };

  // Touch support for projects
  const handleProjectsTouchStart = (e) => {
    if (!projectsRef.current) return;
    setIsProjectsDragging(true);
    setProjectsStartX(e.touches[0].pageX - projectsRef.current.offsetLeft);
    setProjectsScrollLeft(projectsRef.current.scrollLeft);
  };

  const handleProjectsTouchMove = (e) => {
    if (!isProjectsDragging || !projectsRef.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - projectsRef.current.offsetLeft;
    const walk = (x - projectsStartX) * 2;
    projectsRef.current.scrollLeft = projectsScrollLeft - walk;
  };

  const handleProjectsTouchEnd = () => {
    setIsProjectsDragging(false);
  };

  return (
    <div className="introduction-container">
      <div className="introduction-content">
        {/* Header Section */}
        <div className="header-section">
          <p className="name-text">Sabhya Singhal</p>
          <div className="menu-button">
            <img src={imgMenu} alt="Menu" className="menu-icon" />
            <p className="menu-text">Menu</p>
          </div>
        </div>

        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-title-container">
            <div className="hero-title-row">
              <p className="hero-title">Creative </p>
              <div className="hero-image-wrapper">
                <img src={imgRectangle1} alt="" className="hero-image" />
              </div>
              <p className="hero-title">designer </p>
            </div>
            <p className="hero-subtitle">crafting digital experiences</p>
          </div>
          <p className="hero-tagline">
            I am no constructor but I surely know how to "bridge" the gap between business and user needs!
          </p>
        </div>

        {/* Work Experience Section */}
        <div className="work-section">
          <div className="work-header">
            <div className="work-header-left">
              <div className="work-image-wrapper">
                <img src={imgImage1} alt="Magicpin" className="work-image" />
              </div>
              <div className="work-company-info">
                <p className="work-company-text">Cases from my previous company</p>
                <p className="work-company-name">Magicpin, India ( A super saving application)</p>
              </div>
            </div>
            <p className="work-date">Oct, 2023- Sept, 2025</p>
          </div>

          <div className="work-cases">
            {/* Case 1 */}
            <div className="case-card case-card-large">
              <div className="case-content">
                <div className="case-image-container">
                  <img src={imgRectangle3} alt="Case 1" className="case-image" />
                </div>
                <div className="case-text-container">
                  <p className="case-category">Multi functional experience</p>
                  <p className="case-title">
                    Worked on how search experience should work across a multi-service ecosystem
                  </p>
                  <p className="case-description">
                    Optimized search suggesters and results by making them intent-aware, reducing drop-offs by 57% and significantly increasing conversions
                  </p>
                  <div className="case-tags">
                    <div className="case-tag">Problem identification</div>
                    <div className="case-tag">Product thinking</div>
                    <div className="case-tag">Solution</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Case 2 and 3 */}
            <div className="case-cards-row">
              <div className="case-card case-card-green">
                <div className="case-image-top">
                  <img src={imgRectangle4} alt="Case 2" className="case-image-full" />
                </div>
                <div className="case-text-container">
                  <p className="case-category">Multi functional experience</p>
                  <p className="case-title">
                    Worked on how search experience should work across a multi-service ecosystem
                  </p>
                  <p className="case-description">
                    Optimized search suggesters and results by making them intent-aware, reducing drop-offs by 57% and significantly increasing conversions
                  </p>
                  <div className="case-tags-vertical">
                    <div className="case-tag">Problem identification</div>
                    <div className="case-tags-row">
                      <div className="case-tag">Product thinking</div>
                      <div className="case-tag">Solution</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="case-card case-card-grey">
                <div className="case-image-top">
                  <img src={imgRectangle5} alt="Case 3" className="case-image-full" />
                </div>
                <div className="case-text-container">
                  <p className="case-category">Multi functional experience</p>
                  <p className="case-title">
                    Worked on how search experience should work across a multi-service ecosystem
                  </p>
                  <p className="case-description">
                    Optimized search suggesters and results by making them intent-aware, reducing drop-offs by 57% and significantly increasing conversions
                  </p>
                  <div className="case-tags-vertical">
                    <div className="case-tag">Problem identification</div>
                    <div className="case-tags-row">
                      <div className="case-tag">Product thinking</div>
                      <div className="case-tag">Solution</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Case 4 */}
            <div className="case-card case-card-large">
              <div className="case-content case-content-reverse">
                <div className="case-text-container">
                  <p className="case-category case-category-large">Multi functional experience</p>
                  <p className="case-title case-title-large">
                    Worked on how search experience should work across a multi-service 
                  </p>
                  <p className="case-description">
                    Optimized search suggesters and results by making them intent-aware, reducing drop-offs by 57% and significantly increasing 
                  </p>
                  <div className="case-tags">
                    <div className="case-tag">Problem identification</div>
                    <div className="case-tag">Product thinking</div>
                  </div>
                </div>
                <div className="case-image-container">
                  <img src={imgRectangle6} alt="Case 4" className="case-image" />
                </div>
              </div>
            </div>

            {/* View All Cases Button */}
            <div className="view-all-button">
              <p className="view-all-text">View all other cases</p>
              <div className="view-all-icon-wrapper">
                <img src={imgAdvance} alt="Arrow" className="view-all-icon" />
              </div>
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <div className="about-section">
          <div className="section-header">
            <p className="section-title">About me</p>
          </div>
          <div className="about-content">
            <div className="about-image-wrapper">
              <img src={imgRectangle7} alt="Sabhya Singhal" className="about-image" />
            </div>
            <div className="about-text-content">
              <div className="about-card">
                <p className="about-name">Sabhya Singhal</p>
                <p className="about-role">Product Designer | Living for experiences!</p>
              </div>
              <div className="about-description-card">
                <p className="about-description">
                  <span className="about-description-bold">
                    UX Designer specializing in intuitive, high-impact experiences that drive customer retention and business growth
                  </span>
                  <br />
                  <span className="about-description-normal">
                    I bring product thinking into every design decision and am always looking to actively collaborate across design, product, and business where I see a strong vision.
                  </span>
                </p>
                <p className="about-description-spacing">&nbsp;</p>
                <p className="about-description-normal">
                  Something "about me"
                  <br />
                  I treat my brain like software—always updating it. From tracking design trends to learning a new language to sharpen cognition, and experimenting to find faster, smarter ways to work and understand where I truly excel.  Basically, I enjoy building for a company, for users, and myself—everything in between.
                </p>
              </div>
              <div className="know-more-button">
                <p className="know-more-text">Know more about me</p>
                <div className="know-more-icon-wrapper">
                  <img src={imgAdvance} alt="Arrow" className="know-more-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recognitions Section */}
        <div className="recognitions-section">
          <div className="section-header">
            <p className="section-title">Recognitions and participations</p>
          </div>
          <div className="recognitions-content">
            <div className="recognition-card recognition-card-left">
              <div className="recognition-images-grid">
                <div className="recognition-image-mask">
                  <img src={imgWhatsAppImage20241219At111349Pm2} alt="UXINDIA" className="recognition-image" />
                </div>
                <div className="recognition-image-mask recognition-image-mask-right">
                  <img src={imgWhatsAppImage20241219At111349Pm11} alt="UXINDIA" className="recognition-image" />
                </div>
              </div>
              <div className="recognition-text-content">
                <p className="recognition-title">Volunteer at UXINDIA2024</p>
                <p className="recognition-description">
                  This September, I had the privilege of volunteering at UXINDIA's 20th anniversary, which not only allowed me to contribute to the design community, promote women in design, but also opened doors to connect with leading designers and product experts from around the world. 
                </p>
              </div>
            </div>
            <div className="recognitions-right">
              <div className="recognition-card recognition-card-green">
                <div className="recognition-text-content">
                  <p className="recognition-title">Guest Speaker at MDI, Gurgaon</p>
                  <p className="recognition-description">
                    Conducted a workshop at MDI Gurgaon for aspiring product managers on "<span className="recognition-bold">Design and Product collaboration</span> over Figma".
                  </p>
                </div>
                <div className="recognition-collage">
                  <div className="recognition-collage-image recognition-collage-tl">
                    <img src={imgWhatsAppImage20241211At45326Pm11} alt="MDI" className="recognition-collage-img" />
                  </div>
                  <div className="recognition-collage-image recognition-collage-tr">
                    <img src={imgWhatsAppImage20241211At45326Pm21} alt="MDI" className="recognition-collage-img" />
                  </div>
                  <div className="recognition-collage-image recognition-collage-br">
                    <div className="recognition-collage-img-wrapper">
                      <img src={imgScreenshot20241217At104908Pm1} alt="MDI" className="recognition-collage-img" />
                    </div>
                  </div>
                  <div className="recognition-collage-image recognition-collage-bl">
                    <div className="recognition-collage-img-wrapper">
                      <img src={imgScreenshot20241217At104805Pm1} alt="MDI" className="recognition-collage-img" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="recognition-card recognition-card-grey">
                <div className="recognition-text-content">
                  <p className="recognition-title">July 2024 MVP Award</p>
                  <p className="recognition-description">
                    Recognized at the Most Valuable Player at Magicpin for July 2024. This was a cross functional nomination by the staff software engineer.
                  </p>
                </div>
                <div className="recognition-award-image">
                  <img src={imgScreenshot20241217At110817Pm1} alt="Award" className="recognition-award-img" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials-section">
          <div className="section-header">
            <p className="section-title">See what people say about their experience working with me</p>
          </div>
          <div 
            className="testimonials-content"
            ref={testimonialsRef}
            onMouseDown={handleTestimonialsMouseDown}
            onMouseLeave={handleTestimonialsMouseLeave}
            onMouseUp={handleTestimonialsMouseUp}
            onMouseMove={handleTestimonialsMouseMove}
            onTouchStart={handleTestimonialsTouchStart}
            onTouchMove={handleTestimonialsTouchMove}
            onTouchEnd={handleTestimonialsTouchEnd}
          >
            <div className="testimonial-card testimonial-card-green">
              <p className="testimonial-role">Staff software engineer at Magicpin</p>
              <p className="testimonial-name">Md Shahbaz Hussain</p>
              <p className="testimonial-text">
                Sabhya has been owning the flows like a Pro. Always ready to give her best shot in the design from both the UI and UX persepective and gauges the tech constraints as well. Beyond her design execution, Sabhya brings tremendous value by actively engaging in product discussions as well. Her work ethic, quality of output, and collaborative spirit make her an asset to any te...
              </p>
            </div>
            <div className="testimonial-card testimonial-card-grey">
              <p className="testimonial-role">Senior designer at Microsoft</p>
              <p className="testimonial-name">Rhiddit Paul</p>
              <p className="testimonial-text">
                Sabhya's approach when it comes to UX research is truly commendable for her age! What I loved about her work was the attention to detail she had and the determination to understand the entire ecosystem in which the project is situated! I would definitely feel lucky to have her on any team I am working in!
              </p>
            </div>
            <div className="testimonial-card testimonial-card-green">
              <p className="testimonial-role">Faculty at NIFT</p>
              <p className="testimonial-name">Arnav Deepak Barik</p>
              <p className="testimonial-text">
                I had the privilege of teaching and mentoring Sabhya in various subjects and projects. During her study, I was consistently impressed with her dedication towards projects, curiosity to know more and go deep into the subject. She is a good thinker and visual designer with the ability to think critically and analyze complex issues. I personally recommend h...
              </p>
            </div>
            <div className="testimonial-card testimonial-card-grey">
              <p className="testimonial-role">Ex- Newton School, Associate manager </p>
              <p className="testimonial-name testimonial-name-large">Lavin Punjabi</p>
              <p className="testimonial-text">
                Worked With Sabhya for a brief period. She converted imagination into a visual design rapidly and with elegance, a profound thinker and an intriguing person beyond work conversations.
              </p>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="projects-section">
          <div className="section-header">
            <p className="section-title">Graduating from NIFT, I tried my hands on a lot of different things. Check some of them out</p>
          </div>
          <div 
            className="projects-content"
            ref={projectsRef}
            onMouseDown={handleProjectsMouseDown}
            onMouseLeave={handleProjectsMouseLeave}
            onMouseUp={handleProjectsMouseUp}
            onMouseMove={handleProjectsMouseMove}
            onTouchStart={handleProjectsTouchStart}
            onTouchMove={handleProjectsTouchMove}
            onTouchEnd={handleProjectsTouchEnd}
          >
            <div className="project-image-wrapper">
              <img src={imgScreenshot41} alt="Project 1" className="project-image" />
            </div>
            <div className="project-image-wrapper">
              <img src={imgSimpleMockupFreeScene11} alt="Project 2" className="project-image" />
            </div>
            <div className="project-image-wrapper">
              <img src={imgF32C13117719167629462De4680C1} alt="Project 3" className="project-image" />
            </div>
            <div className="project-image-wrapper project-image-green">
              <img src={imgFrame4851} alt="Project 4" className="project-image" />
            </div>
            <div className="project-image-wrapper">
              <img src={img11} alt="Project 5" className="project-image" />
            </div>
          </div>
          <div className="view-all-button view-all-button-projects">
            <p className="view-all-text">View all other cases</p>
            <div className="view-all-icon-wrapper">
              <img src={imgAdvance} alt="Arrow" className="view-all-icon" />
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="footer-section">
          <div className="footer-top">
            <p className="footer-text">
              Since we have come to the finish line, I believe we should get in touch. Drop me a👋 hi!
            </p>
            <div className="footer-right">
              <p className="footer-curated">
                <span>Curated by</span>
                <span className="footer-bold"> Sabhya Singhal</span>
              </p>
              <p className="footer-powered">Powered by fun, food, and caffeine.</p>
            </div>
          </div>
          <div className="footer-line-wrapper">
            <img src={imgLine1} alt="" className="footer-line" />
          </div>
          <div className="footer-email">
            <p className="footer-email-text">singhalsabhya05@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
