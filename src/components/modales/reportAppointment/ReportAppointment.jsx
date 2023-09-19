import React from 'react'
import { setModalAuxActive } from '../../../store/slides/modals/modals'
import { useDispatch } from 'react-redux'
import "./reportAppointment.scss"

const ReportAppointment = () => {
    const dispatch = useDispatch()
    return (
        <article className='report-appointment'>
            <section className='report-appointment__container'>
                <h1 className='report-appointment__title'>Juliana Sanchez - 7 Oct</h1>
                <p className='report-appointment__text'>¿Cuál fue el motivo por el cual no se llevo a cabo la cita?</p>
                <textarea className='report-appointment__textarea'></textarea>
                <p className='report-appointment__alert'>Analizaremos los motivos del incumplimiento de la cita
                y dependiendo de los motivos haremos o no la devolución del dinero y descuento de la cantidad de
                citas por mes.</p>
                <div className='report-appointment__btn-container'>
                    <button className='report-appointment__confirm'>Enviar Reporte</button>
                    <button className='report-appointment__cancel' onClick={() => dispatch(setModalAuxActive())}>Cancelar</button>
                </div>
            </section>
        </article>
    )
}

export default ReportAppointment