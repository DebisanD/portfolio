const https = require('https');

/**
 * Sends real-time message notification to Telegram bot
 */
async function sendTelegramAlert({ name, email, subject, message }) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log('ℹ️ [Telegram Alert] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured in env. Skipping Telegram alert.');
    return false;
  }

  const text = `📩 *NEW PORTFOLIO MESSAGE*\n\n` +
    `👤 *From:* ${name} (${email})\n` +
    `📌 *Subject:* ${subject || 'General Inquiry'}\n\n` +
    `💬 *Message:*\n${message}\n\n` +
    `🌐 *Source:* https://debisa-daricha-portfolio.vercel.app`;

  try {
    const postData = JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'Markdown'
    });

    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${botToken}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', chunk => { responseBody += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`✅ [Telegram Alert] Direct message alert sent to Telegram chat ${chatId}`);
        } else {
          console.error(`⚠️ [Telegram Alert Error] Telegram API returned status ${res.statusCode}:`, responseBody);
        }
      });
    });

    req.on('error', (e) => {
      console.error('❌ [Telegram Alert Network Error]:', e);
    });

    req.write(postData);
    req.end();
    return true;
  } catch (err) {
    console.error('❌ [Telegram Alert Exception]:', err);
    return false;
  }
}

module.exports = { sendTelegramAlert };
