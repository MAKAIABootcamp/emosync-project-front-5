import React from 'react'
import InputMask from "react-input-mask";

const EditProfileClient = () => {
    return (
        <section className='edit-profile-client'>
            <figure className='edit-profile-client__return-container'>
                <img className='edit-profile-client__return-icon' src="" alt="" />
                <figcaption className='edit-profile-client__return-text'></figcaption>
            </figure>
            <form className='edit-profile-client__form'>
                <h1 className='edit-profile-client__title'>Editar Información Personal</h1>
                <div className='edit-profile-client__form-container'>
                    <label className='edit-profile-client__label'>
                        <p className='edit-profile-client__label--text'>Nombre completo</p>
                        <input className='edit-profile-client__input' type="text" />
                    </label>
                    <label className='edit-profile-client__label'>
                        <p className='edit-profile-client__label--text'>Correo Electrónico</p>
                        <input className='edit-profile-client__input' type="email" />
                    </label>
                    <label className='edit-profile-client__label'>
                        <p className='edit-profile-client__label--text'>Suscripción</p>
                        <select className='edit-profile-client__select'>
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
                            placeholder='1234 1234 1234 1234' />
                    </label>
                </div>
                <button className='edit-profile-client__btn-submit'>Guardar Cambios</button>
            </form>
        </section>
    )
}

export default EditProfileClient