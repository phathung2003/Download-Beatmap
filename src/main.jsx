import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './Resources/CSS/index.css'
import './Resources/CSS/default.css'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div style={{backgroundColor: "#242424", color: "white"}}>
      <App />
    </div>
  </React.StrictMode>,
)
