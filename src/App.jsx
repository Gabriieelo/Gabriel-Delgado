import { useEffect, useState } from 'react'
import portfolioData from '../data/portfolio.json'

const translations = {
  es: { about: 'Sobre mí', stack: 'Stack', projects: 'Proyectos', contact: 'Contacto', hello: 'Hola, soy', hero: <>Software<br />Developer.<br /><em>Soporte IT.</em></>, projectsButton: 'Ver proyectos', know: 'Conocerme', scroll: 'DESPLAZA PARA EXPLORAR ↓', presentation: 'PRESENTACIÓN', aboutMe: <>Un poco sobre <em>mí.</em></>, focus: 'ENFOQUE', location: 'UBICACIÓN', technologies: 'TECNOLOGÍAS', tools: <>Herramientas con las que<br /><em>construyo.</em></>, works: 'TRABAJOS', selected: <>Proyectos <em>seleccionados.</em></>, coming: 'Próximamente, proyectos por aquí.', comingText: 'Estoy preparando una selección de trabajos para compartir el proceso y los resultados.', completed: 'Completado', inProgress: 'En desarrollo', viewProject: 'Ver proyecto', viewCode: 'Ver código', create: '¿Creamos algo juntos?', talk: 'Hablemos', email: 'Escribirme por email', copyEmail: 'Copiar email', copied: 'Email copiado', copyError: 'No se pudo copiar', github: 'Encontrarme en GitHub', linkedin: 'Conectar en LinkedIn', made: 'Hecho con React', top: 'Volver arriba ↑', software: 'DESARROLLO DE SOFTWARE', stackLabel: 'STACK' },
  en: { about: 'About', stack: 'Stack', projects: 'Projects', contact: 'Contact', hello: "Hi, I'm", hero: <>Software<br />Developer.<br /><em>IT Support.</em></>, projectsButton: 'View projects', know: 'About me', scroll: 'SCROLL TO EXPLORE ↓', presentation: 'INTRODUCTION', aboutMe: <>A little about <em>me.</em></>, focus: 'FOCUS', location: 'LOCATION', technologies: 'TECHNOLOGIES', tools: <>Tools I use to<br /><em>build.</em></>, works: 'WORK', selected: <>Selected <em>projects.</em></>, coming: 'Projects are coming soon.', comingText: 'I am preparing a selection of work to share the process and results.', completed: 'Completed', inProgress: 'In development', viewProject: 'View project', viewCode: 'View code', create: 'Shall we build something together?', talk: "Let's talk", email: 'Send me an email', copyEmail: 'Copy email', copied: 'Email copied', copyError: 'Could not copy', github: 'Find me on GitHub', linkedin: 'Connect on LinkedIn', made: 'Made with React', top: 'Back to top ↑', software: 'SOFTWARE DEVELOPMENT', stackLabel: 'STACK' },
}

function Arrow({ diagonal = false }) { return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span> }

export default function App() {
  const portfolio = portfolioData
  const [language, setLanguage] = useState(() => localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'es')
  const [copyStatus, setCopyStatus] = useState('idle')
  const t = translations[language]
  function toggleLanguage() { setLanguage(current => { const next = current === 'es' ? 'en' : 'es'; localStorage.setItem('portfolio-language', next); return next }) }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(portfolio.email)
      setCopyStatus('copied')
    } catch {
      setCopyStatus('error')
    }
    window.setTimeout(() => setCopyStatus('idle'), 3000)
  }
  useEffect(() => { document.documentElement.lang = language }, [language])

  const { name, location, github, email, linkedin, skills = [], projects = [] } = portfolio
  const role = language === 'en' ? portfolio.roleEn || portfolio.role : portfolio.role
  const secondaryRole = language === 'en' ? portfolio.secondaryRoleEn || portfolio.secondaryRole : portfolio.secondaryRole
  const intro = language === 'en' ? portfolio.introEn || portfolio.intro : portfolio.intro
  const about = language === 'en' ? portfolio.aboutEn || portfolio.about : portfolio.about
  const aboutParagraphs = language === 'en' ? portfolio.aboutParagraphsEn : portfolio.aboutParagraphs
  return <>
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Ir al inicio">GD<span>.</span></a>
      <nav aria-label="Navegación principal">
        <a href="#sobre-mi">{t.about}</a><a href="#stack">{t.stack}</a><a href="#experiencia">{language === 'es' ? 'Experiencia' : 'Experience'}</a><a href="#proyectos">{t.projects}</a><a href="#contacto">{t.contact}</a>
      </nav>
      <div className="header-actions"><button className="language-button" type="button" onClick={toggleLanguage} aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a español'}>{language === 'es' ? 'EN' : 'ES'}</button></div>
    </header>

    <main>
      <section className="hero container" id="inicio">
        <div className="hero-copy">
          <p className="hello">{t.hello} {name}.</p>
          <h1>{t.hero}</h1>
          <p className="hero-description">{intro}</p>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="art-grid" /><div className="art-core"><span>&lt;</span>GD<span>/&gt;</span></div></div>
      </section>

      <section className="section about-section" id="sobre-mi">
        <div className="container section-grid">
          <div className="section-label"><span>01</span> / {t.about.toUpperCase()}</div>
          <h2>{t.aboutMe}</h2>
        </div>
        <div className="container about-body">
          <div className="about-copy">
            <p className="large-copy">{aboutParagraphs?.length ? aboutParagraphs.join(' ') : about}</p>
          </div>
          <div className="facts">
            <div><span>{t.focus}</span><strong>{role} · {secondaryRole}</strong></div>
            <div><span>{language === 'es' ? 'EXPERIENCIA' : 'EXPERIENCE'}</span><strong>{language === 'es' ? '2 años' : '2 years'}</strong></div>
            <div><span>{t.location}</span><strong>{location}</strong></div>
          </div>
        </div>
      </section>

      <section className="section stack-section" id="stack"><div className="container"><div className="section-head"><div className="section-label"><span>02</span> / {t.technologies}</div><h2>{t.tools}</h2></div><div className="skill-grid">{skills.map((skill, index) => <article className="skill-card" key={skill.name}><span className="card-index">0{index + 1} / {t.stackLabel}</span><div className="skill-icon">{skill.name.slice(0, 2).toUpperCase()}</div><h3>{skill.name}</h3><p>{language === 'en' ? skill.descriptionEn || skill.description : skill.description}</p></article>)}</div></div></section>

      <section className="section experience-section" id="experiencia">
        <div className="container">
          <div className="section-head">
            <div className="section-label"><span>03</span> / {language === 'es' ? 'EXPERIENCIA' : 'EXPERIENCE'}</div>
            <h2>{language === 'es' ? <>Experiencia <em>profesional.</em></> : <>Professional <em>experience.</em></>}</h2>
          </div>
          <div className="experience-list">
            {(portfolio.experience || []).map(job => {
              const highlights = language === 'en' ? job.highlightsEn || job.highlights : job.highlights
              return <article className="experience-row" key={job.company}>
                <span>{job.period}</span>
                <div>
                  <h3>{language === 'en' ? job.roleEn || job.role : job.role}</h3>
                  <strong>{job.company}</strong>
                  {highlights?.length ? <ul className="experience-highlights">{highlights.map(point => <li key={point}>{point}</li>)}</ul> : <p>{language === 'en' ? job.descriptionEn || job.description : job.description}</p>}
                </div>
              </article>
            })}
          </div>
        </div>
      </section>

      <section className="section projects-section" id="proyectos">
        <div className="container">
          <div className="section-head"><div className="section-label"><span>04</span> / {t.works}</div><h2>{t.selected}</h2></div>
          {projects.length ? <div className="projects-grid">{projects.map((project, index) => <article className="project-card" key={project.title}>
            <div className="project-card-top"><span className="project-number">0{index + 1} / {t.projects.toUpperCase()}</span><span className={`project-status ${project.status === 'completed' ? 'is-complete' : 'is-progress'}`}><span aria-hidden="true">{project.status === 'completed' ? '✓' : '◌'}</span>{project.status === 'completed' ? t.completed : t.inProgress}</span></div>
            <h3>{project.title}</h3>
            <p>{language === 'en' ? project.descriptionEn || project.description : project.description}</p>
            <div className="project-tags">{(language === 'en' ? project.technologiesEn || project.technologies : project.technologies)?.map(technology => <span key={technology}>{technology}</span>)}</div>
            <div className="project-actions">{project.url && <a href={project.url} target="_blank" rel="noreferrer">{t.viewProject} <Arrow diagonal /></a>}{project.repository && <a href={project.repository} target="_blank" rel="noreferrer">{t.viewCode} <Arrow diagonal /></a>}</div>
          </article>)}</div> : <div className="empty-projects"><div className="empty-symbol">↗</div><div><h3>{t.coming}</h3><p>{t.comingText}</p></div></div>}
        </div>
      </section>

      <section className="contact-section" id="contacto"><div className="container contact-inner"><div className="section-label"><span>05</span> / {t.contact.toUpperCase()}</div><p>{t.create}</p><h2>{t.talk}<span>.</span></h2><div className="contact-links">{email && <><a href={`mailto:${email}`} title={email}>{t.email} <Arrow diagonal /></a><button type="button" onClick={copyEmail} title={email} aria-live="polite">{copyStatus === 'copied' ? t.copied : copyStatus === 'error' ? t.copyError : t.copyEmail} <span aria-hidden="true">{copyStatus === 'copied' ? '✓' : '▣'}</span></button></>}<a href={github} target="_blank" rel="noreferrer">{t.github} <Arrow diagonal /></a>{linkedin && <a href={linkedin} target="_blank" rel="noreferrer">{t.linkedin} <Arrow diagonal /></a>}</div></div></section>
    </main>
    <footer className="footer"><div className="container"><a href="#inicio">{t.top}</a></div></footer>
  </>
}
