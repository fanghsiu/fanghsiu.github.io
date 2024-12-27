---
title: 包含 MarkDown 文件
hide: all
---

---

### 包含 MarkDown 文件

---

```bat
@REM If there is no message suffix, the default commit message is "Initial commit"
@echo off
set info=%~1
if "%info%"=="" (
    ::set info=update time: %date% %time%
    set info=Initial commit
)
git add -A
git commit -m "%info%"
git push
```

```sh
#!/bin/bash
# 如果没有消息后缀，默认提交信息为 `:pencil: update content`
info=$1
if ["$info" = ""];
#then info="update time: $(date "+%Y-%m-%d %H:%M:%S")"
then info="Initial commit"
fi
git add -A
git commit -m "$info"
git push

```