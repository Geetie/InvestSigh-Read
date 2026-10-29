$dir = 'D:\InvestSigh\dashboard-prototype\.vendor\rb\src\ts-tailwind'
Write-Output '=== TiltedCard imports ==='
$t = Get-Content (Join-Path $dir 'Components\TiltedCard\TiltedCard.tsx') -Raw
$lines = $t -split "`n"
$start = ($lines | Select-String -Pattern '^import' | Select-Object -First 1).LineNumber
Write-Output (($lines[($start-1)..($start+9)]) -join "`n")
Write-Output '=== hugeicons usage per file ==='
Get-ChildItem -Path $dir -Recurse -Filter *.tsx | ForEach-Object {
  $t = Get-Content $_.FullName -Raw
  $m = [regex]::Matches($t, 'import\s*\{([^}]*)\}\s*from\s*''@hugeicons/core-free-icons''')
  foreach ($x in $m) { Write-Output ("{0}: {1}" -f $_.BaseName, ($x.Groups[1].Value -replace '\s+',' ')) }
  $m2 = [regex]::Matches($t, 'import\s*\{([^}]*)\}\s*from\s*''@hugeicons/react''')
  foreach ($x in $m2) { Write-Output ("{0} [react]: {1}" -f $_.BaseName, ($x.Groups[1].Value -replace '\s+',' ')) }
}
Write-Output '=== HugeiconsIcon icon usages (name strings) ==='
Get-ChildItem -Path $dir -Recurse -Filter *.tsx | ForEach-Object {
  $t = Get-Content $_.FullName -Raw
  $m = [regex]::Matches($t, 'icon\s*=\s*\{?([A-Za-z0-9]+Icon)\}?')
  if ($m.Count -gt 0) { Write-Output ("{0}: {1}" -f $_.BaseName, (($m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique) -join ', ')) }
}
