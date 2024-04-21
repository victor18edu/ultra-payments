import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './components/contexts/Auth/AuthContext';

function App() {
    return (
          <Routes />
    );
  }

export default App;
