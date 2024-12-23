import { Header } from 'antd/es/layout/layout'
import { useNavigate } from 'react-router-dom'
import RightHeader from './RightHeader'

const MainHeader = () => {
  const navigate = useNavigate()

  return (
    <Header style={{ paddingLeft: 20, paddingRight: 20, background: '#fff' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          margin: 0,
          height: '100%',
          alignItems: 'center',
        }}
      >
        <img
          alt="Supplément Bacon"
          src="/assets/logo.png"
          style={{
            float: 'left',
            height: 46,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        />

        <RightHeader />
      </div>
    </Header>
  )
}

export default MainHeader
