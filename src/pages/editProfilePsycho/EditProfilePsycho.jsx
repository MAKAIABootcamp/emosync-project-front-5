import React, { useEffect } from 'react'
import HeaderPsycho from '../../components/headerPsycho/HeaderPsycho'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserByIdQuery } from '../../store/api/firebaseApi';
import Loader from '../../components/loader/Loader';
import './editProfilePsycho.scss'
import { updatePsychoInfoFirebase } from '../../store/slides/psychologist/psychoThunks';
import uploadFile from '../../services/updaloadFile';
import { createVerificationDocument } from '../../services/verificationDocumentServices';

const EditProfilePsycho = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('infoUser'));
  const { data: userInfo2, isSuccess, isLoading } = useGetUserByIdQuery(user.key)

  useEffect(() => {
    if (isSuccess) {
      console.log(userInfo2);
      //setNameArray(userInfo2.displayName.split(" "))
    }
  }, [isSuccess, userInfo2])

  useEffect(() => {
    reset({
      inputName: userInfo2.displayName,
      inputSex: userInfo2.sex,
      inputProfSpecText: userInfo2.specialty,
      inputEmail: userInfo2.email,
      inputBankType: userInfo2.typeOfBankAccount,
      inputBankName: userInfo2.bank,
      inputBankNum: userInfo2.bankAccount,
      inputProfile: userInfo2.description
    })
  }, [])




  const editPsycho = async (data) => {
    //console.log(data)
    //creacion de peticion de verificacion

    if ((data.inputPicDiploma.length) || (data.inputProfCard.length) || (data.inputProfSpecImg.length)) {
      if (data.inputPicDiploma.length == 0) {
        data.inputPicDiploma = "";
      } else {
        const image1 = await uploadFile(data.inputPicDiploma[0])
        data.inputPicDiploma = image1;
      }

      if (data.inputProfCard.length == 0) {
        data.inputProfCard = "";
      } else {
        const image2 = await uploadFile(data.inputProfCard[0])
        data.inputProfCard = image2;
      }

      if (data.inputProfSpecImg.length == 0) {
        data.inputProfSpecImg = "";
      } else {
        const image3 = await uploadFile(data.inputProfSpecImg[0])
        data.inputProfSpecImg = image3;
      }

      let DocToVerify = {
        createdAt: new Date().getTime(),
        isVerified: false,
        professionalDiploma: data.inputPicDiploma,
        professionalCard: data.inputProfCard,
        specialtyDiploma: data.inputProfSpecImg,
        psychologistKey: user.key,
        psychologistName: userInfo2.displayName,
        generalStatus: userInfo2.isVerified,
        specStatus: userInfo2.verifiedSpecialty,
        updatedAt: new Date().getTime(),
      }
      const respT = await createVerificationDocument(DocToVerify)
      console.log("la respuesta de la creacion del doc de verificacion fue: ", respT)
    }
    //actualizacion de estado
    if (data.inputPicture.length == 0) {
      let objToSend = {
        updatedAt: new Date().getTime(),
        displayName: data.inputName,
        sex: data.inputSex,
        specialty: data.inputProfSpecText,
        email: data.inputEmail,
        typeOfBankAccount: data.inputBankType,
        bank: data.inputBankName,
        bankAccount: data.inputBankNum,
        description: data.inputProfile,
      }
      console.log("objeto a enviar: ", objToSend)
      dispatch(updatePsychoInfoFirebase(user.key, objToSend))
      navigate(-1)
    } else {
      const image = await uploadFile(data.inputPicture[0])
      let objToSend = {
        updatedAt: new Date().getTime(),
        displayName: data.inputName,
        sex: data.inputSex,
        specialty: data.inputProfSpecText,
        email: data.inputEmail,
        typeOfBankAccount: data.inputBankType,
        bank: data.inputBankName,
        bankAccount: data.inputBankNum,
        description: data.inputProfile,
        photo: image
      }
      console.log("objeto a enviar: ", objToSend)
      dispatch(updatePsychoInfoFirebase(user.key, objToSend))
      navigate(-1)
    }
  }

  return (
    <aside className='EditProfilePsycho'>
      <HeaderPsycho />
      {
        isSuccess ? (
          <form className='EditProfilePsycho__form' onSubmit={handleSubmit(editPsycho)}>
            <h2 className='EditProfilePsycho__form__title'>Editar Información personal</h2>
            <div>
              <label >Foto de perfil</label>
              <input
                className='inputImage'
                type="file"
                {...register("inputPicture")}
              />
            </div>

            <div>
              <label >Nombre completo </label>
              <input
                className='inputText'
                type='text'
                {...register("inputName", { required: true })}
              />
            </div>

            <div>
              <label >Género</label>
              <select
                className='sexInput'
                {...register("inputSex", { required: true })}>
                <option value="">Selecciona una opción</option>
                <option value="H">Masculino</option>
                <option value="M">Femenino</option>
                <option value="O">Otro</option>
              </select>
            </div>
            <h3 className='EditProfilePsycho__form__subtitle'>Verificación</h3>
            <span className='EditProfilePsycho__form__extraText'>A continuación, adjunta una foto de los documentos solicitados, debes enviar tanto el diploma de la carrera como la tarjeta profesional, si no será rechazada la verificación.</span>

            <div>
              <label >Diploma de la carrera profesional</label>
              <input
                className='inputImage'
                type="file"
                {...register("inputPicDiploma")}
              />
            </div>
            <div>
              <label >Tarjeta Profesional</label>
              <input
                className='inputImage'
                type="file"
                {...register("inputProfCard")}
              />
            </div>
            <div>
              <label >Diploma de la Especialización (En caso de que aplique)</label>
              <input
                className='inputImage'
                type="file"
                {...register("inputProfSpecImg")}
              />
            </div>

            <div>
              <input
                className='nameInput'
                type='text'
                placeholder='Título de la especialidad'
                {...register("inputProfSpecText")}
              />
            </div>
            {
              userInfo2.loginMethod != "GOOGLE" ? (
                <div>
                  <label>Correo electrónico</label>
                  <input
                    className='emailInput'
                    type="email"
                    placeholder='juliana@example.com'
                    {...register("inputEmail", { required: true })}
                  />
                </div>
              ) : ("")
            }

            <div>
              <label>Tipo de cuenta</label>
              <select
                className='register__input'
                {...register("inputBankType", { required: true })}>
                <option value="">Selecciona una opción</option>
                <option value="Ahorros">Ahorros</option>
                <option value="Corriente" >Corriente</option>
              </select>
            </div>

            <div>
              <label >Banco</label>
              <input
                className='inputText'
                type='text'
                {...register("inputBankName", { required: true })}
              />
            </div>

            <div>
              <label >Cuenta Bancaria</label>
              <input
                className='inputText'
                type='number'
                {...register("inputBankNum", { required: true })}
              />
            </div>

            <div>
              <label>Descripción</label>
              <textarea
                {...register("inputProfile")}
                placeholder='Permite que te conozcan :D'
              >
              </textarea>
            </div>
            <button type='submit' className='EditProfilePsycho__form__edit'>Guardar cambios</button>
          </form>
        ) : (
          <Loader />
        )
      }
    </aside>
  )
}

export default EditProfilePsycho