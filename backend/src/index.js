const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server); //PERMITIR QUE NOSSO SERVIDOR PERMITA CHAMADAS TANTO HTTP E WEBSOCKET 

mongoose.connect('mongodb+srv://usuario_admin:Brasil2010@cluster0-wrkua.azure.mongodb.net/node-vuejs?retryWrites=true', { useNewUrlParser: true})

app.use((req, res, next) => {
    req.io = io;

    next();
})

app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use(require('./routes'));//IMPORTANDO OS ARQUIVOS DE ROTAS



server.listen(3000, () => console.log('Server rodando na porta 3000'));