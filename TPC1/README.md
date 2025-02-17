# TPC1 - Página WEB Mecânico

**Data:** 2024-02-17

**Autor:** Pedro Filipe Maneta Pinto

**Número Mecanográfico:** A104176

**Foto:**

![Foto](../images/image.jpg)  

## Problema

Foi proposto desenvolver um serviço em Node.js que:

-Consome uma API de dados fornecida pelo json-server, contendo informações completas de uma oficina;

-Gera páginas web dinâmicas com base nesses dados;

-Permite a navegação e consulta das informações relativas a reparações, clientes e veículos.

## Solução
```tpc1.js```: Programa Principal em node.js
```parser.py```: Programa Python para estruramento do dataset
```dataset_reparacoes.json```: DataSet Base
```dados_organizados.json```: DataSet Organizado

## Como Executar

1. Processar o dataset:
```
python3 parser.py
```

2. Iniciar o JSON Server:
```
json-server -w dados_organizados.json 
```

3. Iniciar o servidor Node.js:
```
node tpc1.js
```

4. Acessar à Página Web em:
```
http://localhost:4321
```