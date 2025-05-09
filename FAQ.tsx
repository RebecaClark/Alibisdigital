import React, { useState } from "react";

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Como funciona o serviço de geração de álibis?",
      answer: "Nosso serviço utiliza inteligência artificial para criar álibis personalizados com base nas informações que você fornece. Você preenche um formulário com detalhes específicos da situação, e nosso sistema gera um álibi convincente em formato de texto, imagem ou áudio, dependendo do seu plano."
    },
    {
      question: "Os diagnósticos emocionais são precisos?",
      answer: "Nosso scanner emocional utiliza tecnologia avançada de reconhecimento facial para analisar suas expressões e detectar emoções. A precisão varia, mas geralmente oferece uma boa estimativa do seu estado emocional atual. É importante lembrar que o serviço não substitui avaliação médica profissional."
    },
    {
      question: "Posso cancelar minha assinatura a qualquer momento?",
      answer: "Sim, você pode cancelar sua assinatura Premium ou VIP a qualquer momento através da sua área de cliente. O serviço continuará disponível até o final do período já pago, e não haverá renovação automática após o cancelamento."
    },
    {
      question: "Como funciona o suporte 24h nos planos Premium e VIP?",
      answer: "Assinantes dos planos Premium e VIP têm acesso a suporte prioritário via chat e e-mail, com tempo de resposta garantido conforme o plano. O plano VIP inclui atendimento telefônico direto com especialistas em qualquer horário."
    },
    {
      question: "Os álibis gerados podem ser rastreados até mim?",
      answer: "Não. Nosso sistema é projetado para garantir privacidade total. Não armazenamos conexões entre seus dados pessoais e os álibis gerados após a entrega, e todos os nossos serviços utilizam criptografia de ponta a ponta."
    },
    {
      question: "É possível personalizar os álibis gerados?",
      answer: "Sim. Nos planos Premium e VIP, você pode personalizar detalhes como nomes, datas, tons de conversa e até mesmo solicitar correções após a geração inicial. O plano gratuito oferece opções limitadas de personalização."
    },
    {
      question: "Quanto tempo leva para receber meu álibi?",
      answer: "Álibis em formato texto são gerados quase instantaneamente. Prints de conversas falsas levam alguns minutos para serem criados. Áudios personalizados podem levar até 1 hora, dependendo da complexidade. Documentos médicos detalhados podem levar até 24 horas para serem produzidos (exclusivo do plano VIP)."
    },
    {
      question: "O scanner emocional funciona em qualquer dispositivo?",
      answer: "O scanner emocional funciona em qualquer dispositivo com câmera frontal e navegador moderno. Para melhor precisão, recomendamos usar em ambientes bem iluminados e com a câmera posicionada diretamente em frente ao seu rosto."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Perguntas Frequentes</h1>
      
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <p className="text-gray-300 mb-6">
          Encontre respostas para as dúvidas mais comuns sobre os serviços do Álibis Digital.
          Se você não encontrar a resposta que procura, entre em contato com nosso suporte.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
              <button
                className="w-full p-4 text-left flex justify-between items-center bg-gray-700 hover:bg-gray-600 transition-colors"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 text-green-500 transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div 
                className={`bg-gray-800 p-4 transition-all duration-300 ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
              >
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-green-500">Ainda tem dúvidas?</h2>
        <p className="text-gray-300 mb-4">
          Se você não encontrou a resposta para sua pergunta, entre em contato com nossa equipe de suporte:
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <a href="/contato" className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition-colors text-center">
            Fale Conosco
          </a>
          <a href="mailto:suporte@alibisdigital.com.br" className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-md transition-colors text-center">
            suporte@alibisdigital.com.br
          </a>
        </div>
      </div>
    </div>
  );
}