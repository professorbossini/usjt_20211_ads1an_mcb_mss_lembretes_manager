const express = require ('express');
const app = express();
app.use(express.json());
const lembretes = {};
let contador = 0;

//http://localhost:porta/lembretes
app.get('/lembretes', (req, res) => {
    res.send(lembretes);
})

app.put ('/lembretes', (req, res) => {
    contador++;
    const { texto } = req.body;
    lembretes[contador] = {
        contador, texto
    }
    res.status(201).send(lembretes[contador]);
})

app.listen(4000, () => console.log("Lembretes:4000"));
