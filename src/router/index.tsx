import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '../pages/layouts/MainLayout'
import ManageLayout from '../pages/layouts/ManageLayout'
import QuestionLayout from '../pages/layouts/QuestionLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Registry from '../pages/Registry'
import NotFound from '../NotFound'
import List from '../pages/manage/List'
import Trash from '../pages/manage/Trash'
import Star from '../pages/manage/Star'
import Edit from '../pages/question/Edit'
import Stat from '../pages/question/Stat'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'registry',
        element: <Registry />,
      },
      {
        path: 'registry',
        element: <Registry />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
        ],
      },

      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'stat/:id',
        element: <Stat />,
      },
    ],
  },
])

export default router

export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const REGISTRY_PATHNAME = '/registry'
export const MANAGE_INDEX_PATHNAME = '/manage/list'

export function isLoginOrRegister(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTRY_PATHNAME].includes(pathname)) return true
  return false
}

export function isNoNeedUserInfo(pathname: string) {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTRY_PATHNAME].includes(pathname)) return true
  return false
}
