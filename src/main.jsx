import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { getConfig } from './config';
import { applyTheme, loadFonts, readAppearance, resolveMode } from './lib/theme';

/**
 * Paint the theme before React mounts so the very first frame is already in the
 * right palette and colour scheme — no flash of the fallback teal.
 */
const bootConfig = getConfig();
const mode = resolveMode(readAppearance(bootConfig.brand?.appearance || 'system'));
applyTheme({ ...bootConfig.brand, id: bootConfig.__tenantId }, mode);
loadFonts(bootConfig.brand);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Offline shell — parents often check clinic hours on a weak signal.
if (bootConfig.integrations?.pwa && 'serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      /* registration is a progressive enhancement; failure is non-fatal */
    });
  });
}
