import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  Route,
  Routes,
  RouterProvider,
  Link,
} from "react-router-dom";
import Homepage from './pages/Homepage';
import MovieDetails from './pages/MovieDetails';
import { QueryClient, QueryClientProvider } from 'react-query';

// Router oluştur
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/details/:id",
    element: <MovieDetails />,
  },
]);
const queryClient = new QueryClient();
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <RouterProvider router={router}>
          <nav>
            <ul>
              <li>
                <Link style={{ background: "black", color: "white" }} to="/">Ana Sayfa</Link>
              </li>
              <li>
                <Link to="/details">Hakkında</Link>
              </li>
            </ul>
          </nav>
        </RouterProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
