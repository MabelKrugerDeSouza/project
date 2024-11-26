import { Container, Row, Col, Card } from 'react-bootstrap';
import { Lightbulb, Calculator, Brain, Zap, Home, Tv, Snowflake, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

function Tips() {
  const efficiencyTips = [
    {
      icon: <Home size={32} className="text-primary" />,
      title: "Dicas para Casa",
      tips: [
        "Mantenha as janelas fechadas quando o ar condicionado estiver ligado",
        "Use cortinas térmicas para reduzir o calor",
        "Faça manutenção regular dos eletrodomésticos",
        "Aproveite a luz natural durante o dia",
        "Pinte as paredes com cores claras para melhor reflexão da luz"
      ]
    },
    {
      icon: <Tv size={32} className="text-primary" />,
      title: "Eletrodomésticos",
      tips: [
        "Escolha aparelhos com selo A de eficiência energética",
        "Desligue aparelhos da tomada quando não estiver usando",
        "Use a função timer em aparelhos como TV e ar condicionado",
        "Evite deixar carregadores na tomada sem uso",
        "Utilize a máquina de lavar com carga completa"
      ]
    },
    {
      icon: <Snowflake size={32} className="text-primary" />,
      title: "Climatização",
      tips: [
        "Mantenha o filtro do ar condicionado sempre limpo",
        "Configure o ar condicionado para 23°C (temperatura ideal)",
        "Use ventiladores quando possível",
        "Faça manutenção preventiva dos aparelhos",
        "Evite deixar portas e janelas abertas com o ar ligado"
      ]
    },
    {
      icon: <Lightbulb size={32} className="text-primary" />,
      title: "Iluminação",
      tips: [
        "Substitua lâmpadas antigas por LED",
        "Instale sensores de presença em áreas comuns",
        "Aproveite a luz natural ao máximo",
        "Limpe regularmente as lâmpadas e luminárias",
        "Use cores claras nas paredes para melhor reflexão"
      ]
    },
    {
      icon: <Sun size={32} className="text-primary" />,
      title: "Energia Solar",
      tips: [
        "Considere instalar painéis solares",
        "Aproveite a energia solar para aquecimento de água",
        "Posicione os painéis na direção correta do sol",
        "Faça manutenção regular dos equipamentos",
        "Consulte profissionais qualificados para instalação"
      ]
    },
    {
      icon: <Zap size={32} className="text-primary" />,
      title: "Consumo Consciente",
      tips: [
        "Acompanhe seu consumo mensal de energia",
        "Evite usar vários aparelhos ao mesmo tempo",
        "Desligue luzes de ambientes vazios",
        "Planeje o uso de eletrodomésticos",
        "Eduque a família sobre economia de energia"
      ]
    }
  ];

  const knowledgeResources = [
    {
      icon: <Calculator size={32} className="text-primary" />,
      title: "Calculadora de Energia",
      description: "Calcule seu consumo e descubra onde economizar.",
      link: "/calculator"
    },
    {
      icon: <Brain size={32} className="text-primary" />,
      title: "Quiz de Energia",
      description: "Teste seus conhecimentos sobre eficiência energética.",
      link: "/game"
    }
  ];

  return (
    <Container className="py-5">
      <h2 className="text-center mb-5">Dicas de Eficiência Energética</h2>
      <Row className="g-4 mb-5">
        {efficiencyTips.map((category, index) => (
          <Col md={6} lg={4} key={index}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3">
                    {category.icon}
                  </div>
                  <h3 className="h4 mb-0">{category.title}</h3>
                </div>
                <ul className="list-unstyled mb-0">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="mb-2 d-flex align-items-start">
                      <span className="me-2">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="text-center mb-5">Ferramentas Interativas</h2>
      <Row className="g-4">
        {knowledgeResources.map((resource, index) => (
          <Col md={6} key={index}>
            <Link to={resource.link} className="text-decoration-none">
              <Card className="border-0 shadow-sm h-100 hover-card">
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    {resource.icon}
                  </div>
                  <h3 className="h4 mb-3">{resource.title}</h3>
                  <p className="text-muted mb-0">
                    {resource.description}
                  </p>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Tips;