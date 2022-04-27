import React from 'react'
import { CustomTooltip } from '../../../components/common'
import VerifiedIcon from '../../../assest/icon/verified-icon.svg'
import AvatarPlaceholder from '../../../assest/image/avatar-placeholder.png'

const Author = props => {
    const { data, dummyData } = props || {}
    return (
        <div className="collectible-author-info d-flex">
            <div className="collectible-creator d-flex align-items-center">
                <div className="avatar-container">
                    <img
                        className="avatar"
                        src={data?.creator?.avatar ? data?.creator?.avatar : AvatarPlaceholder}
                        alt="owner avatar"
                    ></img>
                    {dummyData?.creator?.verified ? (
                        <img className="verified-icon" src={VerifiedIcon} alt="verified icon"></img>
                    ) : (
                        ''
                    )}
                </div>
                <div className="info">
                    <CustomTooltip
                        placement="topLeft"
                        title={data?.creator?.name ? data?.creator?.name : dummyData?.creator?.address}
                    >
                        <div className="name">
                            {data?.creator?.name ? data?.creator?.name : dummyData?.creator?.address}
                        </div>
                    </CustomTooltip>
                    <div className="role">Item Creator</div>
                </div>
            </div>
            <div className="collectible-owner d-flex align-items-center">
                <div className="avatar-container">
                    <img
                        className="avatar"
                        src={data?.owner?.avatar ? data?.owner?.avatar : AvatarPlaceholder}
                        alt="owner avatar"
                    ></img>
                    {dummyData?.owner?.verified ? (
                        <img className="verified-icon" src={VerifiedIcon} alt="verified icon"></img>
                    ) : (
                        ''
                    )}
                </div>
                <div className="info">
                    <CustomTooltip
                        placement="topLeft"
                        title={data?.owner?.name ? data?.owner?.name : dummyData?.owner?.address}
                    >
                        <div className="name">{data?.owner?.name ? data?.owner?.name : dummyData?.owner?.address}</div>
                    </CustomTooltip>
                    <div className="role">Item Owner</div>
                </div>
            </div>
            <div className="collectible-collection d-flex align-items-center">
                <div className="avatar-container">
                    <img
                        className="avatar"
                        src={data?.collection?.avatar ? data?.collection?.avatar : AvatarPlaceholder}
                        alt="collection avatar"
                    ></img>
                    {dummyData?.collection?.verified ? (
                        <img className="verified-icon" src={VerifiedIcon} alt="verified icon"></img>
                    ) : (
                        ''
                    )}
                </div>
                <div className="info">
                    <CustomTooltip
                        placement="topLeft"
                        title={data?.collection?.name ? data?.collection?.name : dummyData?.collection?.address}
                    >
                        <div className="name">
                            {data?.collection?.name ? data?.collection?.name : dummyData?.collection?.address}
                        </div>
                    </CustomTooltip>
                    <div className="role">Item Collection</div>
                </div>
            </div>
        </div>
    )
}

export default Author
