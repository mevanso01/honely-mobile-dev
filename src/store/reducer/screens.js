import { combineReducers } from '@reduxjs/toolkit';
import editprofile from '../../components/EditProfile/store';

const screenReducers = combineReducers({
  editprofile,
})

export default screenReducers;