const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const upload = require("multer")();

app.use(require("cors")());
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.json({ message: "Tudo ok por aqui!" });
});

app.post("/send", upload.single("anexo"), (req, res, next) => {
  console.log("chegou");
  const nome = req.body.nome;
  const email = req.body.email;
  const telefone = req.body.telefone;
  const mensagem = req.body.mensagem;
  require("./nodemail")(email, nome, telefone, mensagem)
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
  console.log("saiu");
});

const server = http.createServer(app);
server.listen(3030);
console.log("Servidor escutando na porta 3030...");
