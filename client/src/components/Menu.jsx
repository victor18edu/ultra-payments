import { Navbar, Nav, Container } from 'react-bootstrap';

function Menu() {
  return (
    <div>
        <Navbar bg="dark" variant="dark">
        <Container>
            {/* Título à esquerda */}
            <Navbar.Brand href="#home">Payment Links</Navbar.Brand>

            {/* Itens de menu à direita */}
            <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/deposit">Deposito</Nav.Link>
            <Nav.Link href="/transfer">Transferencia</Nav.Link>
            </Nav>
        </Container>
        </Navbar>
    </div>
  );
}

export default Menu;
