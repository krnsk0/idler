import { Global } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { globalStyles } from './globalStyles';
import { StoreProvider } from './store/Provider';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const app = document.getElementById('root')!;
const root = createRoot(app);
root.render(
  <StoreProvider>
    <Global styles={globalStyles} />
    <App />
  </StoreProvider>,
);
