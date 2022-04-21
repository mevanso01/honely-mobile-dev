import { createSlice } from '@reduxjs/toolkit'
import { doPost } from '../../services/http-client'
import { setUser } from '../../store/action/setUser'

export const doUpdateUserProfile = (formValues) => async (dispatch, getState) => {
  const { screens: { editprofile: { formState } } } = getState()
  // dispatch(setLoading(true))

  try {
    const body = {
      user_name: formValues.user_name,
      information: ['first_name', 'last_name', 'phone_number', 'user_type', 'email', 'image_url'],
      first_name_value: formValues.first_name,
      last_name_value: formValues.last_name,
      phone_number_value: formValues.phone_number,
      user_type: formState.user_type,
    }
    const response = await doPost('lookup-test/user_profile_modification', body)
    dispatch(setLoading(false))
    if (response.error) {
      throw response.msg
    }
    dispatch(setUser({
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      phone_number: formValues.phone_number,
    }))
    return response
  } catch (error) {
    // dispatch(setLoading(false))
    return Promise.reject(error)
  }
}

export const doUpdateAgentProfile = () => async (dispatch, getState) => {
  const { screens: { editprofile: { formState, agentProfile } } } = getState()
  try {
    // const infoList = ['first_name', 'last_name', 'phone_number', 'company_name', 'home_url']
    const infoList = ['company_name', 'home_url']
    let body = {
      agent_id: agentProfile.agent_id,
      information: infoList,
      // first_name_value: agentProfile.first_name,
      // last_name_value: agentProfile.last_name,
      // phone_number_value: agentProfile.phone_number,
      company_name_value: formState.company_name,
      home_url_value: agentProfile.home_url,
    }
    if (formState.imageFileData) {
      infoList.push('image')
      body.user_name = formState.user_name
      body.base64 = formState.imageFileData
      body.extension = formState.imageFileExt
    }
    const response = await doPost('lookup-test/agent_profile_modification', body)
    if (response?.error) {
      throw response.msg
    }
    if (formState.imageFileData) {
      const image_url = 'https://honely-files-public.s3.amazonaws.com/images/' + formState.user_name + '.' + formState.imageFileExt
      dispatch(setUser({ image_url: image_url }))
    }
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

const initialState = {
  isLoading: false,
  formState: {},
  agentProfile: {}
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
    },
    setAgentProfile: (state, action) => {
      const temp = {
        ...state.agentProfile
      }
      for (let key in action.payload) {
        temp[key] = action.payload[key]
      }
      state.agentProfile = temp
    },
    resetProfileInfo: () => initialState
  },
  extraReducers: {}
})

export const { setLoading, setFormState, setAgentProfile, resetProfileInfo } = editProfileSlice.actions

export default editProfileSlice.reducer
