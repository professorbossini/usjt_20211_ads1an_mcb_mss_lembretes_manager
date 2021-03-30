const express = require('express');
const axios = require('axios');
const app = express();
const { v4: uuidv4 } = require('uuid');
app.use(express.json());
const observacoesPorLembreteId = {};

//:id é um placeholder
//exemplo: /lembretes/123456/observacoes
app.put('/lembretes/:id/observacoes', async (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;
    //req.params dá acesso à lista de parâmetros da URL
    const observacoesDoLembrete = 
        observacoesPorLembreteId[req.params.id] || [];
    observacoesDoLembrete.push({id: idObs, texto});
    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;
    await axios.post('http://localhost:10000/eventos', {
        tipo: 'ObservacaoCriada',
        dados: {
            id: idObs, texto: texto, lembreteId: req.params.id
        }
    });
    res.status(201).send(observacoesDoLembrete);

});

app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || []);
});

app.post('/eventos', (req, res) => {
    const evento = req.body;
    console.log(evento);
    res.status(200).send({msg: 'ok'});
});

app.listen(5000, (() => {
    console.log('Observacoes. Porta 5000');
}));
