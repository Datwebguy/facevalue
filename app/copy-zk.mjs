// Copies the compiled proving keys and circuits into public/ so the browser can fetch them.
import { cpSync, mkdirSync } from 'node:fs';
for (const name of ['facevalue', 'tkrw']) {
  for (const sub of ['keys', 'zkir']) {
    mkdirSync(`public/${name}/${sub}`, { recursive: true });
    cpSync(`../contract/src/managed/${name}/${sub}`, `public/${name}/${sub}`, { recursive: true });
  }
}
console.log('zk assets copied to public/');
