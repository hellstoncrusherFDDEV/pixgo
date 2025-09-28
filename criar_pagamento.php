<?php
/**
 * Exemplo de Integração em PHP com a API Pix Go
 *
 * Este script demonstra como gerar um pagamento PIX via API Pix Go
 * utilizando cURL em PHP. Ele pode ser usado como modelo de integração
 * em sistemas que precisam criar cobranças PIX de forma simples e segura.
 *
 * Documentação oficial: https://pixgo.api.br/como_funciona
 *
 * IMPORTANTE:
 * - Substitua 'SUA_API_KEY_PIXGO' pela sua chave real de API.
 * - Este código retorna os dados da API em JSON para fácil integração.
 */

// Chave da API (substituir pela sua real)
$api_key = 'SUA_API_KEY_PIXGO';

// Endpoint da API responsável por gerar o PIX
$endpoint = 'https://pixgo.api.br/gerar-pix';

// Dados da cobrança (payload da requisição)
$payload = [
    'valor'     => 50.00,                // Valor da cobrança (em reais)
    'descricao' => 'Compra de Ebook XYZ' // Descrição da cobrança
];

// Inicializa a sessão cURL
$ch = curl_init($endpoint);

// Configurações básicas do cURL
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Retorna a resposta como string
curl_setopt($ch, CURLOPT_POST, true);           // Define o método como POST
curl_setopt($ch, CURLOPT_HTTPHEADER, [          // Cabeçalhos da requisição
    'Authorization: Bearer ' . $api_key,        // Autenticação com Bearer Token
    'Content-Type: application/json'            // Tipo do conteúdo: JSON
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload)); // Envia o JSON do payload

// Executa a requisição
$response = curl_exec($ch);

// Captura possíveis erros de conexão
if (curl_errno($ch)) {
    $error_msg = curl_error($ch);
    curl_close($ch);

    // Retorna o erro em JSON
    echo json_encode([
        'success' => false,
        'error'   => 'Erro de conexão com a API',
        'details' => $error_msg
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// Fecha a sessão cURL
curl_close($ch);

// Decodifica a resposta JSON recebida
$data = json_decode($response, true);

// Verifica se a resposta foi decodificada corretamente
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode([
        'success' => false,
        'error'   => 'Erro ao decodificar resposta JSON',
        'details' => json_last_error_msg()
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// Retorna a resposta da API em formato JSON formatado
header('Content-Type: application/json; charset=utf-8');
echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
