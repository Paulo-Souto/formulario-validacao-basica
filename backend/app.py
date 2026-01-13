from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app, origins=['http://127.0.0.1:5500'])

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ARQUIVO_DADOS = os.path.join(BASE_DIR, 'dados.json')

def carregar_dados():
    if not os.path.exists(ARQUIVO_DADOS):
        return []
    
    with open(ARQUIVO_DADOS, 'r', encoding='utf-8') as arquivo:
        return json.load(arquivo)

def salvar_dados(dados):
    with open(ARQUIVO_DADOS, 'w', encoding='utf-8',) as arquivo:
        json.dump(dados, arquivo, indent=2, ensure_ascii=False)

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'status': 'ok',
        'mensagem': 'Servidor Flask esta funcionando'
    })

@app.route('/submit', methods=['POST'])
def submit():
    dados = request.get_json()
    
    if not dados:
        return jsonify({
            'success': False,
            'message': 'Nenhum dado recebido'
        }), 400
    
    nome = dados.get('nome')
    email = dados.get('email')
    
    if not nome or not email:
        return jsonify({
            'success': False,
            'message': 'Nome e email sao obrigatórios'
        }), 400
    
    if '@' not in email:
        return jsonify({
            'success': False,
            'message': 'Email invalido'
        }), 400
    
    usuarios = carregar_dados()
    
    for usuario in usuarios:
        if usuario['email'] == email:
            return jsonify({
                'success': False,
                'message': 'Email ja cadastrado'
            }), 400
    
    novo_usuario = {
        'nome': nome,
        'email': email
    }
    
    usuarios.append(novo_usuario)
    salvar_dados(usuarios)

    return jsonify({
        'success': True,
        'message': 'Cadastro realizado com sucesso'
    }), 200

if __name__ == '__main__':
    app.run()