import json

# Carregar o arquivo JSON
with open("cinema.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Adicionar um ID numérico crescente
for i, filme in enumerate(data["filmes"], start=1):
    filme["id"] = i

# Salvar as mudanças
with open("filmes_com_id.json", "w", encoding="utf-8") as file:
    json.dump(data, file, indent=2, ensure_ascii=False)

print("IDs adicionados com sucesso!")
