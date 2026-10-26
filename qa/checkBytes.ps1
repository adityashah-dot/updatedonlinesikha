$utf8 = [Text.Encoding]::UTF8;
$targets = @(
  @{ f = "src\components\OverviewView.jsx"; pattern = "author}`""; },
  @{ f = "src\components\ScholarshipsView.jsx"; pattern = "Savings:"; }
);
foreach ($t in $targets) {
  if (-not (Test-Path $t.f)) { "MISSING $($t.f)"; continue }
  $hit = Select-String -Path $t.f -Pattern $t.pattern | Select-Object -First 1;
  if (-not $hit) { "no hit for pattern in $($t.f)"; continue }
  $bytes = ($utf8.GetBytes($hit.Line)) | Where-Object { $_ -gt 127 };
  $line = $hit.LineNumber;
  "--- $($t.f):$line";
  $bytes | ForEach-Object { "{0:X2}" -f $_ } | Select-Object -First 16;
}
