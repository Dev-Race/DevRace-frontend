import { createBrowserRouter } from 'react-router-dom';
import TestPage from '../pages/TestPage';

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
]);

export default Router;
