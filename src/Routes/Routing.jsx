import { createBrowserRouter } from 'react-router-dom';
import BoardWrite from '../pages/BoardWrite';
import NoticeBoard from '../pages/NoticeBoard';
import NoticeBoardDetail from '../pages/NoticeBoardDetail';
import App from '../App';
import Home from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/write',
        element: <BoardWrite />,
      },
      {
        path: '/noticeBoard',
        element: <NoticeBoard />,
      },
      {
        path: '/noticeBoard/detail/:id',
        element: <NoticeBoardDetail />,
      },
    ],
  },
]);

export default router;
