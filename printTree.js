const fs = require('fs');
const deps = JSON.parse(fs.readFileSync('componentDeps.json','utf8'));
for (const [file, imports] of Object.entries(deps)) {
  console.log(file);
  imports.forEach(i => console.log('  - ' + i));
}
