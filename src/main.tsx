import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/typography.css';

import { router } from './router';

// Reveal animations only run when JS is active; content stays visible otherwise.
document.documentElement.classList.add('js-reveal');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
