import Request from '../request'

const serverEndpoint = process.env.REACT_APP_SERVER_API_ENDPOINT

const auctionService = {
    createAuction: async params => {
        try {
            const response = await Request.post(`${serverEndpoint}/v1/auctions`, params)
            return [response, null]
        } catch (error) {
            return [null, error]
        }
    },

    acceptBid: async bidData => {},

    cancelBid: async (bidId, transactionId, isHighesBid = null) => {},

    cancelAuction: async auctionId => {}
}

export default auctionService
