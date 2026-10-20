import { Plus } from '@phosphor-icons/react';
import { Reveal } from './Interactions';
import { RootArt } from './RootArt';
import { mentor } from './mentor';

export function MentorSection() {
  return (
    <section className="mentor-section section-space" id="mentora" aria-labelledby="mentor-title">
      <div className="wrap mentor-grid">
        <Reveal className="mentor-portrait-column">
          <figure className="mentor-figure">
            <picture className="mentor-picture">
              <source
                type="image/webp"
                srcSet="/assets/priscila-premavati-400.webp 400w, /assets/priscila-premavati-640.webp 640w"
                sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1100px) 38vw, 480px"
              />
              <img
                src="/assets/priscila-premavati.jpeg"
                alt="Priscila Premavati, mentora da R.A.I.Z., sorrindo em um retrato."
                width="640"
                height="641"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <figcaption>
              <span>{mentor.name}</span>
              <span>ATUAÇÃO DESDE {mentor.since}</span>
            </figcaption>
          </figure>
          <blockquote className="mentor-quote">
            <p>“{mentor.quote}”</p>
            <cite>{mentor.name}</cite>
          </blockquote>
          <RootArt className="mentor-root" />
        </Reveal>

        <div className="mentor-copy">
          <Reveal>
            <p className="eyebrow">QUEM CONDUZ ESTA JORNADA</p>
            <h2 id="mentor-title">Conheça sua<br/><em>mentora.</em></h2>
            <div className="mentor-introduction">
              <h3>{mentor.name}</h3>
              <p className="mentor-role">{mentor.role}</p>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="mentor-narrative">
            <p>Desde 2006, Priscila reúne conhecimentos terapêuticos, energéticos e comportamentais em uma abordagem profunda, prática e integrativa de desenvolvimento humano.</p>
            <p>Sua missão é ajudar pessoas a reconectarem corpo, mente, emoções e espiritualidade, tornando esse caminho acessível e aplicável à vida cotidiana.</p>
            <p>Esse olhar para a pessoa em sua integralidade dialoga com a proposta da R.A.I.Z.: compreender o que sustenta as reações aprendidas e cultivar escolhas com mais presença e autorrespeito.</p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mentor-foundations">
              <div>
                <dt className="eyebrow">AS BASES DO SEU OLHAR</dt>
                <dd>Pedagogia Empresarial<br/>e Educação Física</dd>
              </div>
              <div>
                <dt className="eyebrow">UM PERCURSO CONTÍNUO</dt>
                <dd>{mentor.certification}<br/><span>Estudo, prática e desenvolvimento humano</span></dd>
              </div>
            </dl>

            <details className="mentor-biography">
              <summary>
                <span>Conhecer formações e trajetória</span>
                <Plus size={19} weight="light" aria-hidden="true" />
              </summary>
              <div className="mentor-biography-body">
                <p>Sua formação começou nas áreas de Pedagogia Empresarial e Educação Física, bases para compreender as relações entre mente, emoções, comportamento, corpo e energia.</p>
                <div className="mentor-study-group">
                  <h4>Educação e comportamento</h4>
                  <ul role="list">{mentor.education.map(item => <li key={item}>{item}</li>)}</ul>
                </div>
                <div className="mentor-study-group">
                  <h4>Formações terapêuticas e energéticas</h4>
                  <ul role="list">{mentor.therapeuticTraining.map(item => <li key={item}>{item}</li>)}</ul>
                </div>
                <p>Também atua como mentora e facilitadora de práticas terapêuticas em grupo, integrando diferentes técnicas. Certificada pela ABRATH, segue aprofundando seus estudos em desenvolvimento humano e expansão da consciência.</p>
              </div>
            </details>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
