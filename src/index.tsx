import './index.css'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes/AppRoutes'
import { ConfigProvider, App } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Router basename="/">
    <App>
      <ConfigProvider
        theme={{
          token: { colorPrimary: '#6c7cff' },
        }}
      >
        <AppRoutes />
      </ConfigProvider>
    </App>
  </Router>
)
