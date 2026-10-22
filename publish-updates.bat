@echo off
chcp 65001 >nul
REM ==========================================================
REM  publish-updates.bat - رفع التعديلات على GitHub
REM  دبل كليك عليه بعد ما تعدّل حاجة بنفسك (زي إنك تحط صور جديدة)
REM  وبعد دقيقة أو اتنين لينك العميل هيتحدث لوحده
REM  (التعديلات اللي Claude بيعملها بتترفع لوحدها، مش محتاج الملف ده ليها)
REM ==========================================================
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\publish.ps1"
echo.
pause
