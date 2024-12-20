@echo off
SET url=https://github.com/austinrtn/library4/archive/refs/heads/main.zip

ECHO Testing Connection...
ping -n 1 github.com >nul
if errorlevel 1 (
echo Failure to connect to: github.com
pause
exit
) else ECHO Success 
ECHO . 
ECHO .

SET /p dir=DIRECTORY: 

IF NOT EXIST %dir% (mkdir %dir%)

cd %dir%

ECHO Downloading Library...

powershell Invoke-Webrequest %url% -OutFile main.zip

IF NOT EXIST main.zip (
ECHO There was an issue downloading the file...
PAUSE
EXIT
) ELSE ECHO Download Complete

powershell Expand-Archive main.zip

del "main.zip"

robocopy "main/library4-main/" "%cd%" /E /DCOPY:DAT /COPY:DAT /R:5 /W:10

rmdir /s /q main

del "install-lib.bat"

SET /p startApache=Start Apache?[y/n]

IF %startApache%==y start C:/xampp/apache_start.bat

start https://localhost/%dir%/

