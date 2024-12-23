import { Button, Card, Flex } from 'antd'
import { Bike } from '../models/Bike'

interface CardBikeProps {
  bike: Bike
  onEdit: () => void
  onDelete: () => void
}

const CardBike = ({ bike, onEdit, onDelete }: CardBikeProps) => {
  // Return a card with the bike information
  return (
    <Card title={bike.model} key={bike.id} style={{ width: '100%' }}>
      <Flex justify="space-between" align="center">
        <p>{bike.type}</p>
        <p>{bike.color}</p>
        <p>{bike.wheelSize}</p>
        <p>{bike.price}</p>
        <p>{bike.description}</p>
        <Button onClick={onEdit}>Edit</Button>
        <Button danger onClick={onDelete}>
          Delete
        </Button>
      </Flex>
    </Card>
  )
}

export default CardBike
