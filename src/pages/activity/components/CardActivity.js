import React from 'react'
import {
  convertTimeToDate,
  convertTimeToTime,
} from '../../../utils/convertDate'
import { Pagination } from 'antd'
import { CustomTooltip } from '../../../components/common'
import { Tooltip } from 'antd'
import timeIcon from '../../../assest/icon/time-icon.svg'
import calendarIcon from '../../../assest/icon/calendar-icon.svg'

const CardActivity = (props) => {
  const { data } = props || {}
  const renderType = (status) => {
    switch (status) {
      case 0:
        return 'Listed By '
      case 1:
        return 'Purchased By '
      case 2:
        return 'Bids By '
      default:
        return
    }
  }

  return (
    <div className='card-activity d-flex'>
      <div className='collectible-container d-flex align-items-center justify-content-space-between'>
        <div className='image-container '>
          <img
            className='image'
            src={data?.image}
            alt='collectible image'
          ></img>
        </div>
        <div className='time-display'>
          <div className='date'>
            <img src={calendarIcon} alt='time icon' />
            {convertTimeToDate(data?.actionHappenedAt)}
          </div>
          <div className='time'>
            <img src={timeIcon} alt='time icon' />
            {convertTimeToTime(data?.actionHappenedAt)}
          </div>
        </div>
        <div className='collectible-info'>
          <CustomTooltip placement='topLeft' title={data?.name}>
            <div className='collectible-name'>{data?.name}</div>
          </CustomTooltip>

          <div className='action'>
            <div className='user-name'>
              {renderType(data?.status)}
              <Tooltip placement='topLeft' title={data?.userName}>
                <div>{data?.userName}</div>
              </Tooltip>
            </div>
            <div className='price'>
              For
              <Tooltip placement='topLeft' title={data?.price}>
                <div>{data?.price}</div>
                <div> ETH</div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardActivity
