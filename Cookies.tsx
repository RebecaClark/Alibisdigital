import React from "react";

export default function Cookies() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Política de Cookies</h1>
      
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-green-500">1. O que são Cookies</h2>
        <p className="text-gray-300 mb-4">
          Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. 
          Eles são amplamente utilizados para fazer os sites funcionarem de maneira mais eficiente, bem como 
          para fornecer informações aos proprietários do site.
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-green-500">2. Como Utilizamos Cookies</h2>
        <p className="text-gray-300 mb-4">
          Utilizamos cookies para:
        </p>
        <ul className="list-disc pl-6 text-gray-300 mb-4">
          <li>Manter você conectado durante sua visita</li>
          <li>Lembrar suas preferências e configurações</li>
          <li>Melhorar a velocidade e segurança do site</li>
          <li>Coletar dados analíticos para melhorar nossos serviços</li>
          <li>Personalizar sua experiência no site</li>
        </ul>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-green-500">3. Tipos de Cookies que Utilizamos</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-white">Cookies Essenciais</h3>
          <p className="text-gray-300">
            Necessários para o funcionamento básico do site. Permitem navegar e utilizar recursos essenciais.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-white">Cookies de Desempenho</h3>
          <p className="text-gray-300">
            Coletam informações sobre como os visitantes usam nosso site, como quais páginas são mais visitadas.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Cookies de Funcionalidade</h3>
          <p className="text-gray-300">
            Permitem que o site lembre escolhas que você faz e forneça recursos mais pessoais.
          </p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-green-500">4. Gerenciamento de Cookies</h2>
        <p className="text-gray-300 mb-4">
          Você pode controlar e gerenciar cookies de várias maneiras. A maioria dos navegadores permite que você 
          veja quais cookies você tem e que os exclua ou bloqueie. No entanto, bloquear alguns tipos de cookies 
          pode afetar sua experiência no site.
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-green-500">5. Cookies de Terceiros</h2>
        <p className="text-gray-300 mb-4">
          Utilizamos serviços de terceiros, como Google Analytics, que podem utilizar cookies para coletar 
          informações sobre seu comportamento de navegação. Esses terceiros podem transferir as informações 
          para outros terceiros quando exigido por lei ou quando tais terceiros processam as informações em nome deles.
        </p>
      </div>
    </div>
  );
}