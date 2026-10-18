import sys,re,csv,io,shutil
from pathlib import Path
import arabic_reshaper
from bidi.algorithm import get_display
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from PIL import Image,ImageDraw,ImageFont
root=Path(__file__).resolve().parent.parent;out=root/'docs/MAKAN-STOCK-Guide-fa.pdf';pdfmetrics.registerFont(TTFont('fa','C:/Windows/Fonts/tahoma.ttf'));pdfmetrics.registerFont(TTFont('fab','C:/Windows/Fonts/tahomabd.ttf'))
W,H=595.28,841.89; margin=47; width=W-2*margin
shape=lambda s:get_display(arabic_reshaper.reshape(s),base_dir='R')
text=(root/'docs/Manual-fa.md').read_text(encoding='utf-8-sig');chapters=[]
for chunk in text.split('\n## ')[1:]:
 lines=chunk.strip().splitlines();chapters.append((lines[0],[l.strip() for l in lines[1:] if l.strip()]))
rows=list(csv.reader((root/'docs/FEATURES.csv').read_text(encoding='utf-8-sig').splitlines()))[1:]
chapters.append(('۲۹. فهرست کامل قابلیت‌ها و میزان پوشش',[f'{r[0]} | {r[1]}'+(' | '+r[2] if len(r)>2 and r[2] else '') for r in rows]))
class Book:
 def __init__(self,target,toc=None):self.c=canvas.Canvas(str(target),pagesize=(W,H));self.page=0;self.y=0;self.toc=toc;self.entries=[];self.c.setTitle('MAKAN STOCK | راهنمای کامل فارسی 1.3');self.c.setAuthor('Makan / MAKAN LAB');self.c.setSubject('Inventory and warehouse user manual, installation and feature status')
 def new(self,label='راهنمای فارسی'):
  if self.page:self.c.showPage()
  self.page+=1;self.y=H-82;c=self.c;c.setFillColor(HexColor('#060D18'));c.rect(0,H-49,W,49,fill=1,stroke=0);c.setFillColor(HexColor('#12D9A0'));c.setFont('fab',11);c.drawString(margin,H-30,'MAKAN STOCK');c.setFillColor(HexColor('#FFFFFF'));c.setFont('fa',9);c.drawRightString(W-margin,H-30,shape(label));c.setStrokeColor(HexColor('#D8E5E0'));c.line(margin,49,W-margin,49);c.setFont('fa',8);c.setFillColor(HexColor('#465C55'));c.drawString(margin,33,'makanlab.tech  |  v1.3.0');c.drawRightString(W-margin,33,shape('صفحه '+str(self.page)))
 def wrap(self,s,font,size,maxw):
  words=s.split();lines=[];line=''
  for word in words:
   q=(line+' '+word).strip()
   if pdfmetrics.stringWidth(shape(q),font,size)>maxw and line:lines.append(line);line=word
   else:line=q
  if line:lines.append(line)
  return lines
 def para(self,s,bold=False,size=10.5):
  c=self.c;font='fab' if bold else 'fa';ltr=s.startswith('`');s=s.strip('`');lines=[s] if ltr else self.wrap(s,font,size,width);leading=19 if not bold else 22
  for line in lines:
   if self.y<80:self.new()
   c.setFont(font,size);c.setFillColor(HexColor('#10231E'))
   if ltr:
    c.setFillColor(HexColor('#EDF7F4'));c.rect(margin-3,self.y-6,width+6,19,fill=1,stroke=0);c.setFillColor(HexColor('#174D5D'));c.setFont('fa',9);c.drawString(margin+5,self.y,line)
   else:c.drawRightString(W-margin,self.y,shape(line))
   assert self.y>=75;self.y-=leading
  self.y-=9
 def render(self):
  self.new('راهنمای نصب و استفاده');c=self.c;c.drawImage(str(root/'branding/logo-symbol.png'),W/2-95,H-335,190,190,mask='auto');self.y=H-375;self.para('ماکان استاک',True,27);self.para('مدیریت انبار و موجودی',True,18);self.para('راهنمای کامل فارسی | نسخه ۱.۳',False,13);self.y-=20;self.para('نصب ویندوز، نسخه پرتابل، آموزش عملیات، کاربران، پشتیبان، شبکه و فهرست امکانات');self.para('ساخته‌شده توسط ماکان | MAKAN LAB');self.para('`https://makanlab.tech/`');self.para('`makan20042002@gmail.com`');self.para('کد اصلی تحت مجوز MIT | بدون حسابداری و سامانه مودیان')
  self.new('فهرست راهنما');self.para('فهرست فصل‌ها',True,19)
  for i,(title,_) in enumerate(chapters):
   page=self.toc[i][1] if self.toc else 0
   self.para(title+'    '+str(page),False,10)
  for title,paras in chapters:
   self.new();self.entries.append((title,self.page));self.para(title,True,16)
   for p in paras:self.para(p)
  self.c.save();return self.entries
Path('tmp/pdfs').mkdir(parents=True,exist_ok=True)
entries=Book(Path('tmp/pdfs/manual-pass1.pdf')).render();Book(out,entries).render();shutil.copy2(out,root/'docs/AnbarOne-Guide-fa.pdf');shutil.copy2(out,root/'dist/manual-fa.pdf')
print(out)
