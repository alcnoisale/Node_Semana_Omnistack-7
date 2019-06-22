const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');


module.exports = {
    
    async index (req, res) {
        const posts = await Post.find().sort('-createdAt') //USANDO ASSIM E O MESMO QUE ASSIM await Post.find().sort('createdAt','DESC')
        
        return res.json(posts);
    },

    async store (req, res) {
        // console.log(req.body);
        // console.log(req.file);
        const { autor, place, descricao, hashtags} = req.body;
        const { filename: imagem} = req.file;

        const [nome] = imagem.split('.');//QUEBRANDO STRING 
        const fileName = `${nome}.jpg`;


        await sharp(req.file.path)
            .resize(500)
            .jpeg({
                quality: 70
            })
            .toFile(
                path.resolve(req.file.destination, 'resized', `${imagem}`)
            )

        fs.unlinkSync(req.file.path); // EXCLUINDO IMAGEM ORIGINAL

        const post = await Post.create({
            autor,
            place,
            descricao,
            hashtags,
            imagem : fileName
        });

        req.io.emit('post', post); //USADO PARA INFORMAR AOS USUARIOS QUE UMA NOVA POSTAGEM FOI CRIADA

        return res.json(post);
    }

};