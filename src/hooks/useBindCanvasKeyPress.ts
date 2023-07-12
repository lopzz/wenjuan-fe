import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from '../store/componentsReducer'

function isActiveElementValid() {
  const activeElem = document.activeElement
  if (activeElem === document.body) return true // 鼠标光标没有focus到input框
  return false
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch()
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopiedComponent())
  })
  useKeyPress('uparrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })
  useKeyPress('downarrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })
}

export default useBindCanvasKeyPress
