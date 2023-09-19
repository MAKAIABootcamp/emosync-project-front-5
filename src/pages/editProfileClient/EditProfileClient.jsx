import React from 'react'
import InputMask from "react-input-mask";
import "./editProfileClient.scss"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditProfileClient = () => {
    const navigate = useNavigate()
    const { cardNumber, displayName, loginMethod, subscription, email } = useSelector(state => state.user)
    const handleReturn = () => {
        navigate("/profile")
    }

    return (
        <section className='edit-profile-client'>
            <figure className='edit-profile-client__return-container' onClick={handleReturn}>
                <img className='edit-profile-client__return-icon' src="/Register/arrow-back.svg" alt="" />
                <figcaption className='edit-profile-client__return-text'>Volver</figcaption>
            </figure>
            <form className='edit-profile-client__form'>
                <h1 className='edit-profile-client__title'>Editar Información Personal</h1>
                <div className='edit-profile-client__form-container'>
                    <label className='edit-profile-client__label'>
                        <p className='edit-profile-client__label--text'>Nombre completo</p>
                        <input
                            className='edit-profile-client__input'
                            type="text"
                            defaultValue={displayName}
                        />
                    </label>
                    <label className='edit-profile-client__label'>
                        <p className='edit-profile-client__label--text'>Correo Electrónico</p>
                        <input
                            className='edit-profile-client__input'
                            type="email"
                            defaultValue={email}
                            disabled={loginMethod === "GOOGLE" ? "disabled" : ""}
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
                        <select className='edit-profile-client__input'>
                            {
                                subscription === "BRONZE" ? (
                                    <>
                                        <option value="BRONZE" selected>Bronce</option>
                                        <option value="SILVER">Plata</option>
                                        <option value="GOLD">Oro</option>
                                    </>
                                ) : subscription === "SILVER" ? (
                                    <>
                                        <option value="BRONZE" >Bronce</option>
                                        <option value="SILVER" selected>Plata</option>
                                        <option value="GOLD">Oro</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="BRONZE" >Bronce</option>
                                        <option value="SILVER" >Plata</option>
                                        <option value="GOLD" selected>Oro</option>
                                    </>
                                )
                            }

                        </select>
                    </label>
                    <label className='edit-profile-client__label'>
                        <p className='edit-profile-client__label--text'>Método de pago</p>
                        <InputMask
                            className='edit-profile-client__input'
                            mask="9999 9999 9999 9999"
                            placeholder='1234 1234 1234 1234'
                            defaultValue={cardNumber}
                        />
                    </label>
                </div>
                <button className='edit-profile-client__btn-submit'>Guardar Cambios</button>
            </form>
        </section>
    )
}

export default EditProfileClient