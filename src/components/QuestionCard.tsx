import React, { FC, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Divider, Space, Tag, Popconfirm, Modal, message } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { updateQuestionService, duplicateQuestionService } from '../services/question'
import styles from './QuestionCard.module.scss'
import { useRequest } from 'ahooks'

const { confirm } = Modal

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate()
  const { _id, title, createdAt, answerCount, isPublished, isStar } = props

  const [isStarState, setIsStarState] = useState(isStar)

  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        message.success('已更新')
      },
    }
  )

  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      const data = await duplicateQuestionService(_id)
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        message.success('复制成功')
        nav(`/question/edit/${result.id}`)
      },
    }
  )
  const [isDeleteState, setIsDeletedState] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        setIsDeletedState(true)
      },
    }
  )
  function del() {
    confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion,
    })
  }
  if (isDeleteState) return null

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }}></StarOutlined>}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷： {answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Button
            type="text"
            icon={<StarOutlined />}
            size="small"
            onClick={changeStar}
            disabled={changeStarLoading}
          >
            {isStarState ? '取消标星' : '标星'}
          </Button>
          <Popconfirm
            title="确定复制该问卷？"
            okText="确定"
            cancelText="取消"
            onConfirm={duplicate}
          >
            <Button type="text" icon={<CopyOutlined />} size="small" disabled={duplicateLoading}>
              复制
            </Button>
          </Popconfirm>
          <Button
            type="text"
            icon={<DeleteOutlined />}
            size="small"
            onClick={del}
            disabled={deleteLoading}
          >
            删除
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
