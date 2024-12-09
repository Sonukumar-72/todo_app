import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Ensure the path to App.js is correct
import reportWebVitals from './reportWebVitals'; // Ensure the path is correct

// Ensure the 'root' element exists in your public/index.html
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Root element not found. Ensure there is a <div id='root'></div> in your public/index.html.");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // If you want to start measuring performance in your app
  reportWebVitals(console.log);
}
