// LoginPage.js

import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { login } from '../services/authApi';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Estado para armazenar mensagens de erro

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Limpe o estado de erro antes de fazer o login

    try {
      // Faça login usando as credenciais fornecidas
      await login(email, password);
      // Se o login for bem-sucedido, redirecione o usuário para a próxima página
      // Você pode adicionar isso aqui dependendo do seu fluxo de navegação
    } catch (error) {
      // Se ocorrer um erro, atualize o estado de erro com a mensagem de erro
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
