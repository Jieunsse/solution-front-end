import { createBrowserRouter } from 'react-router-dom';

const Routing = createBrowserRouter([
  {
    children: [
      {
        path: '/',
        element: <App />,
      },
    ],
  },
]);
