import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  position: positions.TOP_CENTER,
  timeout: 3000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};
ReactDOM.render(
  <React.StrictMode>
     <AlertProvider template={AlertTemplate} {...options}>
         <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

