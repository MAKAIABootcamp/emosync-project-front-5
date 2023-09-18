import React, { useState } from 'react'
import HeaderClient from '../../components/headerClient/HeaderClient'
import "./clientLayout.scss"
import { Outlet } from 'react-router'
import { useSelector } from 'react-redux'

const ClientLayout = () => {
  const [menuMobileActive, setMenuMobileActive] = useState(false)
  const { modalActive } = useSelector(state => state.modals)

  const validation = () => {
    switch (true) {
      case modalActive: return true;
      case menuMobileActive: return true;
      default: return false;
    }
  }

  return (
    <>
      <HeaderClient menuMobileActive={menuMobileActive} setMenuMobileActive={setMenuMobileActive} />
      <main className={`layout ${validation() ? "layout__fixed" : ""}`}>
        <article className="layout__content-container">
          <Outlet />
        </article>
      </main>
    </>
  )
}

export default ClientLayout