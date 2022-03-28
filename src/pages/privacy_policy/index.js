import React from 'react'
import DefaultLayout from '../../components/layout/default-layout'
import { loremIpsumGenerator } from '../../utils/textGenerator'
import './styles.scss'

const PrivacyPolicy = () => {
  const PRIVACY_POLICY = [
    {
      order: '01',
      term: 'Information Collection',
    },
    {
      order: '02',
      term: 'Privacy Policy',
    },
    {
      order: '03',
      term: 'The Collection, Process and Use of Personal Data',
    },
    {
      order: '04',
      term: 'Disclaimers',
    },
    {
      order: '05',
      term: 'Data Protection',
    },
    {
      order: '06',
      term: 'How We Use Cookies',
    },
    {
      order: '07',
      term: 'The Collection, Process, and Use of Personal Data',
    },
  ]
  return (
    <DefaultLayout>
      <div className='privacy-policy-container'>
        <div className='privacy-policy-banner'>
          <div className='title'>Privacy Policy</div>
        </div>
        <div className='privacy-policy-content'>
          <div className='privacy-policy-title'>CAS NFT Privacy Policy</div>
          <div className='content'>
            {PRIVACY_POLICY?.map((element) => {
              return (
                <div>
                  <div className='header'>
                    {element?.order}. {element?.term}
                  </div>
                  <div className='support-text'>{loremIpsumGenerator(500)}</div>
                  <div className='support-text'>
                    {loremIpsumGenerator(239)}.
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default PrivacyPolicy
