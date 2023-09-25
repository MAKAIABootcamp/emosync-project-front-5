import React, { useState } from 'react'
import "./main.scss"
import { useEditAppointPsichoMutation, useEditHistoryUserMutation } from '../../../store/api/firebaseApi'
import { toast } from 'sonner'

const PostAppoint =  ({appoint, close, psicoInf }) => {
    const [completedTrue, setCompletedTrue] = useState(false)
    const [showComment, setShowComment] = useState(false)
    const [commentText, setCommentText] = useState("")
    const [editAppointPsicho] =  useEditAppointPsichoMutation()
    const [editHistoryUser] = useEditHistoryUserMutation()
    const handleCommentText = (e)=>{
        setCommentText(e.target.value)
    }

console.log(appoint.id);
    const handleCancel= (e)=>{
        e.preventDefault()
        close(false)
    }
    const handleSend= async (e)=>{
        e.preventDefault()
        const id = appoint.id
        const idUser = appoint.clientKey
        const formData = {
            status: completedTrue ? "FINISHED" : "UNFULFILLED",
            updatedAt: new Date().getTime(),
        }
        const formHistory = {
            psychologistName: psicoInf.displayName,
            appointmentDate: appoint.pureTime,
            consultationReason: appoint.consultationReason,
            createdAt: new Date().getTime(),
            psychologistComments: commentText,
            psychologistSpecialty: psicoInf.specialty,
            updatedAt: new Date().getTime(),
            appointKey: id,
        }


       const response = await editAppointPsicho({formData, id})
       const response2 = await editHistoryUser({formHistory, idUser})
       toast.success('¡Cita finalizada con éxito!')
       close(false)

    }
    const handleCompletedTrue = (e) =>{
        setCompletedTrue(true)

    }
    const handleCompletedFalse = (e) =>{
        setCompletedTrue(false)
    }

    const handleShowCommentTrue = (e) =>{
        setShowComment(true)

    }
    const handleShowCommentFalse = (e) =>{
        setShowComment(false)
    }
   const handleNothing =()=>{
       "no hago nada"
   }




  return (
    <section className='modalAppoint'>
        <section className='modalAppoint__content'>
           
           
            <h2 className='modalAppoint__content__title'>
                {appoint.clientName}, {appoint.time}
            </h2>
            <section className='modalAppoint__content__inf'>
                <section>
                 <h3>¿La cita fue cumplida? <strong>*</strong></h3> 
                 <section className='modalAppoint__content__inf__checks'>
                 <input type="checkbox" onChange={handleNothing} checked={completedTrue} onClick={(e)=> handleCompletedTrue(e)}/>
                 <span>Si</span>
                 <input type="checkbox" onChange={handleNothing} checked={!completedTrue} onClick={(e)=> handleCompletedFalse(e)}/>
                 <span>No</span>
                 </section>
                </section>
                <section>
                 <h3>¿Desea dejar comentarios? <strong>*</strong></h3> 
                 <section className='modalAppoint__content__inf__checks'>
                 <input type="checkbox" onChange={handleNothing} checked={showComment} onClick={(e)=> handleShowCommentTrue(e)} />
                 <span>Si</span>
                 <input type="checkbox" onChange={handleNothing} checked={!showComment} onClick={(e)=> handleShowCommentFalse(e)}/>
                 <span>No</span>
                 </section>
                </section>
               { 
               showComment &&
                <section className='modalAppoint__content__inf__textarea'>
                <h3>¿Cómo observa al paciente? <strong>*</strong></h3> 
                 <textarea onChange={(e)=>handleCommentText(e)}/>
                </section>}
                <section className='modalAppoint__content__inf__buttons'>
                <button className='modalAppoint__content__inf__buttons__confirm' onClick={(e)=> handleSend(e)}>Enviar</button>
                 <button className='modalAppoint__content__inf__buttons__cancel' onClick={(e)=> handleCancel(e)}>Cancelar</button>
                </section>
                
            </section>
        </section>
    </section>
  )
}

export default PostAppoint