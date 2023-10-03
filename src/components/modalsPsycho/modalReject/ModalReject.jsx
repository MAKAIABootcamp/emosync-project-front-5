import React, { useState } from 'react'
import "./main.scss"
import { useAddNotifyUserMutation, useEditAppointPsichoMutation } from '../../../store/api/firebaseApi'
import { toast } from 'sonner'

const ModalReject = ({appoint, close}) => {
    const [rejectText, setRejectText] = useState("")
    const [editAppointPsicho] = useEditAppointPsichoMutation()
    const [addNotifyUser] = useAddNotifyUserMutation()
    const user = JSON.parse(localStorage.getItem('infoUser'));
 const id = appoint.id
    const handleClose = (e)=>{
        e.preventDefault()
        close(false)
        console.log(id);
    }
    const handleTextReject = (e)=>{
        setRejectText(e.target.value)
  
    }

    const handleConfirm = async (e)=>{
        e.preventDefault()
       
        const formData = {
            status: "REJECTED",
            rejectionReason: rejectText,
            updatedAt: new Date().getTime(),
        }

        const formNotify = {
            createdAt: new Date().getTime(),
            isRead: false,
            psychologistKey: user.key,
            reason: rejectText,
            status: "REJECTED",
            appointId: id,
            updatedAt: new Date().getTime(),
        }
        const idClient = appoint.clientKey
       const response = await editAppointPsicho({formData, id})
       const response3 = await addNotifyUser({formNotify, idClient})
       toast.success('¡Cita cancelada con éxito!')
       close(false)

    }

  return (
    <section className='modalShowReject'>
        <section className='modalShowReject__content'>
            <h2 className='modalShowReject__content__title'>
                Escriba el motivo por el cual rechaza la cita <span>*</span>
            </h2>
            <section className='modalShowReject__content__inf'>
                <section>
                 <textarea onChange={(e)=> handleTextReject(e)}/>
                </section>
                <section>
                 <span>
                 El motivo del rechazo será informado al paciente; tenga en cuenta que al rechazar la cita, probablemente el paciente no desee volver a agendar una cita a futuro con usted.
                 </span>
                </section>
                <section className='modalShowReject__content__inf__buttons'>
                 <button onClick={(e)=> handleConfirm(e)} className='modalShowReject__content__inf__confirm'>Rechazar</button>
                 <button onClick={(e)=> handleClose(e)} className='modalShowReject__content__inf__cancel'>Cancelar</button>
                </section>
            </section>
        </section>
    </section>
  )
}

export default ModalReject