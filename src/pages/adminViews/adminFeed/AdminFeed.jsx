import React, { useEffect, useState } from 'react'
import HeaderAdmin from '../../../components/headerAdmin/HeaderAdmin'
import defaultUser from '/Admin/defaultUser.jpg'
import detailsFilled from '/Admin/detailsFilled.svg'
import detailsEmpty from '/Admin/detailsEmpty.svg'
import './adminFeed.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useGetVerifDocsQuery, useGetVerifReportsQuery } from '../../../store/api/firebaseApi'
import { setDocsToVefiry, setReportsToVefiry } from '../../../store/slides/admin/adminReducer'
import Swal from 'sweetalert2'


const AdminFeed = () => {
  const { toVerify, toReport } = useSelector(state => state.admin)
  const dispatch = useDispatch()
  const { data: docsArray } = useGetVerifDocsQuery()
  const { data: reportsArray } = useGetVerifReportsQuery()

  const [showTable01, setShowTable01] = useState(false)
  const [showTable02, setShowTable02] = useState(false)

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


  return (
    <>
      <aside className='AdminFeedContainer'>
        <HeaderAdmin />
        <section className='AdminFeedBody'>
          <article className='AdminFeedBody__info'>
            <p className='AdminFeedBody__info__welcome'>Bienvenid@, Mariana</p>
            <figure className='AdminFeedBody__info__picture'>
              <img src={defaultUser} alt="user" />
            </figure>
          </article>
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
                      <td><img src={detailsFilled} alt="file" className='detailsFilled' /></td>
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
      </aside>
    </>
  )
}

export default AdminFeed