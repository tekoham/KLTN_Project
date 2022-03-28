import React, { useEffect, useRef } from 'react'
import DefaultLayout from '../../components/layout/default-layout'
import { AboutUs, ContactUs, HelpAndSupport, Advertisement } from './components'
import './styles.scss'

const Information = () => {
  const FilterCustomRef = useRef()

  useEffect(() => {
    FilterCustomRef?.current?.resetListButton()
  }, [])

  const handleSetType = (id) => {
    setType(id)
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }

  return (
    <DefaultLayout>
      <div className='information-container'>
        <div className='information-banner'>
          <div className='title'>Welcome to our information page</div>
          <div className='subtitle'>
            You can find all the necessary information about our website here
          </div>
        </div>
        <div className='information-content'>
          <AboutUs></AboutUs>
          <Advertisement></Advertisement>
          <HelpAndSupport></HelpAndSupport>
          <ContactUs></ContactUs>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Information
