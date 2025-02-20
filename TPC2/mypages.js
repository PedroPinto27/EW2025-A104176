export function genMainPage(data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Musica</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-grey">
                    <h1>Escola de Música</h1>
                </header>
                <div class="w3-container">
                    <ul class="w3-ul">
                        <li>
                            <a href="/alunos">Lista de Alunos</a>
                        </li>
                        <li>
                            <a href="/cursos">Lista de Cursos</a>
                        </li>
                        <li>
                            <a href="/instrumentos">Lista de Instrumentos</a>
                        </li>
                    </ul>
                </div>
                
                <footer class="w3-container w3-grey">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}


export function genAlunosTable(data,alunos){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-grey">
                    <h1>Tabela de Alunos</h1>
                </header>
                <div class="w3-container">
                      <table class="w3-table-all w3-card-4">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Curso</th>
                        </tr>`
                        alunos.forEach(rep => {
                            pagHTML += `
                            <tr>
                                <td>${rep.id}</td>
                                <td><a href="/alunos/${rep.id}">${rep.nome}</a></td>
                                <td>${rep.curso}</td>
                            </tr>
                            `;
                        });

                        pagHTML += `  
                    </table>
                </div>
                <div class="w3-container w3-padding">
                    <a href="/" class="w3-button w3-blue w3-round w3-hover-light-blue"> Voltar</a>
                </div>
                <footer class="w3-container w3-grey">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genAlunoPage(aluno,data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Musica</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-grey">
                    <h1>Aluno${aluno.id}</h1>
                </header>
                <div class="w3-container">
                    <ul class="w3-ul">
                        <li>
                            <a>ID : ${aluno.id}</a>
                        </li>
                        <li>
                            <a>Nome : ${aluno.nome}</a>
                        </li>
                        <li>
                            <a>Data de Nascimento : ${aluno.dataNasc}</a>
                        </li>
                        <li>
                            <a>Curso : ${aluno.curso}</a>
                        </li>
                        <li>
                            <a>Ano de Curso : ${aluno.anoCurso}</a>
                        </li>
                        <li>
                            <a>Instrumento : ${aluno.instrumento}</a>
                        </li>
                    </ul>
                </div>
                <div class="w3-container w3-padding">
                    <a href="/alunos" class="w3-button w3-blue w3-round w3-hover-light-blue"> Voltar</a>
                </div>
                <footer class="w3-container w3-grey">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}



export function genCursosTable(data,cursos){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-grey">
                    <h1>Tabela de Cursos</h1>
                </header>
                <div class="w3-container">
                      <table class="w3-table-all w3-card-4">
                        <tr>
                            <th>ID</th>
                            <th>Designação</th>
                            <th>Duração</th>
                            <th>Instrumento</th>
                        </tr>`
                        cursos.forEach(rep => {
                            pagHTML += `
                            <tr>
                                <td>${rep.id}</td>
                                <td><a href="/cursos/${rep.id}">${rep.designacao}</a></td>
                                <td>${rep.duracao} anos</td>
                                <td>${rep.instrumento["#text"]}</td>
                            </tr>
                            `;
                        });

                        pagHTML += `  
                    </table>
                </div>
                <div class="w3-container w3-padding">
                    <a href="/" class="w3-button w3-blue w3-round w3-hover-light-blue"> Voltar</a>
                </div>
                <footer class="w3-container w3-grey">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genCursoPage(curso,data,alunos){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Musica</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-grey">
                    <h1>${curso.designacao}</h1>
                </header>
                <div class="w3-container">
                    <table class="w3-table-all w3-card-4">
                        <tr>
                            <th>Aluno</th>
                        </tr>`
                        alunos.forEach(rep => {
                            pagHTML += `
                            <tr>
                                <td>${rep.nome}</td>
                            </tr>
                            `;
                        });

                        pagHTML += `  
                    </table>
                </div>
                <div class="w3-container w3-padding">
                    <a href="/cursos" class="w3-button w3-blue w3-round w3-hover-light-blue"> Voltar</a>
                </div>
                <footer class="w3-container w3-grey">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genInstrumentosTable(data,cursos){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-grey">
                    <h1>Tabela de Instrumentos</h1>
                </header>
                <div class="w3-container">
                      <table class="w3-table-all w3-card-4">
                        <tr>
                            <th>ID</th>
                            <th>Designação</th>
                        </tr>`
                        cursos.forEach(rep => {
                            pagHTML += `
                            <tr>
                                <td>${rep.id}</td>
                                <td><a href="/instrumentos/${rep.id}">${rep["#text"]}</a></td>
                            </tr>
                            `;
                        });

                        pagHTML += `  
                    </table>
                </div>
                <div class="w3-container w3-padding">
                    <a href="/" class="w3-button w3-blue w3-round w3-hover-light-blue"> Voltar</a>
                </div>
                <footer class="w3-container w3-grey">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genInstrumentoPage(instrumento,data,alunos){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Musica</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-grey">
                    <h1>${instrumento["#text"]}</h1>
                </header>
                <div class="w3-container">
                    <table class="w3-table-all w3-card-4">
                        <tr>
                            <th>Aluno</th>
                        </tr>`
                        alunos.forEach(rep => {
                            pagHTML += `
                            <tr>
                                <td>${rep.nome}</td>
                            </tr>
                            `;
                        });

                        pagHTML += `  
                    </table>
                </div>
                <div class="w3-container w3-padding">
                    <a href="/instrumentos" class="w3-button w3-blue w3-round w3-hover-light-blue"> Voltar</a>
                </div>
                <footer class="w3-container w3-grey">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}