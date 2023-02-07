import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

//Si no existe el puerto en el archivo .env, se sale del proceso
if(!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

