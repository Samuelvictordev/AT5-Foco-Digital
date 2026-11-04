# AUDITORIA_IA.md — Registro de copilotagem técnica

**Projeto:** Foco Digital — Trabalho, IA e Atenção  
**Data do registro técnico:** 04/11/2026  
**Ferramenta de copilotagem:** ChatGPT (GPT-6)  
**Natureza das intervenções:** revisão e refatoração executadas pela **IA nesta sessão** sobre a versão gerada previamente. Este arquivo documenta três ciclos reais de análise e alteração do código. **Não atribui essas alterações à dupla**, e os integrantes ainda precisam revisar e contribuir pessoalmente, como pede o enunciado.

## Ficha 1 — Consistência das horas de reuniões

### 1. Prompt / solicitação de revisão
> Revise a microaplicação JavaScript do índice de fragmentação digital. Identifique cenários inválidos entre duração de reuniões e jornada, evite distorções no resultado e explique limitações da heurística.

### 2. Resposta original da IA (trecho da versão anterior)
```js
const meetingRatio=hours>0?meetings/hours:0;
```

### 3. Diagnóstico técnico
Com jornada de 2 horas e 8 horas de reuniões, o quociente era 4 — um cenário fisicamente inconsistente. A contribuição ao índice era limitada pela função `clamp`, mas a interface não explicava a inconsistência nem normalizava a entrada. Também não há fundamentação clínica dos pesos usados no indicador.

### 4. Refatoração aplicada por IA
```js
// Reuniões não podem ultrapassar a jornada informada no cálculo.
const effectiveMeetings=Math.min(meetings,hours);
const meetingRatio=hours>0?effectiveMeetings/hours:0;
```
Também foi incluído aviso contextual na lista de recomendações quando `meetings > hours`. O cálculo passou a usar uma proporção que nunca supera 1. **Verificação realizada:** comparação estática do código antes e depois; cenários de interface ainda exigem validação no navegador pela dupla.

## Ficha 2 — Falha no carregamento da biblioteca Chart.js

### 1. Prompt / solicitação de revisão
> Revise o dashboard da aplicação e trate a ausência do Chart.js quando a CDN estiver indisponível. Mantenha os dados acessíveis sem causar erro de referência JavaScript.

### 2. Resposta original da IA (trecho da versão anterior)
```js
function renderCharts(){if(typeof Chart==='undefined')return;
```

### 3. Diagnóstico técnico
A ausência de `Chart` já não derrubava a página, mas os espaços dos gráficos permaneciam vazios e não havia mensagem explícita. Os números continuam disponíveis na tabela HTML. O fallback precisava comunicar isso ao visitante.

### 4. Refatoração aplicada por IA
```js
function renderCharts(){
 if(typeof Chart==='undefined'){
  const alert=$('#chartFallback');
  if(alert)alert.hidden=false;
  return;
 }
 const alert=$('#chartFallback');
 if(alert)alert.hidden=true;
```
Foi incluído no HTML um aviso `role="status"` antes dos gráficos. A tabela permanece disponível como alternativa textual. **Verificação realizada:** conferência estática de IDs e comandos; a simulação real de indisponibilidade da CDN ainda precisa ser feita no navegador.

## Ficha 3 — Preferência visual e armazenamento local

### 1. Prompt / solicitação de revisão
> Revise o tema claro/escuro e torne a preferência inicial compatível com o sistema operacional. Trate erros no localStorage sem impedir uso da página e preserve a identificação acessível do controle.

### 2. Resposta original da IA (trecho da versão anterior)
```js
try{saved=localStorage.getItem(themeKey);}catch(e){}
setTheme(saved);
```

### 3. Diagnóstico técnico
A leitura falhava silenciosamente quando o armazenamento estava bloqueado; a preferência do sistema (`prefers-color-scheme`) não era considerada. Isso não quebrava o site, mas diminuía previsibilidade e rastreabilidade do comportamento.

### 4. Refatoração aplicada por IA
```js
try{saved=localStorage.getItem(themeKey);}
catch(e){console.info('Preferência de tema não disponível; usando preferência do sistema.');}
if(saved!=='dark'&&saved!=='light'){
 saved=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';
}
```
O armazenamento no clique também passou a informar quando não é possível persistir a escolha. A propriedade `aria-label` continua sendo atualizada conforme o tema. **Verificação realizada:** revisão do fluxo e checagem de sintaxe; teste com storage desabilitado e teclado ainda não foi executado.

## Transparência e pendências da dupla

- Os três ciclos acima foram **executados e documentados por IA**, não manualmente pelos estudantes.
- A dupla deve testar os recursos no navegador, corrigir o que identificar e registrar no Git as alterações feitas por cada integrante.
- Commits ou resultados de testes humanos não foram fabricados.
- Fontes de pesquisa e limitações: `REFERENCIAS.md`.
