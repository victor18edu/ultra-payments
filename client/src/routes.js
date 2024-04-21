import React from "react";
import { BrowserRouter as Router, Routes as AppRoutes, Route, Link } from "react-router-dom";

import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DepositPage from './components/pages/DepositPage';
import TransferPage from './components/pages/TransferPage';
import SignupPage from "./components/pages/SignupPage";

const Routes = () => {
   return(
        <div>
            <Router>
                <AppRoutes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/deposit" element={<DepositPage />} />
                    <Route path="/transfer" element={<TransferPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </AppRoutes>
            </Router>
        </div>
   )
}

export default Routes;
