import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './views/App';
import './index.css';

import { ThemeProvider } from './context/ThemeContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
try {
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
} catch (err) {

  console.error("Mount error:", err);
  rootElement.innerHTML = `<div style="color: white; padding: 20px; font-family: monospace;">[ MOUNT ERROR: ${err} ]</div>`;
}