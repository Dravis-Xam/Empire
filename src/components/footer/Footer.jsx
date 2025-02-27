import React from 'react'
import "./footer.css"
import SocialAccContainer from './footer_components/social-acc-container'
import CommentForm from './footer_components/CommentForm'
import AboutUs from './footer_components/AboutUs'
import PnsSection from './footer_components/PnsSection'

export default function Footer() {
  return (
    <section className='footer'>
      <SocialAccContainer />
      <CommentForm />
      <div className='bare-foot-container'>
        <div className='page-title-section'>Empire Hub Phones</div> 
        <AboutUs />
        <PnsSection />
      </div>
    </section>
  )
}
