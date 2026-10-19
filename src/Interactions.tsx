'use client';
import { memo, useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Plus, Minus, X, List } from '@phosphor-icons/react';
import { patterns, faqs, offer } from './content';
import { RootArt } from './RootArt';

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ type: 'spring', stiffness: 100, damping: 20, delay }}>{children}</motion.div>;
}
export function CTA({ children, href = '#investimento', light = false, className = '' }: { children: ReactNode; href?: string; light?: boolean; className?: string }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 100, damping: 20 }), sy = useSpring(y, { stiffness: 100, damping: 20 });
  function move(e: MouseEvent<HTMLAnchorElement>) {
    if (reduced || !window.matchMedia('(pointer:fine)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * .06); y.set((e.clientY - rect.top - rect.height / 2) * .08);
  }
  return <motion.a href={href} className={`cta ${light ? 'cta-light' : ''} ${className}`} style={{ x: sx, y: sy }} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }} whileTap={reduced ? undefined : { scale: .98 }}>{children}<ArrowUpRight size={20} weight="light" aria-hidden="true"/></motion.a>;
}
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return <div className="mobile-menu" onKeyDown={e => { if (e.key === 'Escape') setOpen(false); }}><button className="icon-button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={25} weight="light"/> : <List size={25} weight="light"/>}</button><nav hidden={!open} id="mobile-navigation" aria-label="Navegação no celular"><a href="#essencia" onClick={() => setOpen(false)}>A essência</a><a href="#anatomia" onClick={() => setOpen(false)}>O método</a><a href="#jornada" onClick={() => setOpen(false)}>A jornada</a><a href="#investimento" onClick={() => setOpen(false)}>Quero participar</a></nav></div>;
}
export function BotanicalPhoto({ className = '', detail = false }: { className?: string; detail?: boolean }) {
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  return <div className={`botanical-photo ${className} ${detail ? 'detail-photo' : ''} ${state === 'loading' ? 'image-loading' : ''}`}>
    {state !== 'error' ? <img src="/assets/roots.jpg" alt={detail ? 'Detalhe da textura da terra e das raízes de uma oliveira.' : 'Raízes expostas de uma oliveira, entre a luz natural e a terra escura.'} fetchPriority={detail ? 'auto' : 'high'} loading={detail ? 'lazy' : 'eager'} width="1024" height="1280" onLoad={() => setState('ready')} onError={() => setState('error')}/> : <div className="photo-fallback"><RootArt foliage/><span>O invisível que sustenta o visível.</span></div>}
  </div>;
}
const LivingRoot = memo(function LivingRoot() {
  const reduced = useReducedMotion();
  return <motion.div aria-hidden="true" className="living-root" animate={reduced ? {} : { opacity: [.2, .4, .2], y: [0, -5, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}><RootArt/></motion.div>;
});
const positions = [[50, 7], [78, 19], [89, 47], [78, 76], [50, 89], [22, 76], [11, 47], [22, 19]];
export function Anatomy() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  const current = patterns[active];
  return <div className="anatomy-experience">
    <div className="anatomy-orbit">
      <svg className="orbit-lines" viewBox="0 0 800 600" preserveAspectRatio="none" aria-hidden="true"><path d="M400 42C510 40 650 65 624 114S766 195 712 282 699 412 624 456 512 558 400 534 238 501 176 456 29 377 88 282 81 165 176 114 303 43 400 42Z"/><path className="orbit-inner" d="M400 70C509 114 581 91 598 167S701 260 661 329 604 459 520 476 424 508 329 480 201 451 168 367 127 245 189 196 264 93 400 70Z"/></svg>
      <LivingRoot/>
      <div className="orbit-center"><span className="eyebrow">ANATOMIA DOS PADRÕES</span><p>O caminho<br/>de uma <em>reação.</em></p><span className="orbit-hint">Selecione uma etapa ao redor</span></div>
      {patterns.map((p, i) => <button key={p.title} ref={el => { refs.current[i] = el; }} style={{ left: `${positions[i][0]}%`, top: `${positions[i][1]}%` }} className={`orbit-node ${active === i ? 'selected' : ''}`} aria-pressed={active === i} aria-controls="pattern-detail" onClick={() => setActive(i)} onKeyDown={e => { if (['ArrowRight','ArrowDown','ArrowLeft','ArrowUp','Home','End'].includes(e.key)) { e.preventDefault(); const next = e.key === 'Home' ? 0 : e.key === 'End' ? 7 : (i + (['ArrowRight','ArrowDown'].includes(e.key) ? 1 : 7)) % 8; setActive(next); refs.current[next]?.focus(); } }}><span className="node-number">0{i + 1}</span><span>{p.title}</span></button>)}
    </div>
    <div className="anatomy-reading" id="pattern-detail" aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="wait" initial={false}><motion.div layout key={active} initial={reduced ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={reduced ? {} : { opacity: 0, x: -8 }} transition={{ duration: .2 }}><span className="detail-number">0{active + 1}<span> / 08</span></span><h3>{current.title}</h3><p className="detail-subtitle">{current.subtitle}</p><p>{current.body}</p><div className="pattern-example"><span className="eyebrow">UM EXEMPLO NO COTIDIANO</span><p>{current.example}</p></div></motion.div></AnimatePresence>
      <button className="text-link next-stage" onClick={() => setActive((active + 1) % 8)}>Próxima etapa <ArrowRight size={19} weight="light" aria-hidden="true"/></button>
    </div>
    <div className="anatomy-mobile">{patterns.map((p, i) => <div className={`mobile-stage ${active === i ? 'selected' : ''}`} key={p.title}><button aria-expanded={active === i} aria-controls={`stage-${i}`} onClick={() => setActive(i)}><span className="mobile-stage-number">0{i + 1}</span><span>{p.title}</span>{active === i ? <Minus size={18} aria-hidden="true"/> : <Plus size={18} aria-hidden="true"/>}</button><div id={`stage-${i}`} hidden={active !== i}><p className="detail-subtitle">{p.subtitle}</p><p>{p.body}</p><p className="mobile-example">{p.example}</p></div></div>)}</div>
  </div>;
}
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="faq-list">{faqs.map(([question, answer], i) => <div className={`faq-item ${open === i ? 'is-open' : ''}`} key={question}><h3><button aria-expanded={open === i} aria-controls={`faq-answer-${i}`} id={`faq-question-${i}`} onClick={() => setOpen(open === i ? null : i)}><span>{question}</span>{open === i ? <Minus size={21} weight="light" aria-hidden="true"/> : <Plus size={21} weight="light" aria-hidden="true"/>}</button></h3><div role="region" id={`faq-answer-${i}`} aria-labelledby={`faq-question-${i}`} hidden={open !== i}><p>{answer}</p></div></div>)}</div>;
}
export function Enrollment() {
  const [message, setMessage] = useState(false);
  return <><button className="cta cta-light enrollment-button" onClick={() => { if (offer.checkoutUrl) window.location.assign(offer.checkoutUrl); else setMessage(true); }}>Quero uma das 10 vagas da Mentoria R.A.I.Z.<ArrowUpRight size={22} weight="light" aria-hidden="true"/></button>{message && <div className="enrollment-note" role="status"><p>As inscrições ainda não estão disponíveis nesta página. O link oficial de inscrição será disponibilizado aqui.</p><button className="text-link" onClick={() => setMessage(false)}>Entendi <X size={16} aria-hidden="true"/></button></div>}</>;
}
export function MobileConversion() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const target = document.getElementById('investimento');
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { threshold: 0 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  return <a className={`mobile-conversion ${visible ? '' : 'conversion-hidden'}`} href="#investimento" tabIndex={visible ? 0 : -1} aria-hidden={!visible}>Conhecer o investimento <ArrowRight size={18} weight="light" aria-hidden="true"/></a>;
}
