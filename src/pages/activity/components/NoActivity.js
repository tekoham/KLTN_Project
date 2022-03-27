import React from 'react'

import { CustomButton } from '../../../components/common'
import { useHistory } from 'react-router-dom'

import noItem from '../../../assest/image/no-item.png'

const NoActivity = () => {
  const history = useHistory()
  const onClickCategory = () => {
    history.push(`/marketplace`)
  }
  return (
    <div className='no-activity-container d-flex align-items-center'>
      <img src={noItem} alt='No activity' />
      <div>No Activity Found</div>
      <div>Come back soon! New activity will be shown here</div>
      <CustomButton
        color='pink-hover-blue'
        className='btn-browse'
        onClick={() => onClickCategory()}
      >
        Browse Marketplace
      </CustomButton>
    </div>
  )
}

export default NoActivity
