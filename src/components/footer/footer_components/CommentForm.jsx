import React from 'react'
import './Comment.css'

export default function CommentForm() {
  return (
    <div className='comment-section'>
        <h2 className='comment-title'>Write to us</h2>
        <form method="POST" action='#' className='comment-form'>
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
            <button type='submit' className='submit-comment-btn'> Send </button>
        </form>
    </div>
  )
}
