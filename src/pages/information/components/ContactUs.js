import React from 'react'
import { loremIpsumGenerator } from '../../../utils/textGenerator'
import firstAuthorImage from '../../../assest/image/first-author-image.png'
import secondAuthorImage from '../../../assest/image/second-author-image.png'
import emailIconWhite from '../../../assest/icon/email-icon-white.svg'
import phoneIconWhite from '../../../assest/icon/phone-icon-white.svg'
import locationIconWhite from '../../../assest/icon/location-icon-white.svg'

const ContactUs = () => {
  return (
    <div className='contact-us-container'>
      <div className='contact-us-title'>Contact Info</div>
      <div className='contact-us-content'>
        <div className='website-author d-flex'>
          <div className='first-author'>
            <img src={firstAuthorImage} alt='First author image' />
            <div className='name'>Dao Trung Kien</div>
            <div className='position'>Developer</div>
            <div className='description'>{loremIpsumGenerator(80)}.</div>
          </div>
          <div className='second-author'>
            <img src={secondAuthorImage} alt='Second author image' />
            <div className='name'>Luong The Dai</div>
            <div className='position'>Developer</div>
            <div className='description'>{loremIpsumGenerator(80)}.</div>
          </div>
        </div>
        <div className='website-author-information d-flex'>
          <div className='location'>
            <div className='icon-container'>
              <img src={locationIconWhite} alt='Location icon' />
            </div>

            <div className='title'>Location</div>
            <div className='support-text'>
              VNU University of Engineering and Technology
            </div>
            <div className='support-text'>
              E3, 144 Xuan Thuy, Cau Giay, Ha Noi
            </div>
          </div>
          <div className='phone-number'>
            <div className='icon-container'>
              <img src={phoneIconWhite} alt='Phone icon' />
            </div>

            <div className='title'>Phone Number</div>
            <div className='support-text'>+84 2437 547 461</div>
            <div className='support-text'>+84 2437 547 460</div>
          </div>
          <div className='email'>
            <div className='icon-container'>
              <img src={emailIconWhite} alt='Email icon' />
            </div>
            <div className='title'>Email Address</div>
            <div className='support-text'>uet@vnu.edu.vn</div>
            <div className='support-text'>vnu@vnu.edu.vn</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
