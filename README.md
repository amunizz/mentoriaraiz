# Mentoria R.A.I.Z.

Página editorial em português brasileiro, construída com React, TypeScript, Vite e Tailwind CSS 4. As animações ficam em componentes de interação separados, com suporte a movimento reduzido. O conteúdo está em `src/content.ts`; a composição está em `src/App.tsx`.

## Desenvolvimento

- `npm install`
- `npm run dev`
- `npm run lint` — verificação estática de tipos.
- `npm run build` — verificação de tipos e produção em `dist/`.

## Entrega e integrações

- O checkout está desativado até o preenchimento de `offer.checkoutUrl` em `src/content.ts`. O botão explica que a inscrição ainda não está disponível. Nenhum dado pessoal é coletado.
- A página não exibe quantidade de vagas restantes, contagem regressiva, depoimentos ou credenciais sem fonte.
- Valores, número de encontros, duração e capacidade foram transcritos do briefing. O valor de referência é identificado como referência, sem preço anterior riscado. O total parcelado foi calculado: R$ 2.399,64.
- Datas, horários, plataforma dos encontros, identidade da mentora, canal real de contato, termos da contratação, regras de gravação e política de privacidade não foram fornecidos.
- A pasta `sources/` não continha material editorial. O único anexo disponível era o briefing de implementação. Por isso, os textos narrativos, exemplos do diagrama e respostas do FAQ foram redigidos a partir do briefing. Não devem ser tratados como reprodução integral do texto original. Antes de abrir inscrições, comparar e ajustar com a fonte original, especialmente FAQ, privacidade e condições da garantia.
- A versão hospedada começa privada. A publicação pública depende da configuração de audiência da proprietária.

## Imagem e direção de arte

`public/assets/roots.jpg` é uma imagem gerada com a ferramenta nativa imagegen, usada como imagem conceitual. Não documenta uma participante, a mentora ou um local real. Foi comprimida em JPEG para a página. Não há fotografias de terceiros nem depoimentos ilustrativos.

Prompt de geração: “Use case: photorealistic-natural. Asset type: premium Brazilian self-knowledge mentorship website botanical editorial photograph. A real mature olive tree's beautifully sculptural exposed roots descending into dark textured earth, intimate macro crop, rough bark tactile and quiet, some delicate pale thread roots. Natural directional late afternoon light from upper left. Vertical portrait 4:5 composition, trunk rising out of top frame, root system spreading across lower half, no leaves as central subject. Sophisticated Kinfolk fine art analog photography, slightly warm cream highlights, muted forest green shadow background, earthy taupe. Real photographic texture and organic asymmetry, no fantasy, no mystical symbols, no lettering, no graphics, no watermark. Root structure should feel grounded, ancient, and emotionally expressive.”

Tipografia: Cormorant Garamond e DM Sans, carregadas do Google Fonts com `display=swap`; fontes de sistema disponíveis como fallback. Marca e desenhos de raízes são SVGs locais.

## Interações e acessibilidade

- O diagrama desktop permite clique, Tab, setas direcionais, Home e End. A descrição selecionada é anunciada em uma região `aria-live`.
- No celular, as oito etapas formam um percurso vertical com expansão individual.
- O FAQ usa botões com `aria-expanded` e painéis associados.
- A navegação móvel possui menu expansível, e há um link para pular ao conteúdo.
- Imagens têm dimensões reservadas, texto alternativo e estado alternativo em caso de falha.
- Movimento reduzido desativa animações e rolagem suave. Nenhuma animação bloqueia o acesso ao conteúdo.
- Animações utilizam opacidade e transformações. Não há rastreamento contínuo de scroll por eventos.

O objetivo é WCAG 2.2 AA; os testes automatizados e visuais realizados estão registrados em `VALIDATION.md`. Uma auditoria formal de acessibilidade e métricas reais de Core Web Vitals dependem do ambiente final.
