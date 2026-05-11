import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, aliquam. Necessitatibus quis harum doloremque ex, obcaecati perferendis? Ratione, enim iusto! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quod odit temporibus amet, molestias consequuntur consequatur cumque labore vero suscipit.</p>
            <div className='footer-social-icons'>
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
            </div>
            <div className="footer-content-center">
                 <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>about us</li>
                    <li>Delivery</li>
                    <li>privacyPolicy</li>
                </ul>

            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-221-456-7890</li>
                    <li>contacttomato@gmail.com </li>
                </ul>
               
            </div>
        </div>
        <hr />
        <p className="footer-copyrights">
            Copyrights 2024 c tomato.com - All right reserved.
        </p>
    </div>
  )
}

export default Footer