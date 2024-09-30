import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ApolloProvider } from '@apollo/client'
import client from "./apolloClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ApolloProvider client={client}>
  <ToastContainer
          toastStyle={{
            backgroundColor: "#C4D7FF",
          }}
        />
    <App />
  </ApolloProvider>
  </StrictMode>,
)
