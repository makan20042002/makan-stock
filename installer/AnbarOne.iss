#ifndef Payload
  #define Payload ".."
#endif
#ifndef PublishDir
  #define PublishDir "..\.."
#endif
#ifndef FarsiLanguage
  #define FarsiLanguage "Farsi.isl"
#endif
[Setup]
AppId={{D66F3EC0-9A7F-4B8E-909E-17D960F187AE}
AppName=MAKAN STOCK - ماکان استاک
AppVersion=1.3.0
AppPublisher=MAKAN LAB - Makan
AppPublisherURL=https://makanlab.tech/
AppSupportURL=https://makanlab.tech/
AppUpdatesURL=https://makanlab.tech/
AppCopyright=Copyright (c) 2026 Makan - MIT
DefaultDirName={localappdata}\AnbarOne
DefaultGroupName=MAKAN STOCK
PrivilegesRequired=lowest
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
MinVersion=10.0
OutputDir={#PublishDir}
OutputBaseFilename=MAKAN-STOCK-Setup-1.3.0-Windows-x64
SetupIconFile={#Payload}\dist\icon.ico
UninstallDisplayIcon={app}\MAKAN-STOCK.exe
UninstallDisplayName=MAKAN STOCK - ماکان استاک
LicenseFile={#Payload}\LICENSE
WizardStyle=modern
WizardSizePercent=110
WizardImageFile={#Payload}\installer\wizard.bmp
WizardSmallImageFile={#Payload}\installer\wizard-small.bmp
Compression=lzma2/normal
SolidCompression=yes
CloseApplications=no
RestartApplications=no
DisableProgramGroupPage=yes
SetupLogging=yes
[Languages]
Name: "farsi"; MessagesFile: "{#FarsiLanguage}"
Name: "english"; MessagesFile: "compiler:Default.isl"
[CustomMessages]
farsi.DesktopShortcut=ساخت میان‌بر دسکتاپ
farsi.StartApp=اجرای ماکان استاک
farsi.OpenManual=بازکردن راهنمای کامل فارسی PDF
farsi.ManualShortcut=راهنمای کامل فارسی
farsi.StopShortcut=توقف ماکان استاک
english.DesktopShortcut=Create a desktop shortcut
english.StartApp=Start AnbarOne
english.OpenManual=Open the full Persian PDF manual
english.ManualShortcut=Persian user manual
english.StopShortcut=Stop AnbarOne
[Tasks]
Name: "desktopicon"; Description: "{cm:DesktopShortcut}"
[Files]
Source: "{#Payload}\*"; DestDir: "{app}"; Excludes: "data\*,.git\*,.github\*,installer\*,scripts\*,tests\*,network.json,installed.json,Install-AnbarOne.cmd,Test-AnbarOne.cmd,*.sqlite,*.sqlite-wal,*.sqlite-shm"; Flags: ignoreversion recursesubdirs createallsubdirs
[Icons]
Name: "{group}\MAKAN STOCK"; Filename: "{app}\MAKAN-STOCK.exe"; WorkingDir: "{app}"
Name: "{userdesktop}\MAKAN STOCK"; Filename: "{app}\MAKAN-STOCK.exe"; WorkingDir: "{app}"; Tasks: desktopicon
Name: "{group}\{cm:ManualShortcut}"; Filename: "{app}\docs\MAKAN-STOCK-Guide-fa.pdf"
Name: "{group}\{cm:StopShortcut}"; Filename: "{app}\MAKAN-STOCK.exe"; Parameters: "--stop"; WorkingDir: "{app}"
Name: "{group}\Uninstall MAKAN STOCK"; Filename: "{uninstallexe}"
[Run]
Filename: "{app}\MAKAN-STOCK.exe"; Description: "{cm:StartApp}"; Flags: postinstall nowait skipifsilent
Filename: "{app}\docs\MAKAN-STOCK-Guide-fa.pdf"; Description: "{cm:OpenManual}"; Flags: postinstall shellexec nowait skipifsilent
[UninstallRun]
Filename: "{app}\runtime\node.exe"; Parameters: """{app}\src\launcher.mjs"" --stop"; WorkingDir: "{app}"; Flags: runhidden waituntilterminated skipifdoesntexist; RunOnceId: "StopLocalServer"
[UninstallDelete]
Type: files; Name: "{app}\installed.json"
[Code]
function PrepareToInstall(var NeedsRestart: Boolean): String;
var Code: Integer; I: Integer;
begin
  Result := '';
  if FileExists(ExpandConstant('{app}\runtime\node.exe')) then begin
    if not Exec(ExpandConstant('{app}\runtime\node.exe'), '"' + ExpandConstant('{app}\src\launcher.mjs') + '" --stop', ExpandConstant('{app}'), SW_HIDE, ewWaitUntilTerminated, Code) then begin
      Result := 'Close AnbarOne before upgrading. / ابتدا ماکان استاک را متوقف کنید.'; Exit;
    end;
    for I := 1 to 50 do begin
      if not FileExists(ExpandConstant('{app}\data\running.json')) then Break;
      Sleep(100);
    end;
    if FileExists(ExpandConstant('{app}\data\running.json')) then
      Result := 'The server is still running. Stop it before upgrading. / ابتدا سرور را متوقف کنید.';
  end;
end;
procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep = ssPostInstall then
    SaveStringToFile(ExpandConstant('{app}\installed.json'), '{"version":"1.3.0","installer":"Inno Setup","publisher":"MAKAN LAB"}', False);
end;
