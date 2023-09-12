import React from 'react';
import { useForm } from 'react-hook-form';
import InputMask from "react-input-mask";
import { useDispatch, useSelector } from 'react-redux';
import uploadFile from '../../services/updaloadFile';
import Loader from '../loader/Loader';

const RegisterForm = ({ setStep }) => {
    const { userRole, displayName, authGoogle, email } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const onSubmit = async (data) => {

        if (userRole === "CLIENT") {
            const dataClient = {
                appointmentsPerMonth: 0,
                cardNumber: data.cardNumber,
                createdAt: new Date().getTime(),
                displayName: authGoogle ? displayName : data.name,
                email: authGoogle ? email : data.email,
                loginMethod: authGoogle ? "GOOGLE" : "EMAIL",
                suscription: data.suscription,
                updatedAt: new Date().getTime(),
                userRole
            }
        } else {
            const photo = await uploadFile(data.photo[0])
            const dataPsychologist = {
                bank: data.bank,
                bankAccount: Number(data.bankAccount),
                createdAt: new Date().getTime(),
                description: "",
                displayName: authGoogle ? displayName : data.name,
                email: authGoogle ? email : data.email,
                isVerified: false,
                missedAppointments: 0,
                photo,
                specialty: data.specialty,
                typeOfBankAccount: data.typeOfBankAccount,
                updatedAt: new Date().getTime(),
                userRole,
                verifiedSpecialty: false,
                loginMethod: authGoogle ? "GOOGLE" : "EMAIL",
                weeklyAgenda: []
            }
        }
    }

    const returnPrevStep = () => {
        setStep(1)
        reset()
    }

    const isGmailEmail = (value) => {
        if (userRole === "PSYCHOLOGIST" && !authGoogle) {
            return value.endsWith("gmail.com");
        }
        return true;
    };

    return (
        <>
            {/* <Loader /> */}
            <section className='register__text-container'>
                <img className='register__arrow-back' src="/Register/arrow-back.svg" alt="arrow icon" onClick={returnPrevStep} />
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
                </label>
                <label className='register__label'>
                    Correo Electrónico
                    <input
                        className='register__input' type="email"
                        defaultValue={email ? email : ""}
                        {...register("email", { required: email ? false : true, validate: isGmailEmail })}
                        disabled={authGoogle ? "disabled" : ""}
                    />
                    {
                        !authGoogle && userRole === "PSYCHOLOGIST" && (
                            <p className='register__alert'>Solo puedes registrarte con correos de Gmail</p>
                        )
                    }
                </label>
                {
                    !authGoogle && (
                        <label className='register__label'>
                            Contraseña
                            <input
                                className='register__input'
                                type="password"
                                placeholder="min 6 caracteres"
                                {...register("password", { required: authGoogle ? false : true, minLength: 6 })}
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
                                    {...register("suscription", { required: userRole === "CLIENT" })}>
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
                                    {...register("cardName", { required: userRole === "CLIENT" })}
                                />
                            </label>
                            <label className='register__label'>
                                Número de la tarjeta
                                <InputMask
                                    className='register__input'
                                    mask="9999 9999 9999 9999"
                                    placeholder='1234 1234 1234 1234'
                                    {...register("cardNumber", {
                                        required: userRole === "CLIENT", pattern: {
                                            value: /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/,
                                        }
                                    })}
                                />
                            </label>
                            <label className='register__label'>
                                Fecha de expiración
                                <InputMask
                                    className='register__input'
                                    mask="99/99"
                                    placeholder='MM/YY'
                                    {...register("expeditionDate", {
                                        required: userRole === "CLIENT", pattern: {
                                            value: /^[0-1]{1}[0-9]{1}\/[0-9]{1}[1-9]{1}$/,
                                        }
                                    })}
                                />
                            </label>
                            <label className='register__label'>
                                CVV
                                <InputMask
                                    className='register__input'
                                    mask="999"
                                    placeholder='CVV'
                                    {...register("cvv", {
                                        required: userRole === "CLIENT", pattern: {
                                            value: /^[0-9]{3}$/,
                                        }
                                    })}
                                />
                            </label>
                        </>
                    ) : (
                        <>
                            <label className='register__label'>
                                Foto de perfil
                                <input
                                    type="file"
                                    {...register("photo", { required: userRole === "PSYCHOLOGIST" })} />
                            </label>
                            <label className='register__label'>
                                Especialidad
                                <input
                                    className='register__input'
                                    type="text"
                                    {...register("specialty", { required: userRole === "PSYCHOLOGIST" })}
                                />
                            </label>
                            <label className='register__label'>
                                Tipo de cuenta
                                <select
                                    className='register__input'
                                    {...register("typeOfBankAccount", { required: userRole === "PSYCHOLOGIST" })}>
                                    <option value="">Selecciona una opción</option>
                                    <option value="Ahorros">Ahorros</option>
                                    <option value="Corriente" >Corriente</option>
                                </select>
                            </label>
                            <label className='register__label'>
                                Banco
                                <input
                                    className='register__input' type="text"
                                    {...register("bank", { required: userRole === "PSYCHOLOGIST" })}
                                />
                            </label>
                            <label className='register__label'>
                                Número de cuenta
                                <input
                                    className='register__input' type="number"
                                    {...register("bankAccount", { required: userRole === "PSYCHOLOGIST", minLength: 9 })}
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