import express from 'express';
import cors from 'cors';
import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = 3000;
const hf = new HfInference(process.env.HF_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
    const { input } = req.body;
    try {
        const response = await hf.textGeneration({
            model: 'mistralai/Mistral-7B-Instruct-v0.3',
            inputs: input,
            parameters: {
                max_length: 100,
                num_return_sequences: 1
            }
        });
        res.json(response);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
