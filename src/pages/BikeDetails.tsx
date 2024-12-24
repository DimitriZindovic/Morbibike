import { useParams } from 'react-router-dom'
import { useBikeContext } from '../context/BikeContext'
import BikeDescription from '../components/BikeDescription'
import Contianer from '../components/Container'

const BikeDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { bikes } = useBikeContext()
  const bike = bikes.find((bike) => bike.id === Number(id))

  if (!bike) {
    return <p>Vélo non trouvé</p>
  }

  return (
    <Contianer>
      <BikeDescription bike={bike} />
    </Contianer>
  )
}

export default BikeDetails
