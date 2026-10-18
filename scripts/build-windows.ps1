param([Parameter(Mandatory=$true)][string]$InnoCompiler)
$ErrorActionPreference='Stop'
$appRoot=(Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$compiler=(Resolve-Path $InnoCompiler).Path
$frameworkCompiler=Join-Path $env:WINDIR 'Microsoft.NET\Framework64\v4.0.30319\csc.exe'
if(!(Test-Path -LiteralPath $frameworkCompiler)){throw 'The .NET Framework C# compiler is required.'}
if(!(Test-Path -LiteralPath (Join-Path $appRoot 'runtime\node.exe'))){throw 'Place the official Node x64 runtime and its license in runtime first.'}
if(!(Test-Path -LiteralPath (Join-Path $appRoot 'docs\MAKAN-STOCK-Guide-fa.pdf'))){throw 'Build the Persian PDF manual first.'}
& $frameworkCompiler /nologo /target:winexe /platform:anycpu /reference:System.Windows.Forms.dll ("/win32icon:"+(Join-Path $appRoot 'dist\icon.ico')) ("/out:"+(Join-Path $appRoot 'MAKAN-STOCK.exe')) (Join-Path $appRoot 'installer\Launcher.cs')
if($LASTEXITCODE){throw 'Launcher compilation failed.'}
& $compiler ("/DPayload="+$appRoot) ("/DPublishDir="+(Join-Path $appRoot '..')) ("/DFarsiLanguage="+(Join-Path $appRoot 'installer\Farsi.isl')) (Join-Path $appRoot 'installer\AnbarOne.iss')
if($LASTEXITCODE){throw 'Installer compilation failed.'}
