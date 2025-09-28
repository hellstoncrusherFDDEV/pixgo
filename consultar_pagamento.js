/**
 * Exemplo de Consulta de Cobrança em JavaScript Puro com a API Pix Go
 *
 * Este script demonstra como consultar o status de uma cobrança PIX via API Pix Go
 * utilizando apenas 'fetch', sem dependências externas.
 *
 * Pode ser executado em Node.js (versão 18+) ou diretamente no navegador.
 *
 * Documentação oficial: https://pixgo.api.br/como_funciona
 *
 * IMPORTANTE:
 * - Substitua 'SUA_API_KEY_PIXGO' pela sua chave real de API.
 * - Substitua 'PEDIDO_101' pela referência real retornada no /gerar-pix.
 * - Este código retorna os dados da API em JSON para fácil integração.
 * - Este código Javascript puro é inseguro porque expõe a 'SUA_API_KEY_PIXGO'.
 * - Portanto, ele está presente neste diretório a título explicativo.
 * - A forma correta de uso de JS é com uma função que chama o arquivo consulta_pagamento.php (ou a versão em Python) e faz um fetch.
**/

// Chave da API (substituir pela sua real)
const API_KEY = "SUA_API_KEY_PIXGO";

// Referência da cobrança (retornada no /gerar-pix)
const EXTERNAL_REFERENCE = "PEDIDO_101";

// Endpoint da API responsável por consultar a cobrança PIX
const ENDPOINT = `https://pixgo.api.br/consultar-pix?reference=${encodeURIComponent(EXTERNAL_REFERENCE)}`;

// Função principal
async function consultarPix() {
  try {
    // Envia requisição GET usando fetch
    const response = await fetch(ENDPOINT, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    // Verifica se houve erro HTTP (status 4xx ou 5xx)
    if (!response.ok) {
      const errorData = await response.text();
      console.error(
        JSON.stringify(
          {
            success: false,
            error: "Erro na resposta da API",
            status: response.status,
            details: errorData,
          },
          null,
          4
        )
      );
      return;
    }

    // Converte a resposta para JSON
    const data = await response.json();

    // Exibe a resposta formatada
    console.log(JSON.stringify(data, null, 4));

  } catch (error) {
    // Erros de rede, DNS ou problemas de conexão
    console.error(
      JSON.stringify(
        {
          success: false,
          error: "Erro de conexão com a API",
          details: error.message,
        },
        null,
        4
      )
    );
  }
}

// Executa a função
consultarPix();

/**
 * FORMA CERTA DE USAR O JS
**/

// O navegador chama seu servidor, sem saber da chave
async function consultarPixNoServidor() {
  const response = await fetch("/consulta_pagamento.php?reference=PEDIDO_101", { method: "GET" });
  const data = await response.json();
  // Exibe a resposta formatada
  console.log(JSON.stringify(data, null, 4));
}
