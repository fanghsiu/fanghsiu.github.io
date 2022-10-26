@REM If there is no message suffix, the default commit message is "Initial commit"
@echo off
set info=%~1
if "%info%"=="" ( set info=Initial commit )
echo info
git add -A
git commit -m "%info%"
git push
pause