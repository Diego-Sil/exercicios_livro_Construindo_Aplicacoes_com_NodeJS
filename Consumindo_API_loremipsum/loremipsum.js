'use strict';

/*
loremipsum.js

Faz uma requisição na API `https://dinoipsum.com/api/`
e grava para um arquivo com o nome e a quantidade 
de paragrafos

William Bruno, Maio de 2015
William Bruno, Dezembro de 2020 - Atualizado para es6
*/

const http = require('https');
const fs = require('fs')
const debug = require('debug')
const fileName = String(process.argv[2]||'').replace(/[^a-z0-9\.]/gi,'');
const quantityOfParagraphs = String(process.argv[3]||'').replace(/[^\d]/g,'');
const USAGE = 'USO: node loremipsum.js{nomeArquivo} {quantidade de paragrafos}';

if(!fileName || !quantityOfParagraphs){
    return debug(USAGE);
}


http.get('https://dinoipsum.com/api/?format=html&words=10&paragraphs='+ quantityOfParagraphs,res => {
    let text = '';
    res.on('data',chunk => {
        text += chunk;
    })
    res.on('end',() =>{
        fs.writeFile(fileName,text,()=>{
            debug('Arquivo '+ fileName +' pronto');
        });
    });

})
.on('error',(e) =>{
    debug('Got error:'+ e.message);
});

/* 
Obs: no livro utilizado a api hhttp://loriipsum.com.br, porem ela estava fora do ar, dai utilizei esta outra API a https://dinoipsum.com que faz a mesma coisa com tematica de dinossauro.
Essa api necessita de 3 parametros:
format - formato do texto que vira, que pode ser html, text ou json(por padrão html)
words - quantidade de palavras que virar por paragrafo(por padrão 30)
paragraphs - quantidade de paragrafos(por padrão 10)
Esses paarametros ja são informados dentro da URL posta na linha 25
*/