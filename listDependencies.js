const fs = require('fs');
const path = require('path');
function getFiles(dir) {
  return fs.readdirSync(dir).flatMap(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) return getFiles(p);
    if (p.endsWith('.tsx') || p.endsWith('.ts')) return [p];
    return [];
  });
}
const baseDir = './components';
const files = getFiles(baseDir);
const tree = {};
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const imports = [...content.matchAll(/from ['"](.+?)['"]/g)].map(m => m[1]);
  tree[file] = imports.filter(i => i.startsWith('@/components') || i.startsWith('./') || i.startsWith('../'));
});
console.log(JSON.stringify(tree, null, 2));
