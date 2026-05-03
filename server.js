const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const DESTINO = "https://painel.stv.sx/chatbot/9618b980-c30c-4fcf-91e0-4a106f9738b7";

app.post("/", async (req, res) => {
  console.log("\n============================");
  console.log("📩 RECEBIDO DO AUTOREPLY");
  console.log("============================");

  console.log("Headers:", req.headers);
  console.log("Body:", JSON.stringify(req.body, null, 2));

  try {
    console.log("\n➡️ ENVIANDO PARA SERVIDOR REAL...");
    
    const response = await axios.post(DESTINO, req.body, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log("\n📥 RESPOSTA DO SERVIDOR REAL:");
    console.log("Status:", response.status);
    console.log("Body:", JSON.stringify(response.data, null, 2));

    // retorna pro AutoReply
    res.json(response.data);

  } catch (error) {
    console.log("\n❌ ERRO AO CHAMAR SERVIDOR:");
    
    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Body:", error.response.data);
    } else {
      console.log(error.message);
    }

    // fallback pra não quebrar o AutoReply
    res.json({
      data: [
        {
          message: "Erro ao consultar servidor"
        }
      ]
    });
  }
});

app.listen(3000, () => {
  console.log("🚀 Proxy rodando na porta 3000");
});
