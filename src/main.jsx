import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { LiveActivityProvider } from './context/LiveActivityContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <LiveActivityProvider>
        <App />
      </LiveActivityProvider>
    </AuthProvider>
  </StrictMode>,
)
