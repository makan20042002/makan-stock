from PIL import Image, ImageDraw
from pathlib import Path
root=Path(__file__).resolve().parent.parent; d=root/'dist'; (root/'branding').mkdir(exist_ok=True)
polys=[[(80,125),(144,88),(225,134),(162,171)],[(287,134),(368,88),(432,125),(350,172)],[(178,202),(256,157),(334,202),(256,247)],[(178,220),(247,260),(247,342),(178,302)],[(265,260),(334,220),(334,302),(265,342)],[(80,144),(98,155),(98,372),(80,362)],[(414,155),(432,144),(432,362),(414,372)],[(112,172),(130,182),(130,389),(112,379)],[(382,182),(400,172),(400,379),(382,389)],[(130,224),(164,244),(164,263),(130,244)],[(130,286),(164,306),(164,325),(130,305)],[(348,244),(382,224),(382,244),(348,263)],[(348,306),(382,286),(382,305),(348,325)]]
mask=Image.new('L',(512,512)); draw=ImageDraw.Draw(mask)
for p in polys:draw.polygon(p,fill=255)
grad=Image.new('RGB',(512,512)); pix=grad.load(); cols=[(18,217,160),(8,196,217),(57,105,255)]
for x in range(512):
 t=x/511*2; a,b=(cols[0],cols[1]) if t<=1 else (cols[1],cols[2]); t=t if t<=1 else t-1
 col=tuple(round(a[i]*(1-t)+b[i]*t) for i in range(3))
 for y in range(512):pix[x,y]=col
logo=Image.new('RGBA',(512,512));logo.paste(grad,(0,0),mask);logo.save(root/'branding/logo-symbol.png')
icon=Image.new('RGBA',(512,512));bg=ImageDraw.Draw(icon);bg.rounded_rectangle((0,0,511,511),radius=110,fill='#060D18');icon.alpha_composite(logo);icon.save(d/'icon-512.png');icon.resize((192,192),Image.Resampling.LANCZOS).save(d/'icon-192.png');icon.save(d/'icon.ico',sizes=[(16,16),(24,24),(32,32),(48,48),(64,64),(128,128),(256,256)])
paths=''.join('<polygon points="'+' '.join(f'{x},{y}' for x,y in p)+'"/>' for p in polys)
svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><linearGradient id="g"><stop stop-color="#12D9A0"/><stop offset=".5" stop-color="#08C4D9"/><stop offset="1" stop-color="#3969FF"/></linearGradient></defs><rect width="512" height="512" rx="110" fill="#060D18"/><g fill="url(#g)">'+paths+'</g></svg>'
(d/'icon.svg').write_text(svg);(root/'branding/logo.svg').write_text(svg)
for size,name in [((164,314),'wizard.bmp'),((55,55),'wizard-small.bmp')]:
 im=Image.new('RGB',size,'#060D18'); width=140 if size[0]>100 else 52; mark=logo.resize((width,width),Image.Resampling.LANCZOS); im.paste(mark,((size[0]-width)//2,45 if size[0]>100 else 1),mark);im.save(root/'installer'/name)
