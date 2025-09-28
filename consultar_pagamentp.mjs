/*
* Exemplo de Consulta de Cobrança Pix em Node.js com Pix Go
*
* Este script consulta o status de uma cobrança específica utilizando
* o endpoint /consultar-pix. Ele pode ser usado como modelo público
* de integração.
*
* Documentação: https://pixgo.api.br/como_funciona
*/

import axios from "axios";

const API_KEY = "SUA_API_KEY_PIXGO"; /* Substitua pela sua chave real */
const EXTERNAL_REFERENCE = "PEDIDO_101"; /* Referência retornada no /gerar-pix */
const ENDPOINT = `https://pixgo.api.br/consultar-pix?reference=${encodeURIComponent(EXTERNAL_REFERENCE)}`;

async function consultarPix() {
  try {
    const response = await axios.get(ENDPOINT, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

    console.log(JSON.stringify(response.data, null, 4));
  } catch (error) {
    if (error.response) {
      console.error(JSON.stringify({
        success: false,
        error: "Erro na resposta da API",
        status: error.response.status,
        details: error.response.data,
      }, null, 4));
    } else {
      console.error(JSON.stringify({
        success: false,
        error: "Erro de conexão com a API",
        details: error.message,
      }, null, 4));
    }
  }
}

consultarPix();
