import React, { useEffect, useState } from 'react';
import "./main.scss";
import HeaderPsycho from '../../../components/headerPsycho/HeaderPsycho';
import { useSelector } from 'react-redux';


const FeedPsycho = () => {

  const [userInfo, setUserInfo] = useState(false)
  const [nameArray, setNameArray] = useState(false)
  const cacheUser = useSelector(state => state.psycho.userInfo)

 
useEffect(() => {
  setUserInfo(cacheUser[1])
  if(cacheUser[1]){
    console.log(cacheUser[1]);
    setNameArray(cacheUser[1].displayName.split(" "))
  }
}, [cacheUser])


  return (
    <main className='feed__father'>
      <HeaderPsycho />
      <section className='feed'>
        <aside className='feed__welcome'>

         { userInfo &&
         <h2 className='feed__welcome__title'>Bienvenid@, {nameArray[0]}</h2>}
          <figure className='feed__welcome__advicer'>
            <img src="/Psychologist/infografia.jpg" alt="infografia" />
          </figure>
        </aside>
        <aside className='feed__appointments'>
          <section className='feed__appointments__appoint'>
            <h2 >Citas para hoy, 3 de Octubre</h2>
            <section className='feed__appointments__appoint__table'>
                <div className='feed__appointments__appoint__table__celda upLeft'> <input type="checkbox" /> <span>Alejandra Sanchez</span></div>
                <div className='feed__appointments__appoint__table__celda upMiddle' ><span>12:00pm</span></div>
                <div className='feed__appointments__appoint__table__celda upRight'><strong>Entra al link de la cita</strong></div>
                <div className='feed__appointments__appoint__table__celda'><input type="checkbox" /> <span>Alejandra Sanchez</span></div>
                <div className='feed__appointments__appoint__table__celda'><span>12:00pm</span></div>
                <div className='feed__appointments__appoint__table__celda'><strong>Entra al link de la cita</strong></div>
                <div className='feed__appointments__appoint__table__celda'><input type="checkbox" /> <span>Alejandra Sanchez</span></div>
                <div className='feed__appointments__appoint__table__celda'><span>12:00pm</span></div>
                <div className='feed__appointments__appoint__table__celda'><strong>Entra al link de la cita</strong></div>
                <div className='feed__appointments__appoint__table__celda downLeft'><input type="checkbox" /> <span>Alejandra Sanchez</span></div>
                <div className='feed__appointments__appoint__table__celda'><span>12:00pm</span></div>
                <div className='feed__appointments__appoint__table__celda downRight'><strong>Entra al link de la cita</strong></div>

            </section>

          </section>
          <section className='feed__appointments__pendingAppoint'>
            <h2 >Citas pendientes por confirmar</h2>
            <section className='feed__appointments__pendingAppoint__table'>

                <div className='feed__appointments__pendingAppoint__table__celda upLeft'> <figure><img src="/Psychologist/details.svg" alt="details.svg" /></figure> <span>Alejandra Sanchez</span></div>
                <div className='feed__appointments__pendingAppoint__table__celda upMiddle' ><span>7 de octubre 12:00pm</span></div>
                <div className='feed__appointments__pendingAppoint__table__celda upRight'><strong>Confirmar</strong> <p>Rechazar</p></div>
                <div className='feed__appointments__pendingAppoint__table__celda'><figure><img src="/Psychologist/details.svg" alt="details.svg" /></figure> <span>Alejandra Sanchez</span></div>
                <div className='feed__appointments__pendingAppoint__table__celda'><span>7 de octubre 12:00pm</span></div>
                <div className='feed__appointments__pendingAppoint__table__celda'><strong>Confirmar</strong> <p>Rechazar</p></div>
                <div className='feed__appointments__pendingAppoint__table__celda'><figure><img src="/Psychologist/details.svg" alt="details.svg" /></figure>  <span>Alejandra Sanchez</span></div>
                <div className='feed__appointments__pendingAppoint__table__celda'><span>7 de octubre 12:00pm</span></div>
                <div className='feed__appointments__pendingAppoint__table__celda'><strong>Confirmar</strong> <p>Rechazar</p></div>
                <div className='feed__appointments__pendingAppoint__table__celda downLeft'><figure><img src="/Psychologist/details.svg" alt="details.svg" /></figure>  <span>Alejandra Sanchez</span></div>
                <div className='feed__appointments__pendingAppoint__table__celda'><span>7 de octubre 12:00pm</span></div>
                <div className='feed__appointments__pendingAppoint__table__celda downRight'><strong>Confirmar</strong> <p>Rechazar</p> </div>

            </section>

          </section>
        </aside>
      </section>
    </main>
  )
}

export default FeedPsycho