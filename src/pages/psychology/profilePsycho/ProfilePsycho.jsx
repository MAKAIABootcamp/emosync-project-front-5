
import HeaderPsycho from "../../../components/headerPsycho/HeaderPsycho";
import Loader from "../../../components/loader/Loader";
import "./main.scss";
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';


const ProfilePsycho = () => {
    const [userInfo, setUserInfo] = useState(false)
    const [nameArray, setNameArray] = useState(false)
    const cacheUser = useSelector(state => state.psycho.userInfo)

  useEffect(() => {
    setUserInfo(cacheUser[1])
    if(cacheUser[1]){
      console.log(cacheUser[1]);
      setNameArray(cacheUser[1].displayName.split(" "))
    }
  }, [cacheUser])
  

    return (
        <main className='ProfilePsycho__father'>
            <HeaderPsycho />
          {  userInfo ?
          
          <article className="ProfilePsycho">
                <h2 className="ProfilePsycho__title">{userInfo.specialty}, {nameArray[0]} {nameArray[1]}</h2>
                <figure className="ProfilePsycho__picture"><img src={userInfo.photo} alt="psychologist" /></figure>
                <section className="ProfilePsycho__inf">
                    <section className="ProfilePsycho__inf__column">
                        <div>
                            <h2>Nombre Completo</h2>
                            <p className="ProfilePsycho__inf__column__name">{userInfo.displayName}</p>
                        </div>
                        <div>
                            <h2>Estado de Verificacion</h2>
                           { userInfo.isVerified ?
                           
                           <p>Verificado</p>
                           : <p>No verificado</p>
                           }
                        </div>
                        <div>
                            <h2>Tipo de Cuenta</h2>
                            <p>{userInfo.typeOfBankAccount}</p>
                        </div>
                        <div>
                            <h2>Cuenta Bancaria</h2>
                            <p>*********2234</p>
                        </div>
                    </section>
                    <section className="ProfilePsycho__inf__column">
                    <div>
                            <h2>Profesion</h2>
                            <p>{userInfo.specialty}</p>
                        </div>
                        
                        <div>
                            <h2>Correo Electronico</h2>
                            <p>{userInfo.email}</p>
                        </div>
                        <div>
                            <h2>Banco</h2>
                            <p>{userInfo.bank}</p>
                        </div>
                        <div>
                            <h2>Citas incumplidas</h2>
                            <p>{userInfo.missedAppointments}</p>
                        </div>
                    </section>
                </section>
                <section className="ProfilePsycho__description">
                    <h3>Descripcion</h3>
                    <p>{userInfo.description}</p>
                </section>
                <button className="ProfilePsycho__goEdit">Editar Informacion</button>
            </article>
            : <Loader/>
        }

        </main>
    )
}

export default ProfilePsycho