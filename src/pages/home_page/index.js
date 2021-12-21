import React from 'react'
import DefaultLayout from '../../components/layout/default-layout'
import { Banner } from './components'
import './styles.scss'

export default function Home() {
  return (
    <DefaultLayout>
      <Banner />
      <h2>Hello World!</h2>
      <a href=''>ab</a>
    </DefaultLayout>
  )
}
