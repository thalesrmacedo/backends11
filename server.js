const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/validar-captcha", async (req, res) => {
    const captchaToken = req.body["g-recaptcha-response"];
    const secretKey = "SUA_CHAVE_SECRETA";

    try {
        const response = await axios.post("https://www.google.com/recaptcha/api/siteverify", null, {
            params: {
                secret: secretKey,
                response: captchaToken
            }
        });

        if (response.data.success) {
            res.send("CAPTCHA válido! Usuário autorizado.");
        } else {
            res.status(403).send("Falha na verificação do CAPTCHA.");
        }
    } catch (error) {
        res.status(500).send("Erro ao validar CAPTCHA.");
    }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
