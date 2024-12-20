const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'senha123') {
        // Redireciona para a página de acesso
        res.redirect('/pagina-de-acesso');
    } else {
        res.send('Usuário ou senha incorretos');
    }
});

app.get('/pagina-de-acesso', (req, res) => {
    res.send('Bem-vindo à página de acesso!');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
