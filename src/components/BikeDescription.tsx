import { Descriptions } from 'antd'
import { Bike } from '../models/Bike'

interface BikeDescriptionProps {
  bike: Bike
}

const BikeDescription = ({ bike }: BikeDescriptionProps) => {
  // Return a description of the bike
  return (
    <Descriptions title="Détails du Vélo" bordered>
      <Descriptions.Item label="Modèle">{bike.model}</Descriptions.Item>
      <Descriptions.Item label="Type">{bike.type}</Descriptions.Item>
      <Descriptions.Item label="Couleur">{bike.color}</Descriptions.Item>
      <Descriptions.Item label="Taille de la roue">
        {bike.wheelSize}
      </Descriptions.Item>
      <Descriptions.Item label="Prix">{bike.price}</Descriptions.Item>
      <Descriptions.Item label="Description">
        {bike.description}
      </Descriptions.Item>
    </Descriptions>
  )
}

export default BikeDescription
