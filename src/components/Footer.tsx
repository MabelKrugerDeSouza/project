import { Container } from 'react-bootstrap';
import { Zap } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="d-flex align-items-center mb-3 mb-md-0">
            <Zap className="me-2" />
            <span className="fs-5">EcoEnergia</span>
          </div>
          <div className="text-center text-md-end">
            <p className="mb-0">&copy; 2024 EcoEnergia. Todos os direitos reservados.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;