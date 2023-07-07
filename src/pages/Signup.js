import React, { useState } from 'react'
import UserForm from '../components/UserForm'
import styles from '../styles/form.module.scss'
export default function SignUp() {
  const formStates = {
    0: "NONE",
    1: "SIGNUP"
  }
  const [formState, setFormState] = useState(formStates[1])
  return (
    <main className='main'>
      <div className={styles.formContainer}>
        <form className={`${styles.form} bg-primary blur rounded border`}>
          <UserForm
            formState={formState}
            formStates={formStates}
            setFormState={setFormState}
            add={true}
          />
        </form>
      </div>


    </main>
  )
}