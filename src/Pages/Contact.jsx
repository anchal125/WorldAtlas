import React from 'react'
import './Contact.css'

export const Contact = () => {
  const handleformSubmit=(formdata)=>{
    const forminputdata=Object.fromEntries(formdata.entries())
    console.log(forminputdata)   
  }
  return (
    <div className='contact'>
      <div className="contact-form">
        <h2>Contact Us</h2>
        <form action={handleformSubmit}>
          <input type="text" placeholder='Enter your name' name='name' required/>
          <input type="email" placeholder='Enter your email' name='email' required/>
          <textarea name="msg" id="msg" placeholder='Enter your message' rows='5' required></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>     
  )
} 
