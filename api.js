const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const upload = require("multer")();

const cors = require("cors");
app.use(bodyParser.json());

app.use((req, res, next) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header("Access-Control-Allow-Origin", "*");
  //Quais são os métodos que a conexão pode realizar na API
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  app.use(cors());
  next();
});

app.get("/", (req, res, next) => {
  res.json({ message: "Tudo ok por aqui!" });
});

app.post("/send", upload.single("anexo"), (req, res, next) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const mensagem = req.body.mensagem;
  const telefone = req.body.telefone;
  const anexo = req.file;

  require("./nodemail")(email, nome, telefone, mensagem, anexo)
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
  console.log("aqui");
});

const server = http.createServer(app);
server.listen(3030);
