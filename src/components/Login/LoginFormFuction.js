import React, { useState } from 'react'
import { useToast } from 'native-base';
import { useSelector, useDispatch } from 'react-redux'
import { doGet } from '../../services/http-client'
import { TOAST_LENGTH_SHORT } from '../../config';
import { setCognitoUser } from '../../store/action/setCognitoUser'
import { setUser } from '../../store/action/setUser'

import config from '../../aws-exports'
import Amplify, { Auth } from 'aws-amplify'
Amplify.configure(config)


export const LoginForm = (props) => {
  const {
    UIComponent
  } = props
  
  const toast = useToast()
  const dispatch = useDispatch()
  const cognitoUser = useSelector(state => state.cognitoUser)
  const [isLogin, setIsLogin] = useState(false)

  const handleLogin = async (values) => {
    try {
      setIsLogin(true)
      const response = await doGet('lookup/user_name_fetch', { user_identifier: values.email })
      if (response.result === 'Error.') {
        throw response;
      }
      userCognitoLogin(response.user_name, values.password)
    } catch (error) {
      setIsLogin(false)
      toast.show({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
      })
    }
  }

  const userCognitoLogin = async (username, password) => {
    try {
      const user = await Auth.signIn(username, password)
      dispatch(setCognitoUser({ ...user, isCognitoUserLoggedIn: true }))
      getUserProfile()
    } catch (error) {
      setIsLogin(false)
      toast.show({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
      })
    }
  }

  const getUserProfile = async () => {
    try {
      if (cognitoUser.isCognitoUserLoggedIn) {
        const response = await doGet('lookup-test/user_profile', { email: cognitoUser.attributes.email })
        if (response.error) {
          throw response
        }
        dispatch(setUser({ ...response, isLoggedIn: true }))
        setIsLogin(false)
      }
    } catch (error) {
      setIsLogin(false)
      toast.show({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
      })
    }
  }
  
  return (
    <>
      {UIComponent && (
        <UIComponent
          {...props}
          isLogin={isLogin}
          handleLogin={handleLogin}
        />
      )}
    </>
  )
}
