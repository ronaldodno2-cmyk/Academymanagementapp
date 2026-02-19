import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';

function App() {
  return (
    <div className="dark">
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors theme="dark" />
    </div>
  );
}

export default App;
