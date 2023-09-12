import React from 'react'
import "./main.scss"


const RegisterSelectType = () => {
  return (
    <main className='registerSelectType'>
    <article className='registerSelectType__container'>
      <h2 className='registerSelectType__title'>
        Bienvenido a <span>EMOSYNC</span>
      </h2>
      <h1 className='registerSelectType__descrip'>Nos da gusto que hayas decidido hacer de esto. <br /> En primera instancia, cuentanos un poco de ti, Eres?</h1>
     <section className='registerSelectType__figures'>
     <figure className='registerSelectType__figures__user'><img src="/Register/client.png" alt="client" />
     <h3>Paciente</h3>
     </figure>
     <figure className='registerSelectType__figures__psico'><img src="/Register/psychologist.png" alt="psycologist" />
     <h3>Psicologo</h3>
     </figure>
     </section>
    
     
     <button type='submit' className='registerSelectType__btn'>Continuar</button>
        
    
    </article>
  </main>
  )
}

export default RegisterSelectType