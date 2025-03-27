import {configureStore} from '@reduxjs/toolkit'
import authReducer from "../featureSlice/api/authSlice"


const store = configureStore({
  reducer : {
 auth: authReducer
  }
})

export default store;