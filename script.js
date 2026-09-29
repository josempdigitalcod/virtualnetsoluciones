const menu = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');}
menu.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeMenu();}});
const plans={
  "visibilidad": {
    "label": "VISIBILIDAD",
    "title": "Haz que las personas correctas te descubran.",
    "description": "Empieza por una identidad clara y una web fácil de encontrar. Combina branding, optimización SEO y contenido útil para presentar tu propuesta a las personas adecuadas.",
    "tags": [
      "Branding",
      "Optimización SEO",
      "Marketing de Contenido"
    ]
  },
  "comunidad": {
    "label": "COMUNIDAD",
    "title": "Convierte la atención en una relación.",
    "description": "Construye una voz reconocible, conversa en redes sociales y comparte contenido relevante por e-mail con quienes quieren recibirlo. La constancia y la utilidad dan motivos para volver.",
    "tags": [
      "Gestión de Redes Sociales",
      "Marketing de Contenido",
      "E-mail Marketing"
    ]
  },
  "ventas": {
    "label": "OPORTUNIDADES",
    "title": "Conecta tus campañas con una web preparada para convertir.",
    "description": "Combina campañas SEM, páginas de destino claras y seguimiento por e-mail. Usa la analítica web y el CRO para entender los resultados y priorizar mejoras.",
    "tags": [
      "Campañas SEM",
      "E-mail Marketing",
      "Analítica Web y CRO"
    ]
  },
  "web": {
    "label": "DISEÑO WEB",
    "title": "Dale a tu marca una base digital propia.",
    "description": "Empieza por organizar tu propuesta y el contenido de tus páginas. Diseña una experiencia adaptable, con bases SEO y acciones claras, y define cómo medirás las consultas.",
    "tags": [
      "Diseño web adaptable",
      "SEO y accesibilidad",
      "Analítica y conversión"
    ]
  }
};
let selected='visibilidad';
document.querySelectorAll('[data-goal]').forEach(button=>button.addEventListener('click',()=>{
selected=button.dataset.goal;const plan=plans[selected];
document.querySelectorAll('[data-goal]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
document.querySelector('#plan-label').textContent='TU PUNTO DE PARTIDA / '+plan.label;
document.querySelector('#plan-title').textContent=plan.title;
document.querySelector('#plan-description').textContent=plan.description;
document.querySelector('#plan-tags').replaceChildren(...plan.tags.map(tag=>{const span=document.createElement('span');span.textContent=tag;return span;}));
document.querySelector('#download-status').textContent='';
}));
document.querySelector('#download-brief').addEventListener('click',()=>{
const plan=plans[selected];const name=document.querySelector('#project-name').value.trim()||'Mi proyecto';
const text=`VIRTUAL NET SOLUCIONES — PUNTO DE PARTIDA\n\nProyecto: ${name}\nObjetivo: ${plan.label}\n\n${plan.title}\n${plan.description}\n\nPrioridades:\n${plan.tags.map(t=>'• '+t).join('\n')}\n\nPara preparar tu estrategia:\n1. Describe a tu cliente ideal.\n2. Define qué hace diferente a tu propuesta.\n3. Elige una métrica y un plazo para revisar el progreso.\n\nEsta guía es orientativa. No se han enviado tus datos ni solicitado servicios.\n`;
const url=URL.createObjectURL(new Blob(['\ufeff',text],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='mi-punto-de-partida.txt';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);
document.querySelector('#download-status').textContent='Tu resumen está listo. Revisa las descargas del navegador.';
});
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const motion=document.querySelector('#motion-toggle');
function setPaused(paused){document.documentElement.classList.toggle('paused',paused);motion.setAttribute('aria-pressed',String(paused));motion.textContent=paused?'Activar animaciones':'Pausar animaciones';}
setPaused(reduced.matches);motion.addEventListener('click',()=>setPaused(!document.documentElement.classList.contains('paused')));
reduced.addEventListener('change',event=>setPaused(event.matches));
if('IntersectionObserver' in window){document.documentElement.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));}
document.querySelector('#year').textContent=new Date().getFullYear();

