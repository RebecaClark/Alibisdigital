import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, MoveRight } from "lucide-react";
import { AnimateGently } from "@/components/accessibility/AnimateGently";

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 shadow-md bg-[#0D1B2A]">
        <div className="flex items-center">
          <div className="w-12 h-12 mr-2">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect x="15" y="15" width="70" height="70" stroke="white" strokeWidth="5" fill="none" rx="10" ry="10" />
              <line x1="30" y1="35" x2="55" y2="35" stroke="white" strokeWidth="5" />
              <line x1="30" y1="50" x2="55" y2="50" stroke="white" strokeWidth="5" />
              <line x1="30" y1="65" x2="45" y2="65" stroke="white" strokeWidth="5" />
              <path d="M60,55 L70,70 L85,45" stroke="#00c853" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-2xl font-bold">Álibis Digital</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/scanner" className="text-white font-semibold no-underline hover:text-[#00C853]">Scanner</Link>
          <a href="#alibi" className="text-white font-semibold no-underline hover:text-[#00C853]">Criar Álibi</a>
          <a href="#planos" className="text-white font-semibold no-underline hover:text-[#00C853]">Planos</a>
          <Link href="/funnel" className="text-white font-semibold no-underline hover:text-[#00C853]">Funnel</Link>
          <Link href="/dashboard" className="text-white font-semibold no-underline hover:text-[#00C853]">Dashboard</Link>
        </nav>
        <div className="md:hidden">
          <Link href="/dashboard">
            <Button className="bg-[#00C853] hover:bg-[#00a040] text-black px-4 py-2 rounded-md font-medium">
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="text-center py-20 px-4 bg-gradient-to-b from-[#0D1B2A] to-[#1B263B]"
        id="main-content" // For skip-to-content accessibility feature
        tabIndex={-1} // Makes the section focusable for skip-to-content
      >
        <AnimateGently
          animation="slideDown"
          className="text-4xl md:text-6xl font-bold mb-4"
          aria-level={1} // ARIA role for screen readers to identify as heading
        >
          Sua Desculpa Perfeita em Segundos
        </AnimateGently>
        <AnimateGently
          animation="fade"
          transition={{ delay: 0.5 }}
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Com inteligência artificial e apoio emocional, criamos álibis perfeitos e cuidamos de você.
        </AnimateGently>
        <Button 
          onClick={() => navigate("/scanner")} 
          className="bg-[#00C853] text-black hover:bg-green-600 transition-all text-lg px-6 py-3 rounded-2xl"
          aria-label="Iniciar Scanner Emocional" // ARIA label for better screen reader support
        >
          Iniciar Scanner Emocional
        </Button>
      </section>

      {/* Scanner Promo Section */}
      <section id="scanner" className="py-16 px-4 bg-[#1B263B]" aria-labelledby="scanner-heading">
        <div className="max-w-2xl mx-auto text-center">
          <AnimateGently 
            animation="scale" 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            className="text-3xl font-semibold mb-6"
            as="h2"
            id="scanner-heading"
          >
            Scanner Emocional IA
          </AnimateGently>
          <AnimateGently 
            animation="fade" 
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-300 mb-6"
          >
            Identifique sinais de ansiedade ou depressão com nosso assistente médico IA.
            Respondendo apenas 4 perguntas rápidas, nossa IA consegue analisar seu estado emocional e oferecer suporte personalizado.
          </AnimateGently>
          <Button 
            onClick={() => navigate("/scanner")} 
            className="bg-[#00C853] text-black hover:bg-green-600 transition-all"
            aria-label="Navegar para o Scanner Emocional"
          >
            Acessar Scanner Emocional
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="alibi" className="py-20 px-4 bg-[#0D1B2A] text-center" aria-labelledby="alibi-heading">
        <AnimateGently 
          animation="fade"
          as="h2"
          id="alibi-heading"
          className="text-4xl font-bold mb-10"
        >
          Por que usar o Álibis Digital?
        </AnimateGently>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <AnimateGently 
            animation="scale"
            whileHover={{ scale: 1.05 }}
            className="bg-[#1B263B] p-6 rounded-2xl shadow-xl"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <CheckCircle className="text-[#00C853] w-10 h-10 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold">Desculpas Personalizadas</h3>
            <p className="text-gray-300 mt-2">Criadas sob medida com linguagem realista e adaptadas à sua necessidade.</p>
          </AnimateGently>

          <AnimateGently 
            animation="scale" 
            whileHover={{ scale: 1.05 }} 
            className="bg-[#1B263B] p-6 rounded-2xl shadow-xl"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <CheckCircle className="text-[#00C853] w-10 h-10 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold">100% Anônimo</h3>
            <p className="text-gray-300 mt-2">Nunca revelamos quem você é. Total segurança e privacidade.</p>
          </AnimateGently>

          <AnimateGently 
            animation="scale" 
            whileHover={{ scale: 1.05 }} 
            className="bg-[#1B263B] p-6 rounded-2xl shadow-xl"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <CheckCircle className="text-[#00C853] w-10 h-10 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold">Apoio com IA Médica</h3>
            <p className="text-gray-300 mt-2">Nossa IA identifica sinais emocionais e sugere caminhos com base médica.</p>
          </AnimateGently>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planos" className="py-16 px-4 bg-[#1B263B]" aria-labelledby="planos-heading">
        <div className="max-w-5xl mx-auto">
          <AnimateGently
            animation="fade"
            as="h2"
            id="planos-heading"
            className="text-3xl font-bold text-center mb-10"
          >
            Planos & Benefícios
          </AnimateGently>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimateGently 
              animation="slideUp"
              whileHover={{ y: -10 }}
              className="bg-[#0D1B2A] p-6 rounded-xl shadow-lg border border-gray-700"
              transition={{ 
                duration: 0.3,
                delay: 0.1
              }}
            >
              <h3 className="text-xl font-bold mb-2">Grátis</h3>
              <p className="text-3xl font-bold mb-4">R$0</p>
              <ul className="text-gray-300 space-y-2 mb-6" aria-label="Benefícios do plano grátis">
                <li>• Álibis simples</li>
                <li>• Scanner básico</li>
                <li>• 1 álibi por dia</li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full border-[#00C853] text-[#00C853] hover:bg-[#00C853] hover:text-black"
                aria-label="Selecionar plano grátis"
              >
                Começar Grátis
              </Button>
            </AnimateGently>
            
            <AnimateGently 
              animation="slideUp"
              whileHover={{ y: -10 }}
              className="bg-[#0D1B2A] p-6 rounded-xl shadow-lg border border-[#00C853]"
              transition={{ 
                duration: 0.3,
                delay: 0.2
              }}
            >
              <div className="bg-[#00C853] text-black font-semibold py-1 px-3 rounded-full text-sm inline-block mb-2">Popular</div>
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <p className="text-3xl font-bold mb-4">R$29,90<span className="text-sm font-normal">/mês</span></p>
              <ul className="text-gray-300 space-y-2 mb-6" aria-label="Benefícios do plano premium">
                <li>• Prints e áudios</li>
                <li>• IA emocional completa</li>
                <li>• Álibis ilimitados</li>
              </ul>
              <Button 
                className="w-full bg-[#00C853] text-black hover:bg-green-600"
                aria-label="Assinar plano premium"
              >
                Assinar Agora
              </Button>
            </AnimateGently>
            
            <AnimateGently 
              animation="slideUp"
              whileHover={{ y: -10 }}
              className="bg-[#0D1B2A] p-6 rounded-xl shadow-lg border border-gray-700"
              transition={{ 
                duration: 0.3,
                delay: 0.3
              }}
            >
              <h3 className="text-xl font-bold mb-2">VIP</h3>
              <p className="text-3xl font-bold mb-4">R$99,90<span className="text-sm font-normal">/mês</span></p>
              <ul className="text-gray-300 space-y-2 mb-6" aria-label="Benefícios do plano VIP">
                <li>• Diagnóstico emocional</li>
                <li>• Histórico de desculpas</li>
                <li>• Suporte 24h</li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full border-[#00C853] text-[#00C853] hover:bg-[#00C853] hover:text-black"
                aria-label="Assinar plano VIP"
              >
                Virar VIP
              </Button>
            </AnimateGently>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 bg-[#0D1B2A] border-t border-gray-700">
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="/dashboard" className="text-gray-400 hover:text-white">Dashboard</Link>
          <Link href="/funnel" className="text-gray-400 hover:text-white">Funnel</Link>
          <Link href="/scanner" className="text-gray-400 hover:text-white">Scanner</Link>
        </div>
        <p className="text-gray-400">© 2025 Álibis Digital. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
