import { createServer } from 'http'
import axios from 'axios';
import { genMainPage, genAlunosTable, genAlunoPage, genCursosTable, genCursoPage, genInstrumentosTable, genInstrumentoPage} from './mypages.js'
import { readFile } from 'fs'

createServer(async (req, res) =>{
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if(req.url == '/'){
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(genMainPage(d))
            res.end()  
    }
    else if(req.url.match(/w3\.css$/)){
        readFile("w3.css", function(erro, dados){
            if(erro){
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na leitura do ficheiro: ' + erro + '</p>')
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/css'})
                res.end(dados)
            }
        })
    }
    else if(req.url == '/alunos'){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        axios.get('http://localhost:3000/alunos')
        .then(function(resp){
            var alunos = resp.data
            res.write(genAlunosTable(d,alunos))
            res.end()  
        })
    }
    else if(req.url.startsWith('/alunos/')){
        var id = req.url.split('/')[2]
        axios.get('http://localhost:3000/alunos?id=' + id)
        .then(function(resp){
            var aluno = resp.data[0]
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(genAlunoPage(aluno, d))
            res.end()
        })
        .catch(erro => {
            console.log("Erro: " + erro)
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
        })
    }
    else if(req.url == '/cursos'){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        axios.get('http://localhost:3000/cursos')
        .then(function(resp){
            var cursos = resp.data
            res.write(genCursosTable(d,cursos))
            res.end()  
        })
    }
    else if(req.url.startsWith('/cursos/')){
        var id = req.url.split('/')[2]

        var alunosResponse = (await axios.get('http://localhost:3000/alunos?curso=' + id))
        const alunos = alunosResponse.data;

        var cursoResponse = (await axios.get('http://localhost:3000/cursos?id=' + id))
        const cursos = cursoResponse.data

        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.write(genCursoPage(cursos[0], d, alunos))
        res.end()
    
    }
    else if(req.url == '/instrumentos'){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        axios.get('http://localhost:3000/instrumentos')
        .then(function(resp){
            var instrumentos = resp.data
            res.write(genInstrumentosTable(d,instrumentos))
            res.end()  
        })
    }
    else if(req.url.startsWith('/instrumentos/')){
        var id = req.url.split('/')[2]



        var instrumentoResponse = (await axios.get('http://localhost:3000/instrumentos?id=' + id))
        const intrumentos = instrumentoResponse.data

        var alunosResponse2 = (await axios.get('http://localhost:3000/alunos?instrumento=' + intrumentos[0]['#text']))
        const alunos = alunosResponse2.data;

        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.write(genInstrumentoPage(intrumentos[0], d, alunos))
        res.end()
    
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end('<p>Operação não suportada: ' + req.url + '</p>')
    }
}).listen(4321)

console.log('Servidor à escuta na porta 4321...')
console.log('http://localhost:4321')
