const http = require('http');
const axios = require('axios');

http.createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            if (req.url === "/") {
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        
                res.write("<h1>Bem-vindo ao Sistema</h1>");
                res.write("<button onclick=\"window.location.href='/reparacoes'\">Reparações</button>");
                res.write("<button onclick=\"window.location.href='/viaturas'\">Viaturas</button>");
        
                res.end();
            
            // REPARAÇÕES
            }else if (req.url === '/reparacoes') {
                            axios.get('http://localhost:3000/reparacoes?_sort=nome')
                                .then(resp => {
                                    const reparacoes = resp.data;
                                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            
                                    res.write('<h1>Reparações</h1>');
                                    res.write('<ul>');

                                    res.write("<button onclick=\"window.location.href='/'\">Voltar</button>");
                                    res.write("<hr>");

                                    
                                    reparacoes.forEach(element => {
                                        res.write(`<li><a href='/reparacoes/${element.id}'>${element.nome}</a></li>`);
                                        res.write(`<p><strong>NIF:</strong> ${element.nif}</p>`);  
                                        res.write("<hr>");
                                        
                                    });
            
                                    res.write('</ul>');
                                    res.end();  
                                })
                                .catch(err => {
                                    console.error('Erro ao encontrar reparações:', err.message);
                                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                                    res.write('<h1>Erro interno do servidor</h1>');
                                    res.end();
                                });

            } else if (req.url.match(/\/reparacoes\/.+/)) {
                            var id = req.url.split("/")[2]
                            axios.get('http://localhost:3000/reparacoes/' + id)
                            .then(resp => {
                                const reparacao = resp.data;
                                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            
                                res.write(`<h1>${reparacao.id}</h1>`);
                                res.write(`<p><strong>Nome:</strong> ${reparacao.nome}</p>`);  
                                res.write(`<p><strong>NIF:</strong> ${reparacao.nif}</p>`);  
                                res.write(`<p><strong>Data:</strong> ${reparacao.data}</p>`);  
                                res.write(`<p><strong>Marca:</strong> ${reparacao.marca}</p>`);
                                res.write(`<p><strong>Modelo:</strong> ${reparacao.modelo}</p>`);  
                                res.write(`<p><strong>Matricula:</strong> ${reparacao.matricula}</p>`);
                                res.write(`<p><strong>Número de Intervenções:</strong> ${reparacao.nr_intervencoes}</p>`);
                                res.write("<hr>");
                                res.write(`<button onclick="window.location.href='/intervencoes/${reparacao.matricula}'">Intervenções</button>`);
                                res.write("<button onclick=\"window.location.href = document.referrer\">Voltar</button>");


            
                                res.end();  
                            })
                            .catch(err => {
                                console.error('Erro ao buscar reparação:', err.message);
                                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                                res.write('<h1>404 - Reparação não encontrada</h1>');
                                res.end();
                            });
            

                        // INTERVENÇÕES
            } else if (req.url.match(/\/intervencoes\/.+/)) {
                            var matricula = req.url.split("/")[2]
                            axios.get('http://localhost:3000/intervencoes/' + matricula)
                            .then(resp => {
                                const intervencoes = resp.data.intervencoes;

                                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

                                res.write(`<h1>Intervenções para a Matrícula ${matricula}</h1>`);
                                
                                intervencoes.forEach(intervencao => {
                                    res.write(`<p><strong>Código:</strong> ${intervencao.codigo}</p>`);
                                    res.write(`<p><strong>Nome:</strong> ${intervencao.nome}</p>`);
                                    res.write(`<p><strong>Descrição:</strong> ${intervencao.descricao}</p>`);
                                    res.write("<hr>");
                                });

                                res.write(`<button onclick="window.location.href='/reparacoes/${matricula}'">Voltar</button>`);


                                res.end();  
                            })
                            .catch(err => {
                                console.error('Erro ao buscar Intervenção:', err.message);
                                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                                res.write('<h1>404 - Intervenção não encontrada</h1>');
                                res.end();
                            });

                            // VIATURAS
            }else if (req.url === '/viaturas') {
                axios.get('http://localhost:3000/viaturas?_sort=marca')
                    .then(resp => {
                        const viaturas = resp.data;
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

                        res.write('<h1>Viaturas</h1>');
                        res.write('<ul>');
                        res.write("<button onclick=\"window.location.href='/'\">Voltar</button>");
                        res.write("<hr>");

                        
                        viaturas.forEach(element => {
                            res.write(`<li><a href='/reparacoes/${element.id}'>${element.id}</a></li>`); 
                            res.write(`<p><strong>Marca:</strong> ${element.marca}</p>`);
                            res.write(`<p><strong>Modelo:</strong> ${element.modelo}</p>`);
                            res.write(`<button onclick="window.location.href='/reparacoes/${element.id}'">Reparações</button>`);
                            res.write("<hr>");
                        });

                        res.write('</ul>');
                        res.end();  
                    })
                    .catch(err => {
                        console.error('Erro ao encontrar viaturas:', err.message);
                        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                        res.write('<h1>Erro interno do servidor</h1>');
                        res.end();
                    });
            } else {
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.write('<h1>404 - Página não encontrada</h1>');
                    res.end();
                }
                break;
            
            default:
                res.writeHead(405, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write('<h1>405 - Método não permitido</h1>');
                res.end();
                break;
        }
    }).listen(4321);
    
    console.log("Servidor a correr em http://localhost:4321");
