import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import LoginPage from './pages/LoginPage'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import VideojuegosPage from './pages/VideojuegosPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={ <LoginPage /> } />
        <Route path='/main' element={ <VideojuegosPage /> } />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
