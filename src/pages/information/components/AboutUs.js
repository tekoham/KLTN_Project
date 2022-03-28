import React from 'react'
import { loremIpsumGenerator } from '../../../utils/textGenerator'
import VNUImage from '../../../assest/image/VNU.png'
import UETImage from '../../../assest/image/UET.png'

const AboutUs = () => {
  return (
    <div className='about-us-container'>
      <div className='about-us-title'>About Our Website</div>
      <div className='about-us-content'>
        <div className='first-section'>
          <div className='description-text'>{loremIpsumGenerator(390)}.</div>
          <div className='description-text'>{loremIpsumGenerator(260)}.</div>
          <div className='about-us-image d-flex'>
            <img src={VNUImage} alt='VNU image' />
            <img src={UETImage} alt='UET image' />
          </div>
          <div className='description-text'>{loremIpsumGenerator(1000)}</div>
          <div className='description-text'>{loremIpsumGenerator(550)}.</div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
