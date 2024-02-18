import { createBrowserRouter } from 'react-router-dom';
import BoardWrite from '../pages/BoardWrite';
import NoticeBoard from '../pages/NoticeBoard';
import NoticeBoardDetail from '../pages/NoticeBoardDetail';
import App from '../App';
import Home from '../pages/Home';
import Login from '../components/Login/Login';
import Loading from '../components/Loading/Loading';
import SignUp from '../components/SignUp/SignUp';
import RecruitingBoard from '../pages/RecruitingBoard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/load',
        element: <Loading />,
      },
      {
        path: '/login/signup',
        element: <SignUp />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/write',
        element: <BoardWrite />,
      },
      {
        path: '/recruit',
        element: <RecruitingBoard />,
      },
      {
        path: '/noticeBoard',
        element: <NoticeBoard />,
      },
      {
        path: '/noticeBoard/detail/:id',
        element: <NoticeBoardDetail />,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
    ],
  },
]);

export default router;
