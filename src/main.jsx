import './styles/global.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routing';
import ReactDOM from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <NextUIProvider>
    <RouterProvider router={router}></RouterProvider>
    </NextUIProvider>
  </>
);
