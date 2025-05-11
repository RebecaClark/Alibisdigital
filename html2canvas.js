const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Rota para salvar capturas de tela
router.post('/save-screenshot', async (req, res) => {
  try {
    const { base64Image } = req.body;
    
    if (!base64Image) {
      return res.status(400).json({ error: 'A imagem em base64 é obrigatória' });
    }
    
    // Remover cabeçalho da string base64 (ex: 'data:image/png;base64,')
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    
    // Criar diretório de imagens se não existir
    const screenshotsDir = path.join(__dirname, '../../public/screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    
    // Gerar nome único para o arquivo
    const fileName = `screenshot_${Date.now()}.png`;
    const filePath = path.join(screenshotsDir, fileName);
    
    // Salvar a imagem como arquivo
    fs.writeFileSync(filePath, base64Data, { encoding: 'base64' });
    
    // Retornar URL da imagem
    const imageUrl = `/screenshots/${fileName}`;
    res.json({ success: true, imageUrl });
    
  } catch (error) {
    console.error('Erro ao salvar captura de tela:', error);
    res.status(500).json({ error: 'Erro ao processar requisição', details: error.message });
  }
});

module.exports = router;