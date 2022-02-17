import React, { useState, useEffect } from 'react'
import { Carousel } from 'antd'
import './styles.scss'
import ArrowNextWhite from '../../../assest/icon/arrow-next-white.svg'
import ArrowPrevWhite from '../../../assest/icon/arrow-prev-white.svg'
import ArrowNextPink from '../../../assest/icon/arrow-next-pink.svg'
import ArrowPrevPink from '../../../assest/icon/arrow-prev-pink.svg'

const NextArrow = ({ onClick }) => {
  if (!onClick) return null
  const [hoverArrowNext, setHoverArrowNext] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseOver={() => setHoverArrowNext(true)}
      onMouseOut={() => setHoverArrowNext(false)}
      className='next-arrow'
    >
      <img src={hoverArrowNext ? ArrowNextPink : ArrowNextWhite} alt='' />
    </div>
  )
}

const PrevArrow = ({ onClick }) => {
  if (!onClick) return null
  const [hoverArrowPrev, setHoverArrowPrev] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseOver={() => setHoverArrowPrev(true)}
      onMouseOut={() => setHoverArrowPrev(false)}
      className='prev-arrow'
    >
      <img src={hoverArrowPrev ? ArrowPrevPink : ArrowPrevWhite} alt='' />
    </div>
  )
}

const CustomCarousel = ({ children, itemNumber, itemPadding }) => {
  return (
    <Carousel
      autoplay
      centerMode
      centerPadding={itemPadding}
      arrows={true}
      nextArrow={<NextArrow />}
      prevArrow={<PrevArrow />}
      dots={false}
      className='carousel-container'
      slidesToShow={itemNumber}
    >
      {children}
    </Carousel>
  )
}

export default CustomCarousel
