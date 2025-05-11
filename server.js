const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Eres un asistente experto en nutrición y deporte llamado HealthyLife.' },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: 'Lo siento, hubo un error al contactar con la IA.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor funcionando en http://localhost:${PORT}`));
