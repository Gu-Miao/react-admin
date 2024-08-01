import { createBrowserRouter } from 'react-router-dom'
import Lazy from './Lazy'

const router = createBrowserRouter([
  { path: '/', element: <Lazy path="Home" /> },
  { path: '*', element: <Lazy path="Error" /> }
])

export default router
