$files = Get-ChildItem src,qa -Recurse -Include *.js,*.jsx,*.mjs,*.ts,*.tsx,*.ps1 | Where-Object { $_.FullName -notmatch 'node_modules' } | ForEach-Object FullName;
$utf8 = [Text.Encoding]::UTF8;

function Mojibake-Replace($text) {
  $t = $text;
  $t = $t.Replace("$([char]0xE2)$([char]0x20AC)$([char]0x201D)", "$([char]0x2014)"); # em dash
  $t = $t.Replace("$([char]0xE2)$([char]0x201A)$([char]0xB9)", "$([char]0x20B9)"); # rupee
  $t = $t.Replace("$([char]0xE2)$([char]0x2020)$([char]0x2019)", "$([char]0x2192)"); # right arrow
  $t = $t.Replace("$([char]0xE2)$([char]0x2020)$([char]0x90)", "$([char]0x2190)");  # left arrow
  $t = $t.Replace("$([char]0xC2)$([char]0xB7)", "$([char]0xB7)");                   # middle dot
  $t = $t.Replace("$([char]0xE2)$([char]0x153)$([char]0x2022)", "$([char]0x2715)"); # close X
  return $t;
}

foreach ($f in $files) {
  $bytes = [IO.File]::ReadAllBytes($f);
  $hasBom = $bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF;
  $text = $utf8.GetString($bytes);
  $fixed = Mojibake-Replace $text;
  if ($fixed -ne $text) {
    $enc = New-Object System.Text.UTF8Encoding($hasBom);
    [IO.File]::WriteAllText($f, $fixed, $enc);
    "fixed: $(Split-Path -Leaf $f)"
  }
}
"done"
