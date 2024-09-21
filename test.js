const ollama = require('./service/ollama');
const groq = require('./service/groq');

async function main() {
  // console.log(await ollama.generateSync('Once upon a time, there was a'));

  console.log(await groq.generate('Once upon a time, there was a'));
}

main();