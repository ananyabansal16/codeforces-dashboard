// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import '@shopify/polaris/build/esm/styles.css';
// import { AppProvider } from '@shopify/polaris';

// ReactDOM.render(
//   <AppProvider>
//     <App />
//   </AppProvider>,
//   document.getElementById('root')
// )

// // const root = ReactDOM.createRoot(document.getElementById('root'));
// const rootElement = document.getElementById("root");

// const root = ReactDOM.createRoot(rootElement);
// root.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";  // Import global styles
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
