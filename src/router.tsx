import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { Wholesale } from './pages/Wholesale';
import { NotFound } from './pages/NotFound';

// The offline build is opened from disk (file://), where only hash URLs (#/products) can be routed.
const createRouter = import.meta.env.MODE === 'offline' ? createHashRouter : createBrowserRouter;

export const router = createRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/products', element: <Catalog /> },
      { path: '/products/:slug', element: <ProductDetail /> },
      { path: '/wholesale', element: <Wholesale /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
