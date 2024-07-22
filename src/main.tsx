import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import '../app/globals.css'
import { config } from './lib/config.ts'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/home.tsx'
import Layout from './pages/layout/index.tsx'
import {Records} from './pages/records.tsx'
import { Create } from './pages/create.tsx'

const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/records",
        element: <Records />,
      },
      {
        path: "/records/create",
        element: <Create />,
      },
      {
        path: "/records/edit/:id",
        element: <Create />,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

     <WagmiProvider config={config}>

     <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
        </QueryClientProvider>
     </WagmiProvider>

  </React.StrictMode>,
)
