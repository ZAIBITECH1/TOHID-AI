const handler = async (m, { conn }) => {
  const tips = [
    "💡 Tip: Start with small issues like typos or README edits!",
    "🚀 Tip: Always fork, branch, commit, and open a pull request.",
    "🛠️ Tip: Test your code locally before pushing changes!",
    "📦 Tip: Respect code style and use comments wisely!",
    "🧠 Tip: Open source is not just about code — you can help by reporting bugs, testing, or writing docs!"
  ];

  const quote = tips[Math.floor(Math.random() * tips.length)];

  const message = `
🛠️ *Contribute to Tohid-Ai Bot* 🛠️

Want to help improve Tohid-Ai Bot or learn how open-source works?

Here’s how to get started:
🔗 *GitHub:* https://github.com/Tohidkhan6332/TOHID-AI
📄 *Issues:* https://github.com/Tohidkhan6332/TOHID-AI/issues
📚 *Guide:* Read the README for setup & contributing steps

${quote}

💖 Every contribution counts — code, testing, docs, or ideas. Join us!
`.trim();

  await conn.sendMessage(m.chat, {
    text: message,
    contextInfo: {
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363200367779016@newsletter',
        newsletterName: 'Tohid Developer Guide🤖👑',
        serverMessageId: 143
      }
    }
  }, { quoted: m });
};

handler.help = ['contribute'];
handler.tags = ['info'];
handler.command = ['contribute', 'devguide', 'opensource'];

export default handler;
