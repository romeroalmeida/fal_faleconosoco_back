const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const upload = require("multer")();

app.use(
  require("cors")({
    origin: "https://www.falrene.com.br",
  })
);

app.use(bodyParser.json());

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
server.listen(process.env.PORT);
