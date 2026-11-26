@echo off
setlocal enabledelayedexpansion
title Auto Push - zygopeta.github.io
rem ============================================================
rem  Blog one-click push (double-click this file on Windows)
rem
rem    push.bat                     sync pages + auto commit + push
rem    push.bat "fix header"        sync pages + custom commit message
rem    push.bat --no-sync           no sync, push existing changes only
rem
rem  Edit SRC below if the workspace folder has moved.
rem  Output is kept ASCII-only on purpose to avoid cmd encoding issues.
rem ============================================================

set "REPO=%~dp0"
set "REPO=%REPO:~0,-1%"
set "SRC=C:\Users\Syboe\WorkBuddy\2026-10-31-15-20-59\output"

rem ---- locate git.exe (portable WorkBuddy build first, then common paths) ----
set "GIT="
for %%P in (
  "D:\WorkBuddy\resources\vendor\PortableGit\mingw64\bin\git.exe"
  "C:\Program Files\Git\cmd\git.exe"
  "C:\Program Files\Git\bin\git.exe"
  "%LOCALAPPDATA%\Programs\Git\cmd\git.exe"
) do (
  if not defined GIT if exist "%%~P" set "GIT=%%~P"
)
if not defined GIT (
  where git >nul 2>&1 && set "GIT=git"
)
if not defined GIT (
  echo [ERROR] Cannot find git.exe. Edit the paths at the top of this script.
  goto :end
)

echo ============================================
echo  Repo: %REPO%
echo  git : %GIT%
echo ============================================

rem ---- args ----
set "NOSYNC=0"
set "MSG=%~1"
if /i "%~1"=="--no-sync" (
  set "NOSYNC=1"
  set "MSG=%~2"
)

rem ---- git identity check ----
"%GIT%" -C "%REPO%" config user.email >nul 2>&1
if errorlevel 1 (
  echo [ERROR] git identity not configured for this repo. Run:
  echo   "%GIT%" -C "%REPO%" config user.name zygopeta
  echo   "%GIT%" -C "%REPO%" config user.email your@email.com
  goto :end
)

rem ---- sync pages from workspace ----
if "%NOSYNC%"=="1" goto :skip_sync
if exist "%SRC%\integral-guide\index.html" (
  copy /Y "%SRC%\integral-guide\index.html"  "%REPO%\calculus-integral.html" >nul
  copy /Y "%SRC%\derivative-quiz\index.html" "%REPO%\calculus-quiz.html"    >nul
  if exist "%SRC%\integral-guide\vendor\tex-svg.js" (
    if not exist "%REPO%\vendor" mkdir "%REPO%\vendor"
    copy /Y "%SRC%\integral-guide\vendor\tex-svg.js" "%REPO%\vendor\tex-svg.js" >nul
  )
  echo [sync] pages copied from workspace
) else (
  echo [sync] source folder not found, skipping: %SRC%
  echo         use --no-sync or edit SRC in this script
)
:skip_sync

rem ---- stage & check ----
"%GIT%" -C "%REPO%" add -A
"%GIT%" -C "%REPO%" diff --cached --quiet
if not errorlevel 1 (
  echo Nothing to commit. Working tree is clean.
  goto :end
)
echo.
echo [changes]
"%GIT%" -C "%REPO%" diff --cached --stat
echo.

rem ---- commit ----
if "%MSG%"=="" (
  for /f "delims=" %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd_HH-mm"') do set "STAMP=%%i"
  set "MSG=Update site !STAMP!"
)
echo [commit] %MSG%
"%GIT%" -C "%REPO%" commit -m "%MSG%"
if errorlevel 1 goto :fail

rem ---- push with 3 retries (proxy 502 happens from time to time) ----
set "OK=0"
for /L %%i in (1,1,3) do if "!OK!"=="0" (
  echo [push] attempt %%i/3 ...
  "%GIT%" -C "%REPO%" push origin main
  if not errorlevel 1 (
    set "OK=1"
  ) else (
    timeout /t 2 /nobreak >nul
  )
)
if "!OK!"=="0" goto :fail

echo.
echo [OK] Pushed. Live in 1-2 minutes:
echo   https://zygopeta.github.io/
echo   https://zygopeta.github.io/calculus-integral.html
echo   https://zygopeta.github.io/calculus-quiz.html
goto :end

:fail
echo.
echo [FAILED] Push did not complete. Common causes:
echo   - proxy/VPN returns 502: switch node, then run this again
echo   - the commit is already saved locally, nothing is lost
echo   - manual command:
echo     "%GIT%" -C "%REPO%" push origin main

:end
echo.
pause
