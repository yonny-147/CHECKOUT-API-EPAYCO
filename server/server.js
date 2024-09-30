import express from 'express';
import cors from 'cors';
import { login, createSession } from '../api/api.js';

const app = express();
const PORT = 3000 //AGREGA TU PUERTO AQUI;



app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json());

app.post('/session', async (req, res) => {
  try {
    const token = await login();
    if (token) {
      const sessionId = await createSession(token, req.body);
      if (sessionId) {
        res.json({ sessionId });
      } else {
        res.status(500).json({ error: 'Failed to create session' });
      }
    } else {
      res.status(500).json({ error: 'Failed to authenticate' });
    }
  } catch (error) {
    console.error('Error en /session:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});