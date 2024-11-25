import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={`295605828886-c51pdiiq4aa8b1nh4fqka29e18uuu093.apps.googleusercontent.com`}> {/* clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`} */}
        <App />
        <Toaster />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>

);
