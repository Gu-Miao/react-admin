import { createRoot } from 'react-dom/client'
import App from '@/App'
import '@/index.less'

const rootElement = document.getElementById('root') as HTMLDivElement
const root = createRoot(rootElement)

root.render(<App />)
