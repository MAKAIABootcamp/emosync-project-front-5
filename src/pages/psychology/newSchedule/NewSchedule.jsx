import HeaderPsycho from "../../../components/headerPsycho/HeaderPsycho";
import "./main.scss";
import React from 'react'


const NewSchedule = () => {
  return (
    <main className='NewSchedule__father'>
    <HeaderPsycho />
    <section  className='NewSchedule'>
        <div  className='NewSchedule__title'><figure><img src="/Psychologist/arrow-prev.svg" alt="arrow" /></figure>
        <span>Agregar nuevo horario</span>
        </div>
        <section className='NewSchedule__table'>
            <div className='NewSchedule__table__title'>
                <h2>Juliana Sanchez Saenz</h2>
                <span>Psicologo General</span>
            </div>
            <section className='NewSchedule__table__week'>
                <div><strong>02</strong><span>Lun</span></div>
                <div><strong>02</strong><span>Lun</span></div>
                <div><strong>02</strong><span>Lun</span></div>
                <div><strong>02</strong><span>Lun</span></div>
                <div><strong>02</strong><span>Lun</span></div>
                <div><strong>02</strong><span>Lun</span></div>
            </section>
            <section className='NewSchedule__table__time'>
                <div>
                    <span>10:00am - 11:00am</span>
                    <input type="checkbox" />
                </div>
                <div>
                    <span>10:00am - 11:00am</span>
                    <input type="checkbox" />
                </div>
                <div>
                    <span>10:00am - 11:00am</span>
                    <input type="checkbox" />
                </div>
            </section>
            <button className='NewSchedule__table__button'>Agregar horario.</button>

        </section>
    </section>
    </main>
  )
}

export default NewSchedule
