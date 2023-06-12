import React, { FC, useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Input } from 'antd'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

const { Search } = Input
const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [value, setValue] = useState('')
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }
  function handleSearch(value: string) {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(curVal)
  }, [searchParams])
  return (
    <Search
      size="large"
      allowClear
      placeholder="请输入关键字"
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ width: '260px' }}
    ></Search>
  )
}

export default ListSearch
