import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { login } from '../services/Auth/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/Auth/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await login({ email, password });
      const token = response;
      setLogin(token);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Container className="w-50 bg-dark p-5 rounded text-white" style={{ maxWidth: '500px' }}>
        <h1 className="mb-4">Login</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Senha:</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>

        <p className="mt-3">Novo aqui? <Link to="/signup">cadastre-se</Link></p> {/* Use o Link para criar um link para a página de cadastro */}
      </Container>
    </div>
  );
}

export default LoginPage;
