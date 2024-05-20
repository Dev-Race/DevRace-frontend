import Router from './router/Router';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createStore} from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={Router} />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
