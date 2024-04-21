// SignupPage.js

import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { signup, login } from '../services/Auth/authApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/Auth/AuthContext';


function SignupPage() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    date_of_birth: '',
    cpf: '',
    address: '',
    zip_code: '',
    number: '',
    complement: '',
  });
  const [error, setError] = useState(null);
  const { setLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await signup(userData);

      const response = await login({ email: userData.email, password: userData.password });
      const token = response;
      setLogin(token);
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        console.log(error.response.data.errors);
        setError(error.response.data.errors);
      } else {
        setError('Ocorreu um erro ao processar o cadastro.');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Container className="w-75 bg-dark p-5 rounded text-white">
        <h1 className="mb-4">Cadastro</h1>
        <Form onSubmit={handleSignup}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label>Nome:</Form.Label>
                <Form.Control type="text" name="name" value={userData.name} onChange={handleChange} required />
                {error && error.name && <div className="text-danger">{error.name[0]}</div>}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" name="email" value={userData.email} onChange={handleChange} required />
                {error && error.email && <div className="text-danger">{error.email[0]}</div>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="password">
                <Form.Label>Senha:</Form.Label>
                <Form.Control type="password" name="password" value={userData.password} onChange={handleChange} required />
                {error && error.password && <div className="text-danger">{error.password[0]}</div>}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="date_of_birth">
                <Form.Label>Data de Nascimento:</Form.Label>
                <Form.Control type="date" name="date_of_birth" value={userData.date_of_birth} onChange={handleChange} required />
                {error && error.date_of_birth && <div className="text-danger">{error.date_of_birth[0]}</div>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="cpf">
                <Form.Label>CPF:</Form.Label>
                <Form.Control type="text" name="cpf" value={userData.cpf} onChange={handleChange} required />
                {error && error.cpf && <div className="text-danger">{error.cpf[0]}</div>}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="zip_code">
                <Form.Label>CEP:</Form.Label>
                <Form.Control type="text" name="zip_code" value={userData.zip_code} onChange={handleChange} required />
                {error && error.zip_code && <div className="text-danger">{error.zip_code[0]}</div>}
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Endereço:</Form.Label>
            <Form.Control type="text" name="address" value={userData.address} onChange={handleChange} required />
            {error && error.address && <div className="text-danger">{error.address[0]}</div>}
          </Form.Group>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="number">
                <Form.Label>Número:</Form.Label>
                <Form.Control type="text" name="number" value={userData.number} onChange={handleChange} />
                {error && error.number && <div className="text-danger">{error.number[0]}</div>}
              </Form.Group>
            </Col>
            <Col md={8}>
              <Form.Group controlId="complement">
                <Form.Label>Complemento:</Form.Label>
                <Form.Control type="text" name="complement" value={userData.complement} onChange={handleChange} />
                {error && error.complement && <div className="text-danger">{error.complement[0]}</div>}
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default SignupPage;
