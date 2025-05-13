const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;
const SECRET_KEY = '6Lf8UDcrAAAAAIgBfDBSuLTmquE_fqtDQ2gQyYFw';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', async (req, res) => {
  const token = req.body['g-recaptcha-response'];
  const nome = req.body['nome'];
  const email = req.body['email'];
  const mensagem = req.body['mensagem'];

  if (!token) return res.send('reCAPTCHA não preenchido.');

  const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${token}`;

  try {
    const response = await fetch(verifyURL, { method: 'POST' });
    const data = await response.json();

    if (data.success) {
      res.send(`
        <h2>Obrigado, ${nome}!</h2>
        <p>Recebemos sua mensagem:</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong> ${mensagem}</p>
      `);
    } else {
      res.send('Falha na verificação do reCAPTCHA.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor ao verificar o reCAPTCHA.');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

