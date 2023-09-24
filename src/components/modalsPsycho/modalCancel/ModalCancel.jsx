import React, { useState } from 'react'
import "./main.scss"
import { useEditAppointPsichoMutation } from '../../../store/api/firebaseApi'
import { toast } from 'sonner'
const ModalCancel = ({appoint, close}) => {
    const [cancelText, setCancelText] = useState("")
    const [editAppointPsicho] = useEditAppointPsichoMutation()
 const id = appoint.id
    const handleClose = (e)=>{
        e.preventDefault()
        close(false)
        console.log(id);
    }
    const handleTextCancel = (e)=>{
        setCancelText(e.target.value)
  
    }

    const handleConfirm = async (e)=>{
        e.preventDefault()
       
        const formData = {
            status: "CANCELLED",
            cancelReason: cancelText,
            updatedAt: new Date().getTime(),
            cancelBy: "PSYCHOLOGIST"
        }

       const response = await editAppointPsicho({formData, id})

       toast.success('¡Cita cancelada con éxito!')
       close(false)

    }

  return (
    <section className='modalShowCancel'>
        <section className='modalShowCancel__content'>
            <h2 className='modalShowCancel__content__title'>
                Escriba el motivo por el cual cancela la cita <span>*</span>
            </h2>
            <section className='modalShowCancel__content__inf'>
                <section>
                 <textarea onChange={(e)=> handleTextCancel(e)}/>
                </section>
                <section>
                 <span>
                 El motivo de la cancelación será informado al paciente; tenga en cuenta que al cancelar la cita, probablemente el paciente no desee volver a agendar una cita a futuro con usted.
                 </span>
                </section>
                <section className='modalShowCancel__content__inf__buttons'>
                 <button onClick={(e)=> handleConfirm(e)} className='modalShowCancel__content__inf__confirm'>Cancelar Cita</button>
                 <button onClick={(e)=> handleClose(e)} className='modalShowCancel__content__inf__cancel'>Cerrar</button>
                </section>
            </section>
        </section>
    </section>
  )
}
export default ModalCancel
