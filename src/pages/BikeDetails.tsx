import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useBikeContext } from '../context/BikeContext'
import Container from '../components/Container'
import BikeDescription from '../components/BikeDescription'
import RentList from '../components/RentList'
import RentDrawer from '../components/RentDrawer'
import { Button } from 'antd'
import { Rent } from '../models/Rent'

const BikeDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { bikes, setBikes } = useBikeContext()
  const bike = bikes.find((bike) => bike.id === Number(id))
  const [isModalVisible, setIsModalVisible] = useState(false)

  if (!bike) {
    return <p>Vélo non trouvé</p>
  }

  // Function to add a rent to a bike
  const addRent = (newRent: Rent) => {
    const updatedBikes = bikes.map((currentBike) => {
      if (currentBike.id === bike.id) {
        return { ...currentBike, rents: [...currentBike.rents, newRent] }
      } else {
        return currentBike
      }
    })
    setBikes(updatedBikes)
    setIsModalVisible(false)
  }

  // Filter loctions that are upcoming (after the current date)
  const upcomingRents = bike.rents.filter(
    (rent) => new Date(rent.rentStart) > new Date()
  )

  // Filter loctions that are past (before the current date
  const pastRents = bike.rents.filter(
    (rent) => new Date(rent.rentStart) <= new Date()
  )

  return (
    // Display the bike's details, a button to create a rent, and lists of upcoming and past rents
    <Container>
      <BikeDescription bike={bike} />
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Créer une location
      </Button>
      <RentList title="Prochaines locations" rents={upcomingRents} />
      <RentList title="Locations passées" rents={pastRents} />
      <RentDrawer
        visible={isModalVisible}
        onCreate={addRent}
        onCancel={() => setIsModalVisible(false)}
        bike={bike}
      />
    </Container>
  )
}

export default BikeDetails
