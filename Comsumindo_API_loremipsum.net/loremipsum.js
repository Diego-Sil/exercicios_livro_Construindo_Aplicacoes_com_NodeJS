'use strict';

const http = require('https');
const fs = require('fs')

http.get('https://dinoipsum.com/api/?format=html&words=10&paragraphs=10',res => {
    let text = '';
    res.on('data',chunk => {
        text += chunk;
    })
    res.on('end',() =>{
        fs.writeFile('lorem.html',text,()=>{
            console.log('Arquivo pronto');
        });
    });

})
.on('error',(e) =>{
    console.log('Got error:'+ e.message);
});

/* 
Obs: esse exercicio é feito no livro utilizando a api hhttp://loriipsum.com.br, porem ela estava fora do ar, dai utilizei esta outra API a https://dinoipsum.com que faz a mesma coisa com tematica de dinossauro.
*/