import React from 'react'

const ClientProfile = () => {
    return (
        <main className='client-profile'>
            <article className='client-profile__profile'>
                <section>
                    <div>
                        <h2>Nombre Completo</h2>
                        <p>Alejandra Sanchez</p>
                    </div>
                    <div>
                        <h2>Correo Electrónico</h2>
                        <p>alejandra@example.com</p>
                    </div>
                    <div>
                        <h2>Suscripción</h2>
                        <p>Plata</p>
                    </div>
                    <div>
                        <h2>Citas cumplidas en el mes</h2>
                        <p>0</p>
                    </div>
                    <div>
                        <h2>Método de pago </h2>
                        <p>******* 3456</p>
                    </div>
                    <button>Editar Información</button>
                </section>
                <section>
                    <p>Cerrar Sesión</p>
                    <img src="" alt="" />
                </section>
            </article>
            <article>

            </article>
        </main>
    )
}

export default ClientProfile