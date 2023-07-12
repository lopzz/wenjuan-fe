import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'
import cloneDeep from 'lodash.clonedeep'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId, insertNewComponent } from './utils'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload
    }),
    // 新增组件
    addComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
        const newComponent = action.payload
        insertNewComponent(draft, newComponent)
      }
    ),
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        const { fe_id, newProps } = action.payload
        const curComp = draft.componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...newProps,
          }
        }
      }
    ),
    // 删除选中组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { componentList = [], selectedId: removeId } = draft
      const newSelectedId = getNextSelectedId(removeId, componentList)
      draft.selectedId = newSelectedId
      const index = componentList.findIndex(c => c.fe_id === removeId)
      componentList.splice(index, 1)
    }),
    // 显示/隐藏组件
    changeComponentHidden: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        const { componentList = [] } = draft
        const { fe_id, isHidden } = action.payload
        let newSelectedId = ''
        if (isHidden) {
          newSelectedId = getNextSelectedId(fe_id, componentList)
        } else {
          newSelectedId = fe_id
        }
        draft.selectedId = newSelectedId
        const curComp = componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.isHidden = isHidden
        }
      }
    ),
    // 锁定组件
    toggleComponentLocked: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { fe_id } = action.payload
        const curComp = draft.componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.isLocked = !curComp.isLocked
        }
      }
    ),
    // 复制组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList = [] } = draft
      const selectedComponent = componentList.find(c => c.fe_id === selectedId)
      if (selectedComponent == null) return
      draft.copiedComponent = cloneDeep(selectedComponent)
    }),
    // 粘贴组件
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft
      if (copiedComponent == null) return
      copiedComponent.fe_id = nanoid()
      insertNewComponent(draft, copiedComponent)
    }),
    // 选中上一个组件
    selectPrevComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const selectIndex = componentList.findIndex(c => c.fe_id === selectedId)
      if (selectIndex < 0) return
      if (selectIndex <= 0) return
      draft.selectedId = componentList[selectIndex - 1].fe_id
    }),
    // 选中下一个组件
    selectNextComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const selectIndex = componentList.findIndex(c => c.fe_id === selectedId)
      if (selectIndex < 0) return
      if (selectIndex + 1 === componentList.length) return
      draft.selectedId = componentList[selectIndex + 1].fe_id
    }),
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
} = componentsSlice.actions

export default componentsSlice.reducer
