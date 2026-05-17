import { useState, useEffect } from "react";

const YELLOW = "#FFD600";
const DARK = "#0d0d0d";
const DARK2 = "#141414";
const DARK3 = "#1c1c1c";
const GRAY = "#aaaaaa";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${DARK};
    color: #f0f0f0;
    font-family: 'Barlow', sans-serif;
    scroll-behavior: smooth;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${DARK}; }
  ::-webkit-scrollbar-thumb { background: ${YELLOW}; border-radius: 3px; }

  .bebas { font-family: 'Bebas Neue', sans-serif; letter-spacing: 2px; }

  /* NAV */
  .gym-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
    background: rgba(13,13,13,0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #222;
    padding: 14px 0;
    transition: all 0.3s;
  }
  .gym-nav.scrolled { padding: 10px 0; border-bottom: 1px solid ${YELLOW}33; }
  .nav-logo { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: ${YELLOW}; letter-spacing: 4px; text-decoration: none; }
  .nav-logo span { color: #fff; }
  .nav-link-custom {
    color: #ccc !important; font-weight: 500; font-size: 14px; letter-spacing: 1.5px;
    text-transform: uppercase; padding: 6px 14px !important;
    transition: color 0.2s;
    text-decoration: none;
  }
  .nav-link-custom:hover { color: ${YELLOW} !important; }
  .nav-cta {
    background: ${YELLOW}; color: #000 !important; font-weight: 700;
    padding: 8px 22px !important; border-radius: 2px;
    text-transform: uppercase; font-size: 13px; letter-spacing: 1.5px;
    transition: all 0.2s; text-decoration: none;
  }
  .nav-cta:hover { background: #fff; color: #000 !important; }
  .hamburger { background: none; border: 1px solid #333; color: ${YELLOW}; padding: 6px 10px; cursor: pointer; border-radius: 2px; }

  /* HERO */
  .hero {
    min-height: 100vh;
    background: ${DARK};
    display: flex; align-items: center;
    position: relative; overflow: hidden;
    padding-top: 80px;
  }
  .hero-bg-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(255,214,0,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,214,0,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .hero-accent {
    position: absolute; right: -120px; top: 50%; transform: translateY(-50%);
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,214,0,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-tag {
    display: inline-block; background: ${YELLOW}22; border: 1px solid ${YELLOW}44;
    color: ${YELLOW}; font-size: 12px; letter-spacing: 3px; text-transform: uppercase;
    padding: 6px 16px; border-radius: 2px; margin-bottom: 24px;
  }
  .hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(64px, 10vw, 130px);
    line-height: 0.9;
    letter-spacing: 2px;
    color: #fff;
  }
  .hero-title .accent { color: ${YELLOW}; display: block; }
  .hero-sub { color: ${GRAY}; font-size: 17px; font-weight: 300; max-width: 480px; line-height: 1.7; margin: 24px 0 40px; }
  .btn-primary-gym {
    background: ${YELLOW}; color: #000; font-weight: 700;
    padding: 16px 38px; font-size: 14px; letter-spacing: 2px;
    text-transform: uppercase; border: none; cursor: pointer;
    border-radius: 2px; transition: all 0.2s; text-decoration: none; display: inline-block;
  }
  .btn-primary-gym:hover { background: #fff; transform: translateY(-2px); }
  .btn-outline-gym {
    background: transparent; color: #fff; font-weight: 600;
    padding: 15px 38px; font-size: 14px; letter-spacing: 2px;
    text-transform: uppercase; border: 1px solid #444; cursor: pointer;
    border-radius: 2px; transition: all 0.2s; text-decoration: none; display: inline-block;
  }
  .btn-outline-gym:hover { border-color: ${YELLOW}; color: ${YELLOW}; }
  .hero-stats { display: flex; gap: 48px; margin-top: 64px; }
  .stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 48px; color: ${YELLOW}; line-height: 1; }
  .stat-label { font-size: 12px; color: ${GRAY}; letter-spacing: 2px; text-transform: uppercase; margin-top: 4px; }
  .hero-img-side {
    position: relative; display: flex; align-items: center; justify-content: center;
  }
  .hero-img-placeholder {
    width: 100%; max-width: 500px; height: 560px;
    background: ${DARK3};
    border: 1px solid #282828;
    border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .hero-img-placeholder::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, ${YELLOW}11 0%, transparent 60%);
  }
  .hero-img-icon { font-size: 120px; opacity: 0.15; }
  .hero-badge {
    position: absolute; bottom: 32px; left: -20px;
    background: ${YELLOW}; color: #000; padding: 16px 20px;
    border-radius: 4px; font-weight: 700; font-size: 13px;
    box-shadow: 0 8px 32px rgba(255,214,0,0.3);
  }
  .hero-badge span { display: block; font-size: 22px; font-family: 'Bebas Neue', sans-serif; letter-spacing: 1px; }

  /* MARQUEE */
  .marquee-bar { background: ${YELLOW}; padding: 14px 0; overflow: hidden; white-space: nowrap; }
  .marquee-track { display: inline-flex; animation: marquee 18s linear infinite; }
  .marquee-track span {
    font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 3px;
    color: #000; padding: 0 40px;
  }
  .marquee-track .dot { color: #00000066; }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* SECTION COMMON */
  .section { padding: 100px 0; }
  .section-tag {
    display: inline-block; background: ${YELLOW}22; border: 1px solid ${YELLOW}44;
    color: ${YELLOW}; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
    padding: 5px 14px; border-radius: 2px; margin-bottom: 16px;
  }
  .section-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(40px, 6vw, 72px); letter-spacing: 2px; color: #fff; line-height: 1; }
  .section-title .accent { color: ${YELLOW}; }
  .section-sub { color: ${GRAY}; font-size: 16px; font-weight: 300; line-height: 1.7; max-width: 540px; }
  .divider { width: 48px; height: 3px; background: ${YELLOW}; margin: 20px 0; }

  /* ABOUT */
  .about-section { background: ${DARK2}; }
  .about-card {
    background: ${DARK3}; border: 1px solid #2a2a2a; border-radius: 4px;
    padding: 32px; transition: border-color 0.3s;
  }
  .about-card:hover { border-color: ${YELLOW}44; }
  .about-icon { font-size: 36px; margin-bottom: 16px; }
  .about-card h4 { font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: #fff; letter-spacing: 1px; margin-bottom: 8px; }
  .about-card p { color: ${GRAY}; font-size: 14px; line-height: 1.7; }

  /* CLASSES */
  .classes-section { background: ${DARK}; }
  .class-card {
    background: ${DARK3}; border: 1px solid #222; border-radius: 4px;
    overflow: hidden; transition: all 0.3s; cursor: pointer;
  }
  .class-card:hover { border-color: ${YELLOW}; transform: translateY(-6px); }
  .class-img {
    height: 200px; display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .class-emoji { font-size: 72px; z-index: 1; }
  .class-body { padding: 24px; }
  .class-badge {
    display: inline-block; background: ${YELLOW}22; color: ${YELLOW};
    font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
    padding: 3px 10px; border-radius: 2px; margin-bottom: 10px;
  }
  .class-card h4 { font-family: 'Bebas Neue', sans-serif; font-size: 26px; color: #fff; letter-spacing: 1px; margin-bottom: 6px; }
  .class-card p { color: ${GRAY}; font-size: 14px; line-height: 1.6; margin-bottom: 16px; }
  .class-meta { display: flex; gap: 16px; }
  .class-meta span { font-size: 12px; color: #777; }
  .class-meta strong { color: ${YELLOW}; }

  /* TRAINERS */
  .trainers-section { background: ${DARK2}; }
  .trainer-card {
    background: ${DARK3}; border: 1px solid #222; border-radius: 4px;
    overflow: hidden; transition: all 0.3s; text-align: center;
  }
  .trainer-card:hover { border-color: ${YELLOW}44; }
  .trainer-avatar {
    width: 100%; height: 260px; background: ${DARK};
    display: flex; align-items: center; justify-content: center;
    font-size: 90px; position: relative;
  }
  .trainer-avatar::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0;
    height: 60px; background: linear-gradient(transparent, ${DARK3});
  }
  .trainer-info { padding: 24px; }
  .trainer-info h4 { font-family: 'Bebas Neue', sans-serif; font-size: 26px; color: #fff; letter-spacing: 1px; }
  .trainer-spec { color: ${YELLOW}; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; }
  .trainer-info p { color: ${GRAY}; font-size: 13px; line-height: 1.6; }

  /* PRICING */
  .pricing-section { background: ${DARK}; }
  .price-card {
    background: ${DARK3}; border: 1px solid #222; border-radius: 4px;
    padding: 40px 32px; transition: all 0.3s; position: relative;
  }
  .price-card.featured {
    background: ${YELLOW}; border-color: ${YELLOW};
    transform: scale(1.04);
  }
  .price-card:hover:not(.featured) { border-color: ${YELLOW}44; }
  .price-tag { font-family: 'Bebas Neue', sans-serif; font-size: 72px; color: #fff; line-height: 1; }
  .price-card.featured .price-tag { color: #000; }
  .price-period { font-size: 14px; color: ${GRAY}; }
  .price-card.featured .price-period { color: #00000088; }
  .price-name { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 2px; margin-bottom: 6px; }
  .price-card.featured .price-name { color: #000; }
  .price-desc { font-size: 13px; color: ${GRAY}; margin-bottom: 28px; }
  .price-card.featured .price-desc { color: #00000088; }
  .price-feature { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; font-size: 14px; color: #ccc; }
  .price-card.featured .price-feature { color: #000; }
  .price-check { color: ${YELLOW}; font-size: 16px; }
  .price-card.featured .price-check { color: #000; }
  .best-badge {
    position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
    background: #000; color: ${YELLOW}; font-size: 11px; letter-spacing: 2px;
    text-transform: uppercase; padding: 4px 16px; border-radius: 20px;
    border: 1px solid ${YELLOW}; white-space: nowrap;
  }
  .btn-price-featured {
    background: #000; color: ${YELLOW}; font-weight: 700;
    padding: 14px 32px; font-size: 13px; letter-spacing: 2px;
    text-transform: uppercase; border: none; cursor: pointer;
    border-radius: 2px; width: 100%; margin-top: 28px; transition: all 0.2s;
  }
  .btn-price-featured:hover { background: #111; }
  .btn-price-outline {
    background: transparent; color: #fff; font-weight: 600;
    padding: 14px 32px; font-size: 13px; letter-spacing: 2px;
    text-transform: uppercase; border: 1px solid #333; cursor: pointer;
    border-radius: 2px; width: 100%; margin-top: 28px; transition: all 0.2s;
  }
  .btn-price-outline:hover { border-color: ${YELLOW}; color: ${YELLOW}; }

  /* SCHEDULE */
  .schedule-section { background: ${DARK2}; }
  .schedule-table { width: 100%; border-collapse: collapse; }
  .schedule-table th {
    background: ${YELLOW}; color: #000; font-family: 'Bebas Neue', sans-serif;
    font-size: 16px; letter-spacing: 2px; padding: 14px 20px; text-align: left;
  }
  .schedule-table td { padding: 14px 20px; border-bottom: 1px solid #1e1e1e; font-size: 14px; color: #ccc; }
  .schedule-table tr:hover td { background: ${DARK3}; }
  .sched-badge {
    display: inline-block; background: ${YELLOW}22; color: ${YELLOW};
    font-size: 11px; letter-spacing: 1px; padding: 2px 8px; border-radius: 2px;
  }

  /* TESTIMONIALS */
  .testimonials-section { background: ${DARK}; }
  .testi-card {
    background: ${DARK3}; border: 1px solid #222; border-radius: 4px;
    padding: 36px; transition: border-color 0.3s;
  }
  .testi-card:hover { border-color: ${YELLOW}44; }
  .testi-stars { color: ${YELLOW}; font-size: 18px; margin-bottom: 16px; }
  .testi-text { color: #ccc; font-size: 15px; line-height: 1.8; margin-bottom: 24px; font-style: italic; }
  .testi-author { display: flex; align-items: center; gap: 14px; }
  .testi-avatar {
    width: 46px; height: 46px; border-radius: 50%;
    background: ${YELLOW}22; border: 2px solid ${YELLOW}44;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; color: ${YELLOW}; font-size: 16px;
  }
  .testi-name { font-weight: 600; font-size: 14px; color: #fff; }
  .testi-meta { font-size: 12px; color: #666; letter-spacing: 1px; }

  /* CTA BANNER */
  .cta-banner {
    background: ${YELLOW}; padding: 80px 0;
    text-align: center; position: relative; overflow: hidden;
  }
  .cta-banner::before {
    content: '';
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .cta-banner h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(40px,7vw,80px); color: #000; letter-spacing: 3px; margin-bottom: 12px; position: relative; }
  .cta-banner p { color: #00000099; font-size: 17px; max-width: 500px; margin: 0 auto 36px; position: relative; }

  /* CONTACT */
  .contact-section { background: ${DARK2}; }
  .contact-input {
    width: 100%; background: ${DARK3}; border: 1px solid #2a2a2a;
    color: #fff; padding: 14px 18px; border-radius: 2px; font-size: 14px;
    outline: none; transition: border-color 0.2s; margin-bottom: 16px;
    font-family: 'Barlow', sans-serif;
  }
  .contact-input:focus { border-color: ${YELLOW}; }
  .contact-input::placeholder { color: #555; }
  .contact-info-item { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 28px; }
  .contact-info-icon { 
    width: 44px; height: 44px; background: ${YELLOW}22; border: 1px solid ${YELLOW}33;
    display: flex; align-items: center; justify-content: center; border-radius: 2px;
    font-size: 18px; flex-shrink: 0; color: ${YELLOW};
  }
  .contact-info-item h5 { font-size: 13px; letter-spacing: 1px; text-transform: uppercase; color: ${YELLOW}; margin-bottom: 4px; }
  .contact-info-item p { color: ${GRAY}; font-size: 14px; line-height: 1.6; }

  /* FOOTER */
  .gym-footer { background: #080808; padding: 60px 0 28px; border-top: 1px solid #1a1a1a; }
  .footer-logo { font-family: 'Bebas Neue', sans-serif; font-size: 36px; color: ${YELLOW}; letter-spacing: 4px; }
  .footer-logo span { color: #fff; }
  .footer-tagline { color: #555; font-size: 13px; margin-top: 8px; }
  .footer-heading { font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 2px; color: #fff; margin-bottom: 20px; }
  .footer-link { display: block; color: #666; font-size: 14px; margin-bottom: 10px; text-decoration: none; transition: color 0.2s; }
  .footer-link:hover { color: ${YELLOW}; }
  .footer-bottom { border-top: 1px solid #1a1a1a; margin-top: 48px; padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
  .footer-bottom p { color: #444; font-size: 13px; }
  .social-link {
    width: 38px; height: 38px; border: 1px solid #2a2a2a; border-radius: 2px;
    display: inline-flex; align-items: center; justify-content: center;
    color: #666; font-size: 16px; text-decoration: none;
    transition: all 0.2s; margin-right: 8px;
  }
  .social-link:hover { border-color: ${YELLOW}; color: ${YELLOW}; }

  /* MOBILE NAV */
  .mobile-menu {
    display: none; position: fixed; inset: 0; background: ${DARK};
    z-index: 998; flex-direction: column; align-items: center;
    justify-content: center; gap: 32px;
  }
  .mobile-menu.open { display: flex; }
  .mobile-menu a { font-family: 'Bebas Neue', sans-serif; font-size: 36px; letter-spacing: 3px; color: #fff; text-decoration: none; transition: color 0.2s; }
  .mobile-menu a:hover { color: ${YELLOW}; }
  .mobile-close { position: absolute; top: 24px; right: 24px; background: none; border: none; color: #fff; font-size: 28px; cursor: pointer; }

  @media (max-width: 768px) {
    .hero-stats { gap: 24px; }
    .stat-num { font-size: 36px; }
    .price-card.featured { transform: scale(1); }
    .hero-img-side { display: none; }
  }
`;

const classes = [
    { emoji: "🥊", color: "#1a0a0a", name: "BOXING", badge: "High Intensity", desc: "Master footwork, combinations, and explosive power in this full-body combat workout.", time: "60 min", level: "All Levels" },
    { emoji: "🏋️", color: "#0a0f1a", name: "POWERLIFTING", badge: "Strength", desc: "Build raw strength with progressive overload techniques and expert coaching.", time: "75 min", level: "Intermediate" },
    { emoji: "🧘", color: "#0a1a0f", name: "YOGA FLOW", badge: "Recovery", desc: "Restore, stretch, and reconnect your body and mind through dynamic flow sequences.", time: "50 min", level: "Beginner" },
    { emoji: "⚡", color: "#1a150a", name: "HIIT", badge: "Fat Burn", desc: "Maximum caloric burn in minimum time with interval-based functional training.", time: "45 min", level: "Advanced" },
    { emoji: "🚴", color: "#0a0a1a", name: "SPIN CYCLE", badge: "Cardio", desc: "High-energy indoor cycling sessions synced to pulsing music and LED lighting.", time: "55 min", level: "All Levels" },
    { emoji: "🤸", color: "#150a1a", name: "GYMNASTICS", badge: "Agility", desc: "Develop mobility, coordination, and body control through gymnastic fundamentals.", time: "60 min", level: "Intermediate" },
];

const trainers = [
    { emoji: "💪", name: "MARCUS STEEL", spec: "Strength & Conditioning", desc: "10 years competitive powerlifting. Specializes in progressive overload and athletic performance." },
    { emoji: "🥋", name: "SARA CHEN", spec: "Boxing & Kickboxing", desc: "Former national boxing champion. Transforms beginners into confident fighters." },
    { emoji: "🌿", name: "JAMES RIVERS", spec: "Yoga & Mobility", desc: "Certified yoga therapist focused on recovery, flexibility, and mindful movement." },
    { emoji: "🔥", name: "AISHA FORD", spec: "HIIT & CrossFit", desc: "CrossFit Level 3 trainer with a passion for functional fitness and community." },
];

const schedule = [
    { time: "06:00 AM", class: "Morning HIIT", trainer: "Aisha Ford", day: "Mon/Wed/Fri", spots: "12 spots" },
    { time: "08:00 AM", class: "Yoga Flow", trainer: "James Rivers", day: "Daily", spots: "20 spots" },
    { time: "12:00 PM", class: "Powerlifting", trainer: "Marcus Steel", day: "Tue/Thu/Sat", spots: "8 spots" },
    { time: "06:00 PM", class: "Boxing", trainer: "Sara Chen", day: "Mon/Wed/Fri", spots: "15 spots" },
    { time: "07:30 PM", class: "Spin Cycle", trainer: "Aisha Ford", day: "Daily", spots: "18 spots" },
];

const testimonials = [
    { text: "IRONFORGE completely transformed my body and mindset. Lost 40lbs in 6 months and gained more confidence than I've ever had.", name: "David M.", meta: "Member for 2 years", initial: "D" },
    { text: "The trainers here actually care about your progress. Sara's boxing classes pushed me beyond what I thought was possible.", name: "Priya K.", meta: "Member for 1 year", initial: "P" },
    { text: "Best gym investment I've ever made. The equipment is top-tier and the community keeps you coming back every single day.", name: "Carlos R.", meta: "Member for 3 years", initial: "C" },
];

export default function GymWebsite() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const marqueeItems = ["STRENGTH", "POWER", "ENDURANCE", "RESULTS", "COMMUNITY", "DEDICATION", "STRENGTH", "POWER", "ENDURANCE", "RESULTS", "COMMUNITY", "DEDICATION"];

    return (
        <>
            <style>{styles} </style>

            {/* MOBILE MENU */}
            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                <button className="mobile-close" onClick={() => setMenuOpen(false)
                }>✕</button>
                {
                    ["about", "classes", "trainers", "pricing", "contact"].map(s => (
                        <a key={s} onClick={() => scrollTo(s)} style={{ cursor: "pointer" }}> {s.toUpperCase()} </a>
                    ))}
            </div>

            {/* NAV */}
            <nav className={`gym-nav ${scrolled ? "scrolled" : ""}`}>
                <div className="container" >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <a className="nav-logo" onClick={() => scrollTo("hero")} style={{ cursor: "pointer" }}> POWER < span > ZONE </span></a >
                        <div className="d-none d-lg-flex align-items-center gap-1" >
                            {
                                ["about", "classes", "trainers", "pricing", "schedule", "contact"].map(s => (
                                    <a key={s} className="nav-link-custom" onClick={() => scrollTo(s)} style={{ cursor: "pointer" }}> {s} </a>
                                ))}
                            <a className="nav-cta ms-3" onClick={() => scrollTo("pricing")} style={{ cursor: "pointer" }}> Join Now </a>
                        </div>
                        < button className="hamburger d-lg-none" onClick={() => setMenuOpen(true)}>☰</button>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <section id="hero" className="hero" >
                <div className="hero-bg-grid" />
                <div className="hero-accent" />
                <div className="container" >
                    <div className="row align-items-center g-5" >
                        <div className="col-lg-6" >
                            <div className="hero-tag" >💪 Welcome to Power Zone </div>
                            < h1 className="hero-title" >
                                FORGE YOUR
                                < span className="accent" > BEST </span>
                                SELF
                            </h1>
                            < p className="hero-sub" > Elite training, world - class coaches, and a community that pushes you past every limit you thought you had.</p>
                            < div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                                <a className="btn-primary-gym" onClick={() => scrollTo("pricing")} style={{ cursor: "pointer" }}> Start Free Trial </a>
                                < a className="btn-outline-gym" onClick={() => scrollTo("classes")} style={{ cursor: "pointer" }}> View Classes </a>
                            </div>
                            < div className="hero-stats" >
                                {
                                    [["5K+", "Members"], ["50+", "Classes/Week"], ["15+", "Expert Trainers"], ["8", "Years Strong"]].map(([n, l]) => (
                                        <div key={l} >
                                            <div className="stat-num" > {n} </div>
                                            < div className="stat-label" > {l} </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        < div className="col-lg-6 hero-img-side" >
                            <div className="hero-img-placeholder" >
                                <span className="hero-img-icon" >🏋️</span>
                                < div className="hero-badge" >
                                    <span>🔥 OPEN 24 / 7 </span>
                                    365 Days a Year
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MARQUEE */}
            <div className="marquee-bar" >
                <div className="marquee-track" >
                    {
                        marqueeItems.map((item, i) => (
                            <span key={i} > {item} < span className="dot" >◆</span></span >
                        ))
                    }
                </div>
            </div>

            {/* ABOUT */}
            <section id="about" className="section about-section" >
                <div className="container" >
                    <div className="row align-items-center g-5 mb-5" >
                        <div className="col-lg-5" >
                            <div className="section-tag" > About Power Zone </div>
                            < h2 className="section-title" > WHY WE'RE <span className="accent">DIFFERENT</span></h2>
                            < div className="divider" />
                            <p className="section-sub" > Since 2016, Power Zone has been the city's premier destination for serious athletes and beginners alike. We don't just build bodies — we forge champions.</p>
                        </div>
                        < div className="col-lg-7" >
                            <div className="row g-3" >
                                {
                                    [
                                        { icon: "🏟️", title: "Elite Facilities", desc: "20,000 sq ft of premium equipment, recovery zones, and dedicated class studios." },
                                        { icon: "🎯", title: "Personalized Coaching", desc: "Every member gets a custom plan tailored to their goals, body type, and schedule." },
                                        { icon: "📊", title: "Progress Tracking", desc: "Advanced body composition analysis and performance metrics every 30 days." },
                                        { icon: "🤝", title: "Real Community", desc: "Join a tribe of motivated individuals who celebrate every win together." },
                                    ].map(({ icon, title, desc }) => (
                                        <div key={title} className="col-sm-6" >
                                            <div className="about-card" >
                                                <div className="about-icon" > {icon} </div>
                                                < h4 > {title} </h4>
                                                < p > {desc} </p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CLASSES */}
            <section id="classes" className="section classes-section" >
                <div className="container" >
                    <div style={{ textAlign: "center", marginBottom: "60px" }}>
                        <div className="section-tag" > Training Programs </div>
                        < h2 className="section-title" > OUR < span className="accent" > CLASSES </span></h2 >
                        <div className="divider" style={{ margin: "20px auto" }} />
                        < p className="section-sub" style={{ margin: "0 auto" }}> From explosive HIIT to meditative yoga — we have a class for every goal and every level.</p>
                    </div>
                    < div className="row g-4" >
                        {
                            classes.map((c) => (
                                <div key={c.name} className="col-md-6 col-lg-4" >
                                    <div className="class-card" >
                                        <div className="class-img" style={{ background: c.color }} >
                                            <span className="class-emoji" > {c.emoji} </span>
                                        </div>
                                        < div className="class-body" >
                                            <div className="class-badge" > {c.badge} </div>
                                            < h4 > {c.name} </h4>
                                            < p > {c.desc} </p>
                                            < div className="class-meta" >
                                                <span>⏱ <strong>{c.time} </strong></span >
                                                <span>📈 <strong>{c.level} </strong></span >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>

            {/* TRAINERS */}
            <section id="trainers" className="section trainers-section" >
                <div className="container" >
                    <div style={{ textAlign: "center", marginBottom: "60px" }}>
                        <div className="section-tag" > Expert Team </div>
                        < h2 className="section-title" > MEET YOUR < span className="accent" > TRAINERS </span></h2 >
                        <div className="divider" style={{ margin: "20px auto" }} />
                    </div>
                    < div className="row g-4" >
                        {
                            trainers.map((t) => (
                                <div key={t.name} className="col-md-6 col-lg-3" >
                                    <div className="trainer-card" >
                                        <div className="trainer-avatar" > {t.emoji} </div>
                                        < div className="trainer-info" >
                                            <h4>{t.name} </h4>
                                            < p className="trainer-spec" > {t.spec} </p>
                                            < p > {t.desc} </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section id="pricing" className="section pricing-section" >
                <div className="container" >
                    <div style={{ textAlign: "center", marginBottom: "60px" }}>
                        <div className="section-tag" > Membership Plans </div>
                        < h2 className="section-title" > SIMPLE < span className="accent" > PRICING </span></h2 >
                        <div className="divider" style={{ margin: "20px auto" }} />
                        < p className="section-sub" style={{ margin: "0 auto" }}> No hidden fees.Cancel anytime.Start your free 7 - day trial today.</p>
                    </div>
                    < div className="row g-4 align-items-center justify-content-center" >
                        {
                            [
                                {
                                    name: "STARTER", price: "29", period: "/month", desc: "Perfect for getting started",
                                    features: ["Gym floor access", "2 classes/week", "Locker room", "Basic fitness assessment"],
                                    featured: false
                                },
                                {
                                    name: "ELITE", price: "59", period: "/month", desc: "Our most popular plan",
                                    features: ["Unlimited classes", "Personal trainer (2x/mo)", "Nutrition consultation", "Progress tracking", "Guest passes (2/mo)"],
                                    featured: true
                                },
                                {
                                    name: "CHAMPION", price: "99", period: "/month", desc: "For serious athletes",
                                    features: ["Everything in Elite", "Unlimited PT sessions", "Priority class booking", "Recovery suite access", "Monthly body scan", "VIP lounge access"],
                                    featured: false
                                }
                            ].map((plan) => (
                                <div key={plan.name} className="col-md-4" >
                                    <div className={`price-card ${plan.featured ? "featured" : ""}`} >
                                        {plan.featured && <div className="best-badge">⭐ Most Popular</ div >}
                                        <p className="price-name" style={{ color: plan.featured ? "#000" : "#fff" }}> {plan.name} </p>
                                        < p className="price-desc" > {plan.desc} </p>
                                        < div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 28 }}>
                                            <span style={{ fontSize: 18, color: plan.featured ? "#000" : YELLOW }}> $ </span>
                                            < span className="price-tag" > {plan.price} </span>
                                            < span className="price-period" > {plan.period} </span>
                                        </div>
                                        {
                                            plan.features.map(f => (
                                                <div key={f} className="price-feature" >
                                                    <span className="price-check" >✓</span> {f}
                                                </div>
                                            ))
                                        }
                                        <button
                                            className={plan.featured ? "btn-price-featured" : "btn-price-outline"}
                                            onClick={() => scrollTo("contact")}
                                        >
                                            Get Started
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>

            {/* SCHEDULE */}
            <section id="schedule" className="section schedule-section" style={{ background: DARK2 }}>
                <div className="container" >
                    <div style={{ textAlign: "center", marginBottom: "60px" }}>
                        <div className="section-tag" > Weekly Timetable </div>
                        < h2 className="section-title" > CLASS < span className="accent" > SCHEDULE </span></h2 >
                        <div className="divider" style={{ margin: "20px auto" }} />
                    </div>
                    < div style={{ overflowX: "auto" }}>
                        <table className="schedule-table" >
                            <thead>
                                <tr>
                                    <th>Time </th><th>Class</th > <th>Trainer </th><th>Days</th > <th>Availability </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    schedule.map((row) => (
                                        <tr key={row.class} >
                                            <td style={{ color: YELLOW, fontWeight: 600 }}> {row.time} </td>
                                            < td style={{ fontWeight: 600, color: "#fff" }}> {row.class} </td>
                                            < td > {row.trainer} </td>
                                            < td > {row.day} </td>
                                            < td > <span className="sched-badge" > {row.spots} </span></td >
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="section testimonials-section" >
                <div className="container" >
                    <div style={{ textAlign: "center", marginBottom: "60px" }}>
                        <div className="section-tag" > Success Stories </div>
                        < h2 className="section-title" > REAL < span className="accent" > RESULTS </span></h2 >
                        <div className="divider" style={{ margin: "20px auto" }} />
                    </div>
                    < div className="row g-4" >
                        {
                            testimonials.map((t) => (
                                <div key={t.name} className="col-md-4" >
                                    <div className="testi-card" >
                                        <div className="testi-stars" >★★★★★</div>
                                        < p className="testi-text" > "{t.text}" </p>
                                        < div className="testi-author" >
                                            <div className="testi-avatar" > {t.initial} </div>
                                            < div >
                                                <div className="testi-name" > {t.name} </div>
                                                < div className="testi-meta" > {t.meta} </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            {/* CTA BANNER */}
            <div className="cta-banner" >
                <div className="container" style={{ position: "relative" }}>
                    <h2>READY TO START YOUR JOURNEY ? </h2>
                    < p > Join over 5,000 members who have already transformed their lives at Power Zone.</p>
                    < div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                        <button className="btn-price-featured" style={{ width: "auto", padding: "16px 44px" }} onClick={() => scrollTo("contact")}>
                            Claim Free Trial
                        </button>
                        < button className="btn-price-outline" style={{ width: "auto", padding: "16px 44px", borderColor: "#000", color: "#000" }} onClick={() => scrollTo("classes")}>
                            Browse Classes
                        </button>
                    </div>
                </div>
            </div>

            {/* CONTACT */}
            <section id="contact" className="section contact-section" >
                <div className="container" >
                    <div className="row g-5" >
                        <div className="col-lg-5" >
                            <div className="section-tag" > Get In Touch </div>
                            < h2 className="section-title" > LET'S <span className="accent">TALK</span></h2>
                            < div className="divider" />
                            <p className="section-sub" style={{ marginBottom: 40 }}> Ready to start ? Have questions ? Our team is here 7 days a week to help you find the right plan.</p>
                            {
                                [
                                    { icon: "📍", label: "Location", text: "123 Iron Street, Fitness District, NY 10001" },
                                    { icon: "📞", label: "Phone", text: "+1 (555) 467-6637" },
                                    { icon: "✉️", label: "Email", text: "hello@powerzone.gym" },
                                    { icon: "🕐", label: "Hours", text: "Open 24/7 — 365 days a year" },
                                ].map(({ icon, label, text }) => (
                                    <div key={label} className="contact-info-item" >
                                        <div className="contact-info-icon" > {icon} </div>
                                        < div > <h5>{label} </h5><p>{text}</p > </div>
                                    </div>
                                ))
                            }
                        </div>
                        < div className="col-lg-7" >
                            <div style={{ background: DARK3, border: `1px solid #222`, borderRadius: 4, padding: "40px" }}>
                                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 2, marginBottom: 28 }}> SEND A MESSAGE </h3>
                                < div className="row g-0" >
                                    <div className="col-sm-6 pe-sm-2" >
                                        <input className="contact-input" placeholder="Your Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                    </div>
                                    < div className="col-sm-6 ps-sm-2" >
                                        <input className="contact-input" placeholder="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                    </div>
                                </div>
                                < select className="contact-input" style={{ cursor: "pointer" }}>
                                    <option value="" > I'm interested in...</option>
                                    < option > Starter Membership </option>
                                    < option > Elite Membership </option>
                                    < option > Champion Membership </option>
                                    < option > Personal Training </option>
                                    < option > Free Trial </option>
                                </select>
                                < textarea className="contact-input" rows={5} placeholder="Your message..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ resize: "vertical" }} />
                                < button className="btn-primary-gym" style={{ width: "100%", textAlign: "center" }}> Send Message →</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="gym-footer" >
                <div className="container" >
                    <div className="row g-4" >
                        <div className="col-lg-4" >
                            <div className="footer-logo" > POWER < span > ZONE </span></div >
                            <p className="footer-tagline" > Enter the zone.Transform your life.</p>
                            < p style={{ color: "#444", fontSize: 14, marginTop: 16, lineHeight: 1.7 }}> The city's premier fitness destination for those who refuse to settle for average.</p>
                            < div style={{ marginTop: 24 }}>
                                {["f", "t", "ig", "yt"].map(s => <a key={s} className="social-link" href="#" > {s === "f" ? "fb" : s === "t" ? "tw" : s === "ig" ? "ig" : "yt"} </a>)}
                            </div>
                        </div>
                        < div className="col-6 col-lg-2" >
                            <div className="footer-heading" > Quick Links </div>
                            {
                                ["About Us", "Classes", "Trainers", "Pricing", "Schedule"].map(l => (
                                    <a key={l} className="footer-link" href="#" > {l} </a>
                                ))
                            }
                        </div>
                        < div className="col-6 col-lg-2" >
                            <div className="footer-heading" > Programs </div>
                            {
                                ["Boxing", "Powerlifting", "HIIT", "Yoga Flow", "Spin Cycle"].map(l => (
                                    <a key={l} className="footer-link" href="#" > {l} </a>
                                ))
                            }
                        </div>
                        < div className="col-lg-4" >
                            <div className="footer-heading" > Newsletter </div>
                            < p style={{ color: "#555", fontSize: 14, marginBottom: 16 }}> Get workout tips, schedule updates, and exclusive member deals.</p>
                            < div style={{ display: "flex", gap: 8 }}>
                                <input className="contact-input" placeholder="Enter your email" style={{ marginBottom: 0, flex: 1 }} />
                                < button className="btn-primary-gym" style={{ whiteSpace: "nowrap", padding: "14px 20px" }}>→</button>
                            </div>
                        </div>
                    </div>
                    < div className="footer-bottom" >
                        <p>© 2024 Power Zone Gym.All rights reserved.</p>
                        < p style={{ color: "#333" }}> Privacy Policy · Terms of Service </p>
                    </div>
                </div>
            </footer>
        </>
    );
}