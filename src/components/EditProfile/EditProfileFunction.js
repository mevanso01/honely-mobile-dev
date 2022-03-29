import React, { useState } from 'react'
import { useToast } from 'native-base'
import { useSelector, useDispatch } from 'react-redux'
import { doPost } from '../../services/http-client'
import { TOAST_LENGTH_SHORT } from '../../config'

export const EditProfileFunction = (props) => {
  const {
    UIComponent
  } = props

  const dispatch = useDispatch()
  const toast = useToast()

  const currentUser = useSelector(state => state.currentUser)
  const [isLoading, setIsLoading] = useState(false)

  const fetchImage = () => {
    const defaultImg = 'https://honely-files-public.s3.amazonaws.com/images/avatar/avatar_user_01.png'
    if (currentUser?.image_url) {
      return currentUser.image_url
    } else {
      return defaultImg
    }
  }
  const [formState, setFormState] = useState({
    user_name: currentUser.user_name,
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    phone_number: currentUser.phone_number,
    email: currentUser.email,
    image_url: fetchImage()
  })

  const handleUpdateUserProfile = async () => {
    try {
      setIsLoading(true)
      const body = {
        user_name: currentUser.user_name,
        // information: ['first_name', 'last_name', 'phone_number', 'email_consent'],
        information: ['first_name', 'last_name', 'phone_number'],
        first_name_value: formState.first_name,
        last_name_value: formState.last_name,
        phone_number_value: formState.phone_number,
        // email_consent_value: newsletter,
      }
      const response = await doPost('lookup-test/user_profile_modification', body)
      if (response.error) {
        throw { message: response.msg }
      }
    } catch (error) {
      console.log('error')
      toast.show({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {UIComponent && (
        <UIComponent
          {...props}
          isLoading={isLoading}
          formState={formState}
          setFormState={setFormState}
          handleUpdateUserProfile={handleUpdateUserProfile}
        />
      )}
    </>
  )
}
