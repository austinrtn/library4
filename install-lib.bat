@echo off
SET url=https://github.com/austinrtn/library4/archive/refs/heads/main.zip

SET /p dir=DIRECTORY: 

IF NOT EXIST %dir% (mkdir %dir%)

cd %dir%

wget %url%

powershell Expand-Archive main.zip

del "main.zip"

robocopy "main/library4-main/" "%cd%" /E /DCOPY:DAT /COPY:DAT /R:5 /W:10

rmdir /s /q main

del "install-lib.bat"

start https://localhost/%dir%/
