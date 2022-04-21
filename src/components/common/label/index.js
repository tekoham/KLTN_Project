import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'

//components
import { CustomSwitch } from '../../common'

//style
import './style.scss'

const Label = ({
  title,
  children,
  description,
  subDescription,
  className,
  switchAble,
  onswitchAble,
  isUnlockableContent,
}) => {
  const labelClass = classNames({
    'label-custom_wrapper': true,
    [className]: !!className,
  })

  const [isSwitch, setIsSwitch] = useState(true)

  const onSwitchChange = useCallback(
    (value) => {
      switchAble && setIsSwitch(value)
      if (!value) {
        onswitchAble()
      }
    },
    [switchAble, onswitchAble]
  )
  useEffect(() => {
    if (isUnlockableContent) {
      setIsSwitch(false)
    }
  }, [isUnlockableContent])
  return (
    <div className={labelClass}>
      <div className='label-custom_title_wrap'>
        <span className='label-custom_title'>{title}</span>
        {switchAble && (
          <CustomSwitch onChange={onSwitchChange} value={isSwitch} />
        )}
      </div>
      {subDescription && (
        <span className='label-custom_subdesc'>{subDescription}</span>
      )}
      {isSwitch && children}
      {description && <span className='label-custom_desc'>{description}</span>}
    </div>
  )
}

export default Label
