---
layout: post
title: 被包含 MarkDown 文件
hide: all
---

## 包含 MarkDown 文件

- `Initial commit`
- `:pencil: update content`
- `update time: %date% %time%` 适用Batch
- `update time: $(date)` 适用Shell

```bat
@echo off
@REM 如果没有消息后缀，默认提交信息为 "update time: %date% %time%"
set info=%~1
if not defined info set info="update time: %date% %time%"
git add -A
git commit -m "%info%"
git push
```

```sh
#!/bin/bash
# 如果没有消息后缀，默认提交信息为 "update time: $(date)"
info="${1:-update time: $(date)}"
git add -A
git commit -m "$info"
git push
```

---
