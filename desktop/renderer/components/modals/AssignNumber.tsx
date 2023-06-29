import React from 'react'
import ModalLayout from '../layouts/ModalLayout'

export default function AssignNumber() {
  const [open, setOpen] = React.useState(false)
  return (
    <ModalLayout open={open} setOpen={()=>{}}>
        <p>assign a number</p>
    </ModalLayout>
  )
}
