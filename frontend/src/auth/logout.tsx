import React, { useEffect } from 'react'
import { useLocation } from 'wouter'

export const logout = () => async (dispatch : any) => {
    const USER_LOGOUT = 'USER_LOGOUT'

    try {
        window.location.href = 'http://127.0.0.1:3000/api/auth/logout'
        localStorage.removeItem('userInfo')
        dispatch({ type: USER_LOGOUT })
    } catch (error) {
        console.log(error)
    }
};
