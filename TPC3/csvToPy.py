import csv
import json

# Nome do arquivo CSV de entrada
csv_file = "alunos.csv"
json_file = "alunos.json"

# Lista para armazenar os dados
alunos = []

# Ler o arquivo CSV
with open(csv_file, mode='r', encoding='utf-8') as file:
    reader = csv.reader(file, delimiter=';')
    for row in reader:
        if len(row) == 3:  # Garantir que há 3 colunas
            numero, nome, github = row
            alunos.append({
                "id": numero.strip(),
                "nome": nome.strip(),
                "git": github.strip()
            })

# Estruturar os dados no formato desejado
dados_json = {"alunos": alunos}

# Escrever para um arquivo JSON
with open(json_file, mode='w', encoding='utf-8') as file:
    json.dump(dados_json, file, indent=4, ensure_ascii=False)

print(f"Dados convertidos e salvos em {json_file}")
