import React from 'react';
import {
  QueryClient,
  QueryClientProvider
  
}  from "@tanstack/react-query"

import { ReactQueryDevtools} from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home-page';
import Login from './pages/login-page';
import Register from './pages/register-page';
import Dashborad from './pages/dashboard-page';
import NotFound from './pages/not-found';


function App() {

  const queryClient = new QueryClient(
    {
        defaultOptions: {
          queries: {
            staleTime: 1000,
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      }
    );
  
  const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
      path: '/dashboard',
      element: <Dashborad />,
  },
  {
    path: '/*',
    element: <NotFound />,
},
]);
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools/>
    </QueryClientProvider>
    
    </>
  );
}

export default App;