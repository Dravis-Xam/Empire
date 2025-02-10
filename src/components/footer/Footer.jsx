import React from 'react'
import "./footer.css"

export default function Footer() {
  return (
    <section className='footer'>
      <div className='social-acc-container'>
        <span> Follow Us On </span>
        <a className="social-acc" href='#'><img src='https://cdn-icons-png.flaticon.com/128/15047/15047068.png' alt='tiktok'/></a>
        <a className="social-acc" href='#'><img src='https://cdn-icons-png.flaticon.com/128/4401/4401403.png' alt='facebook'/></a>
        <a className="social-acc" href='#'><img src='https://cdn-icons-png.flaticon.com/128/3670/3670274.png' alt='instagram'/></a>
        <a className="social-acc" href='#'><img src='https://cdn-icons-png.flaticon.com/128/1216/1216915.png' alt='twitter'/></a>
      </div>
      <div className='comment-section'>
        <span>Write to us</span>
        <form method="POST" action='#'>
            <div>
                <label>Email</label>
                <input
                    type='email'
                    name='commenterEmail'
                    required
                />
            </div>
            <div>
                <label>Message</label>
                <textarea
                    type='text'
                    rows={4}
                    cols={21}
                    name='commenterMessage'
                    required
                />
            </div>
            <br ></br>
            <button type='submit' className='submit-comment-btn'> Send </button>
        </form>
      </div> 
      <div className='bare-foot-container'>
        <div className='page-title-section'>Empire Hub Phones</div> 
        <div className="about-us-section">
            <h2>About Us</h2>
            <div>Home</div>
            <div>Get In Touch</div>
            <div>FAQs</div>
        </div>
        <div className='pns-section'>
            <h2>Products and Services</h2>
            <div>Member Discounts</div>
            <div>Dealerships</div>
            <div>After-sale Services</div>
        </div>
      </div>
    </section>
  )
}
