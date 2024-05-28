import { createRoot } from 'react-dom/client'
import { reportWebVitals } from '@/utils/reportWebVitals'
import App from '@/App'
import '@/index.less'

const rootElement = document.getElementById('root') as HTMLDivElement
const root = createRoot(rootElement)

root.render(<App />)

reportWebVitals(console.log)
