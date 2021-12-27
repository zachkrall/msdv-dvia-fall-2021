import React, { FC } from 'react'

import Nav from './Nav'
import Header from './Header'
import Footer from './Footer'

const Layout: FC = ({ children }) => {
  return (
    <>
      <Nav />
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout
