import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './Layout/MainLayout'
import Quiz from './pages/Quiz';
import Result from './pages/Result';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='/quiz/:id' element={<Quiz />} />
        <Route path='/results/' element={<Result />} />
      </Route>
    )
  )
  return <RouterProvider router={router} />
}

export default App;
