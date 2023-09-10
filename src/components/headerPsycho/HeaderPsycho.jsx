import React from 'react'
import "./main.scss"

const HeaderPsycho = () => {
  return (
    <aside className='headerPsycho'>
        <figure>
            <img src="/Logo.svg" alt="logo" />
        </figure>
        <section className='headerPsycho__middle'>
           <figure><img src="/Psychologist/home.svg" alt="home" /></figure>
           <figure><img src="/Psychologist/diary.svg" alt="diary" /></figure>
           <figure><img src="/Psychologist/pending-appointments.svg" alt="pending-appointments" /></figure>
        </section>
        <section className='headerPsycho__end'>
           <figure><img src="/Psychologist/configuration.svg" alt="configuration" /></figure>
           <figure className='headerPsycho__end__logout'><img src="/Psychologist/logout.svg" alt="logout" /></figure>
        </section>
    </aside>
 
  )
}

export default HeaderPsycho