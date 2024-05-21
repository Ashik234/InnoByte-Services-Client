import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Store, persistor } from "./Redux/store.js";
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
  <PersistGate loading={null} persistor={persistor}>
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <App />
    </QueryClientProvider>
  </PersistGate>
</Provider>
)
