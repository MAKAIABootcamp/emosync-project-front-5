import React, { useEffect, useState } from 'react'
import "./confirmAppointment.scss"
import { useDispatch, useSelector } from 'react-redux'
import { setModalActive } from '../../../store/slides/modals/modals'
import { swals } from '../../../services/swals'
import { useNavigate } from 'react-router-dom'
import { createAppointment } from '../../../services/createAppointment'

const ConfirmAppointment = ({ props: { date, reason, psychologist, psychologistId } }) => {
    const { appointmentsPerMonth, subscription } = useSelector(state => state.user)
    const { key } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [alertValidate, setAlertValidate] = useState(0)
    const navigate = useNavigate()

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

    const confirmAppointment = async () => {
        if(date && reason) {
            const infoAppointment = {
                createdAt: new Date().getTime(),
                appointmentDate: Number(date),
                clientKey: key,
                consultationReason: reason,
                psychologistKey: psychologistId,
                status: "PENDING",
                updatedAt: new Date().getTime(),
            }

            const resp = await createAppointment(infoAppointment)
            if (resp) {
                swals("CONFIRM-APPOINTMENT")
                navigate("/home")
                dispatch(setModalActive())
            } else {
                swals("ERROR-CONFIRM-APPOINTMENT")
            }

        } else {
            swals("EMPTY-INPUT-CONFIRM-APPOINTMENT")
        }

    }
    return (
        <article className='confirm-appointment'>
            <section className='confirm-appointment__container'>
                <h1 className='confirm-appointment__title'>¿La información es correcta?</h1>
                <p className='confirm-appointment__text'>Si es así, proceda a confirmar la cita</p>
                {
                    appointmentsPerMonth >= alertValidate && !psychologist.verifiedSpecialty && (
                        <p className='confirm-appointment__alert'>Le recordamos que ya ha cumplido con la cantidad de citas gratis durante el mes
                            según su suscripción, esta cita será cobrada en el momento que sea confirmada.</p>
                    )
                }
                {
                    psychologist.verifiedSpecialty && (
                        <p className='confirm-appointment__alert'>Esta cita será con un especialista, realizaremos el cobro de la misma
                            según su suscripción.</p>
                    )
                }
                <div className='confirm-appointment__btn-container'>
                    <button className='confirm-appointment__confirm' onClick={confirmAppointment}>Confirmar</button>
                    <button className='confirm-appointment__cancel' onClick={() => dispatch(setModalActive())}>Cancelar</button>
                </div>
            </section>
        </article>
    )
}

export default ConfirmAppointment