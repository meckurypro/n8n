const { spawn } = require('child_process');
const path = require('path');

module.exports = (req, res) => {
  // Set up n8n environment
  process.env.N8N_USER_FOLDER = '/tmp/.n8n';
  process.env.N8N_PROTOCOL = 'https';
  process.env.WEBHOOK_URL = `https://${req.headers.host}/`;
  
  // Import and start n8n
  try {
    const n8nPath = path.join(__dirname, '../packages/cli/dist/index.js');
    require(n8nPath);
  } catch (error) {
    console.error('Error starting n8n:', error);
    res.status(500).json({ error: 'Failed to start n8n' });
  }
};
