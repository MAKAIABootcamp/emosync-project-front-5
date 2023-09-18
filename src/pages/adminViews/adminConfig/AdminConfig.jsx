import React, { useState } from 'react'
import HeaderAdmin from '../../../components/headerAdmin/HeaderAdmin'
import './adminConfig.scss'
import defaultUser from '/Admin/defaultUser.jpg'

const AdminConfig = () => {
  const [isEdit, setIsedit] = useState(false)
  const changeStatus = () => {
    setIsedit(true)
  }
  return (
    <aside className='AdminConfigContainer'>
      <HeaderAdmin />
      <section className='AdminConfigBody'>
        {
          isEdit ? (
            <article className='AdminConfigBody__userEdit'>
              <h3>Editar información personal</h3>
              <form>
                <label>
                  Foto de perfil
                  <input type="file" />
                </label>
                <label>
                  Nombre completo
                  <input type="text" />
                </label>
                <label>
                  Genero


                </label>
              </form>
            </article>
          )
            :
            (<article className='AdminConfigBody__userProfile'>
              <h3>Administradora, Mariana Castañeda</h3>
              <figure>
                <img src={defaultUser} alt="user-picture" />
              </figure>
              <div className='AdminConfigBody__userProfile__info'>
                <p>Nombre completo</p>
                <span>Mariana Castañeda</span>
              </div>
              <div className='AdminConfigBody__userProfile__info'>
                <p>Rol</p>
                <span>Administrador</span>
              </div>
              <div className='AdminConfigBody__userProfile__info'>
                <p>Correo electronico</p>
                <span>Mariana Castañeda</span>
              </div>
              <span className='AdminConfigBody__userProfile__edit' onClick={changeStatus}>Editar informacion</span>
            </article>)
        }

      </section>
    </aside>
  )
}

export default AdminConfig