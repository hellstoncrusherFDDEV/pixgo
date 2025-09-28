/**
 * Exemplo de Integração em Node.js com a API Pix Go
 *
 * Este script demonstra como gerar um pagamento PIX via API Pix Go
 * utilizando a biblioteca 'axios' em Node.js. Ele pode ser usado como
 * modelo de integração em sistemas que precisam criar cobranças PIX
 * de forma simples e segura.
 *
 * Documentação oficial: https://pixgo.api.br/como_funciona
 *
 * IMPORTANTE:
 * - Substitua 'SUA_API_KEY_PIXGO' pela sua chave real de API.
 * - Este código retorna os dados da API em JSON para fácil integração.
 */

import axios from "axios";

// Chave da API (substituir pela sua real)
const API_KEY = "SUA_API_KEY_PIXGO";

// Endpoint da API responsável por gerar o PIX
const ENDPOINT = "https://pixgo.api.br/gerar-pix";

// Dados da cobrança (payload da requisição)
const payload = {
  valor: 50.0, // Valor da cobrança (em reais)
  descricao: "Compra de Ebook XYZ", // Descrição da cobrança
};

// Cabeçalhos da requisição (autenticação + tipo do conteúdo)
const headers = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

async function gerarPix() {
  try {
    // Envia a requisição POST para a API Pix Go
    const response = await axios.post(ENDPOINT, payload, { headers });

    // Exibe a resposta formatada em JSON
    console.log(JSON.stringify(response.data, null, 4));

  } catch (error) {
    // Tratamento de erros de rede, timeout ou resposta inválida
    if (error.response) {
      // Erro retornado pela API (status 4xx ou 5xx)
      console.error(
        JSON.stringify(
          {
            success: false,
            error: "Erro na resposta da API",
            status: error.response.status,
            details: error.response.data,
          },
          null,
          4
        )
      );
    } else {
      // Erro de conexão ou outro problema
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
}

// Executa a função
gerarPix();
