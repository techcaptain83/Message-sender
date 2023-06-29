import React from 'react'
import ModalLayout from '../layouts/ModalLayout'

export default function OrderANumber() {
  return (
    <ModalLayout open={true} setOpen={()=>console.log("hi")}>
        <p>order a number</p>
    </ModalLayout>
  )
}
