@echo off

rmdir library /s /q

wget https://github.com/austinrtn/library4/archive/refs/heads/main.zip
powershell Expand-Archive main.zip

del "main.zip"

robocopy "main/library4-main/library" "library" /E /DCOPY:DAT /COPY:DAT /R:5 /W:10

rmdir /s /q main

echo Library Updated!

