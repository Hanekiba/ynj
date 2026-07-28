// 下载拼音认读题的外部音频到本地，避免 GitHub Pages(HTTPS) 拦截 http 混合内容。
// 幂等：已存在的文件跳过；下载成功的链接才改写为同源 /audio/pinyin/* 路径。
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..'); // app/
const dataTs = join(root, 'src', 'data.ts');
const audioDir = join(root, 'public', 'audio', 'pinyin');
const HTTP_BASE = 'http://du.hanyupinyin.cn/du/pinyin/';

async function download(url, outFile) {
  if (existsSync(outFile)) return true;
  const res = await fetch(url);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(outFile, buf);
  return true;
}

async function main() {
  mkdirSync(audioDir, { recursive: true });
  const content = readFileSync(dataTs, 'utf8');
  const re = new RegExp(HTTP_BASE + "([^'\"]+)", 'g');
  const found = new Set();
  let m;
  while ((m = re.exec(content))) found.add(m[1]);

  if (found.size === 0) {
    console.log('[fetch-audio] 未发现外部拼音音频链接，已是本地路径，无需下载。');
    return;
  }

  console.log(`[fetch-audio] 发现 ${found.size} 个外部拼音音频，开始下载到 public/audio/pinyin/ ...`);
  const replacements = new Map();
  let ok = 0;
  let fail = 0;
  for (const bn of [...found].sort()) {
    const url = HTTP_BASE + bn;
    const outFile = join(audioDir, bn);
    try {
      await download(url, outFile);
      replacements.set(url, '/audio/pinyin/' + bn);
      ok++;
      if (ok % 10 === 0) console.log(`[fetch-audio] 进度 ${ok}/${found.size}`);
    } catch (e) {
      console.warn(`[fetch-audio] 下载失败: ${url} -> ${e.message}`);
      fail++;
    }
  }

  // 仅把下载成功的链接改写为本地同源路径，失败的保留原 http（便于本地仍可听）
  let newContent = content;
  for (const [url, local] of replacements) newContent = newContent.split(url).join(local);
  if (newContent !== content) writeFileSync(dataTs, newContent);

  console.log(`[fetch-audio] 完成：成功 ${ok}，失败 ${fail}。`);
  if (fail > 0) {
    console.warn('[fetch-audio] 有失败项，对应题目音频仍指向 http 地址（本地可用，线上会被拦截）。请检查网络后重跑 `npm run fetch-audio`。');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
