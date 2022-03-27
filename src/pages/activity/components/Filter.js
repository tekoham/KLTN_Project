import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { CustomButton } from '../../../components/common'
import ActivityListing from '../../../assest/icon/activity-listing-icon.svg'
import ActivityListingActive from '../../../assest/icon/activity-listing-icon-active.svg'
import ActivityPurchases from '../../../assest/icon/activity-purchases-icon.svg'
import ActivityPurchasesActive from '../../../assest/icon/activity-purchases-icon-active.svg'
import ActivityBids from '../../../assest/icon/activity-bids-icon.svg'
import ActivityBidsActive from '../../../assest/icon/activity-bids-icon-active.svg'

const listFilter = [
  {
    id: 0,
    icon: ActivityListing,
    activeIcon: ActivityListingActive,
    filterTitle: 'Listings',
    active: false,
  },
  {
    id: 1,
    icon: ActivityPurchases,
    activeIcon: ActivityPurchasesActive,
    filterTitle: 'Purchases',
    active: false,
  },
  {
    id: 2,
    icon: ActivityBids,
    activeIcon: ActivityBidsActive,
    filterTitle: 'Bids',
    active: false,
  },
]

//Filter button
const Filter = forwardRef((props, ref) => {
  const { handleSetActiveFilter, type } = props

  const [listButton, setListButton] = useState(listFilter)

  useImperativeHandle(ref, () => ({
    resetListButton() {
      handleActiveButton(-1)
    },
  }))

  const handleActiveButton = (id) => {
    let _listButton = [...listButton]
    _listButton?.forEach((btn) => {
      btn?.id !== id || (btn?.id === id && btn?.active)
        ? (btn.active = false)
        : (btn.active = true)
    })
    id !== type ? handleSetActiveFilter(id) : handleSetActiveFilter(-1)
    setListButton(_listButton)
  }

  return (
    <div className='filter-container '>
      <div className='filter-title'>Filter</div>
      <div className='d-flex'>
        {listButton?.map((item, index) => (
          <CustomButton
            key={index}
            color={item?.active ? 'pink' : 'content-blue'}
            shape='small-radius'
            iconLeft={
              <img
                src={item?.active ? item?.activeIcon : item?.icon}
                alt='filter icon'
              />
            }
            onClick={() => handleActiveButton(item?.id)}
            className='button-filter'
          >
            {item?.filterTitle}
          </CustomButton>
        ))}
      </div>
    </div>
  )
})

export default Filter
