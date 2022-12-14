import React, { useState } from 'react'
import UserForm from '../components/UserForm'
export default function SignUp() {
  const formStates = {
    0: "NONE",
    1: "SIGNUP"
  }
  const [formState, setFormState] = useState(formStates[1])
  return (
    <div className='main'>
      <div className="formContainer">
        <form className="form">
          <UserForm
            formState={formState}
            formStates={formStates}
            setFormState={setFormState}
            add={true}
          />
        </form>
      </div>


    </div>
  )
}