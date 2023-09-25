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
import { getAdminInfo } from '../../../store/slides/admin/adminAction'


const AdminFeed = () => {
  const { toVerify, toReport, adminInfo } = useSelector(state => state.admin)
  const adminKey = useSelector(state => state.auth.key)
  const dispatch = useDispatch()
  const { data: docsArray } = useGetVerifDocsQuery()
  const { data: reportsArray } = useGetVerifReportsQuery()

  const [showTable01, setShowTable01] = useState(false)
  const [showTable02, setShowTable02] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)

  useEffect(() => {
    dispatch(getAdminInfo(adminKey))
  }, [])

  useEffect(() => {
    console.log("info del admin: ", adminInfo)
  }, [adminInfo])


  useEffect(() => {
    if (docsArray && docsArray.length) {
      //console.log(docsArray)
      dispatch(setDocsToVefiry(docsArray))
    }
  }, [docsArray])

  useEffect(() => {
    if (reportsArray && reportsArray.length) {
      //console.log(reportsArray)
      dispatch(setReportsToVefiry(reportsArray))
    }
  }, [reportsArray])

  useEffect(() => {
    if (toVerify && toVerify.length > 0) {
      console.log("documentos a revisar: ", toVerify)
      setShowTable01(true)
    }
    if (toReport && toReport.length > 0) {
      console.log("reportes a revisar: ", toReport)
      setShowTable02(true)
    }
  }, [toVerify, toReport])

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

  const changeReportModal = () => {
    setShowReportModal(!showReportModal)
  }
  const fillReportModal = (obj) => {
    setShowReportModal(obj)
  }
  const emptyReportModal = () => {
    setShowReportModal(false)
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
              <p>Psicologos pendientes por verificar</p>
              <table className='tablePsy' border={1}>
                <thead className='tablePsy__head'>
                  <tr>
                    <th className='bord1'>Nombre</th>
                    <th>Diploma</th>
                    <th>Targeta Prof.</th>
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
                    toVerify.length && toVerify.map((doc) => (
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
                            <span className='textYes'>Aceptar</span>
                            <span className='textNo'>Rechazar</span>
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
                  {toReport.length && toReport.map((doc) => (
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
                  <button>Paciente</button>
                  <button>Psicólogo</button>
                </div>
                <figure className='modalReport__box__close'>
                  <img src={xMark} alt="close" onClick={emptyReportModal} />
                </figure>
              </div>

            </div>
          )
        }
      </aside>
    </>
  )
}

export default AdminFeed