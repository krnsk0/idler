import { createRoot } from 'react-dom/client';
import App from './components/App';
import { StoreProvider } from './store/Provider';

const app = document.getElementById('app')!;
const root = createRoot(app);
root.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
);
