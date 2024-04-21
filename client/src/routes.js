    import React from "react";
    import { BrowserRouter as Router, Routes as AppRoutes, Route, Navigate } from "react-router-dom";

    import HomePage from './components/pages/HomePage';
    import LoginPage from './components/pages/LoginPage';
    import DepositPage from './components/pages/DepositPage';
    import TransferPage from './components/pages/TransferPage';
    import SignupPage from "./components/pages/SignupPage";
    import { AuthProvider } from "./components/contexts/Auth/AuthContext";
    import PrivateRoute from "./components/services/Auth/PrivateRoute";

      const Routes = () => {
        return (
            <AuthProvider>
                <Router>
                    <AppRoutes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/" element={<PrivateRoute path="/" element={<HomePage />}></PrivateRoute>} />
                        <Route path="/deposit" element={<PrivateRoute element={<DepositPage />} />} />
                        <Route path="/transfer" element={<PrivateRoute element={<TransferPage />} />} />

                    </AppRoutes>
                </Router>
          </AuthProvider>
        );
      };
    export default Routes;
