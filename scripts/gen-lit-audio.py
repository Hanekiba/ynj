#!/usr/bin/env python3
"""为语文「识字（认字）」与「课文（词语）」题目生成标准读音并自托管到 public/audio/。

约定（默认行为）：
- 凡 topic:'认字' 且 unit 以「识字」开头的 activity，都应带 audio 字段。
- 凡 topic:'词语' 且 unit 为「课文」的 activity，也应带 audio 字段（课文真人发音）。
- 新增识字/课文题后，跑一次本脚本即可补齐缺失的读音（幂等，已存在则跳过）。

生成：微软 edge-tts 神经女声（zh-CN-XiaoxiaoNeural），语速 -25%（比默认慢，适合一年级跟读）。
依赖：pip install edge-tts
用法：python scripts/gen-lit-audio.py
"""
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.abspath(os.path.join(HERE, ".."))
DATA = os.path.join(APP, "src", "data.ts")
PUB = os.path.join(APP, "public", "audio")
os.makedirs(PUB, exist_ok=True)

VOICE = "zh-CN-XiaoxiaoNeural"
RATE = "-25%"  # 比默认慢 25%，适合一年级跟读


def main() -> None:
    with open(DATA, encoding="utf-8") as f:
        lines = f.readlines()

    targets = []
    for i, line in enumerate(lines):
        is_lit = "topic: '认字'" in line and "unit: '识字" in line
        is_text = "topic: '词语'" in line and "unit: '课文'" in line
        if is_lit or is_text:
            mid = re.search(r"id: '([^']*)'", line)
            mc = re.search(r"char: '([^']*)'", line)
            if mid and mc:
                targets.append((i, mid.group(1), mc.group(1)))

    print(f"找到识字 activity: {len(targets)}")
    made = 0
    for i, aid, ch in targets:
        out = os.path.join(PUB, aid + ".mp3")
        if os.path.exists(out) and os.path.getsize(out) > 1000:
            continue
        subprocess.run(
            [sys.executable, "-m", "edge_tts", "--voice", VOICE, f"--rate={RATE}",
             "--text", ch, "--write-media", out],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        made += 1
        if "audio:" not in lines[i]:
            lines[i] = re.sub(r"(char: '[^']*')", r"\1, audio: '/audio/%s.mp3'" % aid, lines[i], count=1)

    with open(DATA, "w", encoding="utf-8") as f:
        f.writelines(lines)
    print(f"新生成 {made} 个音频；其余已存在跳过。")


if __name__ == "__main__":
    main()
