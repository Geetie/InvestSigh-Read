$dir = 'D:\InvestSigh\dashboard-prototype\.vendor\rb\src\ts-tailwind'
$names = @('LineSidebar','StaggeredMenu','TiltedCard','Waves','ChromaGrid','MagicBento','GlareHover','AnimatedContent','MorphSlider','Ribbons')
foreach ($w in $names) {
  $f = Get-ChildItem -Path $dir -Recurse -Filter "$w.tsx" | Select-Object -First 1
  if (-not $f) { continue }
  Write-Output "##### $w"
  $lines = Get-Content $f.FullName
  $hits = $lines | Select-String -Pattern 'Props' | Select-Object -First 4
  foreach ($h in $hits) { Write-Output ("L" + $h.LineNumber + ": " + ($h.Line -replace '\s+',' ')) }
  $imp = $lines | Select-String -Pattern "^import" | ForEach-Object { ($_.Line -replace '^import\s+','') } | Sort-Object -Unique
  Write-Output ("IMPORTS: " + ($imp -join ' | '))
}
