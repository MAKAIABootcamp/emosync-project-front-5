import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputMask from "react-input-mask";
import { useForm } from 'react-hook-form';

const RegisterForm = ({ setStep }) => {
    const { userRole, displayName, authGoogle, email } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    const returnPrevStep = () => {
        setStep(1)
        reset()
    }

    return (
        <>
            <section className='register__text-container'>
                <img className='register__arrow-back' src="/Register/arrow-back.svg" alt="arrow icon" onClick={returnPrevStep}/>
                <p className='register__text'>
                    ¡Perfecto! llena los campos a continuación para que puedas terminar tu proceso de registro y hacer parte de <span>EMOSYNC</span>
                </p>
            </section>
            <form onSubmit={handleSubmit(onSubmit)} className='register__form'>
                <label className='register__label'>
                    Nombre completo
                    <input
                        className='register__input'
                        type="text"
                        defaultValue={displayName ? displayName : ""}
                        {...register("name", { required: displayName ? false : true })}
                        disabled={authGoogle ? "disabled" : ""}
                    />
                    {
                        !authGoogle && userRole === "PSYCHOLOGIST" && (
                            <p className='register__alert'>Solo puedes registrarte con correos de Gmail</p>
                        )
                    }
                </label>
                <label className='register__label'>
                    Correo Electrónico
                    <input
                        className='register__input' type="email"
                        defaultValue={email ? email : ""}
                        {...register("email", { required: email ? false : true })}
                        disabled={authGoogle ? "disabled" : ""}
                    />
                </label>
                {
                    !authGoogle && (
                        <label className='register__label'>
                            Contraseña
                            <input
                                className='register__input'
                                type="password"
                                {...register("password", { required: authGoogle ? false : true })}
                            />
                        </label>
                    )
                }
                {
                    userRole === "CLIENT" ? (
                        <>
                            <label className='register__label'>
                                Tipo de Suscripción
                                <select
                                    className='register__input'
                                    {...register("suscription", { required: userRole === "CLIENT" ? true : false })}>
                                    <option value="">Selecciona una opción</option>
                                    <option value="BRONZE">Bronce</option>
                                    <option value="SILVER" >Plata</option>
                                    <option value="GOLD">Oro</option>
                                </select>
                            </label>
                            <label className='register__label'>
                                Nombre de la tarjeta
                                <input
                                    className='register__input' type="text"
                                    {...register("cardName", { required: userRole === "CLIENT" ? true : false })}
                                />
                            </label>
                            <label className='register__label'>
                                Número de la tarjeta
                                <InputMask
                                    className='register__input'
                                    mask="9999 9999 9999 9999"
                                    placeholder='1234 1234 1234 1234'
                                    {...register("cardNumber", { required: userRole === "CLIENT" ? true : false })}
                                />
                            </label>
                            <label className='register__label'>
                                Fecha de expiración
                                <InputMask
                                    className='register__input'
                                    mask="99/99"
                                    placeholder='MM/YY'
                                    {...register("expeditionDate", { required: userRole === "CLIENT" ? true : false })}
                                />
                            </label>
                            <label className='register__label'>
                                CVV
                                <InputMask
                                    className='register__input'
                                    mask="999"
                                    placeholder='CVV'
                                    {...register("cvv", { required: userRole === "CLIENT" ? true : false })}
                                />
                            </label>
                        </>
                    ) : (
                        <>
                            <label className='register__label'>
                                Foto de perfil
                                <input
                                    type="file"
                                    {...register("photo", { required: userRole === "PSYCHOLOGIST" ? true : false })} />
                            </label>
                            <label className='register__label'>
                                Especialidad
                                <input
                                    className='register__input'
                                    type="text"
                                    {...register("specialty", { required: userRole === "PSYCHOLOGIST" ? true : false })}
                                />
                            </label>
                            <label className='register__label'>
                                Tipo de cuenta
                                <select
                                    className='register__input'
                                    {...register("typeOfBankAccount", { required: userRole === "PSYCHOLOGIST" ? true : false })}>
                                    <option value="">Selecciona una opción</option>
                                    <option value="Ahorros">Ahorros</option>
                                    <option value="Corriente" >Corriente</option>
                                </select>
                            </label>
                            <label className='register__label'>
                                Banco
                                <input
                                    className='register__input' type="text"
                                    {...register("bank", { required: userRole === "PSYCHOLOGIST" ? true : false })}
                                />
                            </label>
                            <label className='register__label'>
                                Número de cuenta
                                <InputMask
                                    className='register__input' mask="99999999999"
                                    {...register("bankAccount", { required: userRole === "PSYCHOLOGIST" ? true : false })}
                                />
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