import { RouterProvider } from 'react-router-dom'
import router from './lib/routes'
import { createRoot } from 'react-dom/client'
import React from 'react'
import { ModalProvider } from './context/ModalContext'


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  </React.StrictMode>,
)
