
const U="https://bosruckhuette.eu/wp-content/uploads/";
const G=[
["2020/03/Familie-Pal-Bosruckhütte","-300x225","Die Wirtsleute 😉"],
["2020/03/Dr.-Vogelgesang-Klamm.-Foto-OÖ-Tourismus-Erber","-300x199","Dr. Vogelgesang-Klamm"],
["2016/11/letöltés","-300x200","Gastgarten im Sommer"],
["2020/05/Hofalmsattel-gegen-den-Bosruck©Bruno_Sulzbacher","-300x200","Hofalmsattel Richtung Bosruck"],
["2020/03/winter-bosruckhuette","-300x186","Ausgangspunkt zahlreicher Touren"],
["2020/03/Iglubau-Lehrlinge-Bosruckhütte","-300x199","Iglubau bei der Bosruckhütte"],
["2020/03/Iglu-bauen-38","-300x199","Iglu bei Nacht"],
["2020/03/iglubauen","-300x199","Igludorf mit Blick auf einen traumhaft schönen Tiefschneehang"],
["2020/03/Gastgartenblick-Bosruckhütte","-225x300","Gastgarten"],
["2020/03/schneeschuhwanderparadies-bosruckhütte","-252x300","Ein Paradies für Schneeschuhwanderer"],
["2020/03/IMG-20200216-WA0011","-225x300","Heidelbeer-Topfenstrudel"],
["2020/03/schweinsbraten","-225x300","Schweinsbraten"],
["2020/03/Bosruckhütte-6","-225x300","Kaspressknödel-Suppe"],
["2020/03/Bosruckhütte-7","-225x300","Gulaschsuppe"],
["2020/03/Bosruckhütte-3","-225x300","Fleischbrot von Bratl"],
["2020/03/Bosruckhütte-4","-225x300","Berner Würstel"]
];
const gal=document.getElementById('gal');if(gal){
G.forEach(([p,s,c])=>{
  const full=U+encodeURI(p)+".jpg", thumb=U+encodeURI(p)+s+".jpg";
  const f=document.createElement('figure');
  f.innerHTML=`<img loading="lazy" alt="${c}" src="${full}"><figcaption>${c}</figcaption>`;
  const im=f.querySelector('img'); im.dataset.fb=thumb;
  f.onclick=()=>openLb(im.currentSrc||im.src,c);
  gal.appendChild(f);
});
}
// Fallback auf Vorschaubild, falls Originaldatei fehlt
document.addEventListener('error',e=>{
  const t=e.target; if(t.tagName==='IMG'&&t.dataset.fb&&!t.dataset.tried){t.dataset.tried=1;t.src=t.dataset.fb;}
},true);
const lb=document.getElementById('lb'),lbi=lb.querySelector('img'),lbp=lb.querySelector('p');
function openLb(s,c){lbi.src=s;lbp.textContent=c||'';lb.classList.add('open')}
lb.onclick=()=>lb.classList.remove('open');
document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('open')});
document.querySelectorAll('.zoom').forEach(i=>i.onclick=()=>openLb(i.src,i.alt));
// Tabs
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.tab,.panel').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');document.getElementById(b.dataset.t).classList.add('active');
});
// Header
const h=document.querySelector('header');
const on=()=>h.classList.toggle('solid',scrollY>40);on();addEventListener('scroll',on,{passive:true});
document.querySelectorAll('#menu a').forEach(a=>a.addEventListener('click',()=>document.getElementById('menu').classList.remove('open')));
// Reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.getElementById('yr').textContent=new Date().getFullYear();

// Click-to-load: Karte & Video (DSGVO)
document.querySelectorAll('.mapload button').forEach(btn=>btn.addEventListener('click',e=>{if(e.target.closest('a'))return;const w=btn.parentElement;w.innerHTML='<iframe title="Karte Bosruckhütte" src="'+w.dataset.src+'" loading="lazy" referrerpolicy="no-referrer-when-downgrade" style="width:100%;height:100%;min-height:420px;border:0"></iframe>';}));
document.querySelectorAll('.video button').forEach(btn=>btn.addEventListener('click',()=>{const w=btn.parentElement;w.innerHTML='<iframe title="Video: Bosruckhütte" src="https://www.youtube-nocookie.com/embed/'+w.dataset.yt+'?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen style="width:100%;height:100%;border:0"></iframe>';}));
