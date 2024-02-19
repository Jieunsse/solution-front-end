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
import RecruitingBoardDetail from '../pages/RecruitingBoardDetail';
import MyPage from '../components/MyPage/MyPage.jsx';
import Decks from '../components/Decks/Decks.jsx';

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
        path: '/recruit/detail/:id',
        element: <RecruitingBoardDetail />,
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
      {
        path: '/MyPage',
        element: <MyPage></MyPage>,
      },
      {
        path: 'Cards',
        element: <Decks></Decks>,
      }
    ],
  },
]);

export default router;
