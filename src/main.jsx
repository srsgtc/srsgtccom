import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './styles/index.css';
import { SiteContentProvider } from './content/SiteContentProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <SiteContentProvider>
          <App />
        </SiteContentProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);