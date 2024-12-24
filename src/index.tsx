import './index.css'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes/AppRoutes'
import { ConfigProvider, App } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'
import { BikeProvider } from './context/BikeContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Router basename="/">
    <App>
      <BikeProvider>
        <ConfigProvider
          theme={{
            token: { colorPrimary: '#7ecdc3' },
          }}
        >
          <AppRoutes />
        </ConfigProvider>
      </BikeProvider>
    </App>
  </Router>
)
