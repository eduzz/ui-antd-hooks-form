import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import ThemeProvider from '@eduzz/ui-antd-theme/ThemeProvider';

import App from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider brandColor='orbita'>
      <App />
    </ThemeProvider>
  </StrictMode>
);
