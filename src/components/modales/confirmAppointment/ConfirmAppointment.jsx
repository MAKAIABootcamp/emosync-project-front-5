import React, { useEffect, useState } from 'react'
import "./confirmAppointment.scss"
import { useDispatch, useSelector } from 'react-redux'
import { setModalActive } from '../../../store/slides/modals/modals'

const ConfirmAppointment = () => {
    const { appointmentsPerMonth, subscription } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [alertValidate, setAlertValidate] = useState(0)

    useEffect(() => {
        valdiate()
    }, [])

    const valdiate = () => {
        if (subscription === "BRONZE") {
            setAlertValidate(3)
        } else if (subscription === "SILVER") {
            setAlertValidate(5)
        } else {
            setAlertValidate(7)
        }
    }

    return (
        <article className='confirm_appointment'>
            <section className='confirm_appointment__container'>
                <h1 className='confirm_appointment__title'>¿La información está correcta?</h1>
                <p className='confirm_appointment__text'>Si es asi, proceda a confirmar la cita</p>
                {
                    appointmentsPerMonth >= alertValidate && (
                        <p className='confirm_appointment__alert'>Le recordamos que ya ha cumplido con la cantidad de citas gratis durante el mes
                            según su suscripción, está cita será cobrada en el momento que sea confirmada.</p>
                    )
                }
                <div className='confirm_appointment__btn-container'>
                    <button className='confirm_appointment__confirm'>Confirmar</button>
                    <button className='confirm_appointment__cancel' onClick={() => dispatch(setModalActive())}>Cancelar</button>
                </div>
            </section>
        </article>
    )
}

export default ConfirmAppointment