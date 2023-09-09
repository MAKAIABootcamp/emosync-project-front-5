import React, { useState } from 'react'
import HeaderClient from '../../components/headerClient/HeaderClient'
import "./layoutClient.scss"
import ClientFeed from '../clientFeed/ClientFeed'

const LayoutClient = () => {
  const [menuMobileActive, setMenuMobileActive] = useState(false)
  return (
    <main className={`layout ${menuMobileActive ? "layout__fixed" : ""}`}>
      <HeaderClient menuMobileActive={menuMobileActive} setMenuMobileActive={setMenuMobileActive} />
      <article className="layout__content-container">
        <ClientFeed />
      </article>
    </main>
  )
}

export default LayoutClient