import React from "react";

export default function TermosUso() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>
      
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-green-500">1. Aceitação dos Termos</h2>
        <p className="text-gray-300 mb-4">
          Ao acessar ou usar o site Álibis Digital, você concorda em cumprir e ficar vinculado a estes Termos de Uso. 
          Se você não concordar com qualquer parte destes termos, não poderá acessar ou usar nossos serviços.
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-green-500">2. Descrição dos Serviços</h2>
        <p className="text-gray-300 mb-4">
          Álibis Digital fornece serviços de geração de álibis, apoio emocional via IA e diagnósticos preliminares 
          baseados em expressões faciais. Nossos serviços são fornecidos "como estão" e podem ser modificados a qualquer momento.
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-green-500">3. Elegibilidade e Conta</h2>
        <p className="text-gray-300 mb-4">
          Para usar nossos serviços, você deve ter pelo menos 18 anos de idade. Ao criar uma conta, você concorda em fornecer 
          informações precisas e mantê-las atualizadas. Você é responsável por manter a confidencialidade de sua senha.
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-green-500">4. Limitação de Responsabilidade</h2>
        <p className="text-gray-300 mb-4">
          Os serviços de álibis e diagnósticos emocionais são fornecidos apenas para fins de entretenimento e apoio pessoal. 
          Não assumimos responsabilidade por decisões tomadas com base em nossos serviços. Em nenhuma circunstância seremos 
          responsáveis por danos diretos, indiretos ou consequentes.
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-green-500">5. Propriedade Intelectual</h2>
        <p className="text-gray-300 mb-4">
          Todo o conteúdo disponível em nosso site, incluindo textos, gráficos, logotipos, ícones, imagens, clipes de áudio 
          e software, é propriedade da Álibis Digital e está protegido por leis de direitos autorais.
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-green-500">6. Alterações nos Termos</h2>
        <p className="text-gray-300 mb-4">
          Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações entrarão em vigor imediatamente após 
          a publicação no site. O uso continuado dos serviços após tais modificações constitui sua aceitação dos novos termos.
        </p>
      </div>
    </div>
  );
}