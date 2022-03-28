import React from 'react'
import DefaultLayout from '../../components/layout/default-layout'
import { loremIpsumGenerator } from '../../utils/textGenerator'
import './styles.scss'

const TermOfUse = () => {
  const TERM_OF_USE = [
    {
      order: '01',
      term: 'Credit Reporting Terms of Service',
    },
    {
      order: '02',
      term: 'Ownership of Site Agreement to Terms of Use',
    },
    {
      order: '03',
      term: 'Provision of Services',
    },
    {
      order: '04',
      term: 'Limitation of Liability',
    },
    {
      order: '05',
      term: 'Accounts, Passwords and Security',
    },
  ]
  return (
    <DefaultLayout>
      <div className='term-of-use-container'>
        <div className='term-of-use-banner'>
          <div className='title'>Term & Condition</div>
        </div>
        <div className='term-of-use-content'>
          <div className='term-of-use-title'>CAS NFT Term of Use</div>
          <div className='content'>
            {TERM_OF_USE?.map((element) => {
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

export default TermOfUse
