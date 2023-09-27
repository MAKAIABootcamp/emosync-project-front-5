import React, { useEffect, useState } from 'react'
import HeaderAdmin from '../../../components/headerAdmin/HeaderAdmin'
import defaultUser from '/Admin/defaultUser.jpg'
import detailsFilled from '/Admin/detailsFilled.svg'
import detailsEmpty from '/Admin/detailsEmpty.svg'
import xMark from '/Admin/close.svg'
import './adminFeed.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useGetVerifDocsQuery, useGetVerifReportsQuery } from '../../../store/api/firebaseApi'
import { setDocsToVefiry, setReportsToVefiry } from '../../../store/slides/admin/adminReducer'
import Swal from 'sweetalert2'
import { getAdminInfo, getDocsToVerify, getReportsToVerify } from '../../../store/slides/admin/adminAction'
import { createNotificationToPsycho, editVerificationDocument, updatePsychoFromVerDoc } from '../../../services/verificationDocumentServices'
import { useForm } from 'react-hook-form'
import { updateAppointments } from '../../../services/updateAppointments'
import { recoverClientandPenalizePsycho } from '../../../services/updateUser'


const AdminFeed = () => {
  const { toVerify, toReport, adminInfo } = useSelector(state => state.admin)
  const adminKey = useSelector(state => state.auth.key)
  const dispatch = useDispatch()
  //const { data: docsArray } = useGetVerifDocsQuery()
  //const { data: reportsArray } = useGetVerifReportsQuery()

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm()

  const [showTable01, setShowTable01] = useState(false)
  const [showTable02, setShowTable02] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showValDocModal, setShowValDocModal] = useState(false)

  //actualizacion de info del admin
  useEffect(() => {
    dispatch(getAdminInfo(adminKey))
  }, [])
  //actualizaciones de tabla
  useEffect(() => {
    dispatch(getDocsToVerify())
  }, [showTable01])
  useEffect(() => {
    dispatch(getReportsToVerify())
  }, [showTable02])

  useEffect(() => {
    console.log("info del admin: ", adminInfo)
  }, [adminInfo])
  useEffect(() => {
    console.log("info de verificaciones: ", toVerify)
  }, [toVerify])
  useEffect(() => {
    console.log("info de reportes: ", toReport)
  }, [toReport])

  // useEffect(() => {
  //   if (docsArray && docsArray.length) {
  //     //console.log(docsArray)
  //     dispatch(setDocsToVefiry(docsArray))
  //   }
  // }, [docsArray])

  // useEffect(() => {
  //   if (reportsArray && reportsArray.length) {
  //     //console.log(reportsArray)
  //     dispatch(setReportsToVefiry(reportsArray))
  //   }
  // }, [reportsArray])

  // useEffect(() => {
  //   if (toVerify && toVerify.length > 0) {
  //     console.log("documentos a revisar: ", toVerify)
  //     setShowTable01(true)
  //   }
  //   if (toReport && toReport.length > 0) {
  //     console.log("reportes a revisar: ", toReport)
  //     setShowTable02(true)
  //   }
  // }, [toVerify, toReport])

  const showDocument = (urlImage) => {
    Swal.fire({
      imageUrl: urlImage,
      imageAlt: 'una imagen',
      showCloseButton: true,
      showConfirmButton: false,
      customClass: {
        closeButton: 'no-border' // Agregar una clase personalizada al botón de cancelar
      },
      buttonsStyling: false // Deshabilitar los estilos de botón predeterminados
    })
  }

  //validacion de reportes
  // const changeReportModal = () => {
  //   setShowReportModal(!showReportModal)
  // }
  const fillReportModal = (obj) => {
    setShowReportModal(obj)
  }
  const emptyReportModal = () => {
    setShowReportModal(false)
  }

  const shameOnClient = async () => {
    console.log("culpa del cliente")
    const resp1 = await updateAppointments({ isVerified: true }, showReportModal.id)
    console.log("respuesta del reporte: ", resp1)
    emptyReportModal()
  }
  const shameOnPsycho = async () => {
    console.log("culpa del psicologo")
    const resp1 = await updateAppointments({ isVerified: true }, showReportModal.id)
    console.log("respuesta del reporte: ", resp1)
    const resp2 = await recoverClientandPenalizePsycho(showReportModal.clientKey, showReportModal.psychologistKey)
    console.log("cambios en cliente y psicologo? ", resp2)
    emptyReportModal()
    setShowTable02(showTable02)
  }

  //validacion de documentos
  const fillValDocModal = (obj) => {
    setShowValDocModal(obj)
  }
  const emptyValDocModal = () => {
    setShowValDocModal(false)
  }

  const validateNoDoc = async (data) => {
    console.log(data)
    //console.log(showValDocModal)
    const textToSend = {
      subject: "Validación de documentos",
      description: data.VerDocDesc,
      validateDocRef: showValDocModal.id,
      adminId: adminKey,
      adminName: adminInfo.displayName,
      createdAt: new Date().getTime()
    }
    const respZ = await createNotificationToPsycho(showValDocModal.psychologistKey, textToSend)
    console.log("la respuesta a la creacion de la noti fue: ", respZ)
    const respY = await editVerificationDocument(showValDocModal.id, { isVerified: true, description: data.VerDocDesc })
    console.log("respuesta a actualizacion de VerDoc ", respY)
    emptyValDocModal()
    setShowTable01(!showTable01)
  }

  const validateYesDoc = async (doc) => {
    if ((doc.professionalDiploma.length) && (doc.professionalCard.length) && (doc.specialtyDiploma.length)) {
      const textToSend = {
        subject: "Validación de documentos",
        description: "Su validación de psicología general y especialidad han sido aprobadas",
        validateDocRef: doc.id,
        adminId: adminKey,
        adminName: adminInfo.displayName,
        createdAt: new Date().getTime()
      }
      const respT = await createNotificationToPsycho(doc.psychologistKey, textToSend)
      console.log("la respuesta a la creacion de la noti fue: ", respT)

      const updatePsycho = {
        isVerified: true,
        verifiedSpecialty: true,
        updatedAt: new Date().getTime()
      }
      const respX = await updatePsychoFromVerDoc(doc.psychologistKey, updatePsycho)
      console.log("se actualizo al psicologo? ", respX)
    } else if ((!doc.professionalDiploma.length) && (!doc.professionalCard.length) && (doc.specialtyDiploma.length)) {
      const textToSend = {
        subject: "Validación de documentos",
        description: "Su validación de psicología general ha sido aprobada",
        validateDocRef: doc.id,
        adminId: adminKey,
        adminName: adminInfo.displayName,
        createdAt: new Date().getTime()
      }
      const respT = await createNotificationToPsycho(doc.psychologistKey, textToSend)
      console.log("la respuesta a la creacion de la noti fue: ", respT)

      const updatePsycho = {
        verifiedSpecialty: true,
        updatedAt: new Date().getTime()
      }
      const respX = await updatePsychoFromVerDoc(doc.psychologistKey, updatePsycho)
      console.log("se actualizo al psicologo? ", respX)
    } else if ((doc.professionalDiploma.length) && (doc.professionalCard.length) && (!doc.specialtyDiploma.length)) {
      const textToSend = {
        subject: "Validación de documentos",
        description: "Su validación de psicología general ha sido aprobada",
        validateDocRef: doc.id,
        adminId: adminKey,
        adminName: adminInfo.displayName,
        createdAt: new Date().getTime()
      }
      const respT = await createNotificationToPsycho(doc.psychologistKey, textToSend)
      console.log("la respuesta a la creacion de la noti fue: ", respT)

      const updatePsycho = {
        isVerified: true,
        updatedAt: new Date().getTime()
      }
      const respX = await updatePsychoFromVerDoc(doc.psychologistKey, updatePsycho)
      console.log("se actualizo al psicologo? ", respX)
    }
    //ahora se valida la revision de documentos
    const respY = await editVerificationDocument(doc.id, { isVerified: true })
    console.log("respuesta a actualizacion de VerDoc ", respY)
    setShowTable01(!showTable01)
  }


  return (
    <>
      <aside className='AdminFeedContainer'>
        <HeaderAdmin />
        <section className='AdminFeedBody'>
          {
            adminInfo?.userRole ?
              (
                <article className='AdminFeedBody__info'>
                  <p className='AdminFeedBody__info__welcome'>{adminInfo.sex == "H" ? ("Bienvenido") : ("Bienvenida")}, {adminInfo.displayName}</p>
                  <figure className='AdminFeedBody__info__picture'>
                    <img src={adminInfo.photo} alt="user" />
                  </figure>
                </article>
              ) : (
                <article className='AdminFeedBody__info'>
                  <p className='AdminFeedBody__info__welcome'>Bienvenid@, admin</p>
                  <figure className='AdminFeedBody__info__picture'>
                    <img src={defaultUser} alt="user" />
                  </figure>
                </article>
              )
          }

          <article className='AdminFeedBody__tables'>
            <div className='AdminFeedBody__tables__psychologyst'>
              <p>Psicólogos pendientes por verificar</p>
              <table className='tablePsy' border={1}>
                <thead className='tablePsy__head'>
                  <tr>
                    <th className='bord1'>Nombre</th>
                    <th>Diploma</th>
                    <th>Tarjeta Prof.</th>
                    <th>Especialización</th>
                    <th className='bord2'>Verificar</th>
                  </tr>
                </thead>
                <tbody className='tablePsy__body'>
                  {/* <tr className='tablePsy__body__ind'>
                    <td>Juliana Sanchez</td>
                    <td><img src={detailsEmpty} alt="file" /></td>
                    <td><img src={detailsEmpty} alt="file" /></td>
                    <td><img src={detailsEmpty} alt="file" /></td>
                    <td >
                      <div className='actionCell'>
                        <span className='textYes'>Aceptar</span>
                        <span className='textNo'>Rechazar</span>
                      </div>
                    </td>
                  </tr> */}
                  {
                    toVerify.length && toVerify.map((doc) => doc.isVerified == false &&
                      (
                        <tr className='tablePsy__body__ind' key={doc.id}>
                          <td>{doc.psychologistName}</td>
                          <td>
                            {
                              doc.professionalDiploma ?
                                (
                                  <img src={detailsFilled} alt="file" className='detailsFilled'
                                    onClick={() => showDocument(doc.professionalDiploma)} />
                                ) : (
                                  <img src={detailsEmpty} alt="file" />
                                )
                            }
                          </td>
                          <td>
                            {
                              doc.professionalCard ?
                                (
                                  <img src={detailsFilled} alt="file" className='detailsFilled'
                                    onClick={() => showDocument(doc.professionalCard)} />
                                ) : (
                                  <img src={detailsEmpty} alt="file" />
                                )
                            }
                          </td>
                          <td>

                            {
                              doc.specialtyDiploma ?
                                (
                                  <img src={detailsFilled} alt="file" className='detailsFilled'
                                    onClick={() => showDocument(doc.specialtyDiploma)} />
                                ) : (
                                  <img src={detailsEmpty} alt="file" />
                                )
                            }
                          </td>
                          <td >
                            <div className='actionCell'>
                              <span className='textYes' onClick={() => { validateYesDoc(doc) }}>Aceptar</span>
                              <span className='textNo' onClick={() => { fillValDocModal(doc) }}>Rechazar</span>
                            </div>
                          </td>
                        </tr>
                      ))
                  }
                  <tr className='tablePsy__body__fin'>
                    <td className='bord4'></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className='bord3'></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='AdminFeedBody__tables__report'>
              <p>Citas incumplidas</p>
              <table className='tableRpt'>
                <thead className='tableRpt__head'>
                  <tr>
                    <th>Paciente</th>
                    <th>Psicólogo tratante</th>
                    <th>Motivo</th>
                  </tr>
                </thead>
                <tbody className='tableRpt__body'>
                  {/* <tr className='tableRpt__body__ind'>
                    <td>Camilla Sanchez</td>
                    <td>Juliana Sanchez</td>
                    <td><img src={detailsFilled} alt="file" className='detailsFilled' /></td>
                  </tr> */}
                  {toReport.length && toReport.map((doc) => doc.isVerified == false && (
                    <tr className='tableRpt__body__ind' key={doc.id}>
                      <td>{doc.clientName}</td>
                      <td>{doc.psychologistName}</td>
                      <td><img src={detailsFilled} alt="file" className='detailsFilled'
                        onClick={() => fillReportModal(doc)} /></td>
                    </tr>
                  ))
                  }
                  <tr className='tableRpt__body__fin'>
                    <td ></td>
                    <td></td>
                    <td ></td>
                  </tr>
                </tbody>
              </table>
            </div>

          </article>
        </section>
        {
          showReportModal &&
          // (
          //   // background
          //   <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50'>
          //     {/* modal box */}
          //     <div className='bg-white rounded shadow-lg w-1/3'>
          //       <div className='border-b px-4 py-2'>
          //         <h3>Modal title</h3>
          //       </div>
          //       {/* modal body */}
          //       <div className='p-3'>
          //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, voluptatibus?
          //       </div>
          //       {/* modal btn box */}
          //       <div className='flex justify-end items-center w-100 border-t p-3'>
          //         <button className='bg-red-600 px-3 py-1 rounded text-white mr-1'>Paciente</button>
          //         <button className='bg-red-600 px-3 py-1 rounded text-white mr-1' onClick={changeReportModal}>Psicólogo</button>
          //       </div>
          //     </div>
          //   </div>
          // )
          (
            <div className='modalReport'>
              <div className='modalReport__box'>
                <div className='modalReport__box__text1'>
                  <p>Reporta</p>
                  <span>Paciente: {showReportModal.clientName}</span>
                </div>
                <div className='modalReport__box__text2'>
                  <p>Motivo de incumplimiento</p>
                  <span>{showReportModal.consultationReason}, {showReportModal.reason}</span>
                </div>
                <div className='modalReport__box__text3'>
                  <p>¿Quién recibe la penalización por incumplimiento?</p>
                  <span>Si es el paciente quien lo recibe se le descontará la cita como si la hubiera tomado si por el contrario es el psicólogo se le reportara en la plataforma y al acumular 10 penalizaciones será inhabilitada su cuenta.</span>
                </div>
                <div className='modalReport__box__btn'>
                  <button onClick={shameOnClient}>Paciente</button>
                  <button onClick={shameOnPsycho}>Psicólogo</button>
                </div>
                <figure className='modalReport__box__close'>
                  <img src={xMark} alt="close" onClick={emptyReportModal} />
                </figure>
              </div>

            </div>
          )
        }
        {
          showValDocModal &&
          (
            <div className='modalValDoc'>

              <form className='modalValDoc__form' onSubmit={handleSubmit(validateNoDoc)}>
                <h3 className='modalValDoc__form__title'>Escriba el motivo por el cual rechaza la verificación <span>*</span></h3>
                <textarea
                  {...register("VerDocDesc", { required: true })}
                  placeholder='Obligatorio'
                  className='modalValDoc__form__input'
                >
                </textarea>
                <span className='modalValDoc__form__text'>El motivo del rechazo será informado al psicólogo.</span>

                <div className='modalValDoc__form__btn'>
                  <button className='btn1'>Rechazar</button>
                  <button onClick={emptyValDocModal} className='btn2'>Cancelar</button>
                </div>
              </form>
            </div>
          )
        }
      </aside >
    </>
  )
}

export default AdminFeed