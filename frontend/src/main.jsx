import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/Usercontext.jsx'
import { Songprovider } from './context/Songcontext.jsx'

createRoot(document.getElementById('root')).render(
    <UserProvider>
      <Songprovider>
        <App />
      </Songprovider>
    </UserProvider>
)
