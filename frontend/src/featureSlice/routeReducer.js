import  {combineReducers} from '@reduxjs/toolkit'
import { authApi } from '../featureSlice/api/authApi'
import authReducer from '../featureSlice/api/authSlice'
import { courseApi } from './api/courseApi';

const rootReducer = combineReducers({
  [authApi.reducerPath]:authApi.reducer,
  [courseApi.reducerPath]:courseApi.reducer,
  auth:authReducer
})


export default rootReducer;