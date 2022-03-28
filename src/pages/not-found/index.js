import React from 'react'
import DefaultLayout from '../../components/layout/default-layout'
import NotFoundImage from '../../assest/icon/not-found.svg'
import './style.scss'

const NotFound = () => {
  return (
    <DefaultLayout>
      <div className='not-found-container'>
        <img alt='not-found' src={NotFoundImage} />
        <div>Something went wrong! This page cannot be found</div>
      </div>
    </DefaultLayout>
  )
}

export default NotFound
