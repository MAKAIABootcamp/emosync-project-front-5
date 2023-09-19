
import HeaderPsycho from "../../../components/headerPsycho/HeaderPsycho";
import Loader from "../../../components/loader/Loader";
import { useGetUserByIdQuery } from "../../../store/api/firebaseApi";
import "./main.scss";
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';


const ProfilePsycho = () => {
    const [userInfo, setUserInfo] = useState(false)
    const [nameArray, setNameArray] = useState(false)
    const cacheUser = useSelector(state => state.psycho.userInfo)
    const user = JSON.parse(localStorage.getItem('infoUser'));
    const {data: userInfo2, isSuccess, isLoading} = useGetUserByIdQuery(user.key)
  
    useEffect(() => {
  
    if(isSuccess){
      console.log(userInfo2);
      setNameArray(userInfo2.displayName.split(" "))
    }
  }, [isSuccess, userInfo2])
  

    return (
        <main className='ProfilePsycho__father'>
            <HeaderPsycho />
          {  isSuccess ?
          
          <article className="ProfilePsycho">
                <h2 className="ProfilePsycho__title">{userInfo2.specialty}, {nameArray[0]} {nameArray[1]}</h2>
                <figure className="ProfilePsycho__picture"><img src={userInfo2.photo} alt="psychologist" /></figure>
                <section className="ProfilePsycho__inf">
                    <section className="ProfilePsycho__inf__column">
                        <div>
                            <h2>Nombre Completo</h2>
                            <p className="ProfilePsycho__inf__column__name">{userInfo2.displayName}</p>
                        </div>
                        <div>
                            <h2>Estado de Verificacion</h2>
                           { userInfo2.isVerified ?
                           
                           <p>Verificado</p>
                           : <p>No verificado</p>
                           }
                        </div>
                        <div>
                            <h2>Tipo de Cuenta</h2>
                            <p>{userInfo2.typeOfBankAccount}</p>
                        </div>
                        <div>
                            <h2>Cuenta Bancaria</h2>
                            <p>*********2234</p>
                        </div>
                    </section>
                    <section className="ProfilePsycho__inf__column">
                    <div>
                            <h2>Profesion</h2>
                            <p>{userInfo2.specialty}</p>
                        </div>
                        
                        <div>
                            <h2>Correo Electronico</h2>
                            <p>{userInfo2.email}</p>
                        </div>
                        <div>
                            <h2>Banco</h2>
                            <p>{userInfo2.bank}</p>
                        </div>
                        <div>
                            <h2>Citas incumplidas</h2>
                            <p>{userInfo2.missedAppointments}</p>
                        </div>
                    </section>
                </section>
                <section className="ProfilePsycho__description">
                    <h3>Descripcion</h3>
                    <p>{userInfo2.description == "" ? "You can write a description to improve your profile": userInfo2.description}</p>
                </section>
                <button className="ProfilePsycho__goEdit">Editar Informacion</button>
            </article>
            : <Loader/>
        }

        </main>
    )
}

export default ProfilePsycho