import React, { useState } from 'react'
import HeaderAdmin from '../../../components/headerAdmin/HeaderAdmin'
import './adminConfig.scss'
import defaultUser from '/Admin/defaultUser.jpg'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

const AdminConfig = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [isEdit, setIsedit] = useState(false)

  const changeStatus = () => {
    setIsedit(!isEdit)
  }
  const onSubmit = (data) => {
    console.log(data)
    changeStatus()
  }

  return (
    <aside className='AdminConfigContainer'>
      <HeaderAdmin />
      <section className='AdminConfigBody'>
        {
          isEdit ? (
            <article className='AdminConfigBody__userEdit'>
              <h3>Editar información personal</h3>
              <form className='AdminConfigBody__userEdit__form' onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label htmlFor="">Foto de perfil</label>
                  <input
                    className='pictureInput'
                    type="file"
                    {...register("pictureInput")}
                  />
                </div>
                <div>
                  <label htmlFor="">Nombre completo</label>
                  <input
                    className='nameInput'
                    type='text'
                    {...register("nameInput", { required: true })}
                  />
                </div>
                <div>
                  <label htmlFor="sexInput">Genero</label>
                  <select
                    className='sexInput'
                    {...register("sexInput", { required: true })}>
                    <option value="">Selecciona una opción</option>
                    <option value="H">Hombre</option>
                    <option value="M" >Mujer</option>
                    <option value="O">Otro</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="emailInput">Correo electronico</label>
                  <input
                    className='emailInput'
                    type="text"
                    {...register("emailInput", { required: true })}
                  />
                </div>
                <input type="submit" value="Guardar cambios" className='submitInput' />
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