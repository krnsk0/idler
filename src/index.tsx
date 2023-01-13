import { Global } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { globalStyles } from './globalStyles';
import { StoreProvider } from './store/Provider';
import Modal from 'react-modal';
import LogRocket from 'logrocket';
LogRocket.init('z0jb7c/idler-demo');


Modal.setAppElement('#root');

const app = document.getElementById('root')!;
const root = createRoot(app);
root.render(
  <StoreProvider>
    <Global styles={globalStyles} />
    <App />
  </StoreProvider>,
);
