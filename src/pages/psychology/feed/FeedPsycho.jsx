import React from 'react'
import "./main.scss"
import HeaderPsycho from '../../../components/headerPsycho/HeaderPsycho'



const FeedPsycho = () => {
  return (
    <main className='feed__father'>
      <HeaderPsycho />
      <section className='feed'>
        <aside className='feed__welcome'>
          <h2 className='feed__welcome__title'>Bienvenida, Juliana</h2>
          <figure className='feed__welcome__advicer'>
            <img src="/Psychologist/infografia.jpg" alt="infografia" />
          </figure>
        </aside>
        <aside className='feed__appointments'>
          <section className='feed__appointments__appoint'>
            <h2 >Citas para hoy, 3 de Octubre</h2>
          
          </section>
        </aside>
      </section>
    </main>
  )
}

export default FeedPsycho