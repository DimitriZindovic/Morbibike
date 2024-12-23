import { useState } from 'react'
import InputButon from '../components/InputButon'
import { Bike } from '../models/Bike'
import BikeList from '../components/BikeList'
import CardBike from '../components/CardBike'
import DeleteModal from '../components/DeleteModal'

const Home = () => {
  const [allBikes, setAllBikes] = useState<Bike[]>([])
  const [editingBike, setEditingBike] = useState<Bike | null>(null)
  const [bikeToDelete, setBikeToDelete] = useState<Bike | null>(null)

  // This function make the form submit and add a bike to the list of bikes
  const addBikeOnList = (
    id: number | undefined,
    model: string,
    type: string,
    color: string,
    wheelSize: number,
    price: number,
    description: string
  ): boolean => {
    // Check if the fields are empty
    if (model == '') {
      alert('Le modèle ne doit pas être vide')
      return false
    }

    if (type == '') {
      alert('Le type ne doit pas être vide')
      return false
    }

    if (color == '') {
      alert('La couleur ne doit pas être vide')
      return false
    }

    if (wheelSize == 0) {
      alert('La taille de la roue ne doit pas être vide')
      return false
    }

    if (price == 0) {
      alert('Le prix ne doit pas être vide')
      return false
    }

    if (description == '') {
      alert('La description ne doit pas être vide')
      return false
    }

    // Create a new bike
    const newBike: Bike = {
      id: allBikes.length + 1,
      model,
      type,
      color,
      wheelSize,
      price,
      description,
      rents: [],
    }

    // Add the new bike to the list of bikes
    setAllBikes([...allBikes, newBike])
    return true
  }

  // This function delete a bike from the list of bikes
  const updateBikeOnList = (
    id: number,
    model: string,
    type: string,
    color: string,
    wheelSize: number,
    price: number,
    description: string
  ): boolean => {
    // Check if the fields are empty
    const updatedBikes = allBikes.map((bike) =>
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
    // Update the list of bikes
    setAllBikes(updatedBikes)
    setEditingBike(null)
    return true
  }

  // This function delete a bike from the list of bikes
  const confirmDeleteBike = () => {
    if (bikeToDelete) {
      const updatedBikes = allBikes.filter(
        (bike) => bike.id !== bikeToDelete.id
      )
      setAllBikes(updatedBikes)
      setBikeToDelete(null)
    }
  }

  return (
    <>
      <BikeList
        bikes={allBikes}
        renderItem={(bike) => (
          <CardBike
            bike={bike}
            key={bike.id}
            onEdit={() => setEditingBike(bike)}
            onDelete={() => setBikeToDelete(bike)}
          />
        )}
      />
      <InputButon
        onButtonClick={editingBike ? updateBikeOnList : addBikeOnList}
        initialValues={editingBike}
      />
      {bikeToDelete && (
        <DeleteModal
          visible={true}
          onConfirm={confirmDeleteBike}
          onCancel={() => setBikeToDelete(null)}
        />
      )}
    </>
  )
}

export default Home
