import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { AssessmentProvider } from './store/AssessmentContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AssessmentProvider>
      <App />
    </AssessmentProvider>
  </StrictMode>,
)
