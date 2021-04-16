const { default: axios } = require('axios');
const express = require('express');
const app = express();
app.use(express.json());

const palavraChave = "importante";
const funcoes = {
    ObservacaoCriada: (observacao) => {
        observacao.status = 
            observacao.texto.includes(palavraChave)
            ? "importante"
            : "comum";
        axios.post("http://192.168.15.61:10000/eventos", {
            tipo: "ObservacaoClassificada",
            dados: observacao,
        });
    }
}

app.post('/eventos', (req,res) => {
    try{
        funcoes[req.body.tipo](req.body.dados);
    } catch(err){}
    res.status(200).send({msg: "ok"});
});

app.listen(7000, async () => {
    console.log("Classificação. Porta 7000");
    const resp = await 
    axios.get("http://192.168.15.61:10000/eventos");
    //axios entrega os dados na propriedade data
  resp.data.forEach((valor, indice, colecao) => {
    try{
      funcoes[valor.tipo](valor.dados);
    } catch(err){}
  });
});