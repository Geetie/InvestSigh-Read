$dir = 'D:\InvestSigh\dashboard-prototype\.vendor\rb\src\ts-tailwind'
$names = @('LineSidebar','StaggeredMenu','TiltedCard','Waves','ChromaGrid','MagicBento','GlareHover','AnimatedContent','MorphSlider','Ribbons')
foreach ($w in $names) {
  $f = Get-ChildItem -Path $dir -Recurse -Filter "$w.tsx" | Select-Object -First 1
  if (-not $f) { continue }
  Write-Output "##### $w"
  $t = Get-Content $f.FullName -Raw
  $m = [regex]::Match($t, '(?:type|interface)\s+(\w*[Pp]rops\w*)\s*=\s*\{[\s\S]{0,1100}?\n\}')
  if ($m.Success) { Write-Output ($m.Value -replace '\s+',' ') ; continue }
  $pat = '(?:const|function)\s+' + $w + '\s*[=(][\s\S]{0,600}?\}\s*[,;)]'
  $m2 = [regex]::Match($t, $pat)
  if ($m2.Success) { Write-Output ($m2.Value -replace '\s+',' ') } else { Write-Output '(no props found)' }
}
