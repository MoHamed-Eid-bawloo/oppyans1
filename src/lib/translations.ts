import type { Lang } from "./language";

const t = {
  /* ---------- nav ---------- */
  nav: {
    work: { ar: "الأعمال", en: "Work" },
    services: { ar: "الخدمات", en: "Services" },
    process: { ar: "آلية العمل", en: "Process" },
    about: { ar: "الاستوديو", en: "Studio" },
    contact: { ar: "تواصل", en: "Contact" },
  },

  /* ---------- hero ---------- */
  hero: {
    eyebrow: { ar: "استوديو تسويق رقمي · Oppyans", en: "Digital Marketing Studio · Oppyans" },
    line1: { ar: "نطلق العلامات", en: "We launch brands" },
    line2: { ar: "نحو القمة.", en: "to the top." },
    sub: {
      ar: "استوديو رقمي متكامل لإدارة وسائل التواصل، الإعلانات المدفوعة، تصميم المواقع، SEO، الهوية البصرية وأنظمة النمو —",
      en: "A full-stack digital studio for social media, paid ads, web design, SEO, branding, and growth systems —",
    },
    subSuffix: { ar: "", en: "for brands ready to scale." },
    ctaWhatsApp: { ar: "👉 طلب عبر واتساب", en: "👉 Order via WhatsApp" },
    ctaWork: { ar: "استكشف أعمالنا", en: "Explore Our Work" },
    stats: [
      { n: "150+", l: { ar: "علامة تجارية", en: "Brands" } },
      { n: "500+", l: { ar: "مشروع منجز", en: "Projects Done" } },
      { n: "6", l: { ar: "خدمات متكاملة", en: "Integrated Services" } },
      { n: "98%", l: { ar: "رضا العملاء", en: "Client Satisfaction" } },
    ],
    scroll: { ar: "تمرير", en: "Scroll" },
  },

  /* ---------- marquee ---------- */
  marquee: [
    { ar: "إدارة التواصل", en: "Social Media" },
    { ar: "إعلانات مدفوعة", en: "Paid Ads" },
    { ar: "تصميم مواقع", en: "Web Design" },
    { ar: "SEO", en: "SEO" },
    { ar: "هوية بصرية", en: "Branding" },
    { ar: "أتمتة", en: "Automation" },
    { ar: "تسويق محتوى", en: "Content Marketing" },
    { ar: "تحليلات", en: "Analytics" },
    { ar: "نمو رقمي", en: "Digital Growth" },
  ],

  /* ---------- about ---------- */
  about: {
    label: { ar: "01 — الاستوديو", en: "01 — The Studio" },
    line1: { ar: "صُمّم للعلامات", en: "Designed for" },
    line2: { ar: "الطموحة.", en: "ambitious brands." },
    p1: {
      ar: "فريق متخصص في التسويق الرقمي والتصميم والتطوير — نركز على التفاصيل التي تفصل",
      en: "A specialized team in digital marketing, design & development — we focus on the details that separate",
    },
    p1Highlight: { ar: "العمل الجيد", en: "good work" },
    p1After: {
      ar: "عن العمل الذي يصنع فرقاً حقيقياً.",
      en: "from work that makes a real difference.",
    },
    p2: {
      ar: "Oppyans شريكك في بناء حضور رقمي قوي — من إدارة وسائل التواصل والإعلانات المدفوعة إلى تصميم المواقع وأنظمة النمو الآلي.",
      en: "Oppyans is your partner in building a strong digital presence — from social media management and paid ads to web design and growth automation.",
    },
    p2Suffix: {
      ar: "",
      en: "Your partner for social, ads, web, SEO, branding & growth automation.",
    },
    locations: [
      { c: { ar: "6 أكتوبر", en: "6th October" }, l: { ar: "المقر الرئيسي", en: "Headquarters" } },
      { c: { ar: "مصر", en: "Egypt" }, l: { ar: "خدمة محلية", en: "Local Service" } },
      { c: { ar: "عالمياً", en: "Global" }, l: { ar: "عملاء رقميون", en: "Digital Clients" } },
    ],
  },

  /* ---------- services ---------- */
  services: {
    label: { ar: "02 — الخدمات", en: "02 — Services" },
    line1: { ar: "حلول متكاملة", en: "Integrated Solutions" },
    line2: { ar: "للنمو الرقمي.", en: "for Digital Growth." },
    sub: {
      ar: "ست خدمات أساسية تحت سقف واحد — من استراتيجية المحتوى إلى الإعلانات والمواقع وأنظمة الأتمتة.",
      en: "Six core services under one roof — from content strategy to ads, websites, and automation systems.",
    },
  },

  /* ---------- work ---------- */
  work: {
    label: { ar: "03 — أعمال مختارة", en: "03 — Selected Work" },
    line1: { ar: "إبداع هادئ.", en: "Quiet creativity." },
    line2: { ar: "نتائج قوية.", en: "Powerful results." },
  },

  /* ---------- process ---------- */
  process: {
    label: { ar: "04 — آلية العمل", en: "04 — Process" },
    line1: { ar: "خمس مراحل.", en: "Five stages." },
    line2: { ar: "مسار واحد.", en: "One path." },
    sub: {
      ar: "نموذج عمل متكرر ومجرب عبر مئات المشاريع — مرن بما يكفي ليناسب مشروعاً سريعاً أو شراكة طويلة.",
      en: "A repeatable, proven workflow across hundreds of projects — flexible enough for a quick project or a long partnership.",
    },
    steps: [
      {
        n: "01",
        t: { ar: "اكتشاف", en: "Discover" },
        d: {
          ar: "ورش عمل وبحث وتحليل للسوق. نرسم الخريطة قبل رسم المسار.",
          en: "Workshops, research, market analysis. We map before we move.",
        },
      },
      {
        n: "02",
        t: { ar: "تحديد", en: "Define" },
        d: {
          ar: "استراتيجية وتحديد موقع العلامة. الموجز يصبح مرجعاً لكل قرار.",
          en: "Strategy & brand positioning. The brief becomes every decision's north star.",
        },
      },
      {
        n: "03",
        t: { ar: "تصميم", en: "Design" },
        d: {
          ar: "هوية بصرية ومحتوى وتصاميم. نصمم بشفافية مع مراجعات أسبوعية.",
          en: "Visual identity, content & designs. Transparent process with weekly reviews.",
        },
      },
      {
        n: "04",
        t: { ar: "تطوير", en: "Develop" },
        d: {
          ar: "برمجة واختبار وإطلاق. أداء وسهولة وصول مدمجة من البداية.",
          en: "Development, testing & launch. Performance & accessibility built in from day one.",
        },
      },
      {
        n: "05",
        t: { ar: "توزيع", en: "Distribute" },
        d: {
          ar: "إعلانات ومحتوى وأتمتة. لا نسلّم موقعاً فقط — نجلب له الزيارات.",
          en: "Ads, content & automation. We don't just deliver a site — we drive traffic to it.",
        },
      },
    ],
  },

  /* ---------- why us ---------- */
  why: {
    label: { ar: "05 — لماذا نحن", en: "05 — Why Us" },
    line1: { ar: "مختلفون", en: "Different" },
    line2: { ar: "بالتصميم.", en: "by Design." },
    items: [
      {
        t: { ar: "فريق متخصص", en: "Specialized Team" },
        d: {
          ar: "خبراء في التسويق الرقمي والتصميم والتطوير — كل تفصيلة بأيدٍ محترفة.",
          en: "Experts in digital marketing, design & development — every detail in professional hands.",
        },
      },
      {
        t: { ar: "تنفيذ سريع", en: "Fast Execution" },
        d: {
          ar: "نطاق واضح وجدول زمني محدد. تسليم متوقع دون المساس بالجودة.",
          en: "Clear scope, fixed timeline. On-time delivery without compromising quality.",
        },
      },
      {
        t: { ar: "نتائج قابلة للقياس", en: "Measurable Results" },
        d: {
          ar: "نركز على التحويلات وعائد الاستثمار — أرقام حقيقية لا vanity metrics.",
          en: "We focus on conversions & ROI — real numbers, not vanity metrics.",
        },
      },
      {
        t: { ar: "شراكة طويلة", en: "Long-term Partnership" },
        d: {
          ar: "نعمل كامتداد لفريقك — استراتيجية وتنفيذ ومتابعة مستمرة.",
          en: "We work as an extension of your team — strategy, execution & ongoing support.",
        },
      },
    ],
  },

  /* ---------- testimonials ---------- */
  testimonials: {
    label: { ar: "06 — آراء العملاء", en: "06 — Testimonials" },
    items: [
      {
        quote: {
          ar: "Oppyans أعادوا بناء علامتنا التجارية وقنوات التسويق في وقت قياسي. النتائج كانت واضحة من الشهر الأول.",
          en: "Oppyans rebuilt our brand and marketing channels in record time. The results were visible from the first month.",
        },
        name: { ar: "يارا السيد", en: "Yara El-Sayed" },
        role: { ar: "مديرة التسويق", en: "Marketing Director" },
      },
      {
        quote: {
          ar: "أكثر فريق محترف تعاملنا معه. اندمجوا مع فريقنا وسلّموا أفضل عمل في تاريخ شركتنا.",
          en: "The most professional team we've worked with. They blended with our team and delivered the best work in our company's history.",
        },
        name: { ar: "ماركوس بيل", en: "Marcus Bell" },
        role: { ar: "مؤسس", en: "Founder" },
      },
      {
        quote: {
          ar: "استأجرناهم لموقع إلكتروني. غادروا لنا علامة تجارية كاملة. صعب نوصف قيمة ذلك.",
          en: "We hired them for a website. They left us with a complete brand. Hard to put a value on that.",
        },
        name: { ar: "ليلى رحمن", en: "Laila Rahman" },
        role: { ar: "نائبة العلامة التجارية", en: "VP of Brand" },
      },
    ],
  },

  /* ---------- clients ---------- */
  clients: {
    label: {
      ar: "موثوق من أكثر من 150 شركة — من الشركات الناشئة إلى الكبرى",
      en: "Trusted by 150+ companies — from startups to enterprises",
    },
  },

  /* ---------- faq ---------- */
  faq: {
    label: { ar: "07 — أسئلة شائعة", en: "07 — FAQ" },
    line1: { ar: "أسئلة", en: "Questions" },
    line2: { ar: "وأجوبة.", en: "& Answers." },
    items: [
      {
        q: { ar: "ما الخدمات التي تقدمها Oppyans؟", en: "What services does Oppyans offer?" },
        a: {
          ar: "إدارة وسائل التواصل، الإعلانات المدفوعة، تصميم وتطوير المواقع، SEO والتسويق بالمحتوى، الهوية البصرية، وأنظمة الأتمتة والنمو — كلها من فريق واحد.",
          en: "Social media management, paid advertising, web design & development, SEO & content marketing, branding, and automation & growth systems — all from one team.",
        },
      },
      {
        q: {
          ar: "هل تعملون مع الشركات الناشئة أم الكبرى فقط؟",
          en: "Do you work with startups or only large companies?",
        },
        a: {
          ar: "كلاهما. نعمل مع مشاريع في مختلف المراحل — من البداية إلى العلامات الراسخة. المهم هو التوافق والأهداف المشتركة.",
          en: "Both. We work with projects at various stages — from startups to established brands. What matters is alignment and shared goals.",
        },
      },
      {
        q: { ar: "كم يستغرق المشروع النموذجي؟", en: "How long does a typical project take?" },
        a: {
          ar: "مشاريع المواقع والهوية تستغرق 4–8 أسابيع. التعاقدات الشهرية للتسويق تبدأ من 90 يوماً. نحدد النطاق بوضوح من الأسبوع الأول.",
          en: "Website and branding projects take 4–8 weeks. Monthly marketing retainers start from 90 days. We define scope clearly from week one.",
        },
      },
      {
        q: {
          ar: "أين مقركم وما الأسواق التي تخدمونها؟",
          en: "Where are you based and what markets do you serve?",
        },
        a: {
          ar: "مقرنا في 6 أكتوبر، مصر. نخدم العملاء محلياً وعالمياً بالعربية والإنجليزية.",
          en: "We're based in 6th October, Egypt. We serve clients locally and globally in Arabic and English.",
        },
      },
      {
        q: { ar: "كيف نبدأ معكم؟", en: "How do we get started?" },
        a: {
          ar: "تواصل معنا عبر واتساب أو البريد الإلكتروني. نرد خلال يوم عمل واحد بتوفرنا ونقطة نظر أولية.",
          en: "Contact us via WhatsApp or email. We respond within one business day with availability and an initial perspective.",
        },
      },
    ],
  },

  /* ---------- contact ---------- */
  contact: {
    label: { ar: "08 — تواصل معنا", en: "08 — Get in Touch" },
    line1: { ar: "عندك فكرة؟", en: "Got an idea?" },
    line2: { ar: "تواصل معنا.", en: "Get in touch." },
    sub: {
      ar: "نرد خلال يوم عمل واحد. تواصل عبر واتساب للرد الأسرع.",
      en: "We reply within one business day — WhatsApp for the fastest response.",
    },
    subSuffix: { ar: "", en: "" },
    form: {
      name: { ar: "الاسم", en: "Your name" },
      email: { ar: "البريد الإلكتروني", en: "Email" },
      company: { ar: "الشركة", en: "Company" },
      projectType: { ar: "نوع المشروع", en: "Project type" },
      message: { ar: "أخبرنا عن مشروعك", en: "Tell us about the project" },
      messagePlaceholder: {
        ar: "بعض الأسطر عن المشروع وما الذي تبحث عنه...",
        en: "A few lines about the project and what you're looking for...",
      },
      companyPlaceholder: { ar: "اسم شركتك", en: "Your company name" },
      projectPlaceholder: { ar: "تسويق / موقع / هوية", en: "Marketing / Web / Branding" },
      namePlaceholder: { ar: "محمد أحمد", en: "Your name" },
      emailPlaceholder: { ar: "info@example.com", en: "info@example.com" },
      submit: { ar: "👉 طلب عبر واتساب", en: "👉 Send via WhatsApp" },
    },
    info: [
      {
        label: { ar: "زيارة مكتبنا", en: "Visit Our Office" },
        value: {
          ar: "Oppyans Office, Central Axis\nفي مواجهة معجنات العبد، 6 أكتوبر\nمبنى 303، فوق كافيه فيراندا",
          en: "Oppyans Office, Central Axis\nIn front of El Abd Patisserie, 6th of October\nBuilding 303, Above Veranda Café",
        },
      },
      {
        label: { ar: "البريد الإلكتروني", en: "Email" },
        value: "info@oppyavs.com",
        href: "mailto:info@oppyavs.com",
      },
      {
        label: { ar: "ساعات العمل", en: "Working Hours" },
        value: {
          ar: "السبت – الجمعة: 12 ظهراً – 12 منتصف الليل",
          en: "Saturday – Friday: 12 PM – 12 AM",
        },
      },
      {
        label: { ar: "اتصل مباشرة", en: "Call Direct" },
        value: "+20 1111151280",
        href: "https://wa.me/201111151280",
      },
    ],
    followUs: { ar: "تابعنا", en: "Follow Us" },
  },

  /* ---------- footer ---------- */
  footer: {
    desc: {
      ar: "استوديو تسويق رقمي متكامل — وسائل التواصل، الإعلانات، المواقع، SEO، الهوية البصرية وأنظمة النمو.",
      en: "Full-stack digital marketing studio — social, ads, web, SEO, branding & growth systems.",
    },
    descSuffix: { ar: "", en: "Full-stack digital marketing studio." },
    cols: [
      {
        title: { ar: "الاستوديو", en: "Studio" },
        links: [
          { t: { ar: "من نحن", en: "About Us" }, h: "#about" },
          { t: { ar: "آلية العمل", en: "Process" }, h: "#process" },
          { t: { ar: "الأعمال", en: "Work" }, h: "#work" },
        ],
      },
      {
        title: { ar: "الخدمات", en: "Services" },
        links: [
          { t: { ar: "إدارة التواصل", en: "Social Media" }, h: "#services" },
          { t: { ar: "إعلانات مدفوعة", en: "Paid Ads" }, h: "#services" },
          { t: { ar: "تصميم مواقع", en: "Web Design" }, h: "#services" },
          { t: { ar: "SEO", en: "SEO" }, h: "#services" },
        ],
      },
      {
        title: { ar: "تواصل", en: "Contact" },
        links: [
          { t: { ar: "info@oppyavs.com", en: "info@oppyavs.com" }, h: "mailto:info@oppyavs.com" },
          { t: { ar: "+20 1111151280", en: "+20 1111151280" }, h: "https://wa.me/201111151280" },
          { t: { ar: "6 أكتوبر، مصر", en: "6th October, Egypt" }, h: "#contact" },
        ],
      },
    ],
    copyright: { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },
    privacy: { ar: "الخصوصية", en: "Privacy" },
    terms: { ar: "الشروط", en: "Terms" },
    cookies: { ar: "ملفات تعريف الارتباط", en: "Cookies" },
  },
} as const;

export type TranslationKey = keyof typeof t;

export function tr(lang: Lang, obj: { ar: string; en: string }): string {
  return obj[lang];
}

export default t;
