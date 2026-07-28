// 一键部署到 GitHub Pages：
//   1) 下载/校验拼音音频 (fetch-audio)
//   2) vite build（按项目站点注入 BASE_PATH）
//   3) 复制 index.html -> 404.html（SPA 刷新回退）
//   4) 推送到 gh-pages 分支
//
// base 推断优先级：
//   env.BASE_PATH  >  env.GITHUB_REPO(仓库名)  >  git remote origin 解析  >  回退为 '/'（用户站点）
import { spawnSync } from 'node:child_process';
import { existsSync, copyFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..'); // app/
const distDir = join(root, 'dist');

// Windows 下 npm/npx 是 .cmd，需走 shell；路径含空格时手动加引号
function sh(cmd, args = [], env) {
  const q = (s) => /["\s]/.test(s) ? '"' + s + '"' : s;
  const command = [cmd, ...args].map(q).join(' ');
  const r = spawnSync(command, {
    cwd: root,
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, ...(env || {}) },
  });
  if (r.status !== 0) {
    console.error(`[deploy] 命令失败: ${command}`);
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
    '[deploy] 未检测到 git remote，也未设置 GITHUB_REPO / BASE_PATH，按「用户站点」部署（base = /）。\n' +
      '        如需项目站点，请先 `git remote add origin git@github.com:<用户>/<仓库>.git`，或设置环境变量 GITHUB_REPO=<仓库名>。'
  );
  return '/';
}

function main() {
  const base = resolveBase();
  console.log(`[deploy] BASE_PATH = ${base}`);

  console.log('[deploy] 1/4 下载/校验拼音音频 ...');
  sh('node', [join(__dirname, 'fetch-audio.mjs')]);

  console.log('[deploy] 2/4 构建生产包 (vite build) ...');
  sh('npm', ['run', 'build'], { BASE_PATH: base });

  console.log('[deploy] 3/4 生成 404.html (SPA 回退) ...');
  mkdirSync(distDir, { recursive: true });
  copyFileSync(join(distDir, 'index.html'), join(distDir, '404.html'));

  console.log('[deploy] 4/4 推送到 gh-pages 分支 ...');
  // 用 npm exec 解析 node_modules/.bin/gh-pages，跨平台更稳
  sh('npm', ['exec', '--', 'gh-pages', '-d', 'dist']);

  const remote = getRemote();
  console.log('\n[deploy] ✅ 部署完成！');
  if (remote) {
    const url = base === '/' ? `https://${remote.user}.github.io/` : `https://${remote.user}.github.io/${remote.repo}/`;
    console.log(`[deploy] 线上地址（在仓库 Settings -> Pages 启用 gh-pages 分支后约 1 分钟生效）: ${url}`);
  } else {
    console.log('[deploy] 未解析到 GitHub 用户名/仓库，请自行在仓库 Settings -> Pages 选择 gh-pages 分支、/ (root)。');
  }
}

main();
