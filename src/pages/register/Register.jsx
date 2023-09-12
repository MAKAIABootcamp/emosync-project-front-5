import React, { useState } from 'react'
import "./register.scss"
import RegisterSelectType from '../../components/registerSelectType/RegisterSelectType'
import RegisterForm from '../../components/registerForm/RegisterForm'


const Register = () => {
  const [step, setStep] = useState(1)
  return (
    <main className='register'>
      <article className='register__form-container'>
        {
          step === 1 ? <RegisterSelectType setStep={setStep}/> : <RegisterForm setStep={setStep}/>
        }
      </article>
    </main>
  )
}

export default Register