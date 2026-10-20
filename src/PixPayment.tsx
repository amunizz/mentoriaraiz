'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, X } from '@phosphor-icons/react';
import { PIX_PAYLOAD, pixPayment } from './pix';
import { copyPixPayload } from './pixClipboard';

type CopyState = 'idle' | 'copying' | 'copied' | 'manual';

export function PixPayment() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const copyButton = useRef<HTMLButtonElement>(null);
  const code = useRef<HTMLTextAreaElement>(null);
  const [open, setOpen] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const [qrFailed, setQrFailed] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  function showPayment() {
    setCopyState('idle');
    dialog.current?.showModal();
    if (dialog.current) dialog.current.scrollTop = 0;
    setOpen(true);
  }

  function onClose() {
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  }

  async function copyCode() {
    setCopyState('copying');
    const result = await copyPixPayload({
      writeText: window.isSecureContext && navigator.clipboard?.writeText
        ? text => navigator.clipboard.writeText(text) : undefined,
      selectCode: () => {
        const field = code.current;
        if (!field) return false;
        field.focus({ preventScroll: true });
        field.select();
        field.setSelectionRange(0, PIX_PAYLOAD.length);
        return true;
      },
      legacyCopy: () => document.execCommand('copy'),
    });
    setCopyState(result);
    if (result === 'copied') copyButton.current?.focus({ preventScroll: true });
  }

  return <>
    <button ref={trigger} className="cta cta-light pix-open-button" onClick={showPayment} aria-haspopup="dialog" aria-controls="pix-dialog">
      Pagar com Pix <ArrowUpRight size={22} weight="light" aria-hidden="true" />
    </button>

    <dialog
      ref={dialog}
      id="pix-dialog"
      className="pix-dialog"
      aria-labelledby="pix-title"
      aria-describedby="pix-introduction"
      onClose={onClose}
      onKeyDown={event => {
        if (event.key !== 'Tab') return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), textarea:not([disabled]), a[href]');
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.current?.close();
      }}
    >
      <div className="pix-dialog-header">
        <div><p className="eyebrow">MENTORIA R.A.I.Z. / PAGAMENTO À VISTA</p><h2 id="pix-title">Pagar com <em>Pix.</em></h2></div>
        <button className="pix-close" onClick={() => dialog.current?.close()} aria-label="Fechar pagamento Pix"><X size={25} weight="light" aria-hidden="true"/></button>
      </div>

      <div className="pix-dialog-body">
        <div className="pix-payment-summary">
          <p className="pix-modal-amount">{pixPayment.amount}<span>à vista</span></p>
          <div><p className="eyebrow">BENEFICIÁRIA</p><p className="pix-beneficiary">{pixPayment.beneficiary}</p></div>
        </div>
        <p id="pix-introduction" className="pix-introduction">Use o código Copia e Cola ou escaneie o QR Code pelo aplicativo do seu banco.</p>

        <div className="pix-payment-grid">
          <div className="pix-qr-area">
            <div className="pix-qr-frame">
              {!qrFailed ? <img src={pixPayment.qrImage} alt="QR Code Pix da Mentoria R.A.I.Z. para R$ 1.997,00, beneficiária PRISCILA V DOMINGOS." width="663" height="663" loading="lazy" onError={() => setQrFailed(true)}/> : <p className="pix-qr-error" role="status">Não foi possível carregar o QR Code. Utilize o código Pix Copia e Cola ao lado ou abaixo.</p>}
            </div>
            <p className="pix-qr-caption">QR Code fornecido para esta mentoria.</p>
          </div>

          <div className="pix-copy-area">
            <label htmlFor="pix-code" className="eyebrow">PIX COPIA E COLA</label>
            <p className="pix-copy-helper">No celular, copie o código e cole na área Pix do seu banco.</p>
            <textarea ref={code} id="pix-code" readOnly value={PIX_PAYLOAD} rows={5} spellCheck={false} autoCapitalize="off" aria-describedby="pix-copy-feedback" />
            <button ref={copyButton} className="cta pix-copy-button" onClick={copyCode} disabled={copyState === 'copying'} aria-busy={copyState === 'copying'}>
              {copyState === 'copying' ? 'Copiando código…' : 'Copiar código Pix'}
              {copyState === 'copied' ? <Check size={19} weight="light" aria-hidden="true"/> : <Copy size={19} weight="light" aria-hidden="true"/>}
            </button>
            <p id="pix-copy-feedback" className={`pix-copy-feedback ${copyState === 'manual' ? 'pix-manual-copy' : ''}`} role="status" aria-live="polite" aria-atomic="true">
              {copyState === 'copied' ? 'Código Pix copiado!' : copyState === 'manual' ? 'Não foi possível copiar automaticamente. O código está selecionado: use Ctrl+C ou ⌘C, ou pressione e segure no celular para copiar.' : 'O código permanece disponível para seleção e cópia manual.'}
            </p>
          </div>
        </div>

        <section className="pix-instructions" aria-labelledby="pix-instructions-title">
          <h3 id="pix-instructions-title">Como pagar pelo Pix</h3>
          <ol>{pixPayment.instructions.map(instruction => <li key={instruction}>{instruction}</li>)}</ol>
        </section>
        <div className="pix-payment-notice"><p>Antes de confirmar, confira os dados do destinatário no aplicativo do seu banco.</p><p>Copiar o código ou abrir esta janela não confirma o pagamento nem altera o status da inscrição. Esta página não recebe confirmação automática da transação.</p></div>
        <button className="text-link pix-return" onClick={() => dialog.current?.close()}>Fechar e voltar à página <X size={16} weight="light" aria-hidden="true"/></button>
      </div>
    </dialog>
  </>;
}
