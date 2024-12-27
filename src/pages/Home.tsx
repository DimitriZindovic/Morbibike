import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Tabs } from 'antd'
import InputButon from '../components/InputButon'
import { Bike } from '../models/Bike'
import BikeList from '../components/BikeList'
import CardBike from '../components/CardBike'
import DeleteModal from '../components/DeleteModal'
import { useBikeContext } from '../context/BikeContext'
import Container from '../components/Container'
import RentCalendar from '../components/RentCalendar'

const { TabPane } = Tabs

const Home = () => {
  const { bikes, setBikes } = useBikeContext()
  const [editingBike, setEditingBike] = useState<Bike | null>(null)
  const [bikeToDelete, setBikeToDelete] = useState<Bike | null>(null)
  const [drawerVisible, setDrawerVisible] = useState(false)
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
      return false
    }

    // Create a new bike
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

  const viewBikeDetails = (bikeId: number) => {
    navigate(`/bike/${bikeId}`)
  }

  // Display the list of bikes and a calendar of rents
  return (
    <Container>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Liste des vélos" key="1" style={{ marginTop: 16 }}>
              <InputButon
                onButtonClick={editingBike ? updateBikeOnList : addBikeOnList}
                initialValues={editingBike}
                drawerVisible={drawerVisible}
                setDrawerVisible={setDrawerVisible}
              />
              <BikeList
                bikes={bikes}
                renderItem={(bike) => (
                  <CardBike
                    bike={bike}
                    key={bike.id}
                    onEdit={() => {
                      setEditingBike(bike)
                      setDrawerVisible(true)
                    }}
                    onDelete={() => setBikeToDelete(bike)}
                    onViewDetails={() => viewBikeDetails(bike.id)}
                  />
                )}
              />
            </TabPane>
            <TabPane tab="Calendrier des locations" key="2">
              <RentCalendar bikes={bikes} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
      {bikeToDelete && (
        <DeleteModal
          visible={true}
          onConfirm={confirmDeleteBike}
          onCancel={() => setBikeToDelete(null)}
        />
      )}
    </Container>
  )
}

export default Home
