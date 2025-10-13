const express = require('express');
const app = express();
const PORT = 3000;

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Kartavya API is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Test server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}/health`);
});