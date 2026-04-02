$ErrorActionPreference = 'Stop'

Set-Location (Split-Path $PSScriptRoot -Parent)

function Get-AudioKey([string]$text) {
  if ([string]::IsNullOrWhiteSpace($text)) { return 'audio' }
  $sb = New-Object System.Text.StringBuilder
  $lastDash = $false
  foreach ($ch in $text.ToLower().ToCharArray()) {
    $code = [int][char]$ch
    if (($code -ge 48 -and $code -le 57) -or ($code -ge 97 -and $code -le 122)) {
      [void]$sb.Append($ch)
      $lastDash = $false
    } elseif ($ch -match '[\s\-_,.;:!?""''`~()\[\]{}<>/\\|]') {
      if (-not $lastDash) {
        [void]$sb.Append('-')
        $lastDash = $true
      }
    } else {
      if (-not $lastDash -and $sb.Length -gt 0) {
        [void]$sb.Append('-')
      }
      [void]$sb.Append(('u{0:x4}' -f $code))
      $lastDash = $false
    }
  }
  $result = $sb.ToString().Trim('-')
  if ([string]::IsNullOrWhiteSpace($result)) { return 'audio' }
  return $result
}

function New-DirIfMissing([string]$path) {
  if (-not (Test-Path $path)) {
    New-Item -Path $path -ItemType Directory | Out-Null
  }
}

function Save-VoiceAudio([System.Speech.Synthesis.SpeechSynthesizer]$synth, [string]$text, [string]$targetFile) {
  if (Test-Path $targetFile) { return }
  $synth.SetOutputToWaveFile($targetFile)
  $synth.Speak($text)
  $synth.SetOutputToNull()
}

# Build text lists from existing data modules
$encodedJson = node -e "const en=require('./data/english'); const py=require('./data/pinyin'); const english=new Set(); en.words.forEach(w=>english.add(w.word)); en.sentencePatterns.forEach(c=>c.patterns.forEach(p=>{english.add(p.pattern); (p.examples||[]).forEach(e=>english.add(e));})); const pinyin=new Set(); const chinese=new Set(); [py.singleVowels,py.compoundVowels,py.frontNasalVowels,py.backNasalVowels,py.initials,py.wholeSyllables,py.twoSpellExamples,py.threeSpellExamples,py.pinyinCharPairs].forEach(group=>group.forEach(item=>{ if(item.pinyin) pinyin.add(item.pinyin); if(item.result) pinyin.add(item.result); if(item.char) chinese.add(item.char); })); (py.tonePracticeItems||[]).forEach(item=>{ (item.tones||[]).forEach(t=>{ if(t.pinyin) pinyin.add(t.pinyin); if(t.char) chinese.add(t.char); }); }); const json=JSON.stringify({english:[...english],pinyin:[...pinyin],chinese:[...chinese]}); console.log(Buffer.from(json,'utf8').toString('base64'));"
$json = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($encodedJson.Trim()))
$data = $json | ConvertFrom-Json

# Prepare directories
New-DirIfMissing 'audio'
New-DirIfMissing 'audio/english'
New-DirIfMissing 'audio/pinyin'
New-DirIfMissing 'audio/chinese'
New-DirIfMissing 'images'
New-DirIfMissing 'images/icons-flat'

Add-Type -AssemblyName System.Speech
Add-Type -AssemblyName System.Drawing

$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$voiceInfos = $synth.GetInstalledVoices() | ForEach-Object { $_.VoiceInfo }
$zhVoice = $voiceInfos | Where-Object { $_.Culture.Name -like 'zh*' } | Select-Object -First 1
$enVoice = $voiceInfos | Where-Object { $_.Culture.Name -like 'en*' } | Select-Object -First 1

if ($enVoice) { $synth.SelectVoice($enVoice.Name) }
foreach ($text in $data.english) {
  $key = Get-AudioKey $text
  Save-VoiceAudio $synth $text (Join-Path 'audio/english' ($key + '.wav'))
}

if ($zhVoice) { $synth.SelectVoice($zhVoice.Name) }
foreach ($text in $data.pinyin) {
  $key = Get-AudioKey $text
  Save-VoiceAudio $synth $text (Join-Path 'audio/pinyin' ($key + '.wav'))
}
foreach ($text in $data.chinese) {
  $key = Get-AudioKey $text
  Save-VoiceAudio $synth $text (Join-Path 'audio/chinese' ($key + '.wav'))
}

# Flat icon generation
function New-RoundRectPath([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $path.AddArc($x, $y, $d, $d, 180, 90)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  return $path
}

function Draw-Book([System.Drawing.Graphics]$g, [float]$x, [float]$y, [float]$w, [float]$h, [System.Drawing.Color]$color) {
  $brush = New-Object System.Drawing.SolidBrush($color)
  $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(200,255,255,255), 4)
  $left = New-RoundRectPath $x $y ($w/2-2) $h 8
  $right = New-RoundRectPath ($x+$w/2+2) $y ($w/2-2) $h 8
  $g.FillPath($brush, $left); $g.FillPath($brush, $right)
  $g.DrawPath($pen, $left); $g.DrawPath($pen, $right)
  $g.DrawLine($pen, $x + $w/2, $y + 8, $x + $w/2, $y + $h - 8)
  $left.Dispose(); $right.Dispose(); $pen.Dispose(); $brush.Dispose()
}

function New-FlatIcon([string]$name, [string]$bgHex, [string]$accentHex) {
  $size = 192
  $bmp = New-Object System.Drawing.Bitmap($size, $size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias
  $g.Clear([System.Drawing.Color]::Transparent)

  $bg = [System.Drawing.ColorTranslator]::FromHtml($bgHex)
  $accent = [System.Drawing.ColorTranslator]::FromHtml($accentHex)

  $shadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(28, 15, 23, 42))
  $shadowPath = New-RoundRectPath 12 14 ($size - 24) ($size - 24) 40
  $g.FillPath($shadowBrush, $shadowPath)

  $cardPath = New-RoundRectPath 10 10 ($size - 24) ($size - 24) 40
  $bgBrush = New-Object System.Drawing.SolidBrush($bg)
  $g.FillPath($bgBrush, $cardPath)

  $dotBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(36,255,255,255))
  $g.FillEllipse($dotBrush, 24, 24, 34, 34)

  $white = [System.Drawing.Color]::White
  $penWhite = New-Object System.Drawing.Pen($white, 8)
  $penAccent = New-Object System.Drawing.Pen($accent, 8)
  $brushWhite = New-Object System.Drawing.SolidBrush($white)
  $brushAccent = New-Object System.Drawing.SolidBrush($accent)

  switch ($name) {
    'math' {
      $g.FillEllipse($brushWhite, 44, 56, 20, 20)
      $g.FillEllipse($brushWhite, 72, 56, 20, 20)
      $g.FillEllipse($brushWhite, 100, 56, 20, 20)
      $g.DrawLine($penWhite, 42, 96, 124, 96)
      $g.DrawLine($penWhite, 84, 74, 84, 116)
      $g.DrawLine($penWhite, 138, 76, 156, 76)
      $g.DrawLine($penWhite, 138, 106, 156, 106)
    }
    'pinyin' {
      $bubble = New-RoundRectPath 38 50 116 84 24
      $g.FillPath($brushWhite, $bubble)
      $g.FillPolygon($brushWhite, [System.Drawing.Point[]]@([System.Drawing.Point]::new(78,132),[System.Drawing.Point]::new(96,132),[System.Drawing.Point]::new(82,148)))
      $font = New-Object System.Drawing.Font('Segoe UI', 42, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
      $g.DrawString('P', $font, $brushAccent, [System.Drawing.RectangleF]::new(74, 64, 40, 52))
      $font.Dispose(); $bubble.Dispose()
    }
    'english' {
      Draw-Book $g 44 56 104 84 $white
      $starPts = [System.Drawing.Point[]]@(
        [System.Drawing.Point]::new(146,42),[System.Drawing.Point]::new(152,56),[System.Drawing.Point]::new(166,58),[System.Drawing.Point]::new(156,68),
        [System.Drawing.Point]::new(159,82),[System.Drawing.Point]::new(146,75),[System.Drawing.Point]::new(133,82),[System.Drawing.Point]::new(136,68),
        [System.Drawing.Point]::new(126,58),[System.Drawing.Point]::new(140,56)
      )
      $g.FillPolygon($brushAccent, $starPts)
    }
    'challenge' {
      $mountain = [System.Drawing.Point[]]@([System.Drawing.Point]::new(44,132),[System.Drawing.Point]::new(86,72),[System.Drawing.Point]::new(126,132))
      $g.FillPolygon($brushWhite, $mountain)
      $g.DrawLine($penWhite, 126, 58, 126, 132)
      $flag = [System.Drawing.Point[]]@([System.Drawing.Point]::new(126,58),[System.Drawing.Point]::new(156,66),[System.Drawing.Point]::new(126,78))
      $g.FillPolygon($brushAccent, $flag)
    }
    'wrongbook' {
      Draw-Book $g 42 52 108 88 $white
      $g.FillEllipse($brushAccent, 126, 38, 36, 36)
      $crossPen = New-Object System.Drawing.Pen([System.Drawing.Color]::White, 5)
      $g.DrawLine($crossPen, 136, 48, 152, 64)
      $g.DrawLine($crossPen, 152, 48, 136, 64)
      $crossPen.Dispose()
    }
    'table' {
      $gridPen = New-Object System.Drawing.Pen($white, 7)
      $rect = [System.Drawing.Rectangle]::new(42, 48, 108, 96)
      $g.DrawRectangle($gridPen, $rect)
      $g.DrawLine($gridPen, 78, 48, 78, 144)
      $g.DrawLine($gridPen, 114, 48, 114, 144)
      $g.DrawLine($gridPen, 42, 80, 150, 80)
      $g.DrawLine($gridPen, 42, 112, 150, 112)
      $gridPen.Dispose()
    }
    'flashcard' {
      $cardBack = New-RoundRectPath 56 58 82 94 14
      $cardFront = New-RoundRectPath 42 44 82 94 14
      $g.FillPath($brushAccent, $cardBack)
      $g.FillPath($brushWhite, $cardFront)
      $markPen = New-Object System.Drawing.Pen($accent, 6)
      $g.DrawLine($markPen, 62, 74, 104, 74)
      $g.DrawLine($markPen, 62, 94, 92, 94)
      $markPen.Dispose(); $cardBack.Dispose(); $cardFront.Dispose()
    }
    'sound' {
      $spk = [System.Drawing.Point[]]@([System.Drawing.Point]::new(54,88),[System.Drawing.Point]::new(74,88),[System.Drawing.Point]::new(96,68),[System.Drawing.Point]::new(96,124),[System.Drawing.Point]::new(74,104),[System.Drawing.Point]::new(54,104))
      $g.FillPolygon($brushWhite, $spk)
      $g.DrawArc($penWhite, 98, 70, 34, 52, -40, 80)
      $g.DrawArc($penWhite, 104, 60, 52, 72, -40, 80)
    }
    'font' {
      $fontA = New-Object System.Drawing.Font('Segoe UI', 68, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
      $fonta = New-Object System.Drawing.Font('Segoe UI', 46, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
      $g.DrawString('A', $fontA, $brushWhite, [System.Drawing.PointF]::new(44, 56))
      $g.DrawString('a', $fonta, $brushAccent, [System.Drawing.PointF]::new(112, 92))
      $fontA.Dispose(); $fonta.Dispose()
    }
    'speed' {
      $g.DrawArc($penWhite, 44, 56, 104, 104, 200, 140)
      $g.DrawLine($penWhite, 96, 108, 130, 86)
      $g.FillEllipse($brushWhite, 90, 102, 12, 12)
    }
    'clear' {
      $eraser = New-RoundRectPath 50 78 88 50 14
      $g.FillPath($brushWhite, $eraser)
      $cutBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(120,255,255,255))
      $g.FillRectangle($cutBrush, 50, 100, 88, 28)
      $cutBrush.Dispose(); $eraser.Dispose()
    }
    'reset' {
      $g.DrawArc($penWhite, 48, 50, 96, 96, 40, 280)
      $arrow = [System.Drawing.Point[]]@([System.Drawing.Point]::new(136,52),[System.Drawing.Point]::new(160,60),[System.Drawing.Point]::new(146,80))
      $g.FillPolygon($brushWhite, $arrow)
    }
    'about' {
      $g.FillEllipse($brushWhite, 62, 50, 68, 68)
      $dot = New-Object System.Drawing.SolidBrush($accent)
      $g.FillEllipse($dot, 90, 68, 12, 12)
      $g.FillRectangle($dot, 92, 84, 8, 18)
      $dot.Dispose()
    }
    'book' {
      Draw-Book $g 42 54 108 86 $white
      $bookmark = [System.Drawing.Point[]]@([System.Drawing.Point]::new(120,54),[System.Drawing.Point]::new(136,54),[System.Drawing.Point]::new(136,92),[System.Drawing.Point]::new(128,84),[System.Drawing.Point]::new(120,92))
      $g.FillPolygon($brushAccent, $bookmark)
    }
    'math-mixed10' {
      $g.DrawLine($penWhite, 52, 96, 100, 96)
      $g.DrawLine($penWhite, 76, 72, 76, 120)
      $g.DrawLine($penWhite, 120, 78, 156, 78)
      $g.FillEllipse($brushAccent, 130, 100, 22, 22)
      $g.FillEllipse($brushAccent, 152, 100, 22, 22)
    }
    'math-mixed20' {
      $font = New-Object System.Drawing.Font('Segoe UI', 58, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
      $g.DrawString('20', $font, $brushWhite, [System.Drawing.PointF]::new(44, 56))
      $g.DrawLine($penAccent, 44, 128, 150, 128)
      $font.Dispose()
    }
    'math-decompose' {
      $g.DrawLine($penWhite, 96, 54, 96, 134)
      $g.DrawLine($penWhite, 96, 86, 58, 128)
      $g.DrawLine($penWhite, 96, 86, 134, 128)
      $g.FillEllipse($brushAccent, 48, 122, 20, 20)
      $g.FillEllipse($brushAccent, 124, 122, 20, 20)
    }
    'math-adjacent' {
      $arrPen = New-Object System.Drawing.Pen($white, 7)
      $arrPen.EndCap = [System.Drawing.Drawing2D.LineCap]::ArrowAnchor
      $arrPen.StartCap = [System.Drawing.Drawing2D.LineCap]::ArrowAnchor
      $g.DrawLine($arrPen, 48, 96, 144, 96)
      $font = New-Object System.Drawing.Font('Segoe UI', 42, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
      $g.DrawString('5', $font, $brushAccent, [System.Drawing.PointF]::new(78, 46))
      $font.Dispose(); $arrPen.Dispose()
    }
    'math-compare' {
      $font = New-Object System.Drawing.Font('Segoe UI', 56, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
      $g.DrawString('>', $font, $brushWhite, [System.Drawing.PointF]::new(54, 64))
      $g.DrawString('<', $font, $brushAccent, [System.Drawing.PointF]::new(108, 64))
      $font.Dispose()
    }
    'math-sequence' {
      $pts = [System.Drawing.Point[]]@([System.Drawing.Point]::new(46,120),[System.Drawing.Point]::new(76,100),[System.Drawing.Point]::new(102,108),[System.Drawing.Point]::new(134,74))
      $seqPen = New-Object System.Drawing.Pen($white, 7)
      $seqPen.EndCap = [System.Drawing.Drawing2D.LineCap]::ArrowAnchor
      $g.DrawLines($seqPen, $pts)
      $g.FillEllipse($brushAccent, 66, 92, 12, 12)
      $g.FillEllipse($brushAccent, 96, 102, 12, 12)
      $seqPen.Dispose()
    }
    'math-word' {
      Draw-Book $g 44 56 104 84 $white
      $font = New-Object System.Drawing.Font('Segoe UI', 28, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
      $g.DrawString('?', $font, $brushAccent, [System.Drawing.PointF]::new(90, 84))
      $font.Dispose()
    }
    'math-multiply' {
      $font = New-Object System.Drawing.Font('Segoe UI', 60, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
      $g.DrawString('×', $font, $brushWhite, [System.Drawing.PointF]::new(68, 60))
      $g.DrawString('9', $font, $brushAccent, [System.Drawing.PointF]::new(112, 60))
      $font.Dispose()
    }
    'math-division' {
      $g.DrawLine($penWhite, 56, 94, 136, 94)
      $g.FillEllipse($brushWhite, 92, 68, 12, 12)
      $g.FillEllipse($brushWhite, 92, 112, 12, 12)
    }
    'math-clock' {
      $g.DrawEllipse($penWhite, 52, 52, 88, 88)
      $g.DrawLine($penWhite, 96, 96, 96, 72)
      $g.DrawLine($penWhite, 96, 96, 116, 96)
    }
    'math-money' {
      $note = New-RoundRectPath 46 68 100 56 10
      $g.FillPath($brushWhite, $note)
      $coin = New-Object System.Drawing.SolidBrush($accent)
      $g.FillEllipse($coin, 82, 80, 28, 28)
      $coin.Dispose(); $note.Dispose()
    }
    'math-oddeven' {
      $font = New-Object System.Drawing.Font('Segoe UI', 44, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
      $g.DrawString('1', $font, $brushWhite, [System.Drawing.PointF]::new(62, 70))
      $g.DrawString('2', $font, $brushAccent, [System.Drawing.PointF]::new(106, 70))
      $font.Dispose()
    }
    default {
      $font = New-Object System.Drawing.Font('Segoe UI', 72, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
      $g.DrawString($name.Substring(0,1).ToUpper(), $font, $brushWhite, [System.Drawing.PointF]::new(62, 58))
      $font.Dispose()
    }
  }

  $target = Join-Path 'images/icons-flat' ($name + '.png')
  $bmp.Save($target, [System.Drawing.Imaging.ImageFormat]::Png)

  $penWhite.Dispose(); $penAccent.Dispose(); $brushWhite.Dispose(); $brushAccent.Dispose()
  $dotBrush.Dispose(); $bgBrush.Dispose(); $cardPath.Dispose(); $shadowPath.Dispose(); $shadowBrush.Dispose()
  $g.Dispose(); $bmp.Dispose()
}

$icons = @(
  @{ n='math'; c='#6366F1'; a='#22D3EE' },
  @{ n='pinyin'; c='#0EA5E9'; a='#F97316' },
  @{ n='english'; c='#10B981'; a='#FDE047' },
  @{ n='challenge'; c='#F97316'; a='#EF4444' },
  @{ n='wrongbook'; c='#EF4444'; a='#F59E0B' },
  @{ n='table'; c='#8B5CF6'; a='#34D399' },
  @{ n='flashcard'; c='#06B6D4'; a='#A78BFA' },
  @{ n='sound'; c='#3B82F6'; a='#F59E0B' },
  @{ n='font'; c='#6366F1'; a='#FBBF24' },
  @{ n='speed'; c='#14B8A6'; a='#FB7185' },
  @{ n='clear'; c='#F43F5E'; a='#FBBF24' },
  @{ n='reset'; c='#64748B'; a='#22C55E' },
  @{ n='about'; c='#0F766E'; a='#FDE047' },
  @{ n='book'; c='#A855F7'; a='#FB7185' },
  @{ n='math-mixed10'; c='#2563EB'; a='#22D3EE' },
  @{ n='math-mixed20'; c='#1D4ED8'; a='#60A5FA' },
  @{ n='math-decompose'; c='#7C3AED'; a='#A78BFA' },
  @{ n='math-adjacent'; c='#0891B2'; a='#22D3EE' },
  @{ n='math-compare'; c='#BE123C'; a='#FB7185' },
  @{ n='math-sequence'; c='#0F766E'; a='#34D399' },
  @{ n='math-word'; c='#7C2D12'; a='#FB923C' },
  @{ n='math-multiply'; c='#4338CA'; a='#818CF8' },
  @{ n='math-division'; c='#1E3A8A'; a='#93C5FD' },
  @{ n='math-clock'; c='#0369A1'; a='#38BDF8' },
  @{ n='math-money'; c='#166534'; a='#4ADE80' },
  @{ n='math-oddeven'; c='#9A3412'; a='#FDBA74' }
)

foreach ($icon in $icons) {
  New-FlatIcon $icon.n $icon.c $icon.a
}

Write-Host 'Assets generated: local audio and flat icons.'
