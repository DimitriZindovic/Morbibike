import { useState, useEffect } from 'react'
import { Button, Flex, Form, Input } from 'antd'
import type { FormProps } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { Bike } from '../models/Bike'

interface InputButtonProps {
  onButtonClick: (
    id: number,
    model: string,
    type: string,
    color: string,
    wheelSize: number,
    price: number,
    description: string
  ) => boolean
  initialValues?: Bike | null
}

type FieldType = {
  model?: string
  type?: string
  color?: string
  wheelSize?: number
  price?: number
  description?: string
}

const InputButton = ({ onButtonClick, initialValues }: InputButtonProps) => {
  const [isLoading, setisLoading] = useState(false)
  const [form] = Form.useForm()

  // This Function set the initial values of the form
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
    }
  }, [initialValues, form])

  const cleanField = () => {
    form.resetFields()
  }

  // This Function make the form submit and add a bike to the list of bikes
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    setisLoading(true)

    const result = onButtonClick(
      initialValues?.id ?? 0,
      String(values.model),
      String(values.type),
      String(values.color),
      Number(values.wheelSize),
      Number(values.price),
      String(values.description)
    )

    if (result === true) {
      setisLoading(false)
      cleanField()
    }
  }

  // Return a form to add a bike
  return (
    <Flex vertical style={{ width: '100%' }}>
      <Form initialValues={{ remember: true }} onFinish={onFinish} form={form}>
        <Form.Item
          name={'model'}
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Input placeholder="Enter the model of bike" type="text" />
        </Form.Item>
        <Form.Item
          name={'type'}
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Input placeholder="Enter the type of bike" type="text" />
        </Form.Item>
        <Form.Item
          name={'color'}
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Input placeholder="Enter the color of bike" type="text" />
        </Form.Item>
        <Form.Item
          name={'wheelSize'}
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Input placeholder="Enter the wheel size of bike" type="number" />
        </Form.Item>
        <Form.Item
          name={'price'}
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Input placeholder="Enter the price of bike" type="number" />
        </Form.Item>
        <Form.Item
          name={'description'}
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <TextArea placeholder="Enter the description of bike" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {initialValues ? 'Update' : 'Add'}
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  )
}

export default InputButton
