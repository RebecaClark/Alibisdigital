const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Configurar variáveis de ambiente
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = "XB0fDUnXU5powFXDhCwa"; // ID da voz masculina em português BR (padrão)

// Rota para gerar áudio de texto usando ElevenLabs
router.post('/text-to-speech', async (req, res) => {
  try {
    const { text, voice_id = VOICE_ID } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Texto é obrigatório' });
    }
    
    if (!ELEVENLABS_API_KEY) {
      return res.status(500).json({ error: 'API Key do ElevenLabs não configurada' });
    }
    
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      }
    );
    
    if (!response.ok) {
      const error = await response.json();
      console.error('Erro na API ElevenLabs:', error);
      return res.status(response.status).json({ error: 'Erro ao gerar áudio', details: error });
    }
    
    // Criar diretório de áudios se não existir
    const audioDir = path.join(__dirname, '../../public/audios');
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }
    
    // Gerar nome único para o arquivo
    const fileName = `audio_${Date.now()}.mp3`;
    const filePath = path.join(audioDir, fileName);
    
    // Salvar o áudio como arquivo
    const buffer = await response.buffer();
    fs.writeFileSync(filePath, buffer);
    
    // Retornar URL do áudio
    const audioUrl = `/audios/${fileName}`;
    res.json({ success: true, audioUrl });
    
  } catch (error) {
    console.error('Erro ao gerar áudio:', error);
    res.status(500).json({ error: 'Erro ao processar requisição', details: error.message });
  }
});

// Rota para listar vozes disponíveis
router.get('/voices', async (req, res) => {
  try {
    if (!ELEVENLABS_API_KEY) {
      return res.status(500).json({ error: 'API Key do ElevenLabs não configurada' });
    }
    
    const response = await fetch(
      'https://api.elevenlabs.io/v1/voices',
      {
        headers: {
          'Accept': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY
        }
      }
    );
    
    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ error: 'Erro ao listar vozes', details: error });
    }
    
    const data = await response.json();
    res.json(data);
    
  } catch (error) {
    console.error('Erro ao listar vozes:', error);
    res.status(500).json({ error: 'Erro ao processar requisição', details: error.message });
  }
});

module.exports = router;