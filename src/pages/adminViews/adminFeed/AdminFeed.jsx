import React from 'react'
import HeaderAdmin from '../../../components/headerAdmin/HeaderAdmin'
import defaultUser from '/Admin/defaultUser.jpg'
import detailsFilled from '/Admin/detailsFilled.svg'
import detailsEmpty from '/Admin/detailsEmpty.svg'
import './adminFeed.scss'

const AdminFeed = () => {
  return (
    <>

      <aside className='AdminFeedContainer'>
        <HeaderAdmin />
        <section className='AdminFeedBody'>
          <article className='AdminFeedBody__info'>
            <p className='AdminFeedBody__info__welcome'>Bienvenid@, Mariana</p>
            <figure className='AdminFeedBody__info__picture'>
              <img src={defaultUser} alt="user" />
            </figure>
          </article>
          <article className='AdminFeedBody__tables'>
            <div className='AdminFeedBody__tables__psychologyst'>
              <p>Psicologos pendientes por verificar</p>
              <table className='tablePsy' border={1}>
                <thead className='tablePsy__head'>
                  <tr>
                    <th className='bord1'>Nombre</th>
                    <th>Diploma</th>
                    <th>Targeta Prof.</th>
                    <th>Especialización</th>
                    <th className='bord2'>Verificar</th>
                  </tr>
                </thead>
                <tbody className='tablePsy__body'>
                  <tr className='tablePsy__body__ind'>
                    <td>Juliana Sanchez</td>
                    <td><img src={detailsEmpty} alt="file" /></td>
                    <td><img src={detailsEmpty} alt="file" /></td>
                    <td><img src={detailsEmpty} alt="file" /></td>
                    <td><span className='textYes'>Aceptar</span> <span className='text_'></span><span className='textNo'>Rechazar</span></td>
                  </tr>
                  <tr className='tablePsy__body__fin'>
                    <td className='bord4'></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className='bord3'></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='AdminFeedBody__tables__report'>
              <p>Citas incumplidas</p>
              <table className='tableRpt'>
                <thead className='tableRpt__head'>
                  <th>Paciente</th>
                  <th>Psicólogo tratante</th>
                  <th>Motivo</th>
                </thead>
                <tbody className='tableRpt__body'>
                  <tr className='tableRpt__body__ind'>
                    <td>Camilla Sanchez</td>
                    <td>Juliana Sanchez</td>
                    <td><img src={detailsFilled} alt="file" className='detailsFilled' /></td>
                  </tr>
                  <tr className='tableRpt__body__fin'>
                    <td ></td>
                    <td></td>
                    <td ></td>
                  </tr>
                </tbody>
              </table>
            </div>

          </article>
        </section>
      </aside>
    </>
  )
}

export default AdminFeed