import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AllSections from './pages/AllSections.jsx'
import Borrow from './pages/Borrow.jsx'
import Borrowed from './pages/Borrowed.jsx'
import Admin from './pages/Admin.jsx'


const queryClient = new QueryClient()
const sidebarRouter=createBrowserRouter(
  [
    {
      path:'/',
      element:<App/>,
      children:[
        {
          path:'/AllSections',
          element:<AllSections/>
        },
        {
          path:'/Borrow',
          element:<Borrow />
        },
        {
          path:'/Borrowed',
          element:<Borrowed/>
        },
        {
          path:'/Admin',
          element:<Admin/>
        }
      ]
    }
  ]
)
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>
      <RouterProvider router={sidebarRouter} future={{v7_startTransition:true}}/>
      <App />
    </QueryClientProvider>

  </StrictMode>,
)
