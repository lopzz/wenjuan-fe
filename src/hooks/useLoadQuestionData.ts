import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
import { resetComponents } from '../store/componentsReducer'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷id')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true,
    }
  )
  useEffect(() => {
    if (!data) return
    // const { title = '', componentList = [] } = data
    const { componentList = [] } = data

    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }

    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))
  }, [data])

  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadQuestionData
