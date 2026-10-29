$dir = 'D:\InvestSigh\dashboard-prototype\.vendor\rb\src\ts-tailwind'
$chosen = @(
 'Components/LineSidebar/LineSidebar.tsx',
 'Components/PillNav/PillNav.tsx',
 'Animations/CrystalizedBall/CrystalizedBall.tsx',
 'Micro/PromptBar/PromptBar.tsx',
 'Micro/RubberSegment/RubberSegment.tsx',
 'Components/SpotlightCard/SpotlightCard.tsx',
 'Components/TiltedCard/TiltedCard.tsx',
 'Backgrounds/Aurora/Aurora.tsx',
 'Animations/Noise/Noise.tsx',
 'TextAnimations/BlurText/BlurText.tsx',
 'TextAnimations/CountUp/CountUp.tsx',
 'Micro/StatusMark/StatusMark.tsx',
 'Animations/ClickSpark/ClickSpark.tsx',
 'Micro/CallChip/CallChip.tsx',
 'Animations/GlareHover/GlareHover.tsx'
)
foreach ($rel in $chosen) {
  $p = Join-Path $dir ($rel -replace '/','\')
  if (-not (Test-Path $p)) { Write-Output "MISSING $rel"; continue }
  $t = Get-Content $p -Raw
  $lines = $t -split "`n"
  Write-Output "===== $rel  ($($lines.Count) lines)"
  # enum / namespace / parameter properties
  $en = [regex]::Matches($t, '\b(enum|namespace)\s+\w+')
  if ($en.Count -gt 0) { Write-Output ("  ENUM/NS: " + (($en | ForEach-Object { $_.Value }) -join ', ')) }
  # imports
  $imports = [regex]::Matches($t, "import\s+([\s\S]*?)\s+from\s+'([^']+)'")
  foreach ($im in $imports) { Write-Output ("  IMP " + ($im.Groups[2].Value) + " :: " + (($im.Groups[1].Value -replace '\s+',' ').Trim())) }
  # unused local imports heuristic: named imports count
  foreach ($im in $imports) {
    $body = $im.Groups[1].Value
    $src = $im.Groups[2].Value
    if ($src -match '^\.|^react$') { continue }
    $names = [regex]::Matches($body, '\{([\s\S]*?)\}')
    foreach ($n in $names) {
      foreach ($one in ($n.Groups[1].Value -split ',')) {
        $nm = ($one -replace 'type\s+','').Trim()
        if (-not $nm) { continue }
        $nm = ($nm -split '\s+as\s+')[-1].Trim()
        $uses = ([regex]::Matches($t, [regex]::Escape($nm))).Count
        if ($uses -le 1) { Write-Output ("  UNUSED? " + $nm + "  (from " + $src + ")") }
      }
    }
  }
}
