import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { Trophy, Battery, Zap, Award, AlertCircle } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
  explanation: string;
}

function Game() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timer, setTimer] = useState(30);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      text: "Qual eletrodoméstico geralmente consome mais energia em uma casa?",
      options: ["Geladeira", "Televisão", "Notebook", "Lâmpada"],
      correct: 0,
      explanation: "A geladeira é um dos maiores consumidores de energia por funcionar 24 horas por dia."
    },
    {
      id: 2,
      text: "Qual é a temperatura ideal do ar condicionado para economia de energia?",
      options: ["16°C", "18°C", "23°C", "25°C"],
      correct: 2,
      explanation: "23°C é a temperatura ideal, oferecendo conforto e economia de energia."
    },
    {
      id: 3,
      text: "Qual tipo de lâmpada é mais eficiente energeticamente?",
      options: ["Incandescente", "Halógena", "Fluorescente", "LED"],
      correct: 3,
      explanation: "Lâmpadas LED são até 80% mais eficientes que as incandescentes."
    },
    {
      id: 4,
      text: "Qual destes hábitos mais contribui para o desperdício de energia?",
      options: [
        "Deixar aparelhos em standby",
        "Abrir a geladeira rapidamente",
        "Usar ventilador",
        "Usar timer no ar condicionado"
      ],
      correct: 0,
      explanation: "Aparelhos em standby podem representar até 12% do consumo de energia."
    },
    {
      id: 5,
      text: "Qual a melhor hora para usar eletrodomésticos que consomem muita energia?",
      options: [
        "Durante o pico (18h-21h)",
        "Pela manhã (8h-10h)",
        "Durante a madrugada",
        "No início da tarde"
      ],
      correct: 1,
      explanation: "O período da manhã tem menor demanda e tarifas mais baixas em algumas regiões."
    }
  ];

  useEffect(() => {
    let interval: number;
    if (gameStarted && !gameCompleted && timer > 0 && !showExplanation) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      handleGameOver();
    }
    return () => clearInterval(interval);
  }, [gameStarted, timer, gameCompleted, showExplanation]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setCurrentQuestion(0);
    setGameCompleted(false);
    setTimer(30);
    setShowExplanation(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (selectedOption: number) => {
    setSelectedAnswer(selectedOption);
    if (selectedOption === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setSelectedAnswer(null);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTimer(30);
    } else {
      handleGameOver();
    }
  };

  const handleGameOver = () => {
    setGameCompleted(true);
    setGameStarted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return {
      icon: <Trophy size={48} className="text-warning mb-3" />,
      title: "Especialista em Energia!",
      message: "Parabéns! Você é um verdadeiro expert em eficiência energética!"
    };
    if (percentage >= 80) return {
      icon: <Award size={48} className="text-primary mb-3" />,
      title: "Ótimo Desempenho!",
      message: "Você tem um excelente conhecimento sobre eficiência energética!"
    };
    if (percentage >= 60) return {
      icon: <Battery size={48} className="text-success mb-3" />,
      title: "Bom Trabalho!",
      message: "Você está no caminho certo para se tornar um expert!"
    };
    return {
      icon: <AlertCircle size={48} className="text-danger mb-3" />,
      title: "Continue Aprendendo!",
      message: "Há sempre espaço para melhorar seus conhecimentos!"
    };
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow border-0">
            <Card.Body className="p-4">
              {!gameStarted && !gameCompleted && (
                <div className="text-center py-5">
                  <Zap size={64} className="text-primary mb-4" />
                  <h2 className="mb-4">Quiz de Eficiência Energética</h2>
                  <p className="lead mb-4">
                    Teste seus conhecimentos sobre economia de energia e aprenda mais sobre práticas sustentáveis!
                  </p>
                  <Button 
                    variant="primary" 
                    size="lg" 
                    onClick={startGame}
                    className="px-5 py-3 rounded-pill"
                  >
                    Iniciar Quiz
                  </Button>
                </div>
              )}

              {gameStarted && !gameCompleted && (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0">Questão {currentQuestion + 1}/{questions.length}</h5>
                    <div className="d-flex align-items-center">
                      <Battery className="me-2" />
                      <span className="fs-5">{timer}s</span>
                    </div>
                  </div>
                  <ProgressBar 
                    now={(currentQuestion / questions.length) * 100} 
                    className="mb-4"
                    variant="success"
                  />
                  <Card className="border-0 bg-light mb-4">
                    <Card.Body>
                      <h3 className="mb-0">{questions[currentQuestion].text}</h3>
                    </Card.Body>
                  </Card>
                  <Row className="g-3 mb-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <Col md={6} key={index}>
                        <Button
                          variant={
                            showExplanation
                              ? index === questions[currentQuestion].correct
                                ? "success"
                                : selectedAnswer === index
                                ? "danger"
                                : "outline-secondary"
                              : "outline-primary"
                          }
                          className="w-100 py-3 position-relative"
                          onClick={() => !showExplanation && handleAnswer(index)}
                          disabled={showExplanation}
                        >
                          {option}
                        </Button>
                      </Col>
                    ))}
                  </Row>
                  {showExplanation && (
                    <div className="mb-4">
                      <Card className="border-0 bg-light">
                        <Card.Body>
                          <h5 className="mb-2">Explicação:</h5>
                          <p className="mb-0">{questions[currentQuestion].explanation}</p>
                        </Card.Body>
                      </Card>
                      <div className="text-center mt-4">
                        <Button 
                          variant="primary" 
                          size="lg" 
                          onClick={nextQuestion}
                          className="px-5 rounded-pill"
                        >
                          {currentQuestion + 1 < questions.length ? "Próxima Questão" : "Finalizar Quiz"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {gameCompleted && (
                <div className="text-center py-5">
                  {getScoreMessage().icon}
                  <h2 className="mb-3">{getScoreMessage().title}</h2>
                  <p className="lead mb-4">Sua Pontuação: {score}/{questions.length}</p>
                  <p className="mb-4">{getScoreMessage().message}</p>
                  <Button 
                    variant="primary" 
                    size="lg" 
                    onClick={startGame}
                    className="px-5 rounded-pill"
                  >
                    Jogar Novamente
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Game;