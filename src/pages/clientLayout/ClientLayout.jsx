import React, { useState } from 'react'
import HeaderClient from '../../components/headerClient/HeaderClient'
import "./clientLayout.scss"
import { Outlet } from 'react-router'

const ClientLayout = () => {
  const [menuMobileActive, setMenuMobileActive] = useState(false)
  return (
    <>
      <HeaderClient menuMobileActive={menuMobileActive} setMenuMobileActive={setMenuMobileActive} />
      <main className={`layout ${menuMobileActive ? "layout__fixed" : ""}`}>
        <article className="layout__content-container">
          <Outlet />
        </article>
      </main>
    </>
  )
}

export default ClientLayout