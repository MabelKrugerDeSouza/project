import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Zap, Battery, Lightbulb, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <h1 className="display-4 fw-bold mb-4">Eficiência Energética para um Futuro Sustentável</h1>
              <p className="lead mb-4">
                Descubra como reduzir seu consumo de energia, economizar dinheiro e proteger o meio ambiente com nossas soluções inteligentes.
              </p>
              <div className="d-flex gap-3">
                <Zap size={48} />
                <Battery size={48} />
                <Lightbulb size={48} />
              </div>
            </Col>
            <Col md={6}>
              <img
                src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80"
                alt="Energia Sustentável"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Benefícios Section */}
      <div className="benefits-section py-5">
        <Container>
          <h2 className="text-center display-4 fw-bold mb-5">
            Por que Eficiência Energética?
          </h2>
          <Row className="g-4">
            <Col lg={6}>
              <Card className="h-100">
                <Card.Body className="p-4">
                  <div className="benefit-header mb-4">
                    <h3 className="mb-3">Benefícios Ambientais</h3>
                    <div className="benefit-divider"></div>
                  </div>
                  <div className="benefit-content">
                    <div className="benefit-item">
                      <div className="benefit-icon">🌱</div>
                      <div className="benefit-text">
                        <h5>Redução de CO₂</h5>
                        <p>Diminua em até 60% suas emissões de carbono</p>
                      </div>
                    </div>
                    <div className="benefit-item">
                      <div className="benefit-icon">💧</div>
                      <div className="benefit-text">
                        <h5>Recursos Naturais</h5>
                        <p>Conservação de água e outros recursos vitais</p>
                      </div>
                    </div>
                    <div className="benefit-item">
                      <div className="benefit-icon">🌍</div>
                      <div className="benefit-text">
                        <h5>Sustentabilidade</h5>
                        <p>Contribua para um futuro mais sustentável</p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="h-100">
                <Card.Body className="p-4">
                  <div className="benefit-header mb-4">
                    <h3 className="mb-3">Benefícios Econômicos</h3>
                    <div className="benefit-divider"></div>
                  </div>
                  <div className="benefit-content">
                    <div className="benefit-item">
                      <div className="benefit-icon">💰</div>
                      <div className="benefit-text">
                        <h5>Economia Mensal</h5>
                        <p>Reduza até 40% na conta de energia</p>
                      </div>
                    </div>
                    <div className="benefit-item">
                      <div className="benefit-icon">🏠</div>
                      <div className="benefit-text">
                        <h5>Valorização Imobiliária</h5>
                        <p>Aumente o valor do seu imóvel em até 15%</p>
                      </div>
                    </div>
                    <div className="benefit-item">
                      <div className="benefit-icon">📈</div>
                      <div className="benefit-text">
                        <h5>Retorno Garantido</h5>
                        <p>Recupere seu investimento em 24 meses</p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-5">
        <h2 className="text-center mb-5">Nossos Recursos</h2>
        <Row className="g-4">
          <Col md={4}>
            <Link to="/tips" className="text-decoration-none">
              <Card className="h-100 shadow-sm hover-card">
                <Card.Body className="text-center">
                  <Lightbulb size={48} className="text-primary mb-3" />
                  <Card.Title>Dicas Práticas</Card.Title>
                  <Card.Text>
                    Aprenda maneiras simples e eficazes de reduzir seu consumo de energia no dia a dia.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={4}>
            <Link to="/calculator" className="text-decoration-none">
              <Card className="h-100 shadow-sm hover-card">
                <Card.Body className="text-center">
                  <Battery size={48} className="text-primary mb-3" />
                  <Card.Title>Calculadora de Energia</Card.Title>
                  <Card.Text>
                    Calcule seu consumo de energia e descubra onde você pode economizar.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={4}>
            <Link to="/game" className="text-decoration-none">
              <Card className="h-100 shadow-sm hover-card">
                <Card.Body className="text-center">
                  <Zap size={48} className="text-primary mb-3" />
                  <Card.Title>Jogo Educativo</Card.Title>
                  <Card.Text>
                    Aprenda sobre eficiência energética de forma divertida com nosso jogo interativo.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>

      {/* Contact Section */}
      <div className="bg-light py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2 className="display-4 mb-4">Fale Conosco</h2>
              <p className="lead text-muted mb-5">
                Tem dúvidas sobre eficiência energética? Nossa equipe está pronta para ajudar!
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center g-4">
            <Col md={5}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="text-center p-4">
                  <div className="contact-icon-wrapper mb-3">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <h3 className="h5 mb-3">Atendimento</h3>
                  <p className="text-muted mb-2">Segunda a Sexta: 9h às 18h</p>
                  <p className="h5 mb-0">(11) 4567-8900</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={5}>
              <Link to="/contact" className="text-decoration-none">
                <Card className="border-0 shadow-sm h-100 contact-card">
                  <Card.Body className="text-center p-4">
                    <div className="contact-icon-wrapper mb-3">
                      <MessageSquare className="text-primary" size={24} />
                    </div>
                    <h3 className="h5 mb-3">Envie uma Mensagem</h3>
                    <p className="text-muted mb-3">Responderemos em até 24h úteis</p>
                    <Button variant="primary" className="d-inline-flex align-items-center gap-2">
                      Entrar em Contato <ArrowRight size={18} />
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Developer Section */}
      <Container >
    <h1 className="profile-title">Desenvolvedor</h1>
    <Row className="align-items-center">
      <Col md={4} className="text-center">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D03AQG8t-M5Of-zOQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1708524644360?e=1738195200&v=beta&t=W0m0LNBGAid_iz828zNkOa5Y5sx8_Lz2QKVck6wJOv0"
          alt="Desenvolvedor"
          className="profile-image"
        />
      </Col>
      <Col md={8}>
        <div className="profile-details">
          <h2 className="profile-name">Mabel Krüger de Souza</h2>
          <p className="profile-rm">RM: 556422</p>
          <p className="profile-info">Engenharia de Software</p>
          <p className="profile-info">1ESOA</p>
          <div className="profile-buttons">
            <a
              href="https://github.com/MabelKrugerDeSouza"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark profile-button"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/mabel-kruger-de-souza-546773111/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary profile-button"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Col>
    </Row>
</Container>
    </div>
  );
}

export default Home;