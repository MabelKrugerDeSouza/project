import { Zap } from 'lucide-react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Zap className="d-inline-block align-top me-2" />
          EcoEnergia
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Início</Nav.Link>
            <Nav.Link as={Link} to="/game">Jogo</Nav.Link>
            <Nav.Link as={Link} to="/tips">Dicas</Nav.Link>
            <Nav.Link as={Link} to="/calculator">Calculadora</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contato</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;