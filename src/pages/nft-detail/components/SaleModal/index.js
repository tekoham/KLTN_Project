import React, { useState, useCallback } from 'react'
import { Form, message, Modal } from 'antd'
import { CustomButton, InputCustom, Label, SelectCustom } from '../../../../components/common'
import { useSelector } from 'react-redux'
import userService from '../../../../service/userService'
import { MarketplaceBtnGroups, DateTimePicker } from '../../../create_nft/components'
import moment from 'moment'
import { addCustomDay } from '../../../../utils/convertDate'
import { isTokenExpired } from '../../../../utils/refreshTokenAuth'
import './styles.scss'

const MAX_VALUE = 100000000000000
const SALE_TYPE = {
    FIXED_PRICE: 0,
    AUCTION: 1
}

const STARTDATE_OPTIONS = [
    { value: 1, label: 'Right after listing' },
    { value: 0, label: 'Pick specific date' }
]

const EXPIREDATE_OPTIONS = [
    { value: 1, label: '1 day' },
    { value: 3, label: '3 days' },
    { value: 5, label: '5 days' },
    { value: 7, label: '7 days' },
    { value: 0, label: 'Pick specific date' }
]

const SaleModal = ({ onCloseModal, isOpen, onOpenSaleStepModal, onOpenAuctionStepModal }) => {
    //Form value
    const [isError, setIsError] = useState(false)
    const [saleType, setSaleType] = useState(0)
    const [startDate, setStartDate] = useState(1)
    const [expirationDate, setExpirationDate] = useState(1)

    const [formValues, setFormValues] = useState(null)
    const [form] = Form.useForm()

    const { myProfile } = useSelector(state => state.user)

    const onSaleTypeChange = value => {
        setSaleType(value)
    }

    const notZeroValidator = (rule, value) => {
        if (value && Number(value) === 0) {
            return Promise.reject('Invalid price')
        }

        return Promise.resolve()
    }

    const onPickStartDate = useCallback(value => {
        if (value !== undefined) {
            form.setFieldsValue({ startDate: value })
            setStartDate(value)
            form.validateFields(['startDate', 'expireDate'])
        }
    }, [])

    const onMinimumBidStartDateChange = useCallback(value => {
        if (value !== undefined) {
            form.setFieldsValue({ startDate: value })
            setStartDate(value)
            form.validateFields(['startDate', 'expireDate'])
        }
    }, [])

    const onMinimumBidStartDateValidator = useCallback(() => {
        if (isNaN(startDate)) {
            if (moment().unix() > moment(startDate).unix()) {
                return Promise.reject('Starting date must be after present')
            }
        }
        return Promise.resolve()
    }, [startDate])

    const onPickExpirationDate = useCallback(value => {
        if (value !== undefined) {
            form.setFieldsValue({ expireDate: value })
            setExpirationDate(value)
            form.validateFields(['expireDate', 'startDate'])
        }
    }, [])

    const onMinimumBidExpireDateChange = useCallback(value => {
        form.setFieldsValue({ expireDate: value })
        setExpirationDate(value)
        form.validateFields(['expireDate', 'startDate'])
    }, [])

    const onMinimumBidExpireDateValidator = useCallback(() => {
        if (isNaN(expirationDate)) {
            if (moment().unix() >= moment(expirationDate).unix()) {
                return Promise.reject('Expiration date must be after present')
            }
        }
        if (isNaN(expirationDate) && isNaN(startDate)) {
            if (moment(startDate).unix() >= moment(expirationDate).unix()) {
                return Promise.reject('Expiration date must be after Starting date')
            }
        }
        if (!isNaN(expirationDate) && isNaN(startDate)) {
            if (moment(startDate).unix() >= addCustomDay(expirationDate)) {
                return Promise.reject('Expiration date must be after Starting date')
            }
        }
        return Promise.resolve()
    }, [expirationDate, startDate])

    const onChangeValueInput = (value, name, maxValue = MAX_VALUE, decimal = 6) => {
        if (value === '.') return form.setFieldsValue({ [name]: null })
        let number = value
            .toString()
            .replace(/[^0-9.]/g, '')
            .replace(/(\..*?)\..*/g, '$1')
        if (Number(number) >= maxValue) {
            number = number.slice(0, -1)
        }
        if (number.includes('.')) {
            const numString = number.toString().split('.')
            if (numString[1].length > decimal) {
                return form.setFieldsValue({
                    [name]: number.substring(0, number.length - 1)
                })
            }
        }
        form.setFieldsValue({ [name]: number })
    }

    const onCancelListOnSaleModal = () => {
        form.setFieldsValue({
            type: SALE_TYPE.FIXED_PRICE,
            price: null,
            minimumBid: null,
            startDate: 1,
            expireDate: 1
        })
        setSaleType(SALE_TYPE.FIXED_PRICE)
        onCloseModal()
    }

    const onFinish = useCallback(
        async values => {
            if (values['price']) {
                values['price'] = Number(values['price'])
            }

            if (values['minimumBid']) {
                values['minimumBid'] = Number(values['minimumBid'])
            }

            if (values['expireDate']) {
                if (values['startDate'] && values['expireDate']) {
                    if (typeof values['expireDate'] === 'number') {
                        if (typeof values['startDate'] === 'string') {
                            values['expireDate'] = moment(values['startDate']).add(values['expireDate'], 'days').unix()
                        } else {
                            values['expireDate'] = moment().add(values['expireDate'], 'days').unix()
                        }
                    } else {
                        values['expireDate'] = moment(values['expireDate']).unix()
                    }
                }
            }

            if (values['startDate']) {
                if (typeof values['startDate'] === 'number') {
                    values['startDate'] = moment().unix()
                } else {
                    values['startDate'] = moment(values['startDate']).unix()
                }
            }

            setFormValues(values)

            if (isTokenExpired()) {
                const refreshToken = localStorage.getItem('refreshToken')
                const [, errRefresh] = await userService.refreshToken({
                    refresh_token: refreshToken
                })
                if (errRefresh) {
                    onCloseModal()
                    return message.error('Creating collectible failed', errRefresh)
                }
            }

            if (values?.type === SALE_TYPE.AUCTION) {
                onOpenAuctionStepModal(values)
            } else {
                onOpenSaleStepModal(values)
            }
        },
        [myProfile, setFormValues]
    )

    const removeError = () => {
        setIsError(false)
    }

    const onFinishFailed = () => {
        setIsError(true)
    }

    return (
        <Modal
            className="custom-sale-modal"
            visible={isOpen}
            onOk={onCloseModal}
            onCancel={onCancelListOnSaleModal}
            footer={null}
            closable={false}
        >
            <div className="sale-modal-container">
                <p className="sale-modal-title">Put On Sale</p>
                <div className="list-on-sale-form_wrapper">
                    <Form
                        name="listOnSaleForm"
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        onFieldsChange={() => removeError()}
                        className="list-on-sale-form"
                    >
                        <div className="choose-sale-type-container">
                            <div className="choose-sale-type">
                                <Form.Item initialValue={SALE_TYPE.FIXED_PRICE} name="type">
                                    <MarketplaceBtnGroups options={SALE_TYPE} onChange={onSaleTypeChange} />
                                </Form.Item>
                            </div>

                            {/* put on sale fixed price */}
                            {saleType === SALE_TYPE.FIXED_PRICE && (
                                <div className="fixed-price-container">
                                    <Label title="Price">
                                        <div className="price">
                                            <Form.Item
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Price cannot be blank'
                                                    },
                                                    { validator: notZeroValidator }
                                                ]}
                                                name="price"
                                                className="price_input"
                                            >
                                                <InputCustom
                                                    onChange={e => onChangeValueInput(e.target.value, 'price')}
                                                    placeholder="Enter your NFT price here"
                                                />
                                            </Form.Item>
                                        </div>
                                    </Label>
                                </div>
                            )}

                            {/* auction price */}
                            {saleType === SALE_TYPE.AUCTION && (
                                <>
                                    <div className="auction-container">
                                        <Label
                                            title="Minimum bid"
                                            description="Bids below this amount won’t be allowed."
                                        >
                                            <div className="minimumBid">
                                                <Form.Item
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Minimum bid cannot be blank'
                                                        },
                                                        { validator: notZeroValidator }
                                                    ]}
                                                    name="minimumBid"
                                                    className="minimumBid_price_input"
                                                >
                                                    <InputCustom
                                                        onChange={e => onChangeValueInput(e.target.value, 'minimumBid')}
                                                        placeholder="Enter minimum bid"
                                                        className="minimumBid_price_input_custom"
                                                    />
                                                </Form.Item>
                                            </div>
                                        </Label>
                                    </div>
                                    <div className="auction-date-container">
                                        <div className="pick-auction-date">
                                            <Label title="Starting Date" className="startDate-label">
                                                <Form.Item
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'This field cannot be blank'
                                                        },
                                                        { validator: onMinimumBidStartDateValidator }
                                                    ]}
                                                    name="startDate"
                                                    initialValue={1}
                                                    className="startDate"
                                                >
                                                    <SelectCustom
                                                        placeholder="Select value"
                                                        options={STARTDATE_OPTIONS}
                                                        onChange={onPickStartDate}
                                                    />
                                                </Form.Item>
                                            </Label>
                                            <Label title="Expiration Date" className="expireDate-label">
                                                <Form.Item
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'This field cannot be blank'
                                                        },
                                                        { validator: onMinimumBidExpireDateValidator }
                                                    ]}
                                                    name="expireDate"
                                                    initialValue={1}
                                                    className="expireDate"
                                                >
                                                    <SelectCustom
                                                        placeholder="Select value"
                                                        options={EXPIREDATE_OPTIONS}
                                                        onChange={onPickExpirationDate}
                                                    />
                                                </Form.Item>
                                            </Label>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <CustomButton
                            color="pink-hover-blue"
                            fullwidth={true}
                            type="submit"
                            htmlType="submit"
                            disabled={isError}
                        >
                            List On Sale
                        </CustomButton>
                        {isError && <div className="err-underline">Please fix all error before create collectible</div>}
                    </Form>
                </div>
            </div>

            {/* Date Time Picker */}
            {startDate === 0 && <DateTimePicker onChange={onMinimumBidStartDateChange} visible={true} />}
            {expirationDate === 0 && <DateTimePicker onChange={onMinimumBidExpireDateChange} visible={true} />}
        </Modal>
    )
}

export default SaleModal
