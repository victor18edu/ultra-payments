// SignupPage.js

import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap'; // Importe a classe Col para dividir as colunas
import { signup } from '../services/authApi';

function SignupPage() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    cpf: '',
    address: '',
    number: '',
    zipCode: '',
    complement: '',
  });
  const [error, setError] = useState(null);

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
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Container className="w-75 bg-dark p-5 rounded text-white"> {/* Aumente a largura do container */}
        <h1 className="mb-4">Cadastro</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSignup}>
          <Row className="mb-3"> {/* Adicione uma nova linha */}
            <Col>
              <Form.Group controlId="name">
                <Form.Label>Nome:</Form.Label>
                <Form.Control type="text" name="name" value={userData.name} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" name="email" value={userData.email} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3"> {/* Adicione uma nova linha */}
            <Col>
              <Form.Group controlId="password">
                <Form.Label>Senha:</Form.Label>
                <Form.Control type="password" name="password" value={userData.password} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="dateOfBirth">
                <Form.Label>Data de Nascimento:</Form.Label>
                <Form.Control type="date" name="dateOfBirth" value={userData.dateOfBirth} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3"> {/* Adicione uma nova linha */}
            <Col>
              <Form.Group controlId="cpf">
                <Form.Label>CPF:</Form.Label>
                <Form.Control type="text" name="cpf" value={userData.cpf} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="zipCode">
                <Form.Label>CEP:</Form.Label>
                <Form.Control type="text" name="zipCode" value={userData.zipCode} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3"> {/* Adicione uma nova linha */}
            <Col>
              <Form.Group controlId="address">
                <Form.Label>Endereço:</Form.Label>
                <Form.Control type="text" name="address" value={userData.address} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="number">
                <Form.Label>Número:</Form.Label>
                <Form.Control type="text" name="number" value={userData.number} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3"> {/* Adicione uma nova linha */}
            <Col>
              <Form.Group controlId="complement">
                <Form.Label>Complemento:</Form.Label>
                <Form.Control type="text" name="complement" value={userData.complement} onChange={handleChange} />
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
