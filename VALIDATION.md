# Verificação da entrega

Verificação realizada em 18/10/2026, no fuso de São Paulo.

## Compilação

- Instalação concluída: 44 pacotes, sem vulnerabilidades reportadas pelo gerenciador naquela instalação.
- `npm run lint`: verificação TypeScript aprovada.
- `npm run build`: compilação de produção aprovada. A entrega final repete o build durante o empacotamento.
- Prévia local: resposta HTTP 200.

## Navegador

- Layout inspecionado em 1440 × 1000 e 390 × 844.
- Largura de documento verificada em 320, 390, 768, 1024 e 1440 pixels. Sem overflow horizontal após corrigir a largura mínima do CTA em telas de 320 pixels.
- Menu móvel abre, navega para a jornada e fecha.
- Diagrama desktop responde a clique e à seta do teclado, atualizando a etapa selecionada e sua explicação. Botão “Próxima etapa” funciona.
- No celular, a etapa “Emoção” expande seu texto e fecha a anterior.
- FAQ abre a resposta de pagamento e fecha a anterior.
- Botão de inscrição apresenta aviso de checkout indisponível, sem enviar dados nem encaminhar para um endereço fictício.
- O CTA fixo é ocultado enquanto a seção de investimento está visível.
- Imagem principal carregada; a segunda utiliza carregamento preguiçoso e foi vista carregada na seção correspondente.
- Nenhum erro de console observado nos testes.

## Estrutura e acessibilidade

- Um H1 e 12 seções principais.
- Âncoras internas válidas, sem IDs duplicados, sem botões sem nome e com destinos de `aria-controls` existentes.
- Textos de parágrafos, legendas editoriais e botões do FAQ tiveram contraste calculado a partir dos estilos e fundos sólidos do navegador: nenhum abaixo de 4,5:1 na verificação.
- Conteúdo alternativo das imagens, painéis associados ao FAQ e estados de expansão conferidos pela árvore de acessibilidade.
- Movimento reduzido implementado no CSS e nos componentes Motion; não foi realizado teste com leitor de tela real nem uma auditoria formal WCAG.

## Limites

Não foram medidos Core Web Vitals de campo nem executada auditoria Lighthouse. As fontes dependem do Google Fonts, com fallback local. A página usa renderização React no cliente; título, descrição, canonical e Open Graph estão no HTML inicial. A publicação privada não representa a abertura comercial das inscrições. Revisar o texto com a fonte original e preencher as integrações registradas no README antes da divulgação pública.

Registros visuais locais: `artifacts/desktop.jpg`, `artifacts/anatomia-desktop.jpg`, `artifacts/mobile.jpg`.

## Atualização de 19/10/2026 — Conheça sua mentora

- Nova seção após `mentoria` e antes de `jornada`, totalizando 13 seções principais.
- Conferida em desktop de 1440 pixels, tablet de 768 pixels e celulares de 390 e 320 pixels, sem overflow horizontal após ajustar a posição do desenho de raízes.
- Retrato WebP carregado com sucesso e enquadramento facial preservado. Fallback JPEG confirmado como cópia idêntica ao arquivo fornecido.
- Formação completa abre e fecha com Enter no teclado e abre por clique no celular. Os 14 itens do material original foram conferidos no conteúdo implementado.
- Contraste dos textos da nova seção verificado sobre o fundo creme: nenhum abaixo de 4,5:1. Nenhum erro de console observado.
- Comparação do componente App com a versão anterior confirma que as demais seções foram preservadas integralmente; somente import e inserção do novo componente foram acrescentados. Ofertas, valores e CTAs existentes permanecem iguais.
- Verificação TypeScript e build de produção aprovados. O empacotamento final repete o build.
- Registros: `artifacts/mentora-desktop.jpg` e `artifacts/mentora-mobile.jpg`.
