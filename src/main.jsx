import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './css/input.css'
import './css/hamburgers.css'
import 'animate.css'
import "@radix-ui/themes/styles.css";
import App from './App.jsx'
import { AuthProvider } from './auth/AuthContext.jsx'
import { Theme } from '@radix-ui/themes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Theme>
          <App />
        </Theme>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
