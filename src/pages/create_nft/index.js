import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Form } from 'antd'
import {
    CustomButton,
    InputCustom,
    Label,
    CustomDragger,
    CustomInputTextarea,
    CustomSwitch,
    SelectCustom
} from '../../components/common'
import { useSelector, useDispatch } from 'react-redux'
import DefaultLayout from '../../components/layout/default-layout'
import { useHistory } from 'react-router-dom'
import nftService from '../../service/nftService'
import collectionService from '../../service/collectionService'
import {
    Categories,
    MarketplaceBtnGroups,
    DateTimePicker,
    CreateCollectionModal,
    CollectionFollowStepModal,
    CreateCollectionSelected,
    FlowStepNotForSale,
    // FlowAuctionStepModal,
    FlowStepModal
} from './components'
import moment from 'moment'
import { addCustomDay } from '../../utils/convertDate'
import { globalLoading, globalLoadDone } from '../../store/actions/globalLoading'
import { isUserAuthenticated } from '../../utils/auth'
import './styles.scss'
import { stringRandom, randomImage } from '../../utils/randomData'
import { omit } from 'lodash'

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

const CreateNFT = () => {
    const dispatch = useDispatch()
    //Form value
    const CategoriesCustomRef = useRef()
    const [uploadFile, setUploadFile] = useState('')
    const [isError, setIsError] = useState(false)
    const [category, setCategory] = useState(-1)
    const [isOnMarketplace, setIsOnMarketplace] = useState(false)
    const [saleType, setSaleType] = useState(0)
    const [startDate, setStartDate] = useState(1)
    const [expirationDate, setExpirationDate] = useState(1)
    const [listOfCollections, setListOfCollections] = useState([])
    const [nftId, setNftId] = useState(null)
    //Modal
    const [isCreateCollectionModalVisible, setCreateCollectionModalVisible] = useState(false)
    const [isCollectionFollowStepModalVisible, setCollectionFollowStepModalVisible] = useState(false)
    const [isModalNotForSale, setModalNotForSale] = useState(false)
    const [isModalAuction, setModalAuction] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false)

    const [formValues, setFormValues] = useState(null)
    const [form] = Form.useForm()

    const { createSuccess } = useSelector(state => state.collection)
    const { myProfile } = useSelector(state => state.user)

    const history = useHistory()

    const handleSetCategory = id => {
        setCategory(id)
        form.setFieldsValue({ category: id })
    }

    useEffect(() => {
        CategoriesCustomRef?.current?.resetListButton()
    }, [])

    useEffect(() => {
        const checkAuth = async () => {
            if (!myProfile?.data?.address) {
                history.push('/connect')
            } else {
                if (!isUserAuthenticated()) {
                    dispatch(globalLoading())
                    history.push('/')
                    dispatch(globalLoadDone())
                }
            }
        }
        checkAuth()
    }, [history, myProfile?.data?.address])

    const handleSetNftId = id => {
        setNftId(id)
    }

    const onSwitchChange = value => {
        setIsOnMarketplace(value)
    }

    const onSaleTypeChange = value => {
        setSaleType(value)
    }

    const onModalClose = useCallback(() => {
        setModalVisible(false)
    }, [])

    const onNotForSaleModalClose = useCallback(() => {
        setModalNotForSale(false)
    }, [])

    const onCreateCollectionModalOpen = useCallback(() => {
        setCreateCollectionModalVisible(true)
    }, [])
    const onCreateCollectionModalClose = useCallback(() => {
        setCreateCollectionModalVisible(false)
    }, [])
    const onCollectionFollowStepModalClose = () => {
        setCollectionFollowStepModalVisible(false)
    }

    const onCollectionFollowStepModalOpen = () => {
        setCollectionFollowStepModalVisible(true)
    }

    useEffect(() => {
        const fetchListCollections = async () => {
            dispatch(globalLoading())
            const userId = localStorage.getItem('userId')

            const [dataCollection, err] = await collectionService.getListOfCollection({ userId })
            if (err) {
                message.error('Failed to fetch collections')
            } else if (dataCollection) {
                setListOfCollections(dataCollection?.data)
            }
            dispatch(globalLoadDone())
        }
        if (isUserAuthenticated()) {
            fetchListCollections()
        }
    }, [createSuccess, dispatch])

    const notZeroValidator = (rule, value) => {
        if (value && Number(value) === 0) {
            return Promise.reject('Invalid price')
        }

        return Promise.resolve()
    }

    const onCategoryChangeValidator = useCallback(value => {
        if (value < 0) {
            return Promise.reject('You must select a category')
        }
        return Promise.resolve()
    }, [])

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

    const onFinish = useCallback(
        async values => {
            let collectionAddress
            const [collectionInfo, errSubmitForm] = await collectionService.getCollectionDetail(values?.collectionId)
            if (collectionInfo) {
                collectionAddress = collectionInfo?.address
            } else {
                return message.error('Submit failed', errSubmitForm)
            }
            const convertValues = {
                ...values,
                onSaleStatus: values?.onSaleStatus ? 1 : 0,
                userId: myProfile?.data?.id,
                name: values?.name.trim(),
                collectionAddress: collectionAddress
            }

            if (convertValues['price']) {
                convertValues['price'] = Number(convertValues['price'])
            }

            if (convertValues['minimumBid']) {
                convertValues['minimumBid'] = Number(convertValues['minimumBid'])
            }

            if (convertValues['expireDate']) {
                if (convertValues['startDate'] && convertValues['expireDate']) {
                    if (typeof convertValues['expireDate'] === 'number') {
                        if (typeof convertValues['startDate'] === 'string') {
                            convertValues['expireDate'] = moment(convertValues['startDate'])
                                .add(convertValues['expireDate'], 'days')
                                .unix()
                        } else {
                            convertValues['expireDate'] = moment().add(convertValues['expireDate'], 'days').unix()
                        }
                    } else {
                        convertValues['expireDate'] = moment(convertValues['expireDate']).unix()
                    }
                }
            }

            if (convertValues['startDate']) {
                if (typeof convertValues['startDate'] === 'number') {
                    convertValues['startDate'] = moment().unix()
                } else {
                    convertValues['startDate'] = moment(convertValues['startDate']).unix()
                }
            }

            setFormValues(convertValues)

            if (values?.onSaleStatus) {
                if (values?.type === SALE_TYPE.AUCTION) {
                    setModalAuction(true)
                } else {
                    setModalVisible(true)
                }
            } else {
                setModalNotForSale(true)
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

    useEffect(() => {
        if (!myProfile?.data?.address) {
            history.push({
                pathname: '/connect',
                state: {
                    from: '/create-nft'
                }
            })
        }
    }, [myProfile?.data?.address, history])

    useEffect(() => {
        if (nftId) {
            setTimeout(() => {
                history.push(`/collectible/${nftId}`)
            }, 2000)
        }
    }, [nftId, history])

    return (
        <DefaultLayout>
            <div className="create-nft-container">
                <div className="create-nft-header">
                    <span className="create-nft-header_title">Create Collectible Item</span>
                </div>
                <div className="create-nft-form_wrapper">
                    <Form
                        name="createNftForm"
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        onFieldsChange={() => removeError()}
                        className="create-nft-form"
                    >
                        {/* avatar NFT input */}
                        <div className="select-nft-avatar">
                            <Label title="Upload File">
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Must select a file'
                                        }
                                    ]}
                                    name="upload"
                                >
                                    <CustomDragger setUploadFile={setUploadFile} />
                                </Form.Item>
                            </Label>
                        </div>
                        {/* category NFT input */}
                        <div className="categories-container">
                            <Label title="Categories">
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Must select a category'
                                        },
                                        { validator: onCategoryChangeValidator }
                                    ]}
                                    name="category"
                                >
                                    <Categories
                                        handleSetActiveCategories={handleSetCategory}
                                        category={category}
                                        ref={CategoriesCustomRef}
                                    ></Categories>
                                </Form.Item>
                            </Label>
                        </div>
                        {/* title NFT input */}
                        <div className="title-container">
                            <Label title="Item Name">
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: 'NFT name cannot be blank'
                                        },
                                        {
                                            max: 200,
                                            message: 'NFT name cannot exceeds 200 characters'
                                        }
                                    ]}
                                    name="name"
                                >
                                    <InputCustom placeholder="Item name" />
                                </Form.Item>
                            </Label>
                        </div>

                        {/* description NFT input */}
                        <div className="description-container">
                            <Label title="Description (Optional)" description="With preserved line-breaks">
                                <Form.Item
                                    name="description"
                                    initialValue=""
                                    rules={[
                                        {
                                            max: 1000,
                                            message: 'Description cannot exceeds 1000 characters'
                                        }
                                    ]}
                                >
                                    <CustomInputTextarea
                                        autoSize={{ minRows: 1 }}
                                        placeholder="Please provide a detailed description of your item"
                                    />
                                </Form.Item>
                            </Label>
                        </div>

                        <div className="choose-sale-type-container">
                            <div className="choose-sale-type">
                                <div className="choose-sale-type_header">
                                    <div className="choose-sale-type_label">
                                        <span className="choose-sale-type_label__title">Put on marketplace</span>
                                        <span className="choose-sale-type_label__desc">
                                            Enter price to allow users instantly purchase your NFT
                                        </span>
                                    </div>
                                    <Form.Item initialValue={false} name="onSaleStatus">
                                        <CustomSwitch onChange={onSwitchChange} value={isOnMarketplace} />
                                    </Form.Item>
                                </div>
                                {isOnMarketplace && (
                                    <Form.Item initialValue={SALE_TYPE.FIXED_PRICE} name="type">
                                        <MarketplaceBtnGroups options={SALE_TYPE} onChange={onSaleTypeChange} />
                                    </Form.Item>
                                )}
                            </div>

                            {/* put on sale fixed price */}
                            {isOnMarketplace && saleType === SALE_TYPE.FIXED_PRICE && (
                                <div className="fixed-price-container">
                                    <Label title="Price">
                                        <div className="create-nft-price">
                                            <Form.Item
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Price cannot be blank'
                                                    },
                                                    { validator: notZeroValidator }
                                                ]}
                                                name="price"
                                                className="create-nft-price_input"
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
                            {isOnMarketplace && saleType === SALE_TYPE.AUCTION && (
                                <>
                                    <div className="auction-container">
                                        <Label
                                            title="Minimum bid"
                                            description="Bids below this amount won’t be allowed."
                                        >
                                            <div className="create-nft-minimumBid">
                                                <Form.Item
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Minimum bid cannot be blank'
                                                        },
                                                        { validator: notZeroValidator }
                                                    ]}
                                                    name="minimumBid"
                                                    className="create-nft-minimumBid_price_input"
                                                >
                                                    <InputCustom
                                                        onChange={e => onChangeValueInput(e.target.value, 'minimumBid')}
                                                        placeholder="Enter minimum bid"
                                                        className="create-nft-minimumBid_price_input_custom"
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
                                                    className="create-nft-startDate"
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
                                                    className="create-nft-expireDate"
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

                        {/* choose collection */}
                        <div className="choose-collection-container">
                            <Label title="Choose collection">
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: 'You must select a collection'
                                        }
                                    ]}
                                    name="collectionId"
                                >
                                    <CreateCollectionSelected
                                        onCreateColletion={onCreateCollectionModalOpen}
                                        listOfCollections={listOfCollections}
                                    />
                                </Form.Item>
                            </Label>
                        </div>

                        <CustomButton
                            color="pink-hover-blue"
                            fullwidth={true}
                            type="submit"
                            htmlType="submit"
                            disabled={isError}
                        >
                            Create Collectible
                        </CustomButton>
                        {isError && <div className="err-underline">Please fix all error before create collectible</div>}
                    </Form>
                </div>
            </div>

            {isModalVisible && formValues && (
                <FlowStepModal
                    visible={isModalVisible}
                    onClose={onModalClose}
                    data={formValues}
                    uploadFile={uploadFile}
                    setNftId={handleSetNftId}
                />
            )}
            {/* {isModalAuction && formValues && (
                <FlowAuctionStepModal
                    visible={isModalAuction}
                    onClose={() => setModalAuction(false)}
                    data={formValues}
                    uploadFile={uploadFile}
                    setNftId={handleSetNftId}
                />
            )} */}
            {isModalNotForSale && (
                <FlowStepNotForSale
                    visible={isModalNotForSale}
                    onClose={onNotForSaleModalClose}
                    data={formValues}
                    listOfCollections={listOfCollections}
                    uploadFile={uploadFile}
                    setNftId={handleSetNftId}
                />
            )}
            {/* Date Time Picker */}
            {startDate === 0 && <DateTimePicker onChange={onMinimumBidStartDateChange} visible={true} />}
            {expirationDate === 0 && <DateTimePicker onChange={onMinimumBidExpireDateChange} visible={true} />}
            {/* Create Collection Modal */}
            {isCreateCollectionModalVisible && (
                <CreateCollectionModal
                    visible={isCreateCollectionModalVisible}
                    onClose={onCreateCollectionModalClose}
                    onCollectionFollowStepModalClose={onCollectionFollowStepModalClose}
                    onCollectionFollowStepModalOpen={onCollectionFollowStepModalOpen}
                />
            )}
            {isCollectionFollowStepModalVisible && (
                <CollectionFollowStepModal visible={isCollectionFollowStepModalVisible} />
            )}
        </DefaultLayout>
    )
}

export default CreateNFT
