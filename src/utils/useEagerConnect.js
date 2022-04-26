import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { injected, walletconnect } from '../blockchain/connectors'

export const useEagerConnect = () => {
  const { activate, active } = useWeb3React()
  const logged = useSelector((state) => state?.user?.data?.account)

  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized && logged) {
        const isWc = 'walletconnect' in localStorage
        activate(isWc ? walletconnect : injected, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        setTried(true)
      }
    })
  }, [logged])

  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  return tried
}
