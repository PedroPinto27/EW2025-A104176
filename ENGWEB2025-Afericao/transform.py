import json
import ast
import re
import unidecode

def gerar_id_autor(nome):
    nome = unidecode.unidecode(nome.lower())
    nome = re.sub(r"[^a-z0-9]+", "-", nome)
    nome = nome.strip("-")
    return nome

def split_authors_safely(author_str):
    partes = []
    buffer = ""
    nivel_parenteses = 0

    for char in author_str:
        if char == ',' and nivel_parenteses == 0:
            partes.append(buffer.strip())
            buffer = ""
        else:
            buffer += char
            if char == '(':
                nivel_parenteses += 1
            elif char == ')':
                nivel_parenteses = max(nivel_parenteses - 1, 0)

    if buffer:
        partes.append(buffer.strip())

    return partes

def corrigir_autores(author):
    if isinstance(author, list):
        return [
            {"_id": gerar_id_autor(nome), "name": nome}
            if isinstance(nome, str) else nome
            for nome in author
        ]

    elif isinstance(author, str):
        author = re.sub(r",\s*\((Goodreads Author.*?)\)", r" (\1)", author)
        nomes = split_authors_safely(author.strip())
        return [{"_id": gerar_id_autor(nome), "name": nome} for nome in nomes]

    else:
        return []

def corrigir_json(livros):
    livros_corrigidos = []

    for livro in livros:
        novo_livro = livro.copy()

        match = re.match(r"(\d+)", livro.get("bookId", ""))
        novo_livro["_id"] = int(match.group(1)) if match else livro["bookId"]
        if "bookId" in novo_livro:
            del novo_livro["bookId"]

        campos_lista = ["genres", "characters", "awards", "setting", "ratingsByStars"]
        for campo in campos_lista:
            if isinstance(livro.get(campo), str):
                try:
                    novo_livro[campo] = ast.literal_eval(livro[campo])
                except Exception:
                    novo_livro[campo] = []

        novo_livro["author"] = corrigir_autores(livro.get("author", ""))

        livros_corrigidos.append(novo_livro)

    return livros_corrigidos

with open("dataset.json", "r", encoding="utf-8") as f:
    dados = json.load(f)

dados_corrigidos = corrigir_json(dados)

with open("livros_corrigidos.json", "w", encoding="utf-8") as f:
    json.dump(dados_corrigidos, f, ensure_ascii=False, indent=2)

print("JSON corrigido com sucesso!")
