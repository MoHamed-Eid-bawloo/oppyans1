import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
  Search,
  Megaphone,
  Users,
  Code2,
  Database,
  Palette,
  Sparkles,
  Zap,
  Shield,
  Trophy,
  Plus,
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Linkedin,
  Twitter,
  Languages,
} from "lucide-react";
import { useLanguage } from "@/lib/language";
import { tr } from "@/lib/translations";
import t from "@/lib/translations";

/* ---------- constants ---------- */

const WHATSAPP_NUMBER = "201111151280";
const WHATSAPP_DEFAULT_MSG = "Hello Oppyans, I want to know more about your services.";

function whatsAppUrl(message = WHATSAPP_DEFAULT_MSG) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const WHATSAPP_URL = whatsAppUrl();

/* ---------- primitives ---------- */

const ease = [0.22, 1, 0.36, 1] as const;

function SplitWords({
  text,
  className = "",
  delay = 0,
  stagger = 0.06,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.15em] ms-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, ease, delay: delay + i * stagger }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function FadeUp({
  children,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({
  children,
  className = "",
  variant = "primary",
  as = "button",
  href,
  onClick,
  target,
  rel,
  buttonType = "button",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost" | "outline";
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  buttonType?: "button" | "submit";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const handle = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.25);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "relative inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 group";
  const variants = {
    primary: "gradient-gold text-primary-foreground hover:opacity-95",
    ghost: "text-foreground hover:text-primary",
    outline: "glass text-foreground hover:bg-white/10 border border-white/15",
  };
  const Inner = (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handle}
      onMouseLeave={reset}
      className="inline-block"
    >
      <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>
    </motion.div>
  );
  if (as === "a")
    return (
      <a href={href} onClick={onClick} target={target} rel={rel}>
        {Inner}
      </a>
    );
  return (
    <button type={buttonType} onClick={onClick}>
      {Inner}
    </button>
  );
}

function WhatsAppButton({
  className = "",
  variant = "primary",
  compact = false,
  submit = false,
}: {
  className?: string;
  variant?: "primary" | "ghost" | "outline";
  compact?: boolean;
  submit?: boolean;
}) {
  const { lang } = useLanguage();
  const label = tr(lang, t.contact.form.submit);
  if (submit) {
    return (
      <MagneticButton
        variant={variant}
        buttonType="submit"
        className={`${compact ? "!px-5 !py-2.5 !text-xs" : ""} ${className}`}
      >
        {label} <ArrowUpRight className="size-4" />
      </MagneticButton>
    );
  }
  return (
    <MagneticButton
      variant={variant}
      as="a"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${compact ? "!px-5 !py-2.5 !text-xs" : ""} ${className}`}
    >
      {label} <ArrowUpRight className="size-4" />
    </MagneticButton>
  );
}

/* ---------- nav ---------- */

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang } = useLanguage();
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  const links = [
    { href: "#work", label: tr(lang, t.nav.work) },
    { href: "#services", label: tr(lang, t.nav.services) },
    { href: "#process", label: tr(lang, t.nav.process) },
    { href: "#about", label: tr(lang, t.nav.about) },
    { href: "#contact", label: tr(lang, t.nav.contact) },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease, delay: 0.4 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
      >
        <div className={`mx-auto max-w-[1400px] px-5 md:px-8`}>
          <div
            className={`flex items-center justify-between rounded-full px-5 md:px-7 py-3 transition-all duration-500 ${scrolled ? "glass-strong" : ""}`}
          >
            <a href="#top" className="flex items-center gap-2.5 group">
              <span className="grid h-9 w-9 place-items-center rounded-full gradient-gold text-primary-foreground font-display text-lg font-semibold">
                O
              </span>
              <span className="font-display text-lg tracking-tight">
                Oppy<span className="text-gradient-gold">ans</span>
              </span>
            </a>
            <nav className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="relative px-4 py-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors group"
                >
                  {l.label}
                  <span className="absolute start-4 end-4 -bottom-0.5 h-px scale-x-0 group-hover:scale-x-100 origin-right transition-transform bg-primary" />
                </a>
              ))}
            </nav>
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={toggleLang}
                aria-label="Toggle language"
                className="relative grid place-items-center size-10 rounded-full glass text-xs font-medium tracking-wide uppercase hover:bg-white/10 transition-colors"
              >
                {lang === "ar" ? "EN" : "AR"}
              </button>
              <WhatsAppButton />
            </div>
            <button
              className="md:hidden grid place-items-center size-10 rounded-full glass"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-display text-lg">
                Oppy<span className="text-gradient-gold">ans</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid place-items-center size-10 rounded-full glass"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="px-6 mt-6 flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, ease }}
                  className="font-display text-4xl py-3 border-b border-white/10"
                >
                  {l.label}
                </motion.a>
              ))}
              <div className="mt-8 flex items-center gap-3">
                <WhatsAppButton />
                <button
                  onClick={toggleLang}
                  className="grid place-items-center h-12 px-5 rounded-full glass text-sm font-medium tracking-wide uppercase hover:bg-white/10 transition-colors"
                >
                  {lang === "ar" ? "English" : "العربية"}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- hero ---------- */

function Hero() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const ensurePlayback = () => {
      if (video.paused) {
        void video.play().catch(() => {});
      }
    };

    ensurePlayback();
    video.addEventListener("canplay", ensurePlayback);
    document.addEventListener("visibilitychange", ensurePlayback);

    return () => {
      video.removeEventListener("canplay", ensurePlayback);
      document.removeEventListener("visibilitychange", ensurePlayback);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden max-w-full"
    >
      {/* video */}
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setLoaded(true)}
          poster=""
          aria-hidden="true"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        {/* fallback */}
        {!loaded && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,oklch(0.28_0.06_40),oklch(0.1_0.02_60))]" />
        )}
        {/* overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
        <div className="noise-overlay" />
      </motion.div>

      {/* content */}
      <motion.div style={{ opacity }} className="relative z-10 flex min-h-[100svh] flex-col">
        <div className="flex-1 grid place-items-center px-5 md:px-10 pt-32 pb-24">
          <div className="max-w-[1280px] w-full">
            {/* eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.6 }}
              className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-primary mb-8"
            >
              <span className="h-px w-12 bg-primary/60" />
              {tr(lang, t.hero.eyebrow)}
            </motion.div>

            {/* headline */}
            <h1 className="font-display font-light text-[clamp(2.2rem,8vw,9.5rem)] leading-[0.92] tracking-[-0.03em] text-balance">
              <div className="overflow-hidden">
                <SplitWords text={tr(lang, t.hero.line1)} delay={0.7} />
              </div>
              <div className="overflow-hidden">
                <span className="text-gradient-gold italic">
                  <SplitWords text={tr(lang, t.hero.line2)} delay={1.0} />
                </span>
              </div>
            </h1>

            {/* sub */}
            <div className="mt-10 grid md:grid-cols-[1fr_auto] gap-8 items-end">
              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
                transition={{ duration: 1, ease, delay: 1.4 }}
                className="max-w-xl text-base md:text-lg text-muted-foreground text-pretty"
              >
                {tr(lang, t.hero.sub)}
                {lang === "en" && (
                  <span className="block mt-2 text-sm opacity-70">
                    {tr(lang, t.hero.subSuffix)}
                  </span>
                )}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease, delay: 1.6 }}
                className="flex flex-wrap items-center gap-3"
              >
                <WhatsAppButton />
                <MagneticButton variant="outline" as="a" href="#work">
                  {tr(lang, t.hero.ctaWork)}
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </div>

        {/* bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="border-t border-white/10 glass-strong"
        >
          <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            {t.hero.stats.map((s) => (
              <div key={s.n} className="flex items-baseline gap-3">
                <span className="font-display text-2xl md:text-3xl text-gradient-gold">{s.n}</span>
                <span className="text-muted-foreground text-xs md:text-sm">{tr(lang, s.l)}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute left-1/2 -translate-x-1/2 bottom-[6.5rem] md:bottom-28 z-10 hidden md:flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-muted-foreground"
      >
        {tr(lang, t.hero.scroll)}
        <span className="relative block h-10 w-px bg-white/20 overflow-hidden">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-primary"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

/* ---------- marquee ---------- */

function Marquee() {
  const { lang } = useLanguage();
  return (
    <section className="relative py-10 border-y border-white/5 overflow-hidden max-w-full">
      <div className="marquee-mask">
        <div className="animate-marquee inline-flex whitespace-nowrap" style={{ animationDirection: lang === "ar" ? "reverse" : "normal" }}>
          {[...t.marquee, ...t.marquee, ...t.marquee].map((item, i) => (
            <span
              key={i}
              className="font-display text-3xl md:text-5xl mx-8 text-muted-foreground/70 hover:text-gradient-gold transition-colors"
            >
              {tr(lang, item)} <span className="text-primary mx-3">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- about ---------- */

function About() {
  const { lang } = useLanguage();
  return (
    <section id="about" className="relative py-32 md:py-44 px-5 md:px-10 overflow-hidden">
      <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-4">
          <FadeUp>
            <div className="text-xs tracking-[0.3em] uppercase text-primary mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-primary/60" /> {tr(lang, t.about.label)}
            </div>
          </FadeUp>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
            <SplitWords text={tr(lang, t.about.line1)} />
            <br />
            <span className="text-gradient-gold italic">
              <SplitWords text={tr(lang, t.about.line2)} delay={0.3} />
            </span>
          </h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6 space-y-8">
          <FadeUp delay={0.1}>
            <p className="text-xl md:text-2xl font-light text-foreground/90 leading-relaxed text-pretty">
              {tr(lang, t.about.p1)}{" "}
              <span className="text-gradient-gold italic">{tr(lang, t.about.p1Highlight)}</span>{" "}
              {tr(lang, t.about.p1After)}
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
              {tr(lang, t.about.p2)}
              {lang === "en" && (
                <span className="block mt-2 text-sm opacity-70">{tr(lang, t.about.p2Suffix)}</span>
              )}
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              {t.about.locations.map((loc) => (
                <div key={loc.c.ar}>
                  <div className="font-display text-2xl">{tr(lang, loc.c)}</div>
                  <div className="text-xs text-muted-foreground mt-1">{tr(lang, loc.l)}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ---------- services ---------- */

const services = [
  {
    num: "01",
    icon: Users,
    title: "إدارة وسائل التواصل الاجتماعي",
    titleEn: "Social Media Management",
    copy: "إدارة حسابات التواصل الاجتماعي مع إنشاء المحتوى والنشر والتفاعل وتقارير الأداء.",
    copyEn:
      "Manage social media accounts with content creation, posting, engagement, and performance reporting.",
  },
  {
    num: "02",
    icon: Megaphone,
    title: "الإعلانات المدفوعة",
    titleEn: "Paid Advertising",
    copy: "تشغيل وتحسين الإعلانات على فيسبوك وإنستغرام وتيك توك وجوجل مع التركيز على التحويلات وعائد الاستثمار.",
    copyEn:
      "Run and optimize ads on Facebook, Instagram, TikTok, and Google with focus on conversions and ROI.",
  },
  {
    num: "03",
    icon: Code2,
    title: "تصميم وتطوير المواقع",
    titleEn: "Web Design & Development",
    copy: "بناء مواقع وصفحات هبوط حديثة تركز على تجربة المستخدم والأداء والتحويلات.",
    copyEn: "Build modern websites and landing pages focused on UX, performance, and conversions.",
  },
  {
    num: "04",
    icon: Search,
    title: "SEO والتسويق بالمحتوى",
    titleEn: "SEO & Content Marketing",
    copy: "تحسين ترتيب محركات البحث باستراتيجية SEO ومحتوى عالي الجودة.",
    copyEn: "Improve search rankings using SEO strategy and high-quality content.",
  },
  {
    num: "05",
    icon: Palette,
    title: "الهوية البصرية والتصميم الإبداعي",
    titleEn: "Branding & Creative Design",
    copy: "إنشاء هوية العلامة التجارية والشعارات والتصميمات التسويقية.",
    copyEn: "Create brand identity, logos, and marketing designs.",
  },
  {
    num: "06",
    icon: Database,
    title: "الأتمتة وأنظمة النمو",
    titleEn: "Automation & Growth Systems",
    copy: "بناء أنظمة أتمتة مثل القمعات وCRM والتسويق عبر البريد وأتمتة واتساب.",
    copyEn: "Build automation systems like funnels, CRM, email marketing, and WhatsApp automation.",
  },
];

function Services() {
  const { lang } = useLanguage();
  return (
    <section id="services" className="relative py-32 md:py-44 px-5 md:px-10 overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-12 gap-12 mb-16 md:mb-24">
          <div className="lg:col-span-5">
            <FadeUp>
              <div className="text-xs tracking-[0.3em] uppercase text-primary mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-primary/60" /> {tr(lang, t.services.label)}
              </div>
            </FadeUp>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
              <SplitWords text={tr(lang, t.services.line1)} />
              <br />
              <span className="text-gradient-gold italic">
                <SplitWords text={tr(lang, t.services.line2)} delay={0.25} />
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 self-end">
            <FadeUp delay={0.2}>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                {tr(lang, t.services.sub)}
              </p>
            </FadeUp>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeUp key={s.num} delay={i * 0.05}>
                <div className="group relative bg-card p-8 md:p-10 h-full transition-all duration-500 hover:bg-card/40 overflow-hidden min-w-0">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_0%,oklch(0.82_0.14_78/0.15),transparent_60%)]" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-10">
                      <div className="grid h-12 w-12 place-items-center rounded-full border border-white/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-500">
                        <Icon className="size-5" />
                      </div>
                      <span className="font-display text-2xl text-gradient-gold">{s.num}</span>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl mb-1 tracking-tight">
                      {lang === "ar" ? s.title : s.titleEn}
                    </h3>
                    {lang === "ar" && (
                      <p className="text-[11px] text-muted-foreground/70 mb-3">{s.titleEn}</p>
                    )}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {lang === "ar" ? s.copy : s.copyEn}
                    </p>
                    <div className="mt-6">
                      <WhatsAppButton variant="outline" compact />
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- work ---------- */

const cases = [
  {
    client: "Atlas Aerospace",
    category: "Brand · Web · Motion",
    title: "A new orbit for commercial flight.",
    metric: "+340% inbound",
    color: "from-amber-500/30 to-rose-500/20",
  },
  {
    client: "Noor Cosmetics",
    category: "E-Commerce · Performance",
    title: "A skincare house, reformulated.",
    metric: "12× revenue in 18 mo",
    color: "from-rose-400/30 to-fuchsia-500/20",
  },
  {
    client: "Halcyon Hotels",
    category: "Identity · Editorial",
    title: "Hospitality that whispers, not shouts.",
    metric: "94% direct bookings",
    color: "from-emerald-400/30 to-teal-500/20",
  },
  {
    client: "Meridian Bank",
    category: "Product · Brand System",
    title: "Banking, returned to its senses.",
    metric: "1.4M new accounts",
    color: "from-sky-400/30 to-indigo-500/20",
  },
];

function Work() {
  const { lang } = useLanguage();
  return (
    <section
      id="work"
      className="relative py-32 md:py-44 px-5 md:px-10 bg-gradient-to-b from-background via-card/20 to-background overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div>
            <FadeUp>
              <div className="text-xs tracking-[0.3em] uppercase text-primary mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-primary/60" /> {tr(lang, t.work.label)}
              </div>
            </FadeUp>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
              <SplitWords text={tr(lang, t.work.line1)} />
              <br />
              <span className="text-gradient-gold italic">
                <SplitWords text={tr(lang, t.work.line2)} delay={0.2} />
              </span>
            </h2>
          </div>
          <FadeUp delay={0.2}>
            <WhatsAppButton variant="outline" />
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cases.map((c, i) => (
            <FadeUp key={c.client} delay={(i % 2) * 0.1}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block relative aspect-[5/4] md:aspect-[4/3] rounded-3xl overflow-hidden ${i % 2 === 1 ? "md:translate-y-16" : ""}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${c.color}`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,oklch(1_0_0/0.08),transparent_60%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                <div className="noise-overlay" />

                {/* big number */}
                <div className="absolute top-6 start-7 font-display text-7xl md:text-8xl text-white/10 leading-none">
                  0{i + 1}
                </div>

                {/* content */}
                <div className="absolute inset-0 p-7 md:p-10 flex flex-col justify-end">
                  <div className="text-[11px] tracking-[0.25em] uppercase text-primary mb-3">
                    {c.category}
                  </div>
                  <h3 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight mb-5 text-balance">
                    {c.title}
                  </h3>
                  <div className="flex items-center justify-between border-t border-white/15 pt-5">
                    <span className="text-sm text-muted-foreground">{c.client}</span>
                    <span className="text-sm text-gradient-gold font-medium">{c.metric}</span>
                  </div>
                </div>

                {/* arrow */}
                <div className="absolute top-6 end-7 grid place-items-center size-12 rounded-full glass-strong opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="size-5 text-primary" />
                </div>
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- process ---------- */

function Process() {
  const { lang } = useLanguage();
  return (
    <section id="process" className="relative py-32 md:py-44 px-5 md:px-10 overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5">
            <FadeUp>
              <div className="text-xs tracking-[0.3em] uppercase text-primary mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-primary/60" /> {tr(lang, t.process.label)}
              </div>
            </FadeUp>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
              <SplitWords text={tr(lang, t.process.line1)} />
              <br />
              <span className="text-gradient-gold italic">
                <SplitWords text={tr(lang, t.process.line2)} delay={0.2} />
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 self-end">
            <FadeUp delay={0.2}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {tr(lang, t.process.sub)}
              </p>
            </FadeUp>
          </div>
        </div>

        <div className="border-t border-white/10">
          {t.process.steps.map((s, i) => (
            <FadeUp key={s.n} delay={i * 0.06}>
              <div className="group grid grid-cols-[auto_1fr] md:grid-cols-[120px_1fr_auto] gap-6 md:gap-12 items-baseline py-8 md:py-10 border-b border-white/10 transition-all duration-500 hover:bg-card/40 px-2 md:px-6 md:-mx-6 rounded-2xl min-w-0">
                <div className="font-display text-2xl md:text-3xl text-gradient-gold">{s.n}</div>
                <h3 className="font-display text-3xl md:text-5xl tracking-tight col-span-2 md:col-span-1 order-3 md:order-none">
                  <span className="inline-block group-hover:-translate-x-2 transition-transform duration-500">
                    {tr(lang, s.t)}
                  </span>
                  <span className="block text-sm text-muted-foreground/60 font-sans mt-1">
                    {lang === "ar" ? s.t.en : s.t.ar}
                  </span>
                </h3>
                <p className="text-sm md:text-base text-muted-foreground max-w-md md:text-start col-span-2 md:col-span-1">
                  {tr(lang, s.d)}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- why us ---------- */

function Why() {
  const { lang } = useLanguage();
  const items = t.why.items;
  return (
    <section className="relative py-32 md:py-44 px-5 md:px-10 bg-card/30 overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeUp>
            <div className="text-xs tracking-[0.3em] uppercase text-primary mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-primary/60" /> {tr(lang, t.why.label)}{" "}
              <span className="h-px w-8 bg-primary/60" />
            </div>
          </FadeUp>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
            <SplitWords text={tr(lang, t.why.line1)} />{" "}
            <span className="text-gradient-gold italic">
              <SplitWords text={tr(lang, t.why.line2)} delay={0.2} />
            </span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const Icon = [Sparkles, Zap, Shield, Trophy][idx];
            return (
              <FadeUp key={idx} delay={idx * 0.08}>
                <div className="group relative h-full p-8 rounded-3xl glass hover:ring-gold-glow transition-all duration-700">
                  <Icon className="size-7 text-primary mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                  <h3 className="font-display text-2xl mb-3 tracking-tight">{tr(lang, item.t)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tr(lang, item.d)}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- testimonials ---------- */

function Testimonials() {
  const { lang } = useLanguage();
  const items = t.testimonials.items;
  const [i, setI] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setI((v) => (v + 1) % items.length), 7000);
    return () => clearInterval(timer);
  }, [items.length]);
  return (
    <section className="relative py-32 md:py-44 px-5 md:px-10">
      <div className="mx-auto max-w-[1100px] text-center">
        <FadeUp>
          <div className="text-xs tracking-[0.3em] uppercase text-primary mb-10 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary/60" /> {tr(lang, t.testimonials.label)}{" "}
            <span className="h-px w-8 bg-primary/60" />
          </div>
        </FadeUp>
        <div className="relative min-h-[260px] md:min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease }}
            >
              <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight text-balance">
                <span className="text-gradient-gold">"</span>
                {tr(lang, items[i].quote)}
                <span className="text-gradient-gold">"</span>
              </p>
              <div className="mt-10 text-sm">
                <div className="text-foreground font-medium">{tr(lang, items[i].name)}</div>
                <div className="text-muted-foreground">{tr(lang, items[i].role)}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex justify-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Show testimonial ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${idx === i ? "w-10 bg-primary" : "w-1.5 bg-white/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- clients marquee ---------- */

function Clients() {
  const { lang } = useLanguage();
  const names = [
    "Atlas",
    "Noor",
    "Halcyon",
    "Meridian",
    "Solace",
    "Vega",
    "Lumen",
    "Orbit",
    "Kinfolk",
    "Northwind",
    "Helios",
    "Saga",
  ];
  return (
    <section className="relative py-24 md:py-32 px-5 md:px-10 border-y border-white/5 overflow-hidden max-w-full">
      <div className="mx-auto max-w-[1400px]">
        <FadeUp>
          <div className="text-center mb-14">
            <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              {tr(lang, t.clients.label)}
            </div>
          </div>
        </FadeUp>
        <div className="marquee-mask">
          <div className="animate-marquee inline-flex whitespace-nowrap items-center" style={{ animationDirection: lang === "ar" ? "reverse" : "normal" }}>
            {[...names, ...names].map((n, idx) => (
              <span
                key={idx}
                className="font-display text-2xl md:text-3xl mx-10 text-muted-foreground/50 hover:text-foreground transition-colors"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- faq ---------- */

function FAQ() {
  const { lang } = useLanguage();
  const items = t.faq.items;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-32 md:py-44 px-5 md:px-10">
      <div className="mx-auto max-w-[1100px] grid lg:grid-cols-[1fr_1.4fr] gap-16">
        <div>
          <FadeUp>
            <div className="text-xs tracking-[0.3em] uppercase text-primary mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-primary/60" /> {tr(lang, t.faq.label)}
            </div>
          </FadeUp>
          <h2 className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tight">
            <SplitWords text={tr(lang, t.faq.line1)} />
            <br />
            <span className="text-gradient-gold italic">
              <SplitWords text={tr(lang, t.faq.line2)} delay={0.2} />
            </span>
          </h2>
        </div>
        <div className="border-t border-white/10">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-white/10">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-start group"
                >
                  <span
                    className={`font-display text-xl md:text-2xl tracking-tight transition-colors ${isOpen ? "text-gradient-gold" : "text-foreground group-hover:text-primary"}`}
                  >
                    {tr(lang, f.q)}
                  </span>
                  <span
                    className="shrink-0 grid place-items-center size-9 rounded-full border border-white/15 text-primary transition-transform duration-500"
                    style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                  >
                    <Plus className="size-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 ps-0 pe-12 text-base text-muted-foreground leading-relaxed">
                        {tr(lang, f.a)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA + Contact ---------- */

function Contact() {
  const { lang } = useLanguage();
  const info = t.contact.info;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name")?.toString().trim() || "";
    const email = fd.get("email")?.toString().trim() || "";
    const company = fd.get("company")?.toString().trim() || "";
    const message = fd.get("message")?.toString().trim() || "";
    const parts = [WHATSAPP_DEFAULT_MSG];
    if (name) parts.push(`Name: ${name}`);
    if (email) parts.push(`Email: ${email}`);
    if (company) parts.push(`Company: ${company}`);
    if (message) parts.push(`Project: ${message}`);
    window.open(whatsAppUrl(parts.join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contact"
      className="relative py-32 md:py-44 px-5 md:px-10 overflow-hidden max-w-full"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.3_0.1_50/0.4),transparent_70%)]" />
      <div className="absolute inset-0 noise-overlay" />
      <div className="relative mx-auto max-w-[1300px]">
        <div className="text-center mb-20">
          <FadeUp>
            <div className="text-xs tracking-[0.3em] uppercase text-primary mb-8 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-primary/60" /> {tr(lang, t.contact.label)}{" "}
              <span className="h-px w-8 bg-primary/60" />
            </div>
          </FadeUp>
          <h2 className="font-display font-light text-[clamp(2.5rem,9vw,9rem)] leading-[0.92] tracking-[-0.03em] text-balance">
            <div className="overflow-hidden">
              <SplitWords text={tr(lang, t.contact.line1)} />
            </div>
            <div className="overflow-hidden">
              <span className="text-gradient-gold italic">
                <SplitWords text={tr(lang, t.contact.line2)} delay={0.25} />
              </span>
            </div>
          </h2>
          <FadeUp delay={0.4}>
            <p className="max-w-xl mx-auto mt-10 text-lg text-muted-foreground">
              {tr(lang, t.contact.sub)}
            </p>
          </FadeUp>
          <FadeUp delay={0.5}>
            <div className="mt-8 flex justify-center">
              <WhatsAppButton />
            </div>
          </FadeUp>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-start">
          <FadeUp>
            <form
              className="space-y-8 glass-strong p-8 md:p-10 rounded-3xl min-w-0"
              onSubmit={handleSubmit}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <Field
                  label={tr(lang, t.contact.form.name)}
                  labelEn={lang === "ar" ? t.contact.form.name.en : t.contact.form.name.ar}
                  name="name"
                  placeholder={tr(lang, t.contact.form.namePlaceholder)}
                />
                <Field
                  label={tr(lang, t.contact.form.email)}
                  labelEn={lang === "ar" ? t.contact.form.email.en : t.contact.form.email.ar}
                  name="email"
                  type="email"
                  placeholder={tr(lang, t.contact.form.emailPlaceholder)}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Field
                  label={tr(lang, t.contact.form.company)}
                  labelEn={lang === "ar" ? t.contact.form.company.en : t.contact.form.company.ar}
                  name="company"
                  placeholder={tr(lang, t.contact.form.companyPlaceholder)}
                />
                <Field
                  label={tr(lang, t.contact.form.projectType)}
                  labelEn={
                    lang === "ar" ? t.contact.form.projectType.en : t.contact.form.projectType.ar
                  }
                  name="budget"
                  placeholder={tr(lang, t.contact.form.projectPlaceholder)}
                />
              </div>
              <div>
                <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  {tr(lang, t.contact.form.message)}
                </label>
                <span className="block text-[10px] text-muted-foreground/60 mt-0.5">
                  {lang === "ar" ? t.contact.form.message.en : t.contact.form.message.ar}
                </span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder={tr(lang, t.contact.form.messagePlaceholder)}
                  className="mt-3 w-full bg-transparent border-b border-white/15 focus:border-primary outline-none py-3 text-base resize-none transition-colors"
                />
              </div>
              <div className="pt-2">
                <WhatsAppButton submit />
              </div>
            </form>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="space-y-10 min-w-0">
              <InfoRow
                icon={MapPin}
                label={tr(lang, info[0].label)}
                value={tr(lang, info[0].value)}
                multiline
              />
              <InfoRow
                icon={Mail}
                label={tr(lang, info[1].label)}
                value={info[1].value}
                href={info[1].href}
              />
              <InfoRow
                icon={Clock}
                label={tr(lang, info[2].label)}
                value={tr(lang, info[2].value)}
              />
              <InfoRow
                icon={Phone}
                label={tr(lang, info[3].label)}
                value={info[3].value}
                href={info[3].href}
              />
              <div className="pt-8 border-t border-white/10">
                <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                  {tr(lang, t.contact.followUs)}
                </div>
                <div className="flex gap-3">
                  {[
                    { Icon: Facebook, href: "#", label: "Facebook" },
                    { Icon: Linkedin, href: "#", label: "LinkedIn" },
                    { Icon: Twitter, href: "#", label: "Twitter" },
                  ].map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="grid place-items-center size-10 rounded-full border border-white/10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                    >
                      <Icon className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  labelEn,
  placeholder,
  type = "text",
  name,
}: {
  label: string;
  labelEn?: string;
  placeholder: string;
  type?: string;
  name?: string;
}) {
  return (
    <div>
      <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{label}</label>
      {labelEn && (
        <span className="block text-[10px] text-muted-foreground/60 mt-0.5">{labelEn}</span>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="mt-3 w-full bg-transparent border-b border-white/15 focus:border-primary outline-none py-3 text-base transition-colors"
      />
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  sub,
  href,
  multiline,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub?: string;
  href?: string;
  multiline?: boolean;
}) {
  const content = (
    <>
      <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{label}</div>
      <div
        className={`font-display text-lg md:text-xl mt-1 ${multiline ? "whitespace-pre-line leading-relaxed" : ""}`}
      >
        {value}
      </div>
      {sub && <div className="text-sm text-muted-foreground/70 mt-1">{sub}</div>}
    </>
  );
  return (
    <div className="flex items-start gap-5 min-w-0">
      <span className="grid place-items-center size-11 shrink-0 rounded-full border border-white/15 text-primary">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 break-words">
        {href ? (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="hover:text-primary transition-colors"
          >
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    </div>
  );
}

/* ---------- footer ---------- */
function Footer() {
  const { lang } = useLanguage();
  const cols = t.footer.cols;
  return (
    <footer className="relative border-t border-white/10 px-5 md:px-10 pt-20 pb-10 overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid md:grid-cols-12 gap-12 pb-16">
          <div className="md:col-span-5 min-w-0">
            <a href="#top" className="flex items-center gap-2.5 mb-6">
              <span className="grid h-10 w-10 place-items-center rounded-full gradient-gold text-primary-foreground font-display text-lg font-semibold">
                O
              </span>
              <span className="font-display text-xl">
                Oppy<span className="text-gradient-gold">ans</span>
              </span>
            </a>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              {tr(lang, t.footer.desc)}
            </p>
            <div className="flex gap-3 mt-8">
              {[
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Linkedin, href: "#", label: "LinkedIn" },
                { Icon: Twitter, href: "#", label: "Twitter" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid place-items-center size-10 rounded-full border border-white/10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((col) => (
            <FooterCol
              key={col.title.ar}
              title={tr(lang, col.title)}
              links={col.links.map((l) => ({ t: tr(lang, l.t), h: l.h }))}
              external
            />
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            © {new Date().getFullYear()} Oppyans · {tr(lang, t.footer.copyright)}
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">
              {tr(lang, t.footer.privacy)}
            </a>
            <a href="#" className="hover:text-foreground">
              {tr(lang, t.footer.terms)}
            </a>
            <a href="#" className="hover:text-foreground">
              {tr(lang, t.footer.cookies)}
            </a>
          </div>
        </div>

        {/* huge brand */}
        <div className="mt-20 overflow-hidden w-full">
          <div className="font-display text-[min(18vw,12rem)] leading-none tracking-[-0.04em] text-gradient-gold opacity-90 text-center select-none">
            oppyans
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  external,
}: {
  title: string;
  links: { t: string; h: string }[];
  external?: boolean;
}) {
  return (
    <div className="md:col-span-2 min-w-0">
      <div className="text-xs tracking-[0.2em] uppercase text-primary mb-5">{title}</div>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.t}>
            <a
              href={l.h}
              target={external && l.h.startsWith("http") ? "_blank" : undefined}
              rel={external && l.h.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-muted-foreground hover:text-foreground transition-colors break-words"
            >
              {l.t}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- cursor ---------- */

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 28 });
  const sy = useSpring(y, { stiffness: 400, damping: 28 });
  useEffect(() => {
    const m = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, [x, y]);
  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
    >
      <div className="-translate-x-1/2 -translate-y-1/2 size-6 rounded-full bg-primary/30 mix-blend-screen blur-md" />
    </motion.div>
  );
}

/* ---------- page ---------- */

export default function Landing() {
  return (
    <main className="relative bg-background text-foreground overflow-x-hidden w-full max-w-[100vw]">
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      {/* <About /> */}
      {/* <Services /> */}
      {/* <Work /> */}
      {/* <Process /> */}
      {/* <Why /> */}
      {/* <Testimonials /> */}
      {/* <Clients /> */}
      {/* <FAQ /> */}
      <Contact />
      <Footer />
    </main>
  );
}
