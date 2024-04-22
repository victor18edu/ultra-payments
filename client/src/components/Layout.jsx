import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import '../css/Menu.css';


const Layout = ({ children }) => {
    return (
    <div style={{ height: '100vh' }}>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home" className="ms-5">Payment Links</Navbar.Brand>
      </Navbar>

      <Container fluid style={{ height: '100%' }}>
        <Row style={{ height: '100%' }}>
          <Col xs={2} className="bg-dark">
            <Nav className="flex-column mt-3">
              <Nav.Link href="/" className="text-white border-bottom border-secondary py-3 ve-item-menu">Home</Nav.Link>
              <Nav.Link href="/deposit" className="text-white border-bottom border-secondary py-3 ve-item-menu">Depósitos</Nav.Link>
              <Nav.Link href="/transfer" className="text-white border-bottom border-secondary py-3 ve-item-menu">Transferências</Nav.Link>
            </Nav>
          </Col>

          <Col xs={10} style={{ height: '100%' }} className="p-5">
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Layout;
