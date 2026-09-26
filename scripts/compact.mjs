// Compiles every contract in contract/src/*.compact (and contract/src/spike/*.compact)
// into contract/src/managed/<name>.
//
// Uses the `compact` toolchain if it is on PATH (Linux / macOS / WSL). On Windows without
// it, falls back to the pinned Linux compactc binary in tools/ run inside an Alpine container.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const COMPACTC_VERSION = '0.31.1';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'contract', 'src');
const only = process.argv[2]; // optional: compile a single contract by name
const skipZk = process.argv.includes('--skip-zk');

const sources = [
  ...readdirSync(srcDir).filter((f) => f.endsWith('.compact')).map((f) => join('contract', 'src', f)),
  ...(existsSync(join(srcDir, 'spike'))
    ? readdirSync(join(srcDir, 'spike')).filter((f) => f.endsWith('.compact')).map((f) => join('contract', 'src', 'spike', f))
    : []),
].filter((f) => !only || basename(f, '.compact') === only);

if (sources.length === 0) {
  console.error(only ? `No contract named ${only}` : 'No .compact sources found');
  process.exit(1);
}

// Windows ships an unrelated compact.exe (NTFS compression), so match the Midnight
// toolchain's own version banner instead of trusting the exit code.
const probe = spawnSync('compact', ['--version'], { shell: false, encoding: 'utf8' });
const hasNative = probe.status === 0 && /^compact\s+\d+\.\d+/m.test(probe.stdout ?? '');
const toolsDir = join(root, 'tools', `compactc-${COMPACTC_VERSION}`);

const posix = (p) => p.replace(/\\/g, '/');

for (const src of sources) {
  const name = basename(src, '.compact');
  const out = join('contract', 'src', 'managed', name);
  rmSync(join(root, out), { recursive: true, force: true });
  mkdirSync(join(root, out), { recursive: true });
  const flags = skipZk ? ['--skip-zk'] : [];
  console.log(`\n▶ compiling ${posix(src)} → ${posix(out)}${skipZk ? ' (skip-zk)' : ''}`);

  let result;
  if (hasNative) {
    result = spawnSync('compact', ['compile', `+${COMPACTC_VERSION}`, ...flags, src, out], { cwd: root, stdio: 'inherit' });
  } else {
    if (!existsSync(join(toolsDir, 'compactc.bin'))) {
      console.error(
        `compactc ${COMPACTC_VERSION} not found. Install the compact toolchain, or run:\n` +
          `  gh release download compactc-v${COMPACTC_VERSION} -R midnightntwrk/compact -p "*x86_64-unknown-linux-musl.zip" -D tools\n` +
          `  and unzip it into tools/compactc-${COMPACTC_VERSION}`,
      );
      process.exit(1);
    }
    const script =
      'apk add --no-cache libgcc libstdc++ gcompat bash >/dev/null 2>&1 && ' +
      'chmod +x /opt/compactc/* && PATH=/opt/compactc:$PATH ' +
      `/opt/compactc/compactc ${flags.join(' ')} /work/${posix(src)} /work/${posix(out)}`;
    result = spawnSync(
      'docker',
      ['run', '--rm', '-v', `${posix(root)}:/work`, '-v', `${posix(toolsDir)}:/opt/compactc`, '-w', '/work',
        '--entrypoint', '/bin/sh', 'alpine:3.20', '-c', script],
      { stdio: 'inherit' },
    );
  }
  if (result.status !== 0) {
    console.error(`✖ ${name} failed to compile`);
    process.exit(result.status ?? 1);
  }
  console.log(`✔ ${name}`);
}
