
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider  from './components/context/StoreContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
 
  <BrowserRouter>
  <StoreContextProvider>
    <App />
    </StoreContextProvider>
    </BrowserRouter>
    
  
)
