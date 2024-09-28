import './index.css'
import { store } from './store/';
import { StrictMode } from 'react'
import { Provider } from 'react-redux';
import router from './routes/routes.tsx';
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
// Khởi tạo QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
