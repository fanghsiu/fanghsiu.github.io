@REM 如果没有消息后缀，默认提交信息为 Initial commit
@echo off
set info=%1
if "%info%"=="" ( set info=Initial commit )
git add -A
git commit -m "%info%"
git push
pause