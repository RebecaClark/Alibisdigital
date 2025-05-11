
const express = require('express');
const router = express.Router();

router.post('/generate-alibi', async (req, res) => {
  try {
    const { type, recipient, content, date, time } = req.body;
    
    let generatedAlibi = {
      id: Date.now(),
      type,
      recipient,
      content,
      date,
      time,
      preview: null
    };

    if (type === 'whatsapp') {
      generatedAlibi.preview = {
        messages: [
          { type: 'sent', content: 'Oi, tudo bem?', time: '14:20' },
          { type: 'received', content: content, time },
        ]
      };
    } else if (type === 'audio') {
      generatedAlibi.preview = {
        duration: '0:30',
        transcript: content
      };
    }

    res.json({ success: true, alibi: generatedAlibi });
  } catch (error) {
    console.error('Erro ao gerar álibi:', error);
    res.status(500).json({ error: 'Erro ao gerar álibi' });
  }
});

module.exports = router;
