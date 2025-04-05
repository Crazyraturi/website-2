import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from "react-router-dom";

// Add preload style to prevent initial white flash
const style = document.createElement('style');
style.textContent = `
  body {
    background-color: #000;
  }
  #root {
    opacity: 0;
    transition: opacity 0.5s ease-in;
  }
`;
document.head.appendChild(style);

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
// Remove the preload style after app is rendered
setTimeout(() => {
  const root = document.getElementById('root');
  if (root) {
    root.style.opacity = '1';
  }
  // Remove preload style after transition completes
  setTimeout(() => {
    document.head.removeChild(style);
  }, 600);
}, 100);

