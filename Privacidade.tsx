import React from "react";

export default function Privacidade() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>
      
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-green-500">1. Coleta de Dados</h2>
        <p className="text-gray-300 mb-4">
          Coletamos informações quando você se registra em nosso site, faz login, utiliza nossa ferramenta de scanner emocional 
          ou preenche formulários. Esses dados podem incluir seu nome, endereço de e-mail, dados faciais (durante o uso do scanner), 
          e informações sobre seu estado emocional.
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-green-500">2. Uso de Dados</h2>
        <p className="text-gray-300 mb-4">
          Utilizamos as informações que coletamos para:
        </p>
        <ul className="list-disc pl-6 text-gray-300 mb-4">
          <li>Fornecer, operar e manter nossos serviços</li>
          <li>Melhorar e personalizar a experiência do usuário</li>
          <li>Desenvolver novos produtos, serviços e recursos</li>
          <li>Comunicar com você sobre atualizações, ofertas e promoções</li>
          <li>Gerar análises e insights sobre o comportamento emocional</li>
        </ul>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-green-500">3. Proteção de Dados</h2>
        <p className="text-gray-300 mb-4">
          Implementamos medidas de segurança para proteger suas informações pessoais. Seus dados são armazenados em servidores 
          seguros e protegidos por firewalls. No entanto, nenhum método de transmissão pela Internet ou armazenamento eletrônico 
          é 100% seguro, e não podemos garantir segurança absoluta.
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-green-500">4. Dados Biométricos</h2>
        <p className="text-gray-300 mb-4">
          Nossa ferramenta de scanner emocional processa dados faciais temporariamente para análise emocional. Esses dados 
          são tratados localmente quando possível e não são armazenados permanentemente, a menos que você opte explicitamente 
          por salvar os resultados em sua conta.
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-green-500">5. Seus Direitos</h2>
        <p className="text-gray-300 mb-4">
          Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Também pode solicitar uma cópia 
          dos dados que temos sobre você. Para exercer esses direitos, entre em contato conosco através do e-mail 
          privacy@alibisdigital.com.
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-green-500">6. Alterações na Política</h2>
        <p className="text-gray-300 mb-4">
          Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos sobre quaisquer alterações 
          materiais publicando a nova política em nosso site. Recomendamos revisar esta política periodicamente.
        </p>
      </div>
    </div>
  );
}