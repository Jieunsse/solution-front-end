import './styles/global.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routing';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router}></RouterProvider>
  </>,
);
