import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  isLoginOrRegister,
  isNoNeedUserInfo,
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
} from '../router'
import useGetUserInfo from './useGetUserInfo'

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  const nav = useNavigate()
  useEffect(() => {
    if (waitingUserData) return
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME)
      }
      return
    }
    if (isNoNeedUserInfo(pathname)) {
      return
    } else {
      nav(LOGIN_PATHNAME)
    }
  }, [waitingUserData, username, pathname])
}

export default useNavPage
