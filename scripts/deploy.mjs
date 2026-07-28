import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Move gh-pages clone cache out of node_modules so the git add inside its
// temp repo is not blocked by .gitignore (gh-pages v6 caches under
// node_modules/.cache, which is ignored by this project's .gitignore).
process.env.CACHE_DIR = join(os.homedir(), '.ghpages-cache');

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..'); // app/
const distDir = join(root, 'dist');

// On Windows npm/npx resolve to .cmd, so we must run via shell.
// Quote any argument that contains a space.
function sh(cmd, args = [], env) {
  const q = (s) => (/["\s]/.test(s) ? '"' + s + '"' : s);
  const command = [cmd, ...args].map(q).join(' ');
  const r = spawnSync(command, {
    cwd: root,
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, ...(env || {}) },
  });
  if (r.status !== 0) {
    console.error(`[deploy] command failed: ${command}`);
    process.exit(r.status || 1);
  }
}

function getRemote() {
  const r = spawnSync('git', ['remote', 'get-url', 'origin'], {
    cwd: root,
    encoding: 'utf8',
    shell: true,
  });
  if (r.status !== 0 || !r.stdout) return null;
  const m = r.stdout.trim().match(/github\.com[:/]([^/]+)\/(.+?)(?:\.git)?$/);
  return m ? { user: m[1], repo: m[2] } : null;
}

function resolveBase() {
  if (process.env.BASE_PATH) return process.env.BASE_PATH;
  if (process.env.GITHUB_REPO) return '/' + process.env.GITHUB_REPO.replace(/^\/|\/$/g, '') + '/';
  const remote = getRemote();
  if (remote) return '/' + remote.repo + '/';
  console.warn(
    '[deploy] No git remote detected and no GITHUB_REPO/BASE_PATH env set; ' +
      'deploying as a user site (base = /). For a project site, run: ' +
      '`git remote add origin git@github.com:<user>/<repo>.git` or set GITHUB_REPO=<repo>.'
  );
  return '/';
}

function main() {
  const base = resolveBase();
  console.log(`[deploy] BASE_PATH = ${base}`);

  console.log('[deploy] 1/4 fetching/verifying pinyin audio ...');
  sh('node', [join(__dirname, 'fetch-audio.mjs')]);

  console.log('[deploy] 2/4 building production bundle (vite build) ...');
  sh('npm', ['run', 'build'], { BASE_PATH: base });

  console.log('[deploy] 3/4 generating 404.html (SPA fallback) ...');
  mkdirSync(distDir, { recursive: true });
  copyFileSync(join(distDir, 'index.html'), join(distDir, '404.html'));

  console.log('[deploy] 4/4 pushing to gh-pages branch ...');
  sh('npm', ['exec', '--', 'gh-pages', '-d', 'dist']);

  const remote = getRemote();
  console.log('\n[deploy] Deploy complete!');
  if (remote) {
    const url =
      base === '/'
        ? `https://${remote.user}.github.io/`
        : `https://${remote.user}.github.io/${remote.repo}/`;
    console.log(
      `[deploy] Live URL (enable gh-pages branch in repo Settings -> Pages, ~1 min): ${url}`
    );
  } else {
    console.log(
      '[deploy] Could not detect GitHub user/repo; pick the gh-pages branch in repo Settings -> Pages / (root).'
    );
  }
}

main();
