const mailer = require("nodemailer");

module.exports = (email, nome, telefone, mensagem, anexo) => {
  const smtpTransport = mailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, //SSL/TLS
    auth: {
      user: "romerobm@gmail.com",
      pass:
        "xsmtpsib-f9ced490a64abb86c3f180b4702c927581d0a6592241d8db8a6d33932ff765de-pZwKnMg8LsONG2Ey",
    },
  });

  const mail = {
    from: `Contato Site 'contato@falrene.com.br'`,
    to: "contato@falrene.com.br",
    subject: `${nome} te enviou uma mensagem`,
    telefone: telefone,
    text: mensagem,
    html: `
      <h1  style="color:#660000;">${nome}</h1>
      <p>E-mail: <b> ${email}</b><br />
      <p>Telefone:<b> ${telefone}</b></p><br />
      <p>Mensagem: <b>${mensagem}</b></p>

    `,
  };

  if (anexo) {
    console.log(anexo);
    mail.attachments = [];
    mail.attachments.push({
      filename: anexo.originalname,
      content: anexo.buffer,
    });
  }

  return new Promise((resolve, reject) => {
    smtpTransport
      .sendMail(mail)
      .then((response) => {
        smtpTransport.close();
        return resolve(response);
      })
      .catch((error) => {
        smtpTransport.close();
        return reject(error);
      });
    console.log(mail);
  });
};
