const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json({ type: "*/*" }));
app.use(express.urlencoded({ extended: true }));

const DESTINO = "https://painel.stv.sx/chatbot/9618b980-c30c-4fcf-91e0-4a106f9738b7";

app.all("/", async (req, res) => {
  console.log("\n============================");
  console.log("📩 RECEBIDO");
  console.log("============================");
  console.log("Method:", req.method);
  console.log("Headers:", JSON.stringify(req.headers, null, 2));
  console.log("Query:", JSON.stringify(req.query, null, 2));
  console.log("Body:", JSON.stringify(req.body, null, 2));

  try {
    const response = await axios.post(DESTINO, req.body, {
      headers: {
        "Content-Type": "application/json"
      },
      validateStatus: () => true
    });

    console.log("\n📥 RESPOSTA DO SERVIDOR REAL:");
    console.log("Status:", response.status);
    console.log("Headers:", JSON.stringify(response.headers, null, 2));
    console.log("Body:", JSON.stringify(response.data, null, 2));

    if (!response.data || Object.keys(response.data).length === 0) {
      return res.json({
        data: [
          {
            message: "Servidor real respondeu vazio"
          }
        ],
        debug: {
          status: response.status,
          headers: response.headers,
          body: response.data
        }
      });
    }

    return res.json(response.data);

  } catch (error) {
    const erroDebug = {
      message: error.message,
      code: error.code,
      status: error.response?.status || null,
      responseHeaders: error.response?.headers || null,
      responseBody: error.response?.data || null
    };

    console.log("\n❌ ERRO AO CHAMAR SERVIDOR:");
    console.log(JSON.stringify(erroDebug, null, 2));

    return res.status(200).json({
      data: [
        {
          message: "Erro ao consultar servidor"
        }
      ],
      debug: erroDebug
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Proxy rodando na porta", PORT);
});
