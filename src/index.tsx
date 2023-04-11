import { Global } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import { globalStyles, theme } from './globalStyles';
import { StoreProvider } from './store/Provider';
import Modal from 'react-modal';
import LogRocket from 'logrocket';
import App from './components/App';
import { ThemeProvider } from '@emotion/react';

if (
  import.meta.env.PROD &&
  window.location.origin === 'https://idler-demo.vercel.app'
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
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <App />
    </ThemeProvider>
  </StoreProvider>,
);
