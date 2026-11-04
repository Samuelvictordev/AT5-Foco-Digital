"use strict";
(() => {
 const $ = (s) => document.querySelector(s);
 const fields = {hours:$('#hours'),pings:$('#pings'),meetings:$('#meetings'),breaks:$('#breaks')};
 const updateLabels = () => {for (const [key,el] of Object.entries(fields)) { const output=$(`#${key}Value`); output.textContent=el.value+(key==='hours'||key==='meetings'?' h':''); }};
 Object.values(fields).forEach(el=>el.addEventListener('input',updateLabels));
 const clamp = (n,min,max)=>Math.min(max,Math.max(min,n));
 function calculate(){
  const hours=Number(fields.hours.value),pings=Number(fields.pings.value),meetings=Number(fields.meetings.value),breaks=Number(fields.breaks.value),review=Number($('#aiReview').value);
  // Reuniões não podem ultrapassar a jornada informada no cálculo.
  const effectiveMeetings=Math.min(meetings,hours);
  const meetingRatio=hours>0?effectiveMeetings/hours:0;
  const parts={workload:clamp((hours-8)*4,0,20),interruptions:clamp(pings/30*35,0,35),meetings:clamp(meetingRatio*25,0,25),pauses:clamp((4-breaks)*2.5,0,10),review:clamp(review*5,0,10)};
  const score=Math.round(clamp(Object.values(parts).reduce((sum,n)=>sum+n,0),0,100));
  const level=score<30?'Baixa fragmentação ilustrativa':score<60?'Fragmentação moderada':'Fragmentação elevada';
  $('#score').innerHTML=String(score)+'<small>/100</small>';
  $('#riskBadge').textContent=level;$('#scoreBar').style.width=score+'%';$('#scoreBar').parentElement.setAttribute('aria-valuenow',score);
  $('#resultTitle').textContent=score<30?'Boa margem para períodos de foco':score<60?'Há pontos de atenção na rotina':'Vale redesenhar sua rotina de foco';
  $('#resultText').textContent='Pontuação educacional baseada nos valores escolhidos. Não é diagnóstico, previsão de desempenho ou medida clínica.';
  const suggestions=[];
  if(pings>=10)suggestions.push('Experimente agrupar notificações em janelas previsíveis, quando sua função permitir.');
  if(meetings>hours)suggestions.push('O tempo de reuniões excede a jornada configurada; o cálculo limitou as reuniões às horas trabalhadas.');
  if(meetingRatio>=.35)suggestions.push('Reveja se algumas reuniões podem virar atualizações assíncronas claras.');
  if(breaks<3)suggestions.push('Considere inserir pausas breves e regulares durante o trabalho.');
  if(review>0)suggestions.push('Teste e compreenda respostas da IA antes de aplicá-las em decisões importantes.');
  if(hours>8)suggestions.push('Observe limites de jornada e proteja períodos de desconexão.');
  if(!suggestions.length)suggestions.push('Mantenha atenção à qualidade do foco e à revisão crítica da IA.');
  const list=$('#tips');list.replaceChildren(...suggestions.map(t=>{let li=document.createElement('li');li.textContent=t;return li;}));
 }
 $('#simForm').addEventListener('submit',e=>{e.preventDefault();calculate();});
 $('#simForm').addEventListener('reset',()=>{requestAnimationFrame(()=>{updateLabels();calculate();});});
 $('#printResult').addEventListener('click',()=>{if($('#score').textContent.includes('—'))calculate();window.print();});
 updateLabels();calculate();
 const themeKey='foco-digital-theme'; let saved=null;
 try{saved=localStorage.getItem(themeKey);}catch(e){console.info('Preferência de tema não disponível; usando preferência do sistema.');}
 if(saved!=='dark'&&saved!=='light'){
  saved=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';
 }
 const setTheme=theme=>{const t=theme==='light'?'light':'dark';document.body.dataset.theme=t;$('#themeToggle').setAttribute('aria-label',t==='dark'?'Ativar tema claro':'Ativar tema escuro');$('#themeToggle').firstChild.textContent=t==='dark'?'☀ ':'☾ ';return t;};
 setTheme(saved);
 $('#themeToggle').addEventListener('click',()=>{const next=setTheme(document.body.dataset.theme==='dark'?'light':'dark');try{localStorage.setItem(themeKey,next);}catch(e){console.info('Não foi possível salvar a preferência visual nesta sessão.');}renderCharts();});
 let charts=[];
 function renderCharts(){if(typeof Chart==='undefined'){const alert=$('#chartFallback');if(alert)alert.hidden=false;return;}const alert=$('#chartFallback');if(alert)alert.hidden=true;charts.forEach(c=>c.destroy());charts=[];const light=document.body.dataset.theme==='light';const text=light?'#50627c':'#a8b8d0',grid=light?'rgba(35,63,95,.12)':'rgba(182,207,238,.12)',accent=light?'#226a39':'#adff89';
  const common={responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:light?'#fff':'#182742',titleColor:light?'#18263e':'#f1f7ff',bodyColor:light?'#18263e':'#f1f7ff'}},scales:{x:{ticks:{color:text},grid:{color:grid}},y:{min:0,max:30,ticks:{color:text,callback:v=>v+'%'},grid:{color:grid}}}};
  charts.push(new Chart($('#engagementChart'),{type:'line',data:{labels:['2020','2021','2022','2023','2024','2025'],datasets:[{data:[20,21,23,23,21,20],borderColor:accent,backgroundColor:accent,pointRadius:5,pointHoverRadius:8,tension:.32,borderWidth:3}]},options:common}));
  charts.push(new Chart($('#aiChart'),{type:'doughnut',data:{labels:['Relataram uso de IA','Demais respondentes'],datasets:[{data:[75,25],backgroundColor:[accent,light?'#d8e2f1':'#293a53'],borderWidth:0,hoverOffset:8}]},options:{responsive:true,maintainAspectRatio:false,cutout:'72%',plugins:{legend:{position:'bottom',labels:{color:text,padding:20}},tooltip:{callbacks:{label:(c)=>c.label+': '+c.parsed+'%'}}}}}));
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',renderCharts);else renderCharts();
})();
