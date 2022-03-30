import { createSlice } from '@reduxjs/toolkit'
import { doPost } from '../../services/http-client'
import { setUser } from '../../store/action/setUser'

export const doUpdateProfile = () => async (dispatch, getState) => {
  const { screens: { editprofile: { formState } } } = getState()
  dispatch(setLoading(true))

  try {
    const body = {
      user_name: formState.user_name,
      information: ['first_name', 'last_name', 'phone_number', 'user_type', 'email', 'image_url'],
      first_name_value: formState.first_name,
      last_name_value: formState.last_name,
      phone_number_value: formState.phone_number,
      user_type: formState.user_type,
      // email: formState.email,
      // image_url: formState.image_url
    }
    const response = await doPost('lookup-test/user_profile_modification', body)
    dispatch(setLoading(false))
    if (response.error) {
      throw response.msg
    }
    dispatch(setUser({
      first_name: formState.first_name,
      last_name: formState.last_name,
      phone_number: formState.phone_number,
      // email: formState.email,
      // image_url: formState.image_url
    }))
    return response
  } catch (error) {
    dispatch(setLoading(false))
    return Promise.reject(error)
  }
}

const initialState = {
  isLoading: false,
  formState: {}
}

const editProfileSlice = createSlice({
  name: 'screens/editprofile',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = !!action.payload
    },
    setFormState: (state, action) => {
      const temp = {
        ...state.formState
      }
      for (let key in action.payload) {
        temp[key] = action.payload[key]
      }
      state.formState = temp
    }
  },
  extraReducers: {}
})

export const { setLoading, setFormState } = editProfileSlice.actions

export default editProfileSlice.reducer
