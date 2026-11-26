#!/usr/bin/env bash
# ============================================================
# 博客一键推送（Git Bash / 命令行版）
#
#   ./push.sh                      同步页面 + 自动时间戳提交 + 推送
#   ./push.sh "修了首页样式"        同步页面 + 自定义提交信息
#   ./push.sh --no-sync            不同步，只推仓库里已有的改动
#   ./push.sh --no-sync "消息"      不同步 + 自定义提交信息
#
# 默认会把工作区 output/ 下的两个页面同步进仓库。
# 若工作区路径变了，用环境变量 WB_SRC 覆盖：
#   WB_SRC=/other/path/output ./push.sh
# ============================================================
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="${WB_SRC:-C:/Users/Syboe/WorkBuddy/2026-10-31-15-20-59/output}"

NO_SYNC=0
MSG=""
for a in "$@"; do
  case "$a" in
    --no-sync) NO_SYNC=1 ;;
    *) MSG="$a" ;;
  esac
done

echo "============================================"
echo " 仓库: $REPO"
echo "============================================"

# 0) 检查 git 身份（仓库级配置，换设备 clone 后要重设）
if ! git -C "$REPO" config user.email >/dev/null 2>&1; then
  echo "[错误] 仓库未配置 git 身份，请先执行："
  echo "  git -C \"$REPO\" config user.name zygopeta"
  echo "  git -C \"$REPO\" config user.email 你的邮箱"
  exit 1
fi

# 1) 同步工作区页面（可选）
if [ "$NO_SYNC" -eq 0 ]; then
  if [ -f "$SRC/integral-guide/index.html" ] && [ -f "$SRC/derivative-quiz/index.html" ]; then
    cp "$SRC/integral-guide/index.html"   "$REPO/calculus-integral.html"
    cp "$SRC/derivative-quiz/index.html"  "$REPO/calculus-quiz.html"
    if [ -f "$SRC/integral-guide/vendor/tex-svg.js" ]; then
      mkdir -p "$REPO/vendor"
      cp "$SRC/integral-guide/vendor/tex-svg.js" "$REPO/vendor/tex-svg.js"
    fi
    echo "[同步] 两个页面已复制到仓库"
  else
    echo "[同步] 未找到工作区源文件，跳过：$SRC"
    echo "        （可用 WB_SRC 指定，或加 --no-sync）"
  fi
else
  echo "[同步] 已跳过（--no-sync）"
fi

# 2) 检查改动
git -C "$REPO" add -A
if git -C "$REPO" diff --cached --quiet; then
  echo "没有改动，无需推送。"
  exit 0
fi
echo
echo "[改动文件]"
git -C "$REPO" diff --cached --stat
echo

# 3) 提交
if [ -z "$MSG" ]; then
  MSG="更新博客内容 $(date '+%Y-%m-%d %H:%M')"
fi
echo "[提交] $MSG"
git -C "$REPO" commit -m "$MSG"

# 4) 推送（代理偶发 502，重试 3 次）
OK=0
for i in 1 2 3; do
  echo "[推送] 第 $i/3 次 ..."
  if git -C "$REPO" push origin main; then
    OK=1
    break
  fi
  [ "$i" -lt 3 ] && sleep 2
done

if [ "$OK" -ne 1 ]; then
  echo
  echo "[失败] 推送没成功。常见原因：代理/VPN 返回 502、网络抖动。"
  echo "        网络恢复后重新运行本脚本即可（提交已在本地，不会丢）。"
  echo "        也可手动执行： git -C \"$REPO\" push origin main"
  exit 1
fi

echo
echo "[完成] 已推送。线上通常 1-2 分钟内生效："
echo "  https://zygopeta.github.io/"
echo "  https://zygopeta.github.io/calculus-integral.html"
echo "  https://zygopeta.github.io/calculus-quiz.html"
