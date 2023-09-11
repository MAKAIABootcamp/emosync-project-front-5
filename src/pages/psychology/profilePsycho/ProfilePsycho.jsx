
import HeaderPsycho from "../../../components/headerPsycho/HeaderPsycho";
import "./main.scss";
import React from 'react'


const ProfilePsycho = () => {
    return (
        <main className='ProfilePsycho__father'>
            <HeaderPsycho />
            <article className="ProfilePsycho">
                <h2 className="ProfilePsycho__title">Psicolog@ General, Juliana Sanchez</h2>
                <figure className="ProfilePsycho__picture"><img src="/Psychologist/perrito.jfif" alt="psychologist" /></figure>
                <section className="ProfilePsycho__inf">
                    <section className="ProfilePsycho__inf__column">
                        <div>
                            <h2>Nombre Completo</h2>
                            <p>Juliana Sanchez Saenz</p>
                        </div>
                        <div>
                            <h2>Estado de Verificacion</h2>
                            <p>Verificado</p>
                        </div>
                        <div>
                            <h2>Tipo de Cuenta</h2>
                            <p>Ahorros</p>
                        </div>
                        <div>
                            <h2>Cuenta Bancaria</h2>
                            <p>*********2234</p>
                        </div>
                    </section>
                    <section className="ProfilePsycho__inf__column">
                    <div>
                            <h2>Profesion</h2>
                            <p>Psicologo General</p>
                        </div>
                        
                        <div>
                            <h2>Correo Electronico</h2>
                            <p>juliana@example.com</p>
                        </div>
                        <div>
                            <h2>Banco</h2>
                            <p>Bancolombia</p>
                        </div>
                        <div>
                            <h2>Citas incumplidas</h2>
                            <p>0</p>
                        </div>
                    </section>
                </section>
                <section className="ProfilePsycho__description">
                    <h3>Descripcion</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, ut quidem veniam officia eos debitis quis tempore eligendi fuga temporibus delectus laudantium aperiam earum dicta assumenda. Nihil repudiandae quod quo?</p>
                </section>
                <button className="ProfilePsycho__goEdit">Editar Informacion</button>
            </article>

        </main>
    )
}

export default ProfilePsycho