
import './index.css'
import App from './App.jsx'
import router from './Router/router.jsx'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './AuthContext.jsx'
// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Or whatever your CSS filename is


import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
