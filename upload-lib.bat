@echo off

SET source=%cd%\library
SET defaultTarget=C:\xampp\htdocs\library4
SET url=https://github.com/austinrtn/library4/archive/refs/heads/main.zip

SET /p ans=Are you sure you want to commit changes to 'library'? [y/n]
IF NOT %ans%==y exit

ECHO Testing Connection...
ping -n 1 github.com >nul
if errorlevel 1 (
echo Failure to connect to: github.com
pause
exit
) else ECHO Success 
ECHO . 
ECHO .

SET /p target=Library Source Path: 

IF "%target%"=="" (set target=%defaultTarget%)

cd %target%

rmdir /s /q library
mkdir library

git pull

robocopy "%source%" "%target%"\library /E /DCOPY:DAT /COPY:DAT /R:5 /W:10

git add -A && git commit -m "Uploaded from %source%"
git push

pause


