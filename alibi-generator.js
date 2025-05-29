const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const fs = require('fs').promises;
const cors = require('cors');
require('dotenv').config();

router.use(cors({
  origin: 'http://localhost:8000',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type'],
}));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ALIBIS_FILE = './alibis.json';

async function initAlibisFile() {
  try {
    await fs.access(ALIBIS_FILE);
  } catch {
    await fs.writeFile(ALIBIS_FILE, JSON.stringify([]));
  }
}
initAlibisFile();

router.post('/generate-alibi', async (req, res) => {
  try {
    const { type, recipient, content, date, time, format } = req.body;

    if (!type || !recipient || !content || !format) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
    }

    const validTypes = ['pessoal', 'profissional', 'social', 'familiar', 'emergência', 'acadêmica'];
    const validFormats = ['whatsapp', 'audio', 'email', 'pdf', 'sms'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Tipo de desculpa inválido' });
    }
    if (!validFormats.includes(format)) {
      return res.status(400).json({ error: 'Formato inválido' });
    }

    const prompt = `
      Crie um álibi realista em português brasileiro para:
      - Destinatário: ${recipient}
      - Motivo real: ${content}
      - Tipo: ${type}
      - Formato: ${format}
      - Data: ${date || '29/05/2025'}
      - Hora: ${time || '16:57'}
      Use tom natural, gírias sutis, e contexto brasileiro. Mantenha curto e convincente.
      - WhatsApp: mensagem curta.
      - Áudio: transcrição de 30s.
      - E-mail: formato formal com assunto e corpo.
      - PDF: texto para documento.
      - SMS: mensagem curta e direta.
    `;

    let aiContent;
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
        temperature: 0.7,
      });
      aiContent = response.choices[0].message.content.trim();
    } catch (apiError) {
      console.error('Erro na API OpenAI:', apiError);
      return res.status(500).json({ error: 'Falha ao chamar API de IA' });
    }

    let generatedAlibi = {
      id: Date.now(),
      type,
      recipient,
      content: aiContent,
      date: date || '2025-05-29',
      time: time || '16:57',
      format,
      createdAt: new Date().toISOString(),
      preview: null,
    };

    if (format === 'whatsapp') {
      generatedAlibi.preview = {
        messages: [
          { type: 'sent', content: 'Oi, tudo bem?', time: time || '16:57' },
          { type: 'received', content: aiContent, time: time || '16:59' },
        ],
      };
    } else if (format === 'audio') {
      generatedAlibi.preview = {
        duration: '0:30',
        transcript: aiContent,
      };
    } else if (format === 'email') {
      generatedAlibi.preview = {
        subject: `Assunto: ${type.charAt(0).toUpperCase() + type.slice(1)}`,
        body: aiContent,
      };
    } else if (format === 'pdf') {
      generatedAlibi.preview = {
        document: aiContent,
      };
    } else if (format === 'sms') {
      generatedAlibi.preview = {
        message: aiContent,
      };
    }

    try {
      const alibis = JSON.parse(await fs.readFile(ALIBIS_FILE));
      alibis.push(generatedAlibi);
      await fs.writeFile(ALIBIS_FILE, JSON.stringify(alibis, null, 2));
      console.log('Álibi salvo:', generatedAlibi.id);
    } catch (fileError) {
      console.error('Erro ao salvar álibi:', fileError);
      return res.status(500).json({ error: 'Erro ao salvar álibi' });
    }

    res.json({ success: true, alibi: generatedAlibi });
  } catch (error) {
    console.error('Erro ao gerar álibi:', error);
    res.status(500).json({ error: 'Erro ao gerar álibi' });
  }
});

router.get('/get-alibis', async (req, res) => {
  try {
    const alibis = JSON.parse(await fs.readFile(ALIBIS_FILE));
    res.json({ success: true, alibis });
  } catch (error) {
    console.error('Erro ao recuperar álibis:', error);
    res.status(500).json({ error: 'Erro ao recuperar álibis' });
  }
});

router.delete('/delete-alibi/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let alibis = JSON.parse(await fs.readFile(ALIBIS_FILE));
    const initialLength = alibis.length;
    alibis = alibis.filter(alibi => alibi.id !== parseInt(id));
    if (alibis.length === initialLength) {
      return res.status(404).json({ error: 'Álibi não encontrado' });
    }
    await fs.writeFile(ALIBIS_FILE, JSON.stringify(alibis, null, 2));
    console.log('Álibi excluído:', id);
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir álibi:', error);
    res.status(500).json({ error: 'Erro ao excluir álibi' });
  }
});

router.put('/update-alibi/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, recipient, content, date, time, format } = req.body;

    if (!type || !recipient || !content || !format) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
    }

    const validTypes = ['pessoal', 'profissional', 'social', 'familiar', 'emergência', 'acadêmica'];
    const validFormats = ['whatsapp', 'audio', 'email', 'pdf', 'sms'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Tipo de desculpa inválido' });
    }
    if (!validFormats.includes(format)) {
      return res.status(400).json({ error: 'Formato inválido' });
    }

    let alibis = JSON.parse(await fs.readFile(ALIBIS_FILE));
    const index = alibis.findIndex(alibi => alibi.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ error: 'Álibi não encontrado' });
    }

    const updatedAlibi = {
      ...alibis[index],
      type,
      recipient,
      content,
      date: date || alibis[index].date,
      time: time || alibis[index].time,
      format,
      updatedAt: new Date().toISOString(),
    };

    alibis[index] = updatedAlibi;
    await fs.writeFile(ALIBIS_FILE, JSON.stringify(alibis, null, 2));
    console.log('Álibi atualizado:', id);
    res.json({ success: true, alibi: updatedAlibi });
  } catch (error) {
    console.error('Erro ao atualizar álibi:', error);
    res.status(500).json({ error: 'Erro ao atualizar álibi' });
  }
});

module.exports = router;
