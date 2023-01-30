import { Global } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import { globalStyles } from './globalStyles';
import { StoreProvider } from './store/Provider';
import Modal from 'react-modal';
import LogRocket from 'logrocket';
import NewApp from './components/NewApp';
LogRocket.init('z0jb7c/idler-demo');

Modal.setAppElement('#root');

const app = document.getElementById('root')!;
const root = createRoot(app);
root.render(
  <StoreProvider>
    <Global styles={globalStyles} />
    <NewApp />
  </StoreProvider>,
);
