import React, { useState } from 'react'
import HeaderClient from '../../components/headerClient/HeaderClient'
import "./layoutClient.scss"

const LayoutClient = () => {
  const [menuMobileActive, setMenuMobileActive] = useState(false)
  return (
    <main className={`layout ${menuMobileActive ? "layout__fixed" : ""}`}>
        <HeaderClient menuMobileActive={menuMobileActive} setMenuMobileActive={setMenuMobileActive}/>
    </main>
  )
}

export default LayoutClient