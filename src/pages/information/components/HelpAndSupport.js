import React from 'react'
import { Collapse } from 'antd'

const { Panel } = Collapse

const HelpAndSupport = () => {
  const MARKETPLACE = [
    {
      question: 'What is an NFT?',
      answer: `NFT stands for non-fungible tokens (NFTs) are ERC-721 tokens which are distributed
        across the Ethereum’s blockchain. NFTs are digital items such as collectibles, digital
        paintings, game items and many more. NFTs empower creators to tokenize their artwork
        and prove ownership through the blockchain.`,
    },
    {
      question: 'How do I create an NFT with CAS NFT?',
      answer: `You can create and list NFTs for FREE with zero cost minting! You just need to upload
        your artwork and sign the “listing authorization” in your crypto wallet such as MetaMask.`,
    },
    {
      question: 'What are our service fees?',
      answer: `CAS NFT has one of the lowest service fees in the market. Only 1.5% transaction fee for
        purchase of NFTs and 1.5% fee for a successful sale of NFTs. Fees are charged during
        sales between market participants. No hidden fees.`,
    },
    {
      question: 'What currencies can I use on CAS NFT?',
      answer: `We are currently accept only Ethereum native token (ETH) as payments method on our platform. We are
        supporting more tokens in the future.`,
    },
    {
      question: 'What is a verified collection?',
      answer: `Verified collections are granted a checkmark. Collections can only be verified if a creator
        shows enough proof of authenticity and active dedication to the marketplace. We are
        looking at multiple factors such as active social media presence and following, trading
        volume, number of minted and sold items.`,
    },
    {
      question: 'How to get a verified badge?',
      answer: (
        <>
          If you believe your collections meet our verification criteria listed
          above, please{' '}
          <a
            href={`https://docs.google.com/forms/d/e/1FAIpQLSfCw1zKTa-ST4-GkX_HlzbMQB8aMst6XIizmltqT8jXigtyDg/viewform?usp=sf_link`}
            target='_blank'
            rel='noreferrer'
            className='support-text'
          >
            fill out this form
          </a>{' '}
          here for review.
        </>
      ),
    },
    {
      question: 'How do I report inappropriate or fraudulent content?',
      answer: (
        <>
          CAS NFT is a self-serve, peer-to-peer NFT marketplace. Our team
          actively monitor the platform to remove inappropriate or fraudulent
          content that infringe the rights of others. If you would like to
          report content, please email to:{' '}
          <span className='support-text'>18020732@vnu.edu.vn</span>
        </>
      ),
    },
    {
      question: 'How do I partner with CAS NFT?',
      answer: (
        <>
          CAS NFT platform is a self-serve, peer-to-peer marketplace. That said,
          we love to partner with creators for art collaboration and promotion.
          Please feel free to email us:{' '}
          <span className='support-text'>18020732@vnu.edu.vn</span>
        </>
      ),
    },
  ]
  return (
    <div className='help-support-container'>
      <div className='help-support-title'>HelpAndSupport</div>
      <Collapse
        accordion
        bordered={false}
        ghost
        // expandIcon={CollapseIcon}
        expandIconPosition='right'
      >
        {MARKETPLACE.map((item, index) => (
          <Panel
            key={index}
            header={item.question}
            className='help-support-panel'
          >
            {item.answer}
          </Panel>
        ))}
      </Collapse>
    </div>
  )
}

export default HelpAndSupport
