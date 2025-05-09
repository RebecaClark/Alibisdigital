import { useState } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { AnimateGently } from "@/components/accessibility/AnimateGently";

export default function Scanner() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [estado, setEstado] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const perguntas = [
    {
      question: "Como você está se sentindo hoje?",
      options: ["Bem", "Cansado", "Ansioso", "Sem motivação"],
    },
    {
      question: "Tem sentido vontade de evitar compromissos?",
      options: ["Sim", "Às vezes", "Não"],
    },
    {
      question: "Como estão suas noites de sono?",
      options: ["Boas", "Irregulares", "Não consigo dormir"],
    },
    {
      question: "Tem sentido tristeza constante?",
      options: ["Sim", "Alguns dias", "Não"],
    },
  ];

  const analisar = () => {
    if (estado.includes("Sem motivação") || estado.includes("tristeza")) {
      setResult("Sinais detectados de possível quadro depressivo leve. Podemos oferecer um pré-diagnóstico gratuito ou direcioná-lo para atendimento profissional.");
    } else {
      setResult("Você parece estar bem emocionalmente. Se precisar de ajuda com desculpas personalizadas, estamos prontos!");
    }
  };

  return (
    <main className="min-h-screen bg-[#0D1B2A] text-white p-4 flex flex-col items-center justify-center space-y-6" id="main-content">
      <Link href="/" aria-label="Voltar para a página inicial">
        <div className="flex items-center mb-8 cursor-pointer">
          <div className="w-10 h-10 mr-2" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect x="15" y="15" width="70" height="70" stroke="white" strokeWidth="5" fill="none" rx="10" ry="10" />
              <line x1="30" y1="35" x2="55" y2="35" stroke="white" strokeWidth="5" />
              <line x1="30" y1="50" x2="55" y2="50" stroke="white" strokeWidth="5" />
              <line x1="30" y1="65" x2="45" y2="65" stroke="white" strokeWidth="5" />
              <path d="M60,55 L70,70 L85,45" stroke="#00C853" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-xl font-bold">Álibis Digital</span>
        </div>
      </Link>

      <AnimateGently
        animation="slideUp"
        className="text-center"
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2" id="page-title">Scanner Emocional</h1>
        <p className="text-lg text-gray-300 mb-6">Responda algumas perguntas e te ajudamos com um álibi perfeito ou orientação emocional.</p>
      </AnimateGently>

      {result ? (
        <AnimateGently
          animation="scale"
          transition={{ duration: 0.4 }}
        >
          <Card className="max-w-md w-full bg-[#1B263B] border-0 shadow-lg" role="region" aria-labelledby="resultado-titulo">
            <CardContent className="p-6">
              <h2 id="resultado-titulo" className="text-xl font-semibold mb-4">Resultado:</h2>
              <p className="text-gray-200 mb-6">{result}</p>
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  className="w-1/2 border-[#00C853] text-[#00C853] hover:bg-[#00C853] hover:text-black"
                  onClick={() => navigate("/")}
                  aria-label="Voltar para a página inicial"
                >
                  Voltar
                </Button>
                <Button 
                  className="w-1/2 bg-[#00C853] text-black hover:bg-green-600"
                  onClick={() => {
                    setStep(0);
                    setEstado("");
                    setResult(null);
                  }}
                  aria-label="Refazer o questionário do scanner emocional"
                >
                  Refazer
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimateGently>
      ) : (
        <AnimateGently
          animation="scale"
          transition={{ duration: 0.4 }}
        >
          <Card className="max-w-md w-full bg-[#1B263B] border-0 shadow-lg" role="form" aria-labelledby="question-text">
            <CardContent className="p-6 space-y-4">
              <p id="question-text" className="text-lg font-medium">{perguntas[step].question}</p>
              <div className="flex flex-col space-y-2" role="group" aria-label="Opções de resposta">
                {perguntas[step].options.map((opt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full bg-[#0D1B2A] hover:bg-[#152534] border-gray-700 hover:border-gray-600"
                    onClick={() => {
                      setEstado(prev => prev + ' ' + opt);
                      if (step < perguntas.length - 1) {
                        setStep(step + 1);
                      } else {
                        analisar();
                      }
                    }}
                    aria-label={`Selecionar ${opt}`}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimateGently>
      )}

      <nav className="text-sm text-gray-400 mt-4" aria-label="Navegação de rodapé">
        <Link href="/" className="hover:text-[#00C853] focus:outline-none focus:ring-2 focus:ring-[#00C853] px-2 py-1 rounded" aria-label="Voltar para a página inicial">Voltar para início</Link> | 
        <Link href="/dashboard" className="ml-2 hover:text-[#00C853] focus:outline-none focus:ring-2 focus:ring-[#00C853] px-2 py-1 rounded" aria-label="Ir para o Dashboard">Dashboard</Link>
      </nav>
    </main>
  );
}