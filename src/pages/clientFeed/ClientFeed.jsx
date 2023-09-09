import React from 'react'
import "./clientFeed.scss"

const ClientFeed = () => {
  return (
    <section className='client-feed'>
        <div className='client-feed__search-container'>
            <figure className='client-feed__search-icon-container'>
                <img className='client-feed__search-icon' src="/User/search.svg" alt="" />
            </figure>
            <input className='client-feed__input' type="text" placeholder='Busca aquí por especialidad'/>
        </div>
        <div className='client-feed__cards-container'>

        </div>
    </section>
  )
}

export default ClientFeed