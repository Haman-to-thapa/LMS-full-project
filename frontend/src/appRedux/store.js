import {configureStore} from '@reduxjs/toolkit'
import rootReducer from '@/featureSlice/routeReducer';
import { authApi } from '@/featureSlice/api/authApi';


const store = configureStore({
  reducer : rootReducer,
  middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware)
})

export default store;