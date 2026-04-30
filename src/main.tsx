import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app'

import { AuthProvider } from './context/auth_context'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
  // </StrictMode>,
)
