import React from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import './styles.scss'

const CustomButton = (props) => {
  const {
    className,
    disabled,
    htmlType,
    icon,
    iconLeft,
    iconRight,
    loading,
    onClick,
    children,
    color,
    shape,
    size,
    fullwidth,
    display,
    ...restProps
  } = props

  let overrideClassNames = ['ant-btn-custom']

  const renderContent = () => {
    return (
      <>
        {typeof iconLeft !== 'undefined' ? iconLeft : ''}
        {children}
        {typeof iconRight !== 'undefined' ? iconRight : ''}
      </>
    )
  }

  const initArgs = () => {
    if (color === 'light-blue') {
      overrideClassNames.push('ant-btn-color-light-blue')
    }
    if (color === 'pink') {
      overrideClassNames.push('ant-btn-color-pink')
    }
    if (color === 'charcoal-blue') {
      overrideClassNames.push('ant-btn-color-charcoal-blue')
    }

    if (shape === 'small-radius') {
      overrideClassNames.push('ant-btn-shape-small-radius')
    }

    if (size === 'small') {
      overrideClassNames.push('ant-btn-small')
    }

    if (fullwidth === true) {
      overrideClassNames.push('ant-btn-fullwidth')
    }

    if (display === 'inline') {
      overrideClassNames.push('ant-btn-display-inline')
    }

    if (className) {
      overrideClassNames.push(className)
    }
  }

  initArgs()

  return (
    <Button
      className={overrideClassNames.join(' ')}
      disabled={disabled}
      htmlType={htmlType}
      icon={icon}
      loading={loading}
      onClick={onClick}
      {...restProps}
    >
      {renderContent()}
    </Button>
  )
}

CustomButton.propTypes = {
  children: PropTypes.any,
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.any,
  disabled: PropTypes.bool,
  htmlType: PropTypes.string,
  icon: PropTypes.node,
  iconLeft: PropTypes.node,
  iconRight: PropTypes.node,
  loading: PropTypes.any,
  onClick: PropTypes.func,
  shape: PropTypes.string,
  size: PropTypes.string,
  fullwidth: PropTypes.bool,
}

CustomButton.defaultProps = {
  fullwidth: false,
}

export default CustomButton
