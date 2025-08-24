import React from 'react';
import ReactDOM from 'react-dom/client';
// IMPORTANT: do NOT import any CSS here for this test.
// import './index.css';
import App from './App';

console.log('main.tsx loaded'); // should appear in browser console

const root = document.getElementById('root');
if (!root) {
  throw new Error('No #root div found in index.html');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
