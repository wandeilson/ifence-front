import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/js/bootstrap.bundle";
import "react-bootstrap/dist/react-bootstrap.min";
import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/dist/minty/bootstrap.css";
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
        <div id="childfence-feedback">
            <a href="https://forms.gle/wouaUNJDvkvJeGeu7" target="_blank">
                ?
            </a>
        </div>
    </React.StrictMode>
);
