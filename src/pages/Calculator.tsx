import { useState } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Zap, Tv, Lightbulb, Calculator as CalcIcon } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Appliance {
  name: string;
  icon: JSX.Element;
  hours: number;
  watts: number;
  quantity: number;
}

interface LightBulb {
  type: string;
  watts: number;
  lifespan: number;
  cost: number;
  co2: number;
}

function Calculator() {
  const [selectedCalculator, setSelectedCalculator] = useState<'energy' | 'lighting' | null>(null);
  const [appliances, setAppliances] = useState<Record<string, Appliance>>({
    geladeira: { name: 'Geladeira', icon: <Zap size={24} />, hours: 24, watts: 150, quantity: 1 },
    tv: { name: 'TV', icon: <Tv size={24} />, hours: 4, watts: 100, quantity: 1 },
  });
  const [selectedBulb, setSelectedBulb] = useState<string>('led');
  const [bulbQuantity, setBulbQuantity] = useState<number>(1);
  const [hoursPerDay, setHoursPerDay] = useState<number>(5);

  const lightBulbs: Record<string, LightBulb> = {
    led: {
      type: 'LED',
      watts: 9,
      lifespan: 25000,
      cost: 15,
      co2: 0.006
    },
    fluorescent: {
      type: 'Fluorescente',
      watts: 15,
      lifespan: 8000,
      cost: 8,
      co2: 0.011
    },
    incandescent: {
      type: 'Incandescente',
      watts: 60,
      lifespan: 1000,
      cost: 3,
      co2: 0.037
    }
  };

  const calculateDailyUsage = (appliance: Appliance) => {
    return (appliance.hours * appliance.watts * appliance.quantity) / 1000;
  };

  const calculateTotalDailyUsage = () => {
    return Object.values(appliances).reduce((total, appliance) => {
      return total + calculateDailyUsage(appliance);
    }, 0);
  };

  const calculateMonthlyCost = (dailyUsage: number) => {
    const avgCostPerKwh = 0.75; // Custo médio por kWh em reais
    return dailyUsage * 30 * avgCostPerKwh;
  };

  const calculateLightingCosts = () => {
    const bulb = lightBulbs[selectedBulb];
    const dailyKwh = (bulb.watts * hoursPerDay * bulbQuantity) / 1000;
    const monthlyKwh = dailyKwh * 30;
    const monthlyCost = monthlyKwh * 0.75; // Custo médio por kWh
    const yearlyReplacements = Math.ceil((hoursPerDay * 365) / bulb.lifespan);
    const yearlyCost = (monthlyCost * 12) + (bulb.cost * bulbQuantity * yearlyReplacements);
    const yearlyCO2 = bulb.co2 * monthlyKwh * 12;

    return {
      dailyKwh,
      monthlyKwh,
      monthlyCost,
      yearlyCost,
      yearlyCO2
    };
  };

  const handleInputChange = (
    applianceKey: string,
    field: keyof Appliance,
    value: number
  ) => {
    setAppliances({
      ...appliances,
      [applianceKey]: {
        ...appliances[applianceKey],
        [field]: value,
      },
    });
  };

  const chartData = {
    labels: Object.values(appliances).map((a) => a.name),
    datasets: [
      {
        label: 'Consumo Diário (kWh)',
        data: Object.values(appliances).map(calculateDailyUsage),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const dailyUsage = calculateTotalDailyUsage();
  const monthlyCost = calculateMonthlyCost(dailyUsage);
  const lightingCosts = calculateLightingCosts();

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4">Calculadoras de Eficiência</h2>
          <p className="text-center text-muted mb-5">
            Escolha uma calculadora para começar a economizar energia e dinheiro.
          </p>
        </Col>
      </Row>

      {/* Calculator Selection Cards */}
      <Row className="g-4 mb-5">
        <Col md={6}>
          <Card 
            className={`h-100 shadow-sm contact-card ${selectedCalculator === 'energy' ? 'border-primary' : ''}`}
            onClick={() => setSelectedCalculator('energy')}
            style={{ cursor: 'pointer' }}
          >
            <Card.Body className="text-center p-4">
              <div className="contact-icon-wrapper mb-3">
                <CalcIcon size={32} className="text-primary" />
              </div>
              <h3 className="h4 mb-3">Calculadora de Consumo</h3>
              <p className="text-muted">
                Calcule o consumo de energia dos seus eletrodomésticos e descubra onde você pode economizar.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card 
            className={`h-100 shadow-sm contact-card ${selectedCalculator === 'lighting' ? 'border-primary' : ''}`}
            onClick={() => setSelectedCalculator('lighting')}
            style={{ cursor: 'pointer' }}
          >
            <Card.Body className="text-center p-4">
              <div className="contact-icon-wrapper mb-3">
                <Lightbulb size={32} className="text-primary" />
              </div>
              <h3 className="h4 mb-3">Simulador de Iluminação</h3>
              <p className="text-muted">
                Compare diferentes tipos de lâmpadas e descubra o impacto ambiental e econômico de cada opção.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Energy Calculator */}
      {selectedCalculator === 'energy' && (
        <Row className="g-4">
          <Col lg={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <h4 className="mb-4">Seus Eletrodomésticos</h4>
                {Object.entries(appliances).map(([key, appliance]) => (
                  <div key={key} className="mb-4 p-3 border rounded bg-light">
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3">{appliance.icon}</div>
                      <h5 className="mb-0">{appliance.name}</h5>
                    </div>
                    <Row className="g-3">
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Horas por dia</Form.Label>
                          <Form.Control
                            type="number"
                            min="0"
                            max="24"
                            value={appliance.hours}
                            onChange={(e) =>
                              handleInputChange(key, 'hours', parseInt(e.target.value) || 0)
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Potência (Watts)</Form.Label>
                          <Form.Control
                            type="number"
                            min="0"
                            value={appliance.watts}
                            onChange={(e) =>
                              handleInputChange(key, 'watts', parseInt(e.target.value) || 0)
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>Quantidade</Form.Label>
                          <Form.Control
                            type="number"
                            min="1"
                            value={appliance.quantity}
                            onChange={(e) =>
                              handleInputChange(key, 'quantity', parseInt(e.target.value) || 1)
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h4 className="mb-4">Resumo do Consumo</h4>
                <div className="mb-4">
                  <h5 className="text-muted">Consumo Diário</h5>
                  <p className="display-6 mb-0">{dailyUsage.toFixed(2)} kWh</p>
                </div>
                <div className="mb-4">
                  <h5 className="text-muted">Consumo Mensal</h5>
                  <p className="display-6 mb-0">{(dailyUsage * 30).toFixed(2)} kWh</p>
                </div>
                <div>
                  <h5 className="text-muted">Custo Mensal Estimado</h5>
                  <p className="display-6 text-primary mb-0">R$ {monthlyCost.toFixed(2)}</p>
                </div>
              </Card.Body>
            </Card>

            <Card className="shadow-sm">
              <Card.Body>
                <h4 className="mb-4">Distribuição do Consumo</h4>
                <Line data={chartData} options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Lighting Calculator */}
      {selectedCalculator === 'lighting' && (
        <Row className="g-4">
          <Col lg={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <h4 className="mb-4">Simulação de Iluminação</h4>
                <Row className="g-4">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Tipo de Lâmpada</Form.Label>
                      <Form.Select
                        value={selectedBulb}
                        onChange={(e) => setSelectedBulb(e.target.value)}
                        className="form-control-lg"
                      >
                        {Object.entries(lightBulbs).map(([key, bulb]) => (
                          <option key={key} value={key}>
                            {bulb.type}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Quantidade de Lâmpadas</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        value={bulbQuantity}
                        onChange={(e) => setBulbQuantity(parseInt(e.target.value) || 1)}
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Horas de Uso por Dia</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        max="24"
                        value={hoursPerDay}
                        onChange={(e) => setHoursPerDay(parseInt(e.target.value) || 0)}
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="mt-4">
                  <h5 className="mb-3">Especificações da Lâmpada</h5>
                  <Row className="g-3">
                    <Col md={4}>
                      <Card className="bg-light">
                        <Card.Body>
                          <h6 className="text-muted mb-2">Potência</h6>
                          <p className="h4 mb-0">{lightBulbs[selectedBulb].watts}W</p>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card className="bg-light">
                        <Card.Body>
                          <h6 className="text-muted mb-2">Vida Útil</h6>
                          <p className="h4 mb-0">{lightBulbs[selectedBulb].lifespan.toLocaleString()} horas</p>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card className="bg-light">
                        <Card.Body>
                          <h6 className="text-muted mb-2">Custo Unitário</h6>
                          <p className="h4 mb-0">R$ {lightBulbs[selectedBulb].cost.toFixed(2)}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <h4 className="mb-4">Análise de Custos e Impacto</h4>
                <div className="mb-4">
                  <h5 className="text-muted">Consumo Mensal</h5>
                  <p className="display-6 mb-0">{lightingCosts.monthlyKwh.toFixed(2)} kWh</p>
                </div>
                <div className="mb-4">
                  <h5 className="text-muted">Custo Mensal</h5>
                  <p className="display-6 mb-0">R$ {lightingCosts.monthlyCost.toFixed(2)}</p>
                </div>
                <div className="mb-4">
                  <h5 className="text-muted">Custo Anual Total</h5>
                  <p className="display-6 text-primary mb-0">R$ {lightingCosts.yearlyCost.toFixed(2)}</p>
                  <small className="text-muted">Inclui substituição de lâmpadas</small>
                </div>
                <div>
                  <h5 className="text-muted">Emissão de CO₂ Anual</h5>
                  <p className="h4 text-danger mb-0">{lightingCosts.yearlyCO2.toFixed(2)} kg</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Calculator;