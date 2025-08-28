import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'flowbite'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.css'
import App from './App.jsx'
import CounterContextProvider from './Component/context/counterContext.jsx'
import TokenContextProvider from './Component/context/tokenContext.jsx'

createRoot(document.getElementById('root')).render(
  <TokenContextProvider>
    <CounterContextProvider>
      <StrictMode>
        <App />
      </StrictMode>,
    </CounterContextProvider>
  </TokenContextProvider>
)
