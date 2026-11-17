// İlk kurulum: geliştirme bağımlılıklarını güncel kararlı sürümleriyle ekler,
// lockfile'ı üretir ve tüm kontrolleri çalıştırır. Bir kez çalıştırılır;
// sonrasında yalnızca `pnpm install` yeterlidir.
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const run = (cmd) => {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
};

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
if (pkg.devDependencies && Object.keys(pkg.devDependencies).length > 0) {
  console.log('Bağımlılıklar zaten ekli. `pnpm install` çalıştırman yeterli.');
  process.exit(0);
}

let pnpmVersion;
try {
  pnpmVersion = execSync('pnpm --version').toString().trim();
} catch {
  console.error('pnpm bulunamadı. Önce: npm install -g pnpm@latest');
  process.exit(1);
}

run(`npm pkg set packageManager=pnpm@${pnpmVersion}`);
run(
  'pnpm add -Dw typescript eslint @eslint/js typescript-eslint eslint-config-prettier globals prettier vitest',
);
run('pnpm install');
run('pnpm format');
run('pnpm lint');
run('pnpm format:check');
run('pnpm typecheck');
run('pnpm test');

console.log('\nKurulum tamam. package.json ve pnpm-lock.yaml dosyalarını commit et.');
