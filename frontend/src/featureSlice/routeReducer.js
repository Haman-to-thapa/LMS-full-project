import  {combineReducers} from '@reduxjs/toolkit'
import { authApi } from '../featureSlice/api/authApi'
import authReducer from '../featureSlice/api/authSlice'

const rootReducer = combineReducers({
  [authApi.reducerPath]:authApi.reducer,
  auth:authReducer
})


export default rootReducer;