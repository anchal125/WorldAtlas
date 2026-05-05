import React from 'react'
import './Footer.css'
import { footerdata } from '../data';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className='footer'>
      <div className="footer-info">
        {footerdata.map((item,index)=>{
          

          return( <div className='footericon' key={index}>
            <item.icon size='1.5rem'/>
            <div>
              <p><b>{item.title}</b></p>
              <p>{item.details}</p>
            </div>
          </div>)
        })} 
        
      </div>
      <div className="copyright">
        <p>&copy;{currentYear}. All rights reserved.</p>
        <div className='copyright-items'>
          <span>Home</span>
          <span>Social</span>
          <span>Source Code</span>
        </div>

      </div>
    </div>
  )
}

