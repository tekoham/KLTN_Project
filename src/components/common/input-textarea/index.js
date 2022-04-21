import './styles.scss'

import { Input } from 'antd'

const CustomInputTextarea = (props) => {
  const {
    name,
    autoSize,
    classNames,
    style,
    formatter,
    type,
    placeholder,
    rules,
    addonafter,
    addonbefore,
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
  } = props

  let overrideClassNames = ['ant-input-textarea-custom']

  const initArgs = () => {
    if (classNames?.length > 0) {
      overrideClassNames = overrideClassNames.concat(classNames)
    }
  }

  initArgs()

  return (
    <Input.TextArea
      name={name}
      autoSize={autoSize}
      className={overrideClassNames.join(' ')}
      style={style}
      formatter={formatter}
      type={type}
      placeholder={placeholder}
      rules={rules}
      addonafter={addonafter}
      addonbefore={addonbefore}
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
      {...props}
    >
      {children}
    </Input.TextArea>
  )
}

export default CustomInputTextarea
