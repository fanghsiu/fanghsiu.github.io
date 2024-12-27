#!/bin/bash
# 如果没有消息后缀，默认提交信息为 `:pencil: update content`
info=$1
if ["$info" = ""];
# then info="update time: $(date "+%Y-%m-%d %H:%M:%S")"
# then info="Initial commit"
then info=":pencil: update content"
fi
git add -A
git commit -m "$info"
git push
