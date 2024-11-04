import './index.css';
import App from './App.tsx';
import store from './Redux/store.ts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position='top-right' />
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
