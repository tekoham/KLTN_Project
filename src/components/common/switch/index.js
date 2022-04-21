import React from 'react'

//components
import { Switch } from 'antd'

//styles
import './style.scss'

const CustomSwitch = ({ onChange, value, ...restProps }) => {
  return (
    <Switch
      className='switch-custom'
      onChange={onChange}
      checkedChildren='ON'
      unCheckedChildren='OFF'
      checked={value}
      {...restProps}
    />
  )
}

export default CustomSwitch
