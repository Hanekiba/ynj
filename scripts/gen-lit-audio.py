#!/usr/bin/env python3
"""为语文题目生成标准读音并自托管到 public/audio/。

覆盖：
- 认字（unit 以「识字」开头）：用 char 字段
- 词语（unit 为「课文」）：用 char 字段
- 拼读：用 answer（目标音节，如 ba）
- 声调：用 char（带调元音，如 ā）
- 标调：用 answer（带调元音，如 ǎ）
- 连线 / 字义：视觉连线/匹配题，不需发音，跳过

幂等：已存在且 >1KB 的 mp3 跳过；已带 audio 字段的行跳过。
生成：微软 edge-tts 神经女声（zh-CN-XiaoxiaoNeural），语速 -25%（比默认慢，适合一年级跟读）。
依赖：pip install edge-tts
用法：python scripts/gen-lit-audio.py [--dry-run]
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
RATE = "-25%"
DRY = "--dry-run" in sys.argv


def pick_text(topic: str, line: str):
    """根据 topic 选出要朗读的文本。返回 None 表示该题不需要发音。"""
    if topic == "拼读":
        m = re.search(r"answer: '([^']*)'", line)  # 目标音节，如 ba
        return m.group(1) if m else None
    if topic == "声调":
        m = re.search(r"char: '([^']*)'", line)  # 带调元音，如 ā（answer 是「一声」这类文字标签，不能读）
        return m.group(1) if m else None
    if topic == "标调":
        m = re.search(r"answer: '([^']*)'", line)  # 带调元音，如 ǎ（char 是 base 元音 a，没有调）
        return m.group(1) if m else None
    if topic in ("认字", "词语"):
        m = re.search(r"char: '([^']*)'", line)
        return m.group(1) if m else None
    # 连线 / 字义 等视觉题：跳过
    return None


def main() -> None:
    with open(DATA, encoding="utf-8") as f:
        lines = f.readlines()

    targets = []
    for i, line in enumerate(lines):
        if "subject: 'chinese'" not in line:
            continue
        if "audio:" in line:
            continue  # 已有 mp3，跳过
        mtop = re.search(r"topic: '([^']*)'", line)
        if not mtop:
            continue
        topic = mtop.group(1)
        text = pick_text(topic, line)
        if not text:
            continue
        mid = re.search(r"id: '([^']*)'", line)
        if not mid:
            continue
        targets.append((i, mid.group(1), text, topic))

    print(f"找到需生成读音的语文 activity: {len(targets)}")
    made = 0
    wired = 0
    for i, aid, text, topic in targets:
        out = os.path.join(PUB, aid + ".mp3")
        if not (os.path.exists(out) and os.path.getsize(out) > 1000):
            if DRY:
                print(f"[dry] 将生成 {aid}.mp3 <- {text!r} (topic={topic})")
            else:
                subprocess.run(
                    [sys.executable, "-m", "edge_tts", "--voice", VOICE, f"--rate={RATE}",
                     "--text", text, "--write-media", out],
                    check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                )
                made += 1
        if "audio:" not in lines[i]:
            # 在 prompt 前插入 audio 字段（每行必有 prompt），路径用绝对路径，
            # 运行时由前端 resolveAsset 拼上 BASE_URL（/ynj/），手机/桌面通用
            lines[i] = re.sub(
                r"(prompt: '[^']*')", r"audio: '/audio/%s.mp3', \1" % aid, lines[i], count=1
            )
            wired += 1

    if not DRY:
        with open(DATA, "w", encoding="utf-8") as f:
            f.writelines(lines)
    print(f"新生成 {made} 个音频；新写入 audio 字段 {wired} 处。" + (" [dry-run]" if DRY else ""))


if __name__ == "__main__":
    main()
