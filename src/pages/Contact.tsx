import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    department: 'support'
  });
  const [submitted, setSubmitted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setShowAlert(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowAlert(false);
    }, 3000);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      department: 'support'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contactInfo = [
    {
      icon: <Phone className="text-primary" size={24} />,
      title: "Central de Atendimento",
      info: [
        { label: "Suporte Técnico", value: "(11) 4567-8900" },
        { label: "WhatsApp", value: "(11) 98765-4321" }
      ]
    },
    {
      icon: <Clock className="text-primary" size={24} />,
      title: "Horário de Atendimento",
      info: [
        { label: "Segunda a Sexta", value: "9h às 18h" },
        { label: "Sábado", value: "9h às 13h" }
      ]
    }
  ];

  const departments = [
    { value: 'support', label: 'Suporte Técnico' },
    { value: 'commercial', label: 'Comercial' },
    { value: 'partnership', label: 'Parcerias' },
    { value: 'feedback', label: 'Feedback' }
  ];

  return (
    <Container className="py-5">
      {/* Hero Section */}
      <Row className="justify-content-center mb-5">
        <Col lg={8} className="text-center">
          <h1 className="display-4 mb-3">Entre em Contato</h1>
          <p className="lead text-muted">
            Estamos aqui para ajudar! Nossa equipe está pronta para responder suas dúvidas 
            sobre eficiência energética e sustentabilidade.
          </p>
        </Col>
      </Row>

      {/* Contact Cards */}
      <Row className="g-4 mb-5 justify-content-center">
        {contactInfo.map((item, index) => (
          <Col md={6} key={index}>
            <Card className="h-100 border-0 shadow-sm contact-card">
              <Card.Body className="text-center p-4">
                <div className="contact-icon-wrapper mb-3">
                  <div className="contact-icon">
                    {item.icon}
                  </div>
                </div>
                <h3 className="h5 mb-4">{item.title}</h3>
                {item.info.map((detail, idx) => (
                  <div key={idx} className="mb-2">
                    <small className="text-muted d-block">{detail.label}</small>
                    <p className="mb-0 fw-semibold">{detail.value}</p>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Contact Form Section */}
      <Row className="justify-content-center mb-5">
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4 p-lg-5">
              <div className="d-flex align-items-center mb-4">
                <MessageSquare className="text-primary me-3" size={28} />
                <div>
                  <h2 className="h3 mb-1">Envie sua Mensagem</h2>
                  <p className="text-muted mb-0">Responderemos em até 24 horas úteis</p>
                </div>
              </div>

              {showAlert && (
                <Alert 
                  variant="success" 
                  className="mb-4 d-flex align-items-center"
                  onClose={() => setShowAlert(false)} 
                  dismissible
                >
                  <CheckCircle2 size={20} className="me-2" />
                  Mensagem enviada com sucesso! Entraremos em contato em breve.
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row className="g-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Nome Completo</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Seu nome completo"
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="seu@email.com"
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Departamento</Form.Label>
                      <Form.Select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="form-control-lg"
                      >
                        {departments.map(dept => (
                          <option key={dept.value} value={dept.value}>
                            {dept.label}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Assunto</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Assunto da mensagem"
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Mensagem</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Digite sua mensagem aqui..."
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <div className="d-grid">
                      <Button 
                        variant="primary" 
                        type="submit" 
                        size="lg"
                        className="py-3 d-flex align-items-center justify-content-center gap-2"
                        disabled={submitted}
                      >
                        {submitted ? (
                          <>
                            <CheckCircle2 size={20} />
                            Mensagem Enviada!
                          </>
                        ) : (
                          <>
                            <Send size={20} />
                            Enviar Mensagem
                          </>
                        )}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Location Section */}
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="border-0 shadow-sm overflow-hidden">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-4">
                <MapPin className="text-primary me-3" size={28} />
                <div>
                  <h2 className="h3 mb-1">Nossa Localização</h2>
                  <p className="text-muted mb-0">Venha nos visitar!</p>
                </div>
              </div>
              <div className="ratio ratio-21x9 mb-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975774949527!2d-46.6522702!3d-23.5505199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0x63b9f435c2c93a7f!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1709913439297!5m2!1spt-BR!2sbr"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="row g-4">
                <div className="col-md-6">
                  <h3 className="h5 mb-3">Endereço</h3>
                  <p className="text-muted mb-0">
                    Av. Paulista, 1000 - Bela Vista<br />
                    São Paulo - SP, 01310-100
                  </p>
                </div>
                <div className="col-md-6">
                  <h3 className="h5 mb-3">Como Chegar</h3>
                  <p className="text-muted mb-0">
                    Metrô: Estação Paulista (Linha Verde)<br />
                    Ônibus: Diversas linhas na Av. Paulista
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;