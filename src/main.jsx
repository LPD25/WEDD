import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './assets/css/index.css'
import Home from './pages/Home.jsx'

const router = createBrowserRouter (
  createRoutesFromElements (
      <>
        <Route path="/" element={<Home />} />
      </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
