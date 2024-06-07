import { createBrowserRouter } from 'react-router-dom';
import TestPage from '../pages/TestPage';

import LoginPage from '../pages/LoginPage';

import InfoPage from '../pages/InfoPage';

import MainPage from '../pages/MainPage';
import CreateRoomPage from '../pages/CreateRoomPage';

import ProfilePage from '../pages/ProfilePage';
import MyCodePage from '../pages/MyCodePage';
import WaitPage from '../pages/WaitPage';
import SolvePage from '../pages/SolvePage';
import RedirectPage from '../pages/RedirectPage';
import MyPage from '../pages/MyPage';
import EditPage from '../pages/EditPage';

/**
 *
 * TODO
 * 각 페이지에 해당하는 라우터를
 * 작성해주시길 바랍니다.
 *
 */

const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/info',
    element: <InfoPage />,
  },
  {
    path: '/create',
    element: <CreateRoomPage />,
  },
  {
    path: '/mycode',
    element: <MyCodePage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/wait/:roomId',
    element: <WaitPage />,
  },
  {
    path: '/solve/:roomId',
    element: <SolvePage />,
  },
  {
    path: '/redirect/:link',
    element: <RedirectPage />,
  },
  {
    path: '/mypage',
    element: <MyPage />,
  },
  {
    path: '/edit',
    element: <EditPage />
  }
]);

export default Router;
