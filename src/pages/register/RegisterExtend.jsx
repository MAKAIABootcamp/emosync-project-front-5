import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./mainExtend.scss"
import { useForm } from 'react-hook-form'
import backArrow from '/Register/arrow-back.svg'

const RegisterExtend = () => {
  const navigate = useNavigate()
  const { userType } = useParams()
  const [activateBtn, setActivateBtn] = useState(false)
  const { register, handleSubmit, watch, errors, reset } = useForm()
  const watchFieldsDoctor = watch(["patientName", "patientEmail", "patientPassword", "patientSub", "patientCardName", "patientCardNum", "patientCardExp", "patientCardCVV"])
  const watchFieldsPatient = watch(["doctortName", "doctorEmail", "doctorPassword", "doctorSpec", "doctorImage", "doctorType", "doctorBank", "doctorCardNum"])
  useEffect(() => {
    console.log(userType)
  }, [])

  useEffect(() => {
    console.log(watchFieldsPatient)
    if ((watchFieldsPatient.length) && (watchFieldsPatient[0]) && (watchFieldsPatient[1]) && (watchFieldsPatient[2]) && (watchFieldsPatient[3]) && (watchFieldsPatient[4]) && (watchFieldsPatient[5]) && (watchFieldsPatient[6]) && (watchFieldsPatient[7])) {
      setActivateBtn(true)
    }
  }, [watchFieldsPatient])

  useEffect(() => {
    console.log(watchFieldsDoctor)
    if ((watchFieldsDoctor.length) && (watchFieldsDoctor[0]) && (watchFieldsDoctor[1]) && (watchFieldsDoctor[2]) && (watchFieldsDoctor[3]) && (watchFieldsDoctor[4]) && (watchFieldsDoctor[5]) && (watchFieldsDoctor[6]) && (watchFieldsDoctor[7])) {
      setActivateBtn(true)
    }
  }, [watchFieldsDoctor])

  const onSubmit = (data) => {
    console.log(data)
  }

  const toBackPage = () => {
    navigate(-1)
  }
  const toNextPage = () => {
    console.log(watchFieldsPatient)
    console.log(watchFieldsDoctor)
  }

  return (
    <aside className='RegisterExtendContainer'>
      <article className='Register'>
        <section className='Register__welcome'>
          <p>¡Perfecto! llena los campos a continuación para que puedas terminar tu proceso de registro y hacer parte de <span>EMOSYNC</span></p>
        </section>
        {userType == "patient" ?
          (<form className='Register__form' onSubmit={handleSubmit(onSubmit)}>
            <div className='Register__form__box'>
              <label htmlFor="patientName">Nombre completo</label>
              <input type="text" {...register("patientName")} />
            </div>

            <div className='Register__form__box'>
              <label htmlFor="patientEmail">Correo electrónico</label>
              <input type="email" {...register("patientEmail")} />
            </div>

            <div className='Register__form__box'>
              <label htmlFor="patientPassword">Contraseña</label>
              <input type="password" {...register("patientPassword")} />
            </div>

            <div className='Register__form__box'>
              <label htmlFor="patientSub">Tipo de suscripción</label>
              <select className="form-select" aria-label="Default select example"
                {...register("patientSub")}
              >
                <option value="">Selecciona una opcion</option>
                <option value="1">bronce</option>
                <option value="2">plata</option>
                <option value="3">oro</option>
              </select>
            </div>

            <div className='Register__form__box'>
              <label htmlFor="patientCardName">Nombre de la targeta</label>
              <input type="text" {...register("patientCardName")} />
            </div>

            <div className='Register__form__box'>
              <label htmlFor="patientCardNum">Numero de la targeta</label>
              <input type="number" placeholder='1234 1234 1234 1234' {...register("patientCardNum")} />
            </div>

            <div className='Register__form__box'>
              <label htmlFor="patientCardExp">Fecha de expiración</label>
              <input type="month" min="2023-08" placeholder='MM/YY' {...register("patientCardExp")} />
            </div>

            <div className='Register__form__box'>
              <label htmlFor="patientCardCVV">CVV</label>
              <input type="number" placeholder='123' {...register("patientCardCVV")} />
            </div>
          </form>)
          : //#f00 aqui esta el cambio
          (<form className='Register__form' onSubmit={handleSubmit(onSubmit)}>
            <div className='Register__form__box'>
              <label htmlFor="doctortName">Nombre completo</label>
              <input type="text" {...register("doctortName")} />
            </div>

            <div className='Register__form__box'>
              <label htmlFor="doctorEmail">Correo electrónico</label>
              <input type="email" {...register("doctorEmail")} />
            </div>

            <div className='Register__form__box'>
              <label htmlFor="doctorPassword">Contraseña</label>
              <input type="password" {...register("doctorPassword")} />
            </div>

            <div className='Register__form__box'>
              <label htmlFor="doctorSpec">Especialidad</label>
              <input type="text" {...register("doctorSpec")} />
            </div>

            <div className='Register__form__box'>
              <label htmlFor="doctorImage">Foto de perfil</label>
              <input type="file" accept="image/png, image/jpeg" {...register("doctorImage")} />
            </div>

            <div className='Register__form__box'>
              <label htmlFor="doctorType">Tipo de cuenta</label>
              <select className="form-select" aria-label="Default select example"
                {...register("doctorType")}
              >
                <option value="">Selecciona una opcion</option>
                <option value="1">psiquico novato</option>
                <option value="2">medium psiquico</option>
                <option value="3">yedi</option>
              </select>
            </div>

            <div className='Register__form__box'>
              <label htmlFor="doctorBank">Banco</label>
              <select className="form-select" aria-label="Default select example"
                {...register("doctorBank")}
              >
                <option value="">Selecciona una opcion</option>
                <option value="1">Banco lvl1</option>
                <option value="2">Banco lvl2</option>
                <option value="3">Banco lvl3</option>
              </select>
            </div>

            <div className='Register__form__box'>
              <label htmlFor="doctorCardNum">Numero de cuenta</label>
              <input type="number" placeholder='1234 1234 1234 1234' {...register("doctorCardNum")} />
            </div>
          </form>)

        }


        {
          activateBtn ?
            (<span className='Register__next activated2' onClick={toNextPage}>Continuar</span>)
            :
            (<span className='Register__next'>Continuar</span>)
        }
        <figure className='Register__back' onClick={toBackPage}>
          <img src={backArrow} alt="flecha-atras" />
        </figure>
      </article>
    </aside>
  )
}

export default RegisterExtend