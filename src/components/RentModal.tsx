import { useState } from 'react'
import { Modal, Form, DatePicker, Button, Input } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import { Rent } from '../models/Rent'
import { Bike } from '../models/Bike'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

interface RentModalProps {
  visible: boolean
  onCreate: (rent: Rent) => void
  onCancel: () => void
  bike: Bike
}

const RentModal = ({ visible, onCreate, onCancel, bike }: RentModalProps) => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Check if the current date is between the start and end date of a rent
    return bike.rents.some((rent) => {
      const rentStart = dayjs(rent.rentStart)
      const rentEnd = dayjs(rent.rentEnd)
      return current.isBetween(rentStart, rentEnd, 'day', '[]')
    })
  }

  // Function to create a rent
  const onFinish = (values: { rentRange: [dayjs.Dayjs, dayjs.Dayjs] }) => {
    setIsLoading(true)
    const newRent: Rent = {
      id: bike.rents.length + 1,
      velo: bike,
      rentStart: values.rentRange[0].toDate(),
      rentEnd: values.rentRange[1].toDate(),
    }
    onCreate(newRent)
    setIsLoading(false)
    form.resetFields()
  }

  // Return a modal to create a rent
  return (
    <Modal
      title="Créer une location"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="rentRange"
          label="Plage de dates"
          layout="vertical"
          rules={[
            {
              required: true,
              message: 'Veuillez sélectionner une plage de dates',
            },
          ]}
        >
          <DatePicker.RangePicker disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Créer
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default RentModal
