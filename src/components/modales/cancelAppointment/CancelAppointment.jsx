import React from 'react'
import "./cancelAppointment.scss"
import { useDispatch } from 'react-redux'
import { setModalActive } from '../../../store/slides/modals/modals'

const CancelAppointment = () => {
    const dispatch = useDispatch()
    return (
        <article className='cancel-appointment-modal'>
            <section className='cancel-appointment-modal__container'>
                <p className='cancel-appointment-modal__alert'>Se descontará la cita de la cantidad de citas que has tomado
                    este mes, si la cita fue cobrada como cita extra se devolverá tu dinero.</p>
                <div className='cancel-appointment-modal__btn-container'>
                    <button className='cancel-appointment-modal__confirm'>Cancelar cita</button>
                    <button className='cancel-appointment-modal__cancel' onClick={() => dispatch(setModalActive())}>
                        Cancelar
                    </button>
                </div>
            </section>
        </article>
    )
}

export default CancelAppointment