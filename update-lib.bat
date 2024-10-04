@echo off

set url=https://github.com/austinrtn/library4/archive/refs/heads/main.zip

ECHO pinging github...
ping -n 1 github.com >nul
if errorlevel 1 (
echo Failure to connect to: github.com
pause
exit
) else ECHO success 
ECHO . 
ECHO .

rmdir library /s /q

wget %url%

IF NOT EXIST main.zip (
ECHO There was an issue downloading the file...
PAUSE
EXIT
) ELSE ECHO Download Complete

powershell Expand-Archive main.zip

del "main.zip"

robocopy "main/library4-main/library" "library" /E /DCOPY:DAT /COPY:DAT /R:5 /W:10

rmdir /s /q main

echo Library Updated!

