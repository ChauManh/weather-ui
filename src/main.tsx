import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AlertProvider } from './contexts/AlertContext.tsx';
import { LoadingProvider } from './contexts/LoadingContext.tsx';
import GlobalOverlay from './components/GlobalOverlay.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingProvider>
      <AlertProvider>
        <GlobalOverlay />
        <App />
      </AlertProvider>
    </LoadingProvider>
  </StrictMode>
);
