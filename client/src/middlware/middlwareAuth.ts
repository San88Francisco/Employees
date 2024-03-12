import {createListenerMiddleware} from '@reduxjs/toolkit'
import {authApi} from '../app/services/auth'

export const listnerMiddleware = createListenerMiddleware()

listnerMiddleware.startListening({
  matcher: authApi.endpoints.login.matchFulfilled,
  effect: async (action, listnerApi) => {
    listnerApi.cancelActiveListeners()
    if (action.payload.token) {
    }
    localStorage.setItem('token', action.payload.token)
  },
})
