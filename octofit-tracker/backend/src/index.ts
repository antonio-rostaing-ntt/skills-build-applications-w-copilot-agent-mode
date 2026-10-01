import express from 'express';
import database from './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

async function startServer() {
  try {
    await database.asPromise();
    app.listen(port, () => {
      console.log(`OctoFit API listening on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to start OctoFit API:', error);
    process.exit(1);
  }
}

void startServer();