import { createBrowserRouter } from 'react-router-dom';
import TestPage from '../pages/TestPage';
import LoginPage from '../pages/LoginPage';
import InfoPage from '../pages/InfoPage';

/**
 *
 * TODO
 * 각 페이지에 해당하는 라우터를
 * 작성해주시길 바랍니다.
 *
 */

const Router = createBrowserRouter([
  {
    path: '/test',
    element: <TestPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/info',
    element: <InfoPage />,
  },
]);

export default Router;
