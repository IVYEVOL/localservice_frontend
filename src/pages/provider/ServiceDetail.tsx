import React from 'react'
import { useLocation } from 'react-router-dom'

function ServiceDetail() {
  const {state} = useLocation()
  const {id} = state
  // alert(id)
  return (
    <div>{id}</div>
  )
}

export default ServiceDetail