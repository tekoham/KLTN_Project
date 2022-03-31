import './style.scss'

import { Input, InputNumber } from 'antd'

import Password from 'antd/lib/input/Password'

const InputCustom = (props) => {
  const {
    name,
    className,
    style,
    formatter,
    type,
    placeholder,
    rules,
    addonAfter,
    addonBefore,
    allowClear,
    bordered,
    defaultValue,
    disabled,
    id,
    maxLength,
    prefix,
    size,
    suffix,
    value,
    onChange,
    onPressEnter,
    children,
    parser,
    max,
    min,
    autoComplete,
    visibilityToggle,
    defaultType,
    ...restProps
  } = props

  let overrideClassNames = ['ant-input-custom']

  const initArgs = () => {
    if (className) {
      overrideClassNames.push(className)
    }
  }

  initArgs()

  const renderComp = () => {
    return (
      <Input
        name={name}
        className={overrideClassNames.join(' ')}
        style={style}
        formatter={formatter}
        type={defaultType}
        placeholder={placeholder}
        rules={rules}
        addonAfter={addonAfter}
        addonBefore={addonBefore}
        allowClear={allowClear}
        bordered={bordered}
        defaultValue={defaultValue}
        disabled={disabled}
        id={id}
        maxLength={maxLength}
        prefix={prefix}
        size={size}
        suffix={suffix}
        value={value}
        onChange={onChange}
        onPressEnter={onPressEnter}
        parser={parser}
        max={max}
        min={min}
        autoComplete={autoComplete}
        {...restProps}
      >
        {children}
      </Input>
    )
  }

  return renderComp()
}

export default InputCustom
