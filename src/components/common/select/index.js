import React from 'react'

import './styles.scss'

import { Select } from 'antd'

const { Option } = Select

const SelectCustom = (props) => {
  const {
    name,
    allowClear,
    autoClearSearchValue,
    autoFocus,
    bordered,
    clearIcon,
    defaultActiveFirstOption,
    defaultOpen,
    defaultValue,
    dropdownClassName,
    dropdownMatchSelectWidth,
    dropdownRender,
    dropdownStyle,
    filterOption,
    getPopupContainer,
    labelInValue,
    listHeight,
    loading,
    maxTagCount,
    maxTagPlaceholder,
    maxTagTextLength,
    menuItemSelectedIcon,
    mode,
    notFoundContent,
    open,
    optionFilterProp,
    optionLabelProp,
    options,
    placeholder,
    removeIcon,
    searchValue,
    showArrow,
    showSearch,
    size,
    suffixIcon,
    tagRender,
    tokenSeparators,
    value,
    virtual,
    onBlur,
    onChange,
    onClear,
    onDeselect,
    onDropdownVisibleChange,
    onFocus,
    onInputKeyDown,
    onMouseEnter,
    onMouseLeave,
    onPopupScroll,
    onSearch,
    onSelect,
    className,
    disabled,
    title,
    key,
    label,
    classNames,
    onClick,
    prefixIcon,
    prefixLabel,
  } = props

  let overrideClassNames = ['ant-select-custom']
  let overrideDropdownClassNames = ['custom-dropdown']

  const initArgs = () => {
    if (classNames?.length > 0) {
      overrideClassNames = overrideClassNames.concat(classNames)
    }

    if (dropdownClassName) {
      overrideDropdownClassNames.push(dropdownClassName)
    }
  }

  initArgs()

  const renderSelectOptionWithIcon = (option) => {
    return {
      __html: `<img class="select-custom_option__icon" src="${option.icon}"/> ${option.label}`,
    }
  }

  return (
    <div className='select-custom-wrapper'>
      {prefixIcon && (
        <div className='select-custom_prefix'>
          <img
            src={prefixIcon}
            className='select-custom_prefix__icon'
            alt='prefix-icon'
          />
          {prefixLabel && <span>{prefixLabel}</span>}
        </div>
      )}
      <Select
        name={name}
        allowClear={allowClear}
        autoClearSearchValue={autoClearSearchValue}
        autoFocus={autoFocus}
        bordered={bordered}
        clearIcon={clearIcon}
        defaultActiveFirstOption={defaultActiveFirstOption}
        defaultOpen={defaultOpen}
        defaultValue={defaultValue}
        disabled={disabled}
        dropdownClassName={overrideDropdownClassNames.join(' ')}
        dropdownMatchSelectWidth={dropdownMatchSelectWidth}
        dropdownRender={dropdownRender}
        dropdownStyle={dropdownStyle}
        filterOption={filterOption}
        getPopupContainer={getPopupContainer}
        labelInValue={labelInValue}
        listHeight={listHeight}
        loading={loading}
        maxTagCount={maxTagCount}
        maxTagPlaceholder={maxTagPlaceholder}
        maxTagTextLength={maxTagTextLength}
        menuItemSelectedIcon={menuItemSelectedIcon}
        mode={mode}
        notFoundContent={notFoundContent}
        open={open}
        optionFilterProp={optionFilterProp}
        optionLabelProp={optionLabelProp}
        placeholder={placeholder}
        removeIcon={removeIcon}
        searchValue={searchValue}
        showArrow={showArrow}
        showSearch={showSearch}
        size={size}
        suffixIcon={suffixIcon}
        tagRender={tagRender}
        tokenSeparators={tokenSeparators}
        value={value}
        virtual={virtual}
        onBlur={onBlur}
        onChange={onChange}
        onClear={onClear}
        onDeselect={onDeselect}
        onDropdownVisibleChange={onDropdownVisibleChange}
        onFocus={onFocus}
        onInputKeyDown={onInputKeyDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onPopupScroll={onPopupScroll}
        onSearch={onSearch}
        onSelect={onSelect}
        title={title}
        key={key}
        label={label}
        className={overrideClassNames.join(' ') + ` ${className}`}
        onClick={onClick}
      >
        {Array.isArray(options) &&
          options.map((option) => (
            <Option
              key={`${option.value}-${option.label}`}
              className='select-custom_option'
              value={option.value}
            >
              {option.icon ? (
                <div
                  className='select-custom_option__icon__wrapper'
                  dangerouslySetInnerHTML={renderSelectOptionWithIcon(option)}
                />
              ) : (
                <span>{option.label}</span>
              )}
            </Option>
          ))}
      </Select>
    </div>
  )
}

export default SelectCustom
