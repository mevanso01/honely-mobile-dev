import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export const LoginForm = (props) => {
  const {
    UIComponent
  } = props

  const dispatch = useDispatch()

  return (
    <>
      {UIComponent && (
        <UIComponent
          {...props}
        />
      )}
    </>
  )
}
