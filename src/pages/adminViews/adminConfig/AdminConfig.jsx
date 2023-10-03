import React, { useEffect, useState } from 'react'
import HeaderAdmin from '../../../components/headerAdmin/HeaderAdmin'
import './adminConfig.scss'
import defaultUser from '/Admin/defaultUser.jpg'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import uploadFile from '../../../services/updaloadFile'
import { updateAdminInfoFirebase } from '../../../store/slides/admin/adminAction'

const AdminConfig = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm()
  const { adminInfo } = useSelector(state => state.admin)
  const adminKey = useSelector(state => state.auth.key)
  const [isEdit, setIsedit] = useState(false)
  const dispatch = useDispatch()
  const watchFields = watch(["pictureInput", "nameInput", "sexInput", "emailInput"])
  useEffect(() => {
    if (isEdit) {
      reset({
        nameInput: adminInfo.displayName,
        sexInput: adminInfo.sex,
        emailInput: adminInfo.email,
      })
    }
  }, [isEdit])

  // useEffect(() => {
  //   console.log("datos form: ", watchFields)
  // }, [watchFields])


  const changeStatus = () => {
    setIsedit(!isEdit)
  }
  const editUser = async (data) => {
    console.log("info den el reducer antes del edit", adminInfo)
    // console.log(data)
    if (data.pictureInput.length == 0) {
      console.log("no hay imagen")
      let objToSend = {
        displayName: data.nameInput,
        email: data.emailInput,
        sex: data.sexInput,
        updateAt: new Date().getTime(),
        userRole: adminInfo.userRole,
        createdAt: adminInfo.createdAt,
        photo: adminInfo.photo
      }
      console.log("objeto a enviar: ", objToSend)
      console.log("id del admin", adminKey)
      dispatch(updateAdminInfoFirebase(adminKey, objToSend))
      changeStatus()
    } else {
      console.log("hay nueva imagen")
      const image = await uploadFile(data.pictureInput[0])
      let objToSend = {
        displayName: data.nameInput,
        email: data.emailInput,
        sex: data.sexInput,
        updateAt: new Date().getTime(),
        userRole: adminInfo.userRole,
        createdAt: adminInfo.createdAt,
        photo: image
      }
      dispatch(updateAdminInfoFirebase(adminKey, objToSend))
      changeStatus()
    }
  }
  //para revisar la imagen
  const handleFile = (e) => {
    console.log("archivos", e.target.files[0])
  }

  return (
    <aside className='AdminConfigContainer'>
      <HeaderAdmin />
      <section className='AdminConfigBody'>
        {
          isEdit ? (
            <article className='AdminConfigBody__userEdit'>
              <h3>Editar información personal</h3>
              <form className='AdminConfigBody__userEdit__form' onSubmit={handleSubmit(editUser)}>
                <div>
                  <label htmlFor="">Foto de perfil</label>
                  <input
                    className='pictureInput'
                    type="file"
                    accept="image/jpeg, image/png"
                    {...register("pictureInput")}
                    onChange={(e) => handleFile(e)}
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
            : (
              adminInfo?.userRole ? (
                <article className='AdminConfigBody__userProfile'>
                  <h3>{adminInfo.sex == "H" ? ("Administrador") : ("Administradora")}, {adminInfo.displayName}</h3>
                  <figure>
                    <img src={adminInfo.photo} alt="user-picture" />
                  </figure>
                  <div className='AdminConfigBody__userProfile__info'>
                    <p>Nombre completo</p>
                    <span>{adminInfo.displayName}</span>
                  </div>
                  <div className='AdminConfigBody__userProfile__info'>
                    <p>Rol</p>
                    <span>Administrador</span>
                  </div>
                  <div className='AdminConfigBody__userProfile__info'>
                    <p>Correo electronico</p>
                    <span>{adminInfo.email}</span>
                  </div>
                  <span className='AdminConfigBody__userProfile__edit' onClick={changeStatus}>Editar informacion</span>
                </article>
              ) :
                (
                  <article className='AdminConfigBody__userProfile'>
                    <h3>Administradora, cargando</h3>
                    <figure>
                      <img src={defaultUser} alt="user-picture" />
                    </figure>
                    <div className='AdminConfigBody__userProfile__info'>
                      <p>Nombre completo</p>
                      <span>cargando</span>
                    </div>
                    <div className='AdminConfigBody__userProfile__info'>
                      <p>Rol</p>
                      <span>cargando</span>
                    </div>
                    <div className='AdminConfigBody__userProfile__info'>
                      <p>Correo electronico</p>
                      <span>cargando</span>
                    </div>
                    <span className='AdminConfigBody__userProfile__edit' onClick={changeStatus}>Editar informacion</span>
                  </article>)
            )
        }

      </section>
    </aside>
  )
}

export default AdminConfig