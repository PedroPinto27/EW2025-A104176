import json

with open("./dataset_reparacoes.json", "r", encoding="utf-8") as f:
    dados = json.load(f)

reparacoes = []
intervencoes = []
viaturas = []


intervencao_por_matricula = {}

for reparacao in dados["reparacoes"]:
    reparacoes.append({
        "id": reparacao["viatura"]["matricula"],
        "nome": reparacao["nome"],
        "nif": reparacao["nif"],
        "data": reparacao["data"],
        "marca": reparacao["viatura"]["marca"],
        "modelo": reparacao["viatura"]["modelo"],    
        "matricula": reparacao["viatura"]["matricula"],
        "nr_intervencoes": reparacao["nr_intervencoes"]
    })
    
    viaturas.append({
        "id": reparacao["viatura"]["matricula"],
        "marca": reparacao["viatura"]["marca"],
        "modelo": reparacao["viatura"]["modelo"]
    })
    
    matricula = reparacao["viatura"]["matricula"]
    
    if matricula not in intervencao_por_matricula:
        intervencao_por_matricula[matricula] = []

    id_intervencao = 1  
    for intervencao in reparacao["intervencoes"]:
        intervencao_por_matricula[matricula].append({
            "id": id_intervencao,  
            "codigo": intervencao["codigo"],
            "nome": intervencao["nome"],
            "descricao": intervencao["descricao"]
        })
        id_intervencao += 1  


intervencoes = [{"id": matricula, "intervencoes": intervencao_por_matricula[matricula]} 
                for matricula in intervencao_por_matricula]

novo_json = {
    "reparacoes": reparacoes,
    "intervencoes": intervencoes,
    "viaturas": viaturas
}

with open("dados_organizados.json", "w", encoding="utf-8") as f:
    json.dump(novo_json, f, indent=4, ensure_ascii=False)

print("JSON organizado gerado com sucesso!")
