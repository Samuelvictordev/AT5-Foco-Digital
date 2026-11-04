# Foco Digital — Trabalho, IA e Atenção

> Protótipo acadêmico copilotado. **O código-base foi gerado com IA** e, portanto, **não comprova autoria manual da dupla exigida pela AT5**. Os participantes precisam revisar, reescrever e demonstrar sua própria implementação antes da entrega. Não declare autoria humana sobre partes geradas automaticamente.

## Visão geral e preview

**Tema:** fragmentação digital, autonomia cognitiva e copilotagem crítica entre jovens profissionais de tecnologia.

**Questão:** como combinar velocidade da IA com foco, autonomia técnica e cuidado socioemocional no trabalho remoto/assíncrono?

**Preview:** abra `index.html` no navegador ou publique no GitHub Pages. Captura de tela real a acrescentar após revisão da dupla.

**Link de deploy:** _inserir URL validada após publicação_.

## Funcionalidades

- Navbar móvel com menu colapsável e Bootstrap 5
- Blocos de contexto com grid responsivo
- Simulador didático de fragmentação de rotina, sem diagnóstico e sem armazenamento de respostas
- Dois gráficos Chart.js com dados reais de fontes identificadas
- Tabela de indicadores, accordion, modo claro/escuro com localStorage e opções de impressão
- Contraste, HTML semântico, skip link, labels, live region, redução de animação conforme preferência do sistema

## Estrutura de arquivos

```text
index.html
css/styles.css
js/app.js
AUDITORIA_IA.md
README.md
REFERENCIAS.md
ENTREGA.md
.gitignore
LICENSE
```

## Arquitetura e contratos de dados

O HTML organiza seções e componentes sem frameworks de build; CSS define tokens em `:root`; `js/app.js` contém a lógica local e os gráficos. É um site estático.

**Entrada do simulador:** `{hours: number(2..14), pings: number(0..30), meetings: number(0..8), breaks: number(0..12), aiReview: 0|1|2}`. A leitura é feita diretamente dos campos, não há coleta ou persistência de respostas.

**Saída:** `{score: number(0..100), level: string, suggestions: string[]}`. Peso do cenário: jornada excedente até 20, interrupções até 35, proporção de reuniões até 25, pausas escassas até 10, revisão de IA até 10. **Valores são escolhas de design, não escala científica.**

**Datasets gráficos:**

- `engagementChart`: `{labels:['2020',...,'2025'],datasets:[{data:[20,21,23,23,21,20]}]}`. Percentual de engajamento global Gallup; ano do dado, não ano de publicação.
- `aiChart`: `{labels:['Relataram uso de IA','Demais respondentes'],datasets:[{data:[75,25]}]}`. Resultado de pesquisa 2024 sobre trabalhadores do conhecimento; o complemento de 25% é calculado como 100−75.

## Dependências/CDN

- Bootstrap 5.3.3 (CSS, JS bundle) via jsDelivr: sistema de grid e collapse/accordion.
- Chart.js 4.4.7 via jsDelivr: gráficos responsivos.
- Fontes DM Sans e Space Grotesk via Google Fonts: tipografia; fontes de fallback incluídas.

A renderização depende de acesso à internet para CDN; comportamento de fallback: um aviso acessível aparece e a tabela continua visível sem Chart.js. Testar em Chrome, Firefox e Safari. Não foram incluídos builds ou bibliotecas locais.

## Matriz de rastreabilidade e colaboração

**Preencher com evidência verdadeira antes de entregar:**

| Requisito | Arquivo | Responsável real | Commit SHA |
|---|---|---|---|
| Pesquisa/recorte | `index.html`, `REFERENCIAS.md` | A definir pela dupla | A registrar |
| HTML autoral, ARIA e SEO | `index.html` | A definir pela dupla | A registrar |
| CSS e design system autoral | `css/styles.css` | A definir pela dupla | A registrar |
| Bootstrap e responsividade | `index.html` | A definir pela dupla | A registrar |
| Microaplicação e revisão | `js/app.js` | A definir pela dupla | A registrar |
| Gráficos e validação de dados | `js/app.js` | A definir pela dupla | A registrar |
| Auditoria e refatoração | `AUDITORIA_IA.md` | Ambos | A registrar |
| Deploy e testes | `ENTREGA.md` | Ambos | A registrar |

## Testes sugeridos

1. Abrir `index.html`; testar todos os links internos e navbar em 360, 768, 1024, 1440px.
2. Conferir Console F12 e Network, principalmente erros de CDN/404.
3. Simulador: valores mínimo/máximo, zerar interrupções, exceder reuniões vs jornada e restaurar.
4. Alternar tema, atualizar página e verificar persistência.
5. Validar os valores dos gráficos e links das referências; desligar JS e conferir conteúdo textual.
6. Testar teclado e leitor de tela e contrastes; testar impressão.

## Referências

Veja [REFERENCIAS.md](REFERENCIAS.md) para URLs e limitações metodológicas.

## Transparência do uso de IA

HTML, CSS, JavaScript e este material foram inicialmente gerados por IA. É obrigatório que a dupla faça revisão humana real, mudanças verificáveis em commits próprios e documente auditorias genuínas. O arquivo [AUDITORIA_IA.md](AUDITORIA_IA.md) documenta três revisões e alterações técnicas reais feitas por IA nesta sessão; isso não comprova refatoração humana pela dupla.

## Licença

MIT; veja [LICENSE](LICENSE).
