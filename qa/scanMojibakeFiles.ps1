$files = Get-ChildItem src -Recurse -Include *.js,*.jsx,*.mjs,*.ts,*.tsx | ForEach-Object FullName;
$pats = @{
  "EMDASH" = [string][char]0x00E2 + [string][char]0x20AC + [string][char]0x201D
  "RUPEE"  = [string][char]0x00E2 + [string][char]0x201A + [string][char]0x00B9
  "ARROW"  = [string][char]0x00E2 + [string][char]0x2020 + [string][char]0x2019
  "LARROW" = [string][char]0x00E2 + [string][char]0x2020 + [string][char]0x0090
  "MIDDOT" = [string][char]0x00C2 + [string][char]0x00B7
  "ODD"    = [string][char]0x00E2 + [string][char]0x0099 + [string][char]0x2022
};
$r = [Text.RegularExpressions.Regex];
foreach ($f in $files) {
  $t = [IO.File]::ReadAllText($f, [Text.Encoding]::UTF8);
  foreach ($k in $pats.Keys) {
    $c = $r::Matches($t, [Text.RegularExpressions.Regex]::Escape($pats[$k])).Count;
    if ($c -gt 0) { "{0} x{1} -> {2}" -f $k, $c, (Split-Path -Leaf $f) }
  }
}
