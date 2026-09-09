import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider } from './context/RouterContext';
import { ResumeProvider } from './context/ResumeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider>
      <ResumeProvider>
        <App />
      </ResumeProvider>
    </RouterProvider>
  </StrictMode>
);
