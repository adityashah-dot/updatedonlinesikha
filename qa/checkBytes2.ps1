$utf8 = [Text.Encoding]::UTF8;
$lines = [IO.File]::ReadAllLines("src\components\OverviewView.jsx", $utf8);
$line = $lines[439];
$cp = $line.ToCharArray() | Where-Object { [int]$_ -gt 127 } | ForEach-Object { "{0:X4}" -f [int]$_ };
"line440: $($cp -join ' ')"
