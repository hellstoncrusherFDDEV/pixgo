<?php
/**
 * Exemplo de Consulta de Cobrança Pix em PHP com Pix Go
 *
 * Este script consulta o status de uma cobrança específica utilizando
 * o endpoint /consultar-pix. Ele pode ser usado como modelo público
 * de integração.
 *
 * Documentação: https://pixgo.api.br/como_funciona
 */

$api_key = 'SUA_API_KEY_PIXGO'; // Substitua pela sua chave real
$external_reference = 'PEDIDO_101'; // Referência retornada no /gerar-pix
$endpoint = 'https://pixgo.api.br/consultar-pix?reference=' . urlencode($external_reference);

// Inicializa cURL
$ch = curl_init($endpoint);

// Configurações do cURL
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $api_key
]);

// Executa requisição
$response = curl_exec($ch);

// Captura possíveis erros
if (curl_errno($ch)) {
    echo json_encode([
        'success' => false,
        'error'   => 'Erro de conexão com a API',
        'details' => curl_error($ch)
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    curl_close($ch);
    exit;
}

curl_close($ch);

// Decodifica JSON
$data = json_decode($response, true);

// Valida resposta
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode([
        'success' => false,
        'error'   => 'Erro ao decodificar resposta JSON',
        'details' => json_last_error_msg()
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// Retorna resposta formatada
header('Content-Type: application/json; charset=utf-8');
echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
