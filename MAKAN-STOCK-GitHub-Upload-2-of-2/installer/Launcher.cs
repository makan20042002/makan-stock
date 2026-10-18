using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Text;
using System.Windows.Forms;
[assembly: AssemblyTitle("MAKAN STOCK")]
[assembly: AssemblyCompany("MAKAN LAB")]
[assembly: AssemblyProduct("MAKAN STOCK Inventory")]
[assembly: AssemblyVersion("1.3.0.0")]
[assembly: AssemblyFileVersion("1.3.0.0")]
[assembly: AssemblyCopyright("Copyright 2026 Makan - MIT License")]
internal static class Launcher {
  [STAThread] static int Main(string[] args) {
    string root=AppDomain.CurrentDomain.BaseDirectory;
    try {
      if(Array.IndexOf(args,"--guide")>=0) { Process.Start(new ProcessStartInfo(Path.Combine(root,"docs","MAKAN-STOCK-Guide-fa.pdf")){UseShellExecute=true}); return 0; }
      string runtime=Path.Combine(root,"runtime","node.exe"),script=Path.Combine(root,"src","launcher.mjs");
      if(!File.Exists(runtime)||!File.Exists(script))throw new Exception("فایل‌های برنامه کامل نیستند. نصب‌کننده را دوباره اجرا کنید.");
      string arguments="\""+script+"\"";
      if(Array.IndexOf(args,"--stop")>=0)arguments+=" --stop";
      if(Array.IndexOf(args,"--no-browser")>=0)arguments+=" --no-browser";
      ProcessStartInfo start=new ProcessStartInfo(runtime,arguments){WorkingDirectory=root,UseShellExecute=false,CreateNoWindow=true,WindowStyle=ProcessWindowStyle.Hidden,RedirectStandardError=true,RedirectStandardOutput=true,StandardOutputEncoding=Encoding.UTF8,StandardErrorEncoding=Encoding.UTF8};
      using(Process p=new Process()) { p.StartInfo=start; StringBuilder stdout=new StringBuilder(),stderr=new StringBuilder(); p.OutputDataReceived+=(sender,e)=>{if(e.Data!=null)stdout.AppendLine(e.Data);}; p.ErrorDataReceived+=(sender,e)=>{if(e.Data!=null)stderr.AppendLine(e.Data);}; p.Start(); p.BeginOutputReadLine(); p.BeginErrorReadLine(); if(!p.WaitForExit(25000)){try{p.Kill();}catch{}throw new Exception("اجرای برنامه طول کشید. فایل data/server.log را بررسی کنید.");} p.WaitForExit(); if(p.ExitCode!=0)throw new Exception(stderr.Length>0?stderr.ToString():stdout.ToString());return p.ExitCode; }
    } catch(Exception e) { MessageBox.Show("ماکان استاک - MAKAN LAB\n\n"+e.Message,"MAKAN STOCK",MessageBoxButtons.OK,MessageBoxIcon.Error,MessageBoxDefaultButton.Button1,MessageBoxOptions.RtlReading|MessageBoxOptions.RightAlign); return 1; }
  }
}
