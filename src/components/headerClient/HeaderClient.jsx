import React, { useEffect, useState } from 'react'
import "./headerClient.scss"

const HeaderClient = ({ menuMobileActive, setMenuMobileActive }) => {

    const [desktopMenu, setDesktopMenu] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(false)
    useEffect(() => {
        handleDesktopMenu()
        window.addEventListener('resize', handleDesktopMenu);

        return () => {
            window.removeEventListener('resize', handleDesktopMenu);
        };

    }, [])

    const handleDesktopMenu = () => {
        const windowWidth = window.innerWidth;

        if (windowWidth > 768) {
            setDesktopMenu(true)
        } else {
            setDesktopMenu(false)
        }
    }

    const handleMobileMenu = () => {
        setMobileMenu(!mobileMenu)
        setMenuMobileActive(!menuMobileActive)
    }

    return (
        <header className="header">
            <figure className="header__logo-container">
                <img className="header__logo" src="/User/Logo.svg" alt="logo icon" />
            </figure>
            {
                !desktopMenu ? (
                    <>
                        <section className="header__mobile-menu-icon-container">
                            <img
                                className="header__mobile-menu-icon" src="/menu.svg"
                                alt="menu icon"
                                onClick={handleMobileMenu}
                            />
                        </section>
                        <section className={mobileMenu ? "header__mobile-nav-container" : "header__hidden"}>
                            <nav className="header__mobile-menu">
                                <img
                                    className="header__close-mobile-menu"
                                    src="/User/close.svg"
                                    alt="icon close"
                                    onClick={handleMobileMenu}
                                />
                                <ul className="header__mobile-menu__list">
                                    <li onClick={handleMobileMenu}>Inicio</li>
                                    <li onClick={handleMobileMenu}>Citas Pendientes</li>
                                    <li onClick={handleMobileMenu}>Perfil</li>
                                </ul>
                            </nav>
                        </section>
                    </>
                ) : (
                    <nav>
                        <ul>
                            <li>
                                Inicio
                                <hr />
                            </li>
                            <li>
                                Citas Pendientes
                                <hr />
                            </li>
                            <li>Perfil</li>
                        </ul>
                    </nav>
                )
            }
        </header>
    )
}

export default HeaderClient