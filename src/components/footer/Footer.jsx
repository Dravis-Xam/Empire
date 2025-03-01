import React from 'react'
import "./footer.css"
import SocialAccContainer from './footer_components/social-acc-container'
import CommentForm from './footer_components/CommentForm'
import AboutUs from './footer_components/AboutUs'
import PnsSection from './footer_components/PnsSection';
import titleBg from '../../../public/EHP-1.png';
import HelpSc from './footer_components/help-sc';

export default function Footer() {
  return (
    <section className='footer'>
      <SocialAccContainer />
      <div className='bare-foot-container'>
        <img src={titleBg} alt="bg" className='title-bg'/>
        <div className='title-container'>
          <div className='page-title-section'>Empire Hub Phones</div> 
        </div>
        <div className='miscelinous-cn'>
          <AboutUs />
          <PnsSection />
          <HelpSc />
        </div>
      </div>
      <CommentForm />
    </section>
  )
}
