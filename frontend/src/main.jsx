import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './assets/css/index.css'
import Home from './pages/Home.jsx'
import Connexion from './pages/Connexion.jsx'
import Inscription from './pages/Inscription.jsx'
import PageNotFound from './pages/PageNotFound.jsx'

const router = createBrowserRouter (
  createRoutesFromElements (
      <>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Connexion />} />
        <Route path="/register" element={<Inscription />} />
        <Route path="*" element={<PageNotFound/>} />
        
      </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
