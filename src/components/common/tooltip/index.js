import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

//components
import { Tooltip } from 'antd'

//styles
import './style.scss'

const CustomTooltip = ({
  align,
  placement,
  visible,
  title,
  className,
  ...restProps
}) => {
  return (
    <Tooltip
      className={cls({ 'tooltip-custom': true, [className]: !!className })}
      align={align}
      placement={placement}
      visible={visible}
      title={title}
      getPopupContainer={(triggerNode) => triggerNode.parentNode}
      {...restProps}
    />
  )
}

export default CustomTooltip
