@echo off
chcp 65001 >nul
REM ==========================================================
REM  download-stitch-images.bat
REM  بينزّل صور تصميم Google Stitch في فولدر assets\images
REM  دبل كليك على الملف مرة واحدة وهو هيعمل الباقي
REM  (الصور دي مؤقتة من التصميم - استبدلها بصور العيادة الحقيقية بنفس الأسماء)
REM ==========================================================
cd /d "%~dp0"
if not exist "assets\images" mkdir "assets\images"
echo Downloading Stitch images...
powershell -NoProfile -Command "Invoke-WebRequest -Uri 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCGO5873YAhJeps5q9qtiiH5UvOzgGsWA5X9l5LiixaV4HpU4tMCwwGTyc_ad7JsYYeBqXxVnrIWkpgMioCijZVL9EXfT7WOW4-lZnbb9kAkYBv-0Behpl9WJdQJzi6gd-bZX0IkC2onAGS2-dMr_EMOWfp-Lp_DMLp3cZJg26w0yyfoDjDB9Yl-4tzuFNj0PSyQSsAgSQUg1Z0rHZ9hrWQdqics6MoU9d2BTInO4ncotm4TdKqKtXmw' -OutFile 'assets\images\hero.jpg'" && echo   OK  hero.jpg || echo   FAILED  hero.jpg
powershell -NoProfile -Command "Invoke-WebRequest -Uri 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHFHjP71KhyVTImDQ3kqT0DA0M3ni5K-DsbykQoPjUvmaY4fzIRLUMMKGY7Dl7lxsPhT1eDTkUE5ZvWFadZ9648LEU12nBuMPx1Qb2_G8BU36hx5U2Fe4j7DpMyzaJJopCDsczpAG0UvHFb-gH_j_8d-49Oqvco6fa9vAjzi7nKCS-TO6T7xMvmsAb18WaKGwDzPxthn5xwSmlMFkxh5aKaw-HPIzWPBLk4ixP4JOHW1U_QLU01vcD4A' -OutFile 'assets\images\about.jpg'" && echo   OK  about.jpg || echo   FAILED  about.jpg
powershell -NoProfile -Command "Invoke-WebRequest -Uri 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLTDIfCdUbl12dyQFp1j89KstBaWQqcHZYdatq5r0mTDpBkp8QmF2m0YV8Ah0mpEtWIilZrW-xhBeH73g5o_ARnbFfL-TW2M_S75Y4Tu7eCotxY58-E-eTC8gemzKsPMXEZx6-_GR1xq07NIKSLQmE2TdrxKnpxTiSaOAd0APuPtFzAPbWOetfyDk053es_xhJ0p9RiGlWnNAPVH39dEP8GZ0MtCxMvCgfkd-mFpJ9vD27GXfgCac3Xg' -OutFile 'assets\images\why.jpg'" && echo   OK  why.jpg || echo   FAILED  why.jpg
powershell -NoProfile -Command "Invoke-WebRequest -Uri 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9ks7EXCslm0cVRdyVbWEjdV3ZRy_a9XBL7luu669iMpN6ksv4CMjtpM_vhqwaUrRKvs3gWxZf0cpav5HP3lM_TyMQ5RpHHT20__aHxYYbmonjUUtBqFsU5jNBUMTu1FSzgTzI1RTx5r6luj31bzLO_-JsBsuGrGB3mBFqhr46rupxOCw-vUF-cE9hbFivHliHz4oJ3sMXiLOYkUTURYBCGxnYMAv4u8oleOZ6l0NghvCoqvxr8p283g' -OutFile 'assets\images\gallery-dental.jpg'" && echo   OK  gallery-dental.jpg || echo   FAILED  gallery-dental.jpg
powershell -NoProfile -Command "Invoke-WebRequest -Uri 'https://lh3.googleusercontent.com/aida-public/AB6AXuCP-M02goav3xJas6PNrbu1ofbgI5bo19rurxOsUy7oeSmCt4IDLJNEjvTHoFUFDRdULSnBQwXnmoaKBmptIcbPR0AE_MgffG00jFU-qcaGWBC82C-07LaPYmi7qqnk-LNocIKaOwhz-pNHayNzqNZxt_o6LbZgsMJvxtynE4CDLPbPNhB4cmJQoTnL_FGciJFZupFkfbtj6WRF4j2Qy6KVtY7hNAEK8KzGVf-Kgd88Bk0cOLVtCtcivQ' -OutFile 'assets\images\gallery-skin.jpg'" && echo   OK  gallery-skin.jpg || echo   FAILED  gallery-skin.jpg
echo.
echo Done. Open index.html to see the site.
pause
