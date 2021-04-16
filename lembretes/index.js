const express = require ('express');
const axios = require('axios');
const app = express();
app.use(express.json());
const lembretes = {};
let contador = 0;

//http://192.168.15.61:porta/lembretes
app.get('/lembretes', (req, res) => {
    res.send(lembretes);
})

app.put ('/lembretes', async (req, res) => {
    contador++;
    const { texto } = req.body;
    lembretes[contador] = {
        contador, texto
    }
    await axios.post("http://192.168.15.61:10000/eventos", {
        tipo: "LembreteCriado",
        dados: { 
            contador,
            texto,
        },
    })
    res.status(201).send(lembretes[contador]);
})

app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok"});
})

app.listen(4000, () => {
    console.log("Lembretes: porta 4000");
});
