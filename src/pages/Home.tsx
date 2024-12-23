import { useState } from 'react'
import InputButon from '../components/InputButon'
import { Bike } from '../models/Bike'
import BikeList from '../components/BikeList'
import CardBike from '../components/CardBike'

const Home = () => {
  const [allBikes, setAllBikes] = useState<Bike[]>([])

  // This function make the form submit and add a bike to the list of bikes
  const addBikeOnList = (
    model: string,
    type: string,
    color: string,
    wheelSize: string,
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

    if (wheelSize == '') {
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
      model: model,
      type: type,
      color: color,
      wheelSize: Number(wheelSize),
      price: price,
      description: description,
      rents: [],
    }

    // Add the new bike to the list of bikes
    setAllBikes([...allBikes, newBike])

    return true
  }

  return (
    <>
      <BikeList
        bikes={allBikes}
        renderItem={(bike) => <CardBike bike={bike} key={bike.id} />}
      />
      <InputButon onButtonClick={addBikeOnList} />
    </>
  )
}

export default Home
