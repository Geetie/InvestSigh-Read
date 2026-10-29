$dir = 'D:\InvestSigh\dashboard-prototype\.vendor\rb\src\ts-tailwind'
$names = @('LineSidebar','TiltedCard','Waves','ChromaGrid','GlareHover','Ribbons','CometDial','AnimatedContent')
foreach ($w in $names) {
  $f = Get-ChildItem -Path $dir -Recurse -Filter "$w.tsx" | Select-Object -First 1
  if (-not $f) { continue }
  Write-Output "##### $w"
  $lines = Get-Content $f.FullName
  $start = ($lines | Select-String -Pattern 'interface \w+Props' | Select-Object -First 1).LineNumber
  if ($start) {
    $end = [Math]::Min($start + 45, $lines.Count)
    Write-Output (($lines[($start-1)..($end-1)]) -join "`n")
  }
}
