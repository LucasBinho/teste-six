import React from 'react';
import { createRoot } from 'react-dom/client'; 
import { BrowserRouter as Router } from 'react-router-dom'; 
import AppRoutes from './routes/AppRoutes'; // Suas rotas
import './index.css'; // Seu arquivo de estilos


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AppRoutes />
    </Router>
  </React.StrictMode>
);