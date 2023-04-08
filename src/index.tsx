import { Global } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import { globalStyles } from './globalStyles';
import { StoreProvider } from './store/Provider';
import Modal from 'react-modal';
import LogRocket from 'logrocket';
import App from './components/App';

if (
  import.meta.env.PROD &&
  // disable logrocket when in a browser requesting chinese
  navigator.language.indexOf('zh') !== 0
) {
  LogRocket.init('z0jb7c/idler-demo-2', {
    release: APP_VERSION,
  });
}

Modal.setAppElement('#root');

const app = document.getElementById('root')!;
const root = createRoot(app);
root.render(
  <StoreProvider>
    <Global styles={globalStyles} />
    <App />
  </StoreProvider>,
);
