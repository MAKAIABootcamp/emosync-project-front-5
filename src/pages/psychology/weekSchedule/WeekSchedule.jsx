import React from 'react'
import './main.scss'
import HeaderPsycho from '../../../components/headerPsycho/HeaderPsycho'
import {useNavigate} from "react-router-dom"

const WeekSchedule = () => {
    const actualPage = 1
    const prevPage = 1
    const navigate = useNavigate()

    const handleHistory = ( )=>{
        navigate('/history')
    }
    return (
        <main className='WeekSchedule__father'>
            <HeaderPsycho />
            <section className='WeekSchedule'>
                <h2>Citas programadas para esta semana</h2>
                <section className='WeekSchedule__table'>
                    <div className='WeekSchedule__table__celda upLeft'><h3>Nombre del paciente</h3> </div>
                    <div className='WeekSchedule__table__celda   middle'><h3>Fecha de la cita</h3> </div>
                    <div className='WeekSchedule__table__celda middle'><h3>Historial</h3> </div>
                    <div className='WeekSchedule__table__celda upRight'><h3></h3> </div>
                    <div  className='WeekSchedule__table__celda'> <span>Alejandra Sanchez</span></div>
                    <div className='WeekSchedule__table__celda'><span>7 de octubre 12:00pm</span></div>
                    <div className='WeekSchedule__table__celda' onClick={handleHistory}><strong>Ver historial del paciente</strong></div>
                    <div className='WeekSchedule__table__celda'><p>Cancelar cita</p></div>
                    <div  className='WeekSchedule__table__celda'> <span>Alejandra Sanchez</span></div>
                    <div className='WeekSchedule__table__celda'><span>7 de octubre 12:00pm</span></div>
                    <div className='WeekSchedule__table__celda' onClick={handleHistory}><strong>Ver historial del paciente</strong></div>
                    <div className='WeekSchedule__table__celda'><p>Cancelar cita</p></div>
                    <div  className='WeekSchedule__table__celda'> <span>Alejandra Sanchez</span></div>
                    <div className='WeekSchedule__table__celda'><span>7 de octubre 12:00pm</span></div>
                    <div className='WeekSchedule__table__celda' onClick={handleHistory}><strong>Ver historial del paciente</strong></div>
                    <div className='WeekSchedule__table__celda'><p>Cancelar cita</p></div>
                    <div  className='WeekSchedule__table__celda downLeft'> <span>Alejandra Sanchez</span></div>
                    <div className='WeekSchedule__table__celda '><span>7 de octubre 12:00pm</span></div>
                    <div className='WeekSchedule__table__celda' onClick={handleHistory}><strong>Ver historial del paciente</strong></div>
                    <div className='WeekSchedule__table__celda downRight'><p>Cancelar cita</p></div>
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

export default WeekSchedule