import React from 'react'
import ModalLayout from '../layouts/ModalLayout'

export default function ChangePassword() {
  return (
    <ModalLayout open={false} setOpen={()=>console.log("hi")}>
        change password
    </ModalLayout>
  )
}
