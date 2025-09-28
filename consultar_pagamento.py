"""
Exemplo de Consulta de Cobrança Pix em Python com Pix Go

Este script consulta o status de uma cobrança específica 
utilizando o endpoint /consultar-pix. Ele pode ser usado 
como modelo público de integração.

Documentação: https://pixgo.api.br/como_funciona
"""

import requests
import json

API_KEY = "SUA_API_KEY_PIXGO" """ Substitua pela sua chave real """
EXTERNAL_REFERENCE = "PEDIDO_101" """ Referência retornada no /gerar-pix """
ENDPOINT = f"https://pixgo.api.br/consultar-pix?reference={EXTERNAL_REFERENCE}"

headers = {
    "Authorization": f"Bearer {API_KEY}"
}

try:
    response = requests.get(ENDPOINT, headers=headers, timeout=15)
    response.raise_for_status()
except requests.exceptions.RequestException as e:
    print(json.dumps({
        "success": False,
        "error": "Erro de conexão com a API",
        "details": str(e)
    }, indent=4, ensure_ascii=False))
    exit()

try:
    data = response.json()
except ValueError:
    print(json.dumps({
        "success": False,
        "error": "Erro ao decodificar resposta JSON",
        "details": response.text
    }, indent=4, ensure_ascii=False))
    exit()

print(json.dumps(data, indent=4, ensure_ascii=False))
