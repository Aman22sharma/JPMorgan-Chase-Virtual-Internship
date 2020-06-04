import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

declare global {
  interface Window { perspective: any; }
}

/**
 * React App attaches the DOM to the DOM element #root in public/index.html
 */
ReactDOM.render(<App />, document.getElementById('root'));
