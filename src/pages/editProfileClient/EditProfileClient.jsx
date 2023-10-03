import React from 'react'
import InputMask from "react-input-mask";
import "./editProfileClient.scss"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { editInfoUser } from '../../store/slides/user/thunk';
import { swals } from '../../services/swals';

const EditProfileClient = () => {
    const navigate = useNavigate()
    const { cardNumber, displayName, loginMethod, subscription, email } = useSelector(state => state.user)
    const { key } = useSelector(state => state.auth)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const dispatch = useDispatch()

    const onSubmit = async (data) => {

        const formData = data
        formData.displayName === displayName && delete formData.displayName
        formData.email === email || !formData.email && delete formData.email
        formData.subscription === subscription && delete formData.subscription
        formData.cardNumber === cardNumber && delete formData.cardNumber
        const validate = validateFormData(formData)
        const resp = validate ? await dispatch(editInfoUser({ formData, key })) : "NO-CHANGE"
        if (resp && resp !== "NO-CHANGE" && !formData.subscription) {
            await swals("CHANGE-INFO", navigate)
        } else if (resp && resp !== "NO-CHANGE" && formData.subscription) {
            await swals("CHANGE-SUBSCRIPTION", navigate)
        } else if (resp === "NO-CHANGE") {
            swals("NO-CHANGE")
        } else {
            swals("ERROR-EDIT-INFO")
        }
    }

    const handleReturn = () => {
        navigate("/profile")
    }

    const validateFormData = (formData) => {
        return formData?.displayName ? true : formData?.email ? true : formData?.subscription ? true : formData?.cardNumber ? true : false
    }

    return (
        <section className='edit-profile-client'>
            <figure className='edit-profile-client__return-container' onClick={handleReturn}>
                <img className='edit-profile-client__return-icon' src="/Register/arrow-back.svg" alt="" />
                <figcaption className='edit-profile-client__return-text'>Volver</figcaption>
            </figure>
            <form onSubmit={handleSubmit(onSubmit)} className='edit-profile-client__form'>
                <h1 className='edit-profile-client__title'>Editar Información Personal</h1>
                <div className='edit-profile-client__form-container'>
                    <label className='edit-profile-client__label'>
                        <p className='edit-profile-client__label--text'>Nombre completo</p>
                        <input
                            className='edit-profile-client__input'
                            type="text"
                            defaultValue={displayName}
                            {...register("displayName")}
                        />
                    </label>
                    <label className='edit-profile-client__label'>
                        <p className='edit-profile-client__label--text'>Correo Electrónico</p>
                        <input
                            className={`edit-profile-client__input  ${loginMethod === "GOOGLE" ? "edit-profile-client__disabled" : ""}`}
                            type="email"
                            defaultValue={email}
                            disabled={loginMethod === "GOOGLE" ? "disabled" : ""}
                            {...register("email")}
                        />
                        {
                            loginMethod === "GOOGLE" && (
                                <p className='edit-profile-client__alert'>
                                    No puedes editar el correo ya que te registraste con Google.
                                </p>
                            )
                        }
                    </label>
                    <label className='edit-profile-client__label'>
                        <p className='edit-profile-client__label--text'>Suscripción</p>
                        <select className='edit-profile-client__input'
                            {...register("subscription")}
                            defaultValue={subscription}
                        >
                            <option value="BRONZE">Bronce</option>
                            <option value="SILVER">Plata</option>
                            <option value="GOLD">Oro</option>
                        </select>
                    </label>
                    <label className='edit-profile-client__label'>
                        <p className='edit-profile-client__label--text'>Método de pago</p>
                        <InputMask
                            className='edit-profile-client__input'
                            mask="9999 9999 9999 9999"
                            placeholder='1234 1234 1234 1234'
                            defaultValue={cardNumber}
                            {...register("cardNumber", {
                                pattern: {
                                    value: /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/,
                                }
                            })}
                        />
                    </label>
                </div>
                <button className='edit-profile-client__btn-submit'>Guardar Cambios</button>
            </form>
        </section>
    )
}

export default EditProfileClient