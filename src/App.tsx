import { StrictMode } from 'react'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import router from './router/index'

function App() {
  return (
    <StrictMode>
      <ConfigProvider componentSize="middle">
        <RouterProvider router={router} />
      </ConfigProvider>
    </StrictMode>
  )
}

export default App
