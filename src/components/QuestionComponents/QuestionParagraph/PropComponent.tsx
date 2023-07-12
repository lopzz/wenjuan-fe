import React, { FC, useEffect } from 'react'
import { Form, Input, Checkbox, Select } from 'antd'
import { QuestionParagraphPropsType } from './interface'

const { TextArea } = Input

const PropComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text, isCenter, onChange, disabled } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter])

  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      onValuesChange={handleValueChange}
      initialValues={{ text, isCenter }}
      form={form}
      disabled={disabled}
    >
      <Form.Item
        label="段落内容🤣"
        name="text"
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
