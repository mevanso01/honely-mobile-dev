import { combineReducers } from '@reduxjs/toolkit';
import editprofile from '../../components/EditProfile/store';
import signup from '../../components/Signup/store';

const screenReducers = combineReducers({
  editprofile,
  signup
})

export default screenReducers;