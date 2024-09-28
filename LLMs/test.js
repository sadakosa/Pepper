const ollama = require('../services/ollama');
const groq = require('../services/groq');
const calendar = require('../services/calendar');

async function main() {
  // console.log(await ollama.generateSync('Once upon a time, there was a'));
  // console.log(await groq.generate('Once upon a time, there was a'));
  // await calendar.addEvent('2021-01-01, 12:00, 13:00, Meeting with John Doe');
  // await calendar.addEvent('2021-01-02, 12:00, 13:00, Meeting with Jane Doe');
  const res = await calendar.getAll();
  console.log(res);
}

main();