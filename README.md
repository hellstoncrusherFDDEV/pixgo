# pixgo
A API da Pix Go permite criar pagamentos via qrcodes Pix através do Mercado Pago de forma rápida e simples com apenas algumas linhas de código. Era o que você estava procurando para descomplicar a sua vida! Chega de ficar estudando a documentação do Mercado Pago, de ficar testando rotinas sem sucesso! Já temos tudo pronto e extremamente simples!

✨ Por Que Escolher a Pix Go?

Nossa plataforma foi desenvolvida para simplificar a integração do Pix para desenvolvedores, pequenos e-commerces e prestadores de serviço autônomos.

• Facilidade de Integração: Oferecemos uma API simples, com documentação clara e exemplos de código prontos. Integre o Pix em seus projetos em poucas horas.
• Preço Justo por Requisição: Diga adeus às mensalidades caras! Adotamos um modelo de créditos pré-pagos, onde você paga por requisição (ex: R$ 0,02 ou R$ 0,05). Você paga somente quando vender ou usar a funcionalidade.

• Velocidade e Confiabilidade: Construída sobre o PHP 8 e MySQL, a Pix Go foca em escalabilidade, sendo ideal para sites e aplicativos que não querem manter um servidor próprio para gerar QR Code Pix.

• Foque no Seu Negócio: Evite a complexidade de gerar tokens, lidar com webhooks e manter servidores; nós cuidamos da integração com o Mercado Pago.

💰 Modelo de Créditos Pré-Pagos (Pay-As-You-Go)

A Pix Go utiliza um modelo de créditos pré-pagos, similar ao de APIs de SMS. Você recarrega um valor e ele é convertido em requisições à API, garantindo total controle de custos.

O sistema de controle de uso bloqueia requisições quando seus créditos chegam a zero.

Tabela de Recarga e Desconto

Quanto maior o valor da sua recarga, menor será o custo por cada requisição de Pix.
https://pixgo.api.br/precos

⚙️ Configuração Inicial

Para começar a gerar Pix, você precisa configurar dois itens essenciais no painel do Pix Go:

1. Sua API Key PixGo: Uma chave de 64 caracteres gerada automaticamente no seu registro e usada para autenticar suas chamadas à nossa API.
2. Sua Chave do Mercado Pago (AccessToken): Para que possamos gerar Pix em seu nome, você precisa cadastrar sua AccessToken de produção do Mercado Pago no painel "Minha Chave API". Esta chave é armazenada de forma criptografada em nosso banco de dados.

Importante: A Pix Go utiliza duas integrações distintas com o Mercado Pago: uma para as recargas de créditos da plataforma (que usa a chave da Pix Go) e outra para gerar Pix para seus clientes (que usa a chave do cliente cadastrada).

🔑 Autenticação

Todas as requisições à API devem ser autenticadas usando sua API Key PixGo no cabeçalho Authorization.

Método: Bearer Token Exemplo de Cabeçalho:

Authorization: Bearer SUA_API_KEY_PIXGO_64_CARACTERES
Content-Type: application/json

Se a chave estiver ausente ou inválida, a API retornará o código HTTP 401 Unauthorized.

🚀 Endpoints da API

A API Pix Go foi desenhada para ser RESTful e extremamente simples, operando com endpoints únicos.

1. Criar Cobrança Pix
Este endpoint é o principal, responsável por deduzir o custo da requisição (ex: R$ 0,02) do seu saldo e acionar a API do Mercado Pago usando sua chave cadastrada.
https://pixgo.api.br/como_funciona

2. Consultar Status da Cobrança
Utilize este endpoint para verificar o status de uma cobrança Pix específica que foi registrada na sua tabela de transações do PixGo.
https://pixgo.api.br/como_funciona

💻 Exemplos de Código

Abaixo estão exemplos de como integrar a Geração de Pix usando as bibliotecas comuns em PHP, Javascript e Python.

PHP (cURL)
Utilize a biblioteca cURL para fazer requisições POST autenticadas.

<?php
$api_key = 'SUA_API_KEY_PIXGO';
$endpoint = 'https://pixgo.api.br/gerar-pix';

$payload = json_encode([
    'valor' => 50.00,
    'descricao' => 'Compra de Ebook XYZ'
]);

$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $api_key,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);

if ($data['success']) {
    // Exibe o código Pix Copia e Cola [34]
    echo "PIX COPIA E COLA: " . $data['pix_copia_cola'];
} else {
    echo "Erro: " . $data['message'];
}
?>

Javascript (Fetch API)
Ideal para aplicações frontend ou serverless functions.

const apiKey = 'SUA_API_KEY_PIXGO';
const endpoint = 'https://pixgo.api.br/gerar-pix';

const payload = {
    valor: 15.50,
    descricao: 'Serviço de Consultoria'
};

fetch(endpoint, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        // Usa a base64 para exibir o QR Code [36]
        document.getElementById('qrcode-img').src = data.qr_code_base64;
        console.log("Link de Pagamento: ", data.link_pagamento);
    } else {
        console.error('Falha na Geração: ', data.message);
    }
})
.catch(error => {
    console.error('Erro de Conexão:', error);
});

Python (Requests)
Utilize a biblioteca requests para uma integração limpa e rápida.

import requests
import json

api_key = 'SUA_API_KEY_PIXGO'
endpoint = 'https://pixgo.api.br/gerar-pix'

headers = {
    'Authorization': f'Bearer {api_key}',
    'Content-Type': 'application/json'
}

payload = {
    'valor': 25.00,
    'descricao': 'Doacao Mensal'
}

try:
    response = requests.post(endpoint, headers=headers, data=json.dumps(payload))
    response.raise_for_status() # Lança exceção para erros HTTP (4xx ou 5xx)

    data = response.json()

    if data.get('success'):
        print(f"PIX gerado. Referência: {data['external_reference']}")
        print(f"Novo Saldo: R$ {data['novo_saldo']}")
    else:
        print(f"Erro na API: {data.get('message', 'Erro desconhecido')}")

except requests.exceptions.RequestException as e:
    print(f"Erro de Conexão ou HTTP: {e}")

🛠️ Suporte e Contribuições

Este repositório visa ser a principal biblioteca de integrações para a API Pix Go.
Para relatar bugs, sugerir novas integrações (ex: Ruby, Go, C#) ou solicitar suporte, por favor, abra uma Issue no GitHub. Agradecemos todas as contribuições!

--------------------------------------------------------------------------------
PixGo: API Pix Simples e Econômica.
https://pixgo.api.br/
