import React, { useEffect, useState } from 'react'
import "./headerClient.scss"
import { Link } from 'react-router-dom'

const HeaderClient = ({ menuMobileActive, setMenuMobileActive }) => {
    const navMobile = [
        {
            name: "Inicio",
            path: "/home"
        },
        {
            name: "Citas Pendientes",
            path: ""
        },
        {
            name: "Perfil",
            path: "/profile"
        }
    ]
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
                                    {
                                        navMobile.map((element, index) => (
                                            <li key={index + 1} onClick={handleMobileMenu}>
                                                <Link to={element.path}>{element.name}</Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </nav>
                        </section>
                    </>
                ) : (
                    <nav className="header__desktop-menu">
                        <ul className="header__desktop-menu__list">
                            <li className="header__desktop-menu__item">
                                <Link to="home">Inicio</Link>
                                <hr />
                            </li>
                            <li className="header__desktop-menu__item">
                                Citas Pendientes
                                <hr />
                            </li>
                            <li className="header__desktop-menu__item">
                                <Link to="profile">Perfil</Link>
                            </li>
                        </ul>
                    </nav>
                )
            }
        </header>
    )
}

export default HeaderClient