import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputButon from '../components/InputButon'
import { Bike } from '../models/Bike'
import BikeList from '../components/BikeList'
import CardBike from '../components/CardBike'
import DeleteModal from '../components/DeleteModal'
import { useBikeContext } from '../context/BikeContext'
import Contianer from '../components/Container'
import { Flex } from 'antd'

const Home = () => {
  const { bikes, setBikes } = useBikeContext()
  const [editingBike, setEditingBike] = useState<Bike | null>(null)
  const [bikeToDelete, setBikeToDelete] = useState<Bike | null>(null)
  const navigate = useNavigate()

  // Function to add a bike to the list
  const addBikeOnList = (
    id: number | undefined,
    model: string,
    type: string,
    color: string,
    wheelSize: number,
    price: number,
    description: string
  ): boolean => {
    if (
      model == '' ||
      type == '' ||
      color == '' ||
      wheelSize == 0 ||
      price == 0 ||
      description == ''
    ) {
      alert('Tous les champs doivent être remplis')
      return false
    }

    const newBike: Bike = {
      id: bikes.length + 1,
      model,
      type,
      color,
      wheelSize,
      price,
      description,
      rents: [],
    }

    setBikes([...bikes, newBike])
    return true
  }

  // Function to update a bike on the list
  const updateBikeOnList = (
    id: number,
    model: string,
    type: string,
    color: string,
    wheelSize: number,
    price: number,
    description: string
  ): boolean => {
    const updatedBikes = bikes.map((bike) =>
      bike.id === id
        ? {
            ...bike,
            model,
            type,
            color,
            wheelSize,
            price,
            description,
          }
        : bike
    )
    setBikes(updatedBikes)
    setEditingBike(null)
    return true
  }

  // Function to confirm the deletion of a bike
  const confirmDeleteBike = () => {
    if (bikeToDelete) {
      const updatedBikes = bikes.filter((bike) => bike.id !== bikeToDelete.id)
      setBikes(updatedBikes)
      setBikeToDelete(null)
    }
  }

  // Function to view the details of a bike
  const viewBikeDetails = (bikeId: number) => {
    navigate(`/bike/${bikeId}`)
  }

  return (
    // Display a form to add or edit a bike, a list of bikes, and a modal to confirm the deletion of a bike
    <Contianer>
      <Flex style={{ gap: '24px' }}>
        <InputButon
          onButtonClick={editingBike ? updateBikeOnList : addBikeOnList}
          initialValues={editingBike}
        />
        <BikeList
          bikes={bikes}
          renderItem={(bike) => (
            <CardBike
              bike={bike}
              key={bike.id}
              onEdit={() => setEditingBike(bike)}
              onDelete={() => setBikeToDelete(bike)}
              onViewDetails={() => viewBikeDetails(bike.id)}
            />
          )}
        />
        {bikeToDelete && (
          <DeleteModal
            visible={true}
            onConfirm={confirmDeleteBike}
            onCancel={() => setBikeToDelete(null)}
          />
        )}
      </Flex>
    </Contianer>
  )
}

export default Home
