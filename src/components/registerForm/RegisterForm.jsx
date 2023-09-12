import React from 'react'
import { useSelector } from 'react-redux'
import InputMask from "react-input-mask";

const RegisterForm = ({setStep}) => {
    const { userRole, authGoogle } = useSelector(state => state.auth)

    return (
        <>
            <section className='register__text-container'>
                <img className='register__arrow-back' src="/Register/arrow-back.svg" alt="arrow icon" />
                <p className='register__text'>
                    ¡Perfecto! llena los campos a continuación para que puedas terminar tu proceso de registro y hacer parte de <span>EMOSYNC</span>
                </p>
            </section>
            <form className='register__form'>
                <label className='register__label'>
                    Nombre completo
                    <input className='register__input' type="text" />
                    {
                        !authGoogle && userRole === "PSYCHOLOGIST" && (
                            <p className='register__alert'>Solo puedes registrarte con correos de Gmail</p>
                        )
                    }
                </label>
                <label className='register__label'>
                    Correo Electrónico
                    <input className='register__input' type="email" />
                </label>
                {
                    !authGoogle && (
                        <label className='register__label'>
                            Contraseña
                            <input className='register__input' type="password" />
                        </label>
                    )
                }
                {
                    userRole === "CLIENT" ? (
                        <>
                            <label className='register__label'>
                                Tipo de Suscripción
                                <select className='register__input'>
                                    <option value="">Selecciona una opción</option>
                                    <option value="BRONZE">Bronce</option>
                                    <option value="SILVER" >Plata</option>
                                    <option value="GOLD">Oro</option>
                                </select>
                            </label>
                            <label className='register__label'>
                                Nombre de la tarjeta
                                <input className='register__input' type="text" />
                            </label>
                            <label className='register__label'>
                                Número de la tarjeta
                                <InputMask className='register__input' mask="9999 9999 9999 9999" placeholder='1234 1234 1234 1234' />
                            </label>
                            <label className='register__label'>
                                Fecha de expiración
                                <InputMask className='register__input' mask="99/99" placeholder='MM/YY' />
                            </label>
                            <label className='register__label'>
                                CVV
                                <InputMask className='register__input' mask="999" placeholder='CVV' />
                            </label>
                        </>
                    ) : (
                        <>
                            <label className='register__label'>
                                Foto de perfil
                                <input type="file" />
                            </label>
                            <label className='register__label'>
                                Especialidad
                                <input className='register__input' type="text" />
                            </label>
                            <label className='register__label'>
                                Tipo de cuenta
                                <select className='register__input'>
                                    <option value="">Selecciona una opción</option>
                                    <option value="Ahorros">Ahorros</option>
                                    <option value="Corriente" >Corriente</option>
                                </select>
                            </label>
                            <label className='register__label'>
                                Banco
                                <input className='register__input' type="text" />
                            </label>
                            <label className='register__label'>
                                Número de cuenta
                                <InputMask className='register__input' mask="99999999999" />
                            </label>
                        </>
                    )
                }
                <button className='register__btn'>Registrarse</button>
            </form>
        </>
    )
}

export default RegisterForm