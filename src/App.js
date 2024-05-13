import Router from './router/Router';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
