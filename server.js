const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/", (req, res) => {
  console.log("==== NOVA REQUISIÇÃO ====");

  console.log("Method:", req.method);
  console.log("Headers:", req.headers);
  console.log("Query:", req.query);
  console.log("Body:", req.body);

  // resposta que o app pode entender
  res.json({
    reply: "Recebi sua mensagem!",
    message: "Recebi sua mensagem!",
    text: "Recebi sua mensagem!"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
