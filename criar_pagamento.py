"""
Exemplo de Integração em Python com a API Pix Go

Este script demonstra como gerar um pagamento PIX via API Pix Go
utilizando a biblioteca 'requests' em Python. Ele pode ser usado como
modelo de integração em sistemas que precisam criar cobranças PIX de
forma simples e segura.

Documentação oficial: https://pixgo.api.br/como_funciona

IMPORTANTE:
- Substitua 'SUA_API_KEY_PIXGO' pela sua chave real de API.
- Este código retorna os dados da API em JSON para fácil integração.
"""

import requests
import json

# Chave da API (substituir pela sua real)
API_KEY = "SUA_API_KEY_PIXGO"

# Endpoint da API responsável por gerar o PIX
ENDPOINT = "https://pixgo.api.br/gerar-pix"

# Dados da cobrança (payload da requisição)
payload = {
    "valor": 50.00,                 # Valor da cobrança (em reais)
    "descricao": "Compra de Ebook XYZ"  # Descrição da cobrança
}

# Cabeçalhos da requisição (autenticação + tipo do conteúdo)
headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

try:
    # Envia a requisição POST
    response = requests.post(ENDPOINT, headers=headers, json=payload, timeout=15)

    # Verifica se a resposta foi bem-sucedida (código 200-299)
    response.raise_for_status()

except requests.exceptions.RequestException as e:
    # Retorna erro em JSON caso ocorra falha de conexão ou timeout
    print(json.dumps({
        "success": False,
        "error": "Erro de conexão com a API",
        "details": str(e)
    }, indent=4, ensure_ascii=False))
    exit()

try:
    # Tenta converter a resposta para JSON
    data = response.json()
except ValueError:
    # Retorna erro em JSON caso a resposta não seja JSON válido
    print(json.dumps({
        "success": False,
        "error": "Erro ao decodificar resposta JSON",
        "details": response.text
    }, indent=4, ensure_ascii=False))
    exit()

# Exibe a resposta formatada em JSON (com indentação e suporte a UTF-8)
print(json.dumps(data, indent=4, ensure_ascii=False))
