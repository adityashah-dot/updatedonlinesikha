$files = Get-ChildItem src -Recurse -Include *.js,*.jsx,*.mjs,*.ts,*.tsx | ForEach-Object FullName;
$clusters = @{};
foreach ($f in $files) {
  $t = [IO.File]::ReadAllText($f, [Text.Encoding]::UTF8);
  $m = [Text.RegularExpressions.Regex]::Matches($t, "[\u0080-\u00FF][\u0080-\u217F][\u0080-\u217F]?");
  foreach ($mm in $m) {
    $cc = (($mm.Value.ToCharArray() | ForEach-Object { "{0:X2}" -f [int]$_ }) -join "+");
    $clusters[$cc] += 1;
  }
}
($clusters.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 30) | ForEach-Object { "{0}  x{1}" -f $_.Key, $_.Value }
