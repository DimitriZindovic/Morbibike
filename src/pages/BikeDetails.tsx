import { useParams } from 'react-router-dom'
import { useBikeContext } from '../context/BikeContext'
import Container from '../components/Container'
import BikeDescription from '../components/BikeDescription'

const BikeDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { bikes, setBikes } = useBikeContext()
  const bike = bikes.find((bike) => bike.id === Number(id))

  if (!bike) {
    return <p>Vélo non trouvé</p>
  }

  return (
    <Container>
      <BikeDescription bike={bike} />
    </Container>
  )
}

export default BikeDetails
