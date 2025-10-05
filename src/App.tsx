import { Container, Nav, Navbar, Button, Alert, Spinner } from 'react-bootstrap'
import { useEffect, useState, type ReactNode } from 'react'
import emailjs from '@emailjs/browser'
import LiquidEther from './components/LiquidEther'
import { createPortal } from 'react-dom'
import BlurText from './components/BlurText/index'
import Dock from './components/Dock/index'
import ProfileCard from './components/ProfileCard/index'
import InfiniteScroll from './components/InfiniteScroll/index'
import DecryptedText from './components/DecryptedText'
// Icons
import {
  SiAngular, SiReact, SiTypescript, SiDotnet, SiGit, SiGithub, SiVite, SiBootstrap, SiNodedotjs, SiExpress, SiPython, SiOpenai, SiPostman
} from 'react-icons/si'
import { TbApi } from 'react-icons/tb'
import { FaAws, FaMobileAlt, FaCode, FaCloud } from 'react-icons/fa'
import './App.css'

function App() {
  // Contact form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; msg: string }>({ type: null, msg: '' })

  const handleScroll = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  // Ensure first visible section on initial load is Home
  useEffect(() => {
    const home = document.getElementById('home')
    if (home) {
      home.scrollIntoView({ behavior: 'auto', block: 'start' })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
    if (window.location.hash !== '#home') {
      window.history.replaceState(null, '', '#home')
    }
  }, [])

  // Centralized core skills list
  const coreSkills = [
    'Angular', 'React', 'TypeScript', 'C#', '.NET', 'Git', 'Github', 'AI',
    'Xamarin', 'Vite', 'Bootstrap', 'Node.js', 'Express', 'REST APIs', 'Azure', 'AWS', 'Python'
  ]

  // Map skills to icons
  const skillIconMap: Record<string, ReactNode> = {
    'Angular': <SiAngular />,
    'React': <SiReact />,
    'TypeScript': <SiTypescript />,
  'C#': <FaCode />,
    '.NET': <SiDotnet />,
    'Git': <SiGit />,
    'Github': <SiGithub />,
    'AI': <SiOpenai />,
  'Xamarin': <FaMobileAlt />,
    'Vite': <SiVite />,
    'Bootstrap': <SiBootstrap />,
    'Node.js': <SiNodedotjs />,
    'Express': <SiExpress />,
    'REST APIs': <TbApi />,
  'Azure': <FaCloud />,
  'AWS': <FaAws />,
    'Python': <SiPython />,
  }

  const SkillBadge = ({ label }: { label: string }) => (
    <span className="badge-skill d-inline-flex align-items-center gap-2">
      <span className="skill-icon" aria-hidden>{skillIconMap[label] ?? <SiPostman />}</span>
      <span>{label}</span>
    </span>
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus({ type: null, msg: '' })

    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: 'error', msg: 'Please fill out your name, email, and message.' })
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus({ type: 'error', msg: 'Please enter a valid email address.' })
      return
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

    if (!serviceId || !templateId || !publicKey) {
      setStatus({ type: 'error', msg: 'Email service is not configured. Please set EmailJS environment variables.' })
      return
    }

    setSending(true)
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: name,
          from_email: email,
          message,
          to_email: 'jcsalameda.cpe@gmail.com',
          subject: `Portfolio contact from ${name}`,
        },
        { publicKey }
      )
      setStatus({ type: 'success', msg: "Thanks! Your message was sent. I'll get back to you soon." })
      setName('')
      setEmail('')
      setMessage('')
    } catch (error) {
      // Log to console for diagnostics while keeping UI message generic
      console.error('Email send failed', error)
      setStatus({ type: 'error', msg: 'Something went wrong while sending. Please try again later or reach me on LinkedIn.' })
    } finally {
      setSending(false)
    }
  }
  const items = [
    // Store core skills inside the items list so they can be displayed by InfiniteScroll with icons
    ...coreSkills.map((skill) => ({ content: <SkillBadge key={skill} label={skill} /> })),
  ];

  return (
    <div className="app-bg text-light">
      {createPortal(
        <LiquidEther
          colors={["#00FF85", "#1E90FF", "#FF0099"]}
          autoDemo={true}
          autoResumeDelay={1000}
          autoRampDuration={0.6}
          autoSpeed={0.5}
          autoIntensity={2.0}
          className="liquid-ether-container"
        />,
        document.body
      )}
      <Navbar expand="lg" variant="dark" className="py-3 sticky-top nav-blur d-none">
        <Container>
          <Navbar.Brand href="#home" onClick={(e: React.MouseEvent<HTMLElement>) => { e.preventDefault(); handleScroll('home') }}>JC Salameda</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" onClick={(e: React.MouseEvent<HTMLElement>) => { e.preventDefault(); handleScroll('home') }}>Home</Nav.Link>
              <Nav.Link href="#about" onClick={(e: React.MouseEvent<HTMLElement>) => { e.preventDefault(); handleScroll('about') }}>About</Nav.Link>
              <Nav.Link href="#contact" onClick={(e: React.MouseEvent<HTMLElement>) => { e.preventDefault(); handleScroll('contact') }}>Contact</Nav.Link>
              <Nav.Link href="/Salameda, John Carlo - Resume 2025.pdf" download>
                <Button size="sm" variant="primary" className="ms-lg-3">Download Resume</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Home Section */}
      <section id="home" className="section home-section position-relative overflow-hidden">
        <Container className="py-5">
          <div className="row align-items-center py-5">
            <div className="col-lg-7 mt-4 mt-lg-0 p-2">
              <BlurText
                text="John Carlo Salameda"
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="display-1 hero-title mb-4"
              />
              <p>
                Software Engineer • Mobile Developer • TypeScript
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Button variant="cta" onClick={() => handleScroll('contact')}>Get in touch</Button>
                <Button variant="outline-light" href="/Salameda, John Carlo - Resume 2025.pdf" target="_blank">View Resume</Button>
              </div>
            </div>
            <div className="col-lg-5 mt-4 mt-lg-0">
              {/* <div className="resume-embed shadow rounded-4 p-2 bg-dark-subtle">
                <iframe title="Resume" className="w-100 rounded-3 resume-frame" src="/Salameda, John Carlo - Resume 2025.pdf#view=FitH"></iframe>
              </div> */}
              <div className="infinite-scroll-wrap">
                <InfiniteScroll
                  items={items}
                  isTilted={true}
                  tiltDirection='left'
                  autoplay={true}
                  autoplaySpeed={1}
                  autoplayDirection="down"
                  pauseOnHover={true}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <Container>
          <div className="row justify-content-center align-items-center g-4">
            <div className="col-lg-7 order-2 order-lg-1">
              <h2 className="mb-4 section-title">
                <DecryptedText text="About" animateOn="view" revealDirection="center" />
              </h2>
              <p className="mb-3">
                <DecryptedText
                  text="Full‑stack developer with a front‑end focus, delivering robust, accessible, and performant web apps. I translate product goals into clean, component‑driven UIs, integrate reliable APIs, and ship features end‑to‑end with attention to DX, testing, and maintainability."
                  animateOn="view"
                  revealDirection="center"
                  repeatOnView
                />
              </p>

              <div className="mb-4">
                <h5 className="mb-2">
                  <DecryptedText text="Core skills" animateOn="view" revealDirection="center" />
                </h5>
                <div className="d-flex flex-wrap gap-2 skills-list">
                  {coreSkills.map((skill) => (
                    <span key={skill} className="badge-skill d-inline-flex align-items-center gap-2">
                      <span className="skill-icon" aria-hidden>{/* reuse icon map */}{skillIconMap[skill]}</span>
                      <DecryptedText text={skill} animateOn="view" revealDirection="center" repeatOnView />
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="mb-3">
                  <DecryptedText text="Experience" animateOn="view" revealDirection="center" />
                </h5>
                <div className="exp-item">
                  <div className="d-flex justify-content-between flex-wrap gap-2">
                    <strong>
                      <DecryptedText text="Full Stack Developer, EGS Enggist & Grandjean Software (CALCMENU Philippines)" animateOn="view" revealDirection="center" repeatOnView />
                    </strong>
                    <span className="text-secondary-text">
                      <DecryptedText text="September 2023 — Present" animateOn="view" revealDirection="center" repeatOnView />
                    </span>
                  </div>
                  <p className="mt-2 mb-3">
                    <DecryptedText
                      text="Building and enhancing enterprise recipe and menu management applications end‑to‑end, with a focus on clean, component‑driven UI, reliable API integration, and performance. Responsibilities include feature delivery across the stack, optimizing services and data flows, and leveraging cloud platforms for scalability and resilience. Partner closely with design, QA, and backend teams to deliver high‑quality releases and improve user experience and reliability."
                      animateOn="view"
                      revealDirection="center"
                      repeatOnView
                    />
                  </p>
                </div>
                <div className="exp-item">
                  <div className="d-flex justify-content-between flex-wrap gap-2">
                    <strong>
                      <DecryptedText text="Software Engineer Intern, Navitaire Philippines Inc." animateOn="view" revealDirection="center" repeatOnView />
                    </strong>
                    <span className="text-secondary-text">
                      <DecryptedText text="February 2023 — June 2023" animateOn="view" revealDirection="center" repeatOnView />
                    </span>
                  </div>
                  <p className="mt-2 mb-0">
                    <DecryptedText
                      text="Contributed to user interface implementation and engineering tasks in a production environment, collaborating with seniors on issue triage, fixes, and incremental feature work. Emphasized clean code, testing, and effective communication while learning enterprise development workflows."
                      animateOn="view"
                      revealDirection="center"
                      repeatOnView
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 order-1 order-lg-2 d-flex justify-content-center align-items-center">
              <ProfileCard
                name="John Carlo"
                title="Full stack Developer"
                handle="JC Salameda"
                status="Online"
                // contactText="Contact Me"
                avatarUrl="myImageNoBg.png"
                miniAvatarUrl='MyImage.png'
                iconUrl="MyImage.png"
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={true}
                onContactClick={() => console.log('Contact clicked')}
              />            </div>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <Container>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                <h2 className="section-title m-0">Contact</h2>
                <a
                  href="https://www.linkedin.com/in/john-carlo-salameda/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ms-auto"
                >
                  <Button variant="outline-light">Contact via LinkedIn</Button>
                </a>
              </div>
              <p className="mb-3">Let's connect. Send me a message and I'll get back to you.</p>
              {status.type && (
                <Alert variant={status.type === 'success' ? 'success' : 'danger'} className="mb-3">
                  {status.msg}
                </Alert>
              )}
              <form className="row g-3" onSubmit={handleSubmit} noValidate>
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    id="name"
                    className="form-control"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={sending}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={sending}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    className="form-control"
                    rows={4}
                    placeholder="How can I help?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={sending}
                    required
                  />
                </div>
                <div className="col-12 d-flex justify-content-end">
                  <Button type="submit" variant="cta" disabled={sending}>
                    {sending ? (
                      <>
                        <Spinner size="sm" animation="border" className="me-2" /> Sending...
                      </>
                    ) : (
                      'Send'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>

      <footer className="py-4 text-center text-secondary-text small">
        © {new Date().getFullYear()} John Carlo Salameda. All rights reserved.
      </footer>
      <Dock />
    </div>
  )
}

export default App
