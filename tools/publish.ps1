# ╔══════════════════════════════════════════════════════════════════╗
# ║  publish.ps1 — رفع التعديلات على GitHub                            ║
# ║                                                                  ║
# ║  بيرفع أي تعديل في فولدر الموقع (كلام، صور، تصميم) على GitHub،     ║
# ║  وبعدها لينك العميل (GitHub Pages) بيتحدث لوحده خلال دقيقة أو اتنين ║
# ║                                                                  ║
# ║  • بيشتغل لوحده في آخر كل رد من Claude (Stop hook)                 ║
# ║  • ولو عدّلت بنفسك (حطيت صور مثلًا): دبل كليك على publish-updates.bat ║
# ║  • كل مرة بيكتب اللي حصل في tools/publish.log                       ║
# ╚══════════════════════════════════════════════════════════════════╝
param([switch]$Quiet)

$root = Split-Path -Parent $PSScriptRoot
$log  = Join-Path $PSScriptRoot "publish.log"

# git ممكن ميكونش في الـ PATH (لو البرنامج اللي شغّل السكريبت اتفتح قبل تسطيب git)
$git = (Get-Command git -ErrorAction SilentlyContinue).Source
if (-not $git) { $git = "C:\Program Files\Git\cmd\git.exe" }

function Say($msg) {
  if (-not $Quiet) { Write-Host $msg }
  Add-Content -Path $log -Value ("[{0}] {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $msg)
}

try {
  Set-Location $root
  $changes = & $git status --porcelain
  if (-not $changes) { if (-not $Quiet) { Write-Host "No new changes - the site is already up to date." }; exit 0 }

  & $git add -A
  & $git commit -q -m ("Update " + (Get-Date -Format "yyyy-MM-dd HH:mm"))
  $out = & $git push -q origin HEAD 2>&1
  if ($LASTEXITCODE -ne 0) { Say "Push failed (check the internet connection), will retry next time: $out"; exit 0 }

  Say "Published to GitHub. The client link updates within 1-2 minutes."
} catch {
  Say "Error: $($_.Exception.Message)"
}
# دايمًا بنخرج من غير خطأ عشان منوقفش Claude لو النت فاصل
exit 0
