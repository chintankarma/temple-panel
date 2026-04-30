import { createRoot } from 'react-dom/client'
import './index.css'

import { AuthProvider } from './context/auth_context'
import App from './App'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
  // </StrictMode>,
)
