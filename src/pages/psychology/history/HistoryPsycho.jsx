import "./main.scss"
import React from 'react'
import HeaderPsycho from '../../../components/headerPsycho/HeaderPsycho'

const HistoryPsycho = () => {
    //const navigate = useNavigate()
   
  

    const actualPage = 1
    const prevPage = 1
  return (
    <main className='WeekSchedule__father'>
    <HeaderPsycho />
    <section className='HistoryPsycho'>
        <h2>Historial de citas de Alejandra Sanchez</h2>
        <section className='WeekSchedule__table HistoryPsycho__table'>
            <div className='WeekSchedule__table__celda upLeft'><h3>Nombre del paciente</h3> </div>
            <div className='WeekSchedule__table__celda   middle'><h3>Fecha de la cita</h3> </div>
            <div className='WeekSchedule__table__celda middle'><h3>Nombre del psicologo tratante</h3> </div>
            <div className='WeekSchedule__table__celda upRight'><h3></h3> </div>
            <div  className='WeekSchedule__table__celda'> <span>Alejandra Sanchez</span></div>
            <div className='WeekSchedule__table__celda'><span>7 de octubre 12:00pm</span></div>
            <div className='WeekSchedule__table__celda'><strong>Armelio Camargo</strong></div>
            <div className='WeekSchedule__table__celda cell_details'><figure><img src="/Psychologist/details.svg" alt="details.svg" /></figure></div>
            <div  className='WeekSchedule__table__celda'> <span>Alejandra Sanchez</span></div>
            <div className='WeekSchedule__table__celda'><span>7 de octubre 12:00pm</span></div>
            <div className='WeekSchedule__table__celda'><strong>Armelio Camargo</strong></div>
            <div className='WeekSchedule__table__celda cell_details'><figure><img src="/Psychologist/details.svg" alt="details.svg" /></figure></div>
            <div  className='WeekSchedule__table__celda'> <span>Alejandra Sanchez</span></div>
            <div className='WeekSchedule__table__celda'><span>7 de octubre 12:00pm</span></div>
            <div className='WeekSchedule__table__celda'><strong>Armelio Camargo</strong></div>
            <div className='WeekSchedule__table__celda cell_details'><figure><img src="/Psychologist/details.svg" alt="details.svg" /></figure></div>
            <div  className='WeekSchedule__table__celda downLeft'> <span>Alejandra Sanchez</span></div>
            <div className='WeekSchedule__table__celda '><span>7 de octubre 12:00pm</span></div>
            <div className='WeekSchedule__table__celda'><strong>Armelio Camargo</strong></div>
            <div className='WeekSchedule__table__celda downRight cell_details'> <figure><img src="/Psychologist/details.svg" alt="details.svg" /></figure> </div>
        </section>
        <section className='WeekSchedule__pager'>
            <p className='WeekSchedule__pager_page'>
                {`${actualPage} - ${prevPage}`}
            </p>
            <section className='WeekSchedule__pager__arrows'>
            <figure><img src="/Psychologist/arrow-prev.svg" alt="arrow-prev" /></figure>
            <figure><img src="/Psychologist/arrow-next.svg" alt="arrow-next" /></figure>
            </section>
        </section>
    </section>
</main>
  )
}

export default HistoryPsycho