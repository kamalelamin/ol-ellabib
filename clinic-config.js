// ╔══════════════════════════════════════════════════════════════════╗
// ║  ⭐ clinic-config.js — ملف التحكم في كل محتوى الموقع                 ║
// ║                                                                  ║
// ║  ده الملف الوحيد اللي محتاج تعدّل فيه عشان تغيّر:                    ║
// ║    • أي كلام (عربي أو إنجليزي)                                     ║
// ║    • أي صورة                                                       ║
// ║    • التليفون والعنوان والمواعيد                                    ║
// ║    • الخدمات والدكاترة والمعرض وآراء العملاء                       ║
// ║                                                                  ║
// ║  📌 قواعد بسيطة:                                                   ║
// ║    1) أي كلام مكتوب بالشكل ده:  { en: "...", ar: "..." }            ║
// ║       en = اللي بيظهر في النسخة الإنجليزي                          ║
// ║       ar = اللي بيظهر في النسخة العربي                             ║
// ║    2) الصور: حط الصورة في فولدر assets/images واكتب اسمها هنا       ║
// ║    3) عشان تضيف عنصر (خدمة/دكتور/صورة/رأي): انسخ بلوك { ... }      ║
// ║       كامل بالفاصلة اللي بعده، والصقه، وعدّل فيه                     ║
// ║    4) متمسحش الفواصل ( , ) ولا علامات التنصيص ( " )                 ║
// ║       لو حصل غلط، الموقع هيفتح فاضي → راجع آخر حاجة عدلتها          ║
// ║                                                                  ║
// ║  🎨 الأيقونات: من موقع fonts.google.com/icons                      ║
// ║     اكتب اسم الأيقونة بالإنجليزي زي: "dentistry" أو "spa"           ║
// ╚══════════════════════════════════════════════════════════════════╝

const CLINIC_CONFIG = {

  // ============================================================
  // ⚙️ إعدادات عامة
  // ============================================================
  settings: {
    defaultTheme: "dark",   // الوضع اللي الموقع بيفتح بيه أول مرة: "dark" غامق أو "light" فاتح
    defaultLang: "en",      // اللغة اللي الموقع بيفتح بيها أول مرة: "en" أو "ar"
    showWhatsappButton: true // زرار الواتساب العائم تحت في الركن: true يظهر / false يختفي
  },

  // ============================================================
  // 🏥 بيانات العيادة الأساسية (بتتكرر في الهيدر والفوتر والحجز)
  // ============================================================
  clinic: {
    name: "OL ELLABIB",
    monogram: "OL", // الحرفين اللي جوه الدايرة جنب الاسم (لو مفيش صورة لوجو)
    subtitle: { en: "Aesthetic & Medical Center", ar: "مركز التجميل والطب المتكامل" },

    // 🖼️ اللوجو: لو عندك صورة لوجو حط مسارها هنا (نسخة لكل وضع)
    // لو سبتهم فاضيين "" هيظهر اللوجو المكتوب (OL + اسم العيادة)
    logo: {
      dark: "assets/images/logos/ol-dark.png",   // ← لوجو فاتح/ذهبي يبان على الأسود
      light: "assets/images/logos/ol-light.png"  // ← لوجو يبان على الأبيض
    },

    // 🏷️ لوجوهات العيادات اللي في البنر الرئيسي (على اليمين جنب الكلام)
    // الترتيب مهم:  1) فوق في النص   2) تحت على الشمال   3) تحت على اليمين
    // كل لوجو ليه نسختين:
    //   dark  ← النسخة اللي خلفيتها سودا (بتظهر في الوضع الغامق)
    //   light ← النسخة اللي خلفيتها بيضا (بتظهر في الوضع الفاتح)
    // الخلفية السودا/البيضا بتختفي لوحدها، فاللوجو بيبان كأنه مفرّغ
    // لو مسحت القايمة دي كلها المكان ده هيختفي من البنر
    // brandsLabel = الكلمة الصغيرة اللي بين اللوجو اللي فوق واللوجوهين اللي تحت ← لو مش عاوزها خليها ""
    brandsLabel: { en: "Our Clinics", ar: "عياداتنا" },
    brands: [
      { // 1) فوق: OL ELLABIB
        name: "OL ELLABIB",
        dark: "assets/images/logos/ol-dark.png",
        light: "assets/images/logos/ol-light.png"
      },
      { // 2) تحت على الشمال: EVY Clinics
        name: "EVY Clinics",
        dark: "assets/images/logos/evy-dark.png",
        light: "assets/images/logos/evy-light.png"
      },
      { // 3) تحت على اليمين: Dr. Nour Moustafa
        name: "Dr. Nour Moustafa Dental Clinic",
        dark: "assets/images/logos/nour-dark.png",
        light: "assets/images/logos/nour-light.png"
      }
    ],

    // ☎️ التليفون
    phoneDisplay: "+20 100 780 3333", // الرقم زي ما بيظهر للزائر
    phoneLink: "+201007803333",       // الرقم اللي بيتصل عليه لما يدوس (من غير مسافات)
    whatsapp: "201007803333",         // رقم الواتساب: كود الدولة من غير + ومن غير صفر في الأول

    email: "info@ol-ellabib.com",

    // 📍 العنوان
    shortAddress: { en: "Almaza, Heliopolis, Cairo", ar: "ألماظة، مصر الجديدة، القاهرة" }, // اللي في الشريط العلوي
    fullAddress: {
      en: "Petra Gate Mall - Almaza Park - Heliopolis - In front of Egypt Air Hospital, Cairo",
      ar: "بترا جيت مول - ألماظة بارك - مصر الجديدة - أمام مستشفى مصر للطيران، القاهرة"
    },
    // لينك جوجل ماب: افتح مكان العيادة على Google Maps ← Share ← Copy link والصقه هنا
    mapsUrl: "https://maps.google.com/?q=Petra+Gate+Mall+Almaza+Heliopolis+Cairo",

    // 🕘 مواعيد العمل
    hours: {
      // السطر القصير اللي في الشريط العلوي
      short: { en: "Sat – Thu: 9:30 AM – 8:30 PM", ar: "السبت – الخميس: ٩:٣٠ ص – ٨:٣٠ م" },
      // الجدول اللي في الفوتر ← تقدر تزوّد أو تشيل أيام
      list: [
        { days: { en: "Saturday – Thursday", ar: "السبت – الخميس" }, time: { en: "09:30 AM – 08:30 PM", ar: "٩:٣٠ ص – ٨:٣٠ م" } },
        { days: { en: "Friday", ar: "الجمعة" },                     time: { en: "02:30 PM – 07:00 PM", ar: "٢:٣٠ م – ٧:٠٠ م" } }
      ],
      note: { en: "Emergency appointments available upon request.", ar: "مواعيد الطوارئ متاحة بالتنسيق مع خدمة العملاء." }
    },

    // 📱 السوشيال ميديا ← icon اسمه من: facebook / instagram / tiktok / youtube / x / linkedin
    // لو مش عاوز حساب معين امسح السطر بتاعه. لو url فاضي "" مش هيظهر
    social: [
      { icon: "facebook",  url: "" },
      { icon: "instagram", url: "" },
      { icon: "tiktok",    url: "" }
    ]
  },

  // ============================================================
  // 🧭 القائمة العلوية (Navbar)
  // href = اسم القسم اللي بيروحله (متغيروش إلا لو غيرت id القسم في index.html)
  // ============================================================
  nav: [
    { href: "#home",    label: { en: "Home",     ar: "الرئيسية" } },
    { href: "#about",   label: { en: "About Us", ar: "من نحن" } },
    // ده الـ Dropdown بتاع العيادات ← children = العناصر اللي جواه
    { label: { en: "Clinics", ar: "العيادات" }, children: [
        { href: "#clinic-dental", label: { en: "Dental Excellence",         ar: "تميّز الأسنان" } },
        { href: "#clinic-derma",  label: { en: "Dermatology & Aesthetics",  ar: "الجلدية والتجميل" } }
    ]},
    { href: "#why",     label: { en: "Why Us",   ar: "لماذا نحن" } },
    { href: "#tour",    label: { en: "Clinic Tour", ar: "جولة في العيادة" } },
    { href: "#doctors", label: { en: "Our Team", ar: "فريقنا" } },
    { href: "#gallery", label: { en: "Gallery",  ar: "المعرض" } },
    { href: "#contact", label: { en: "Contact",  ar: "تواصل معنا" } }
  ],

  // ============================================================
  // 🖼️ القسم الأول: البنر الرئيسي (Hero)
  // ============================================================
  hero: {
    // الصورة الكبيرة في الخلفية ← المقاس المناسب 1920×1080 أو أكبر
    image: "assets/images/hero.jpg",

    // الشارة الصغيرة اللي فوق العنوان
    kicker: { en: "Swiss Clinical Protocol • Almaza, Cairo", ar: "بروتوكول طبي سويسري • ألماظة، القاهرة" },

    // العنوان: السطر الأول أبيض/أسود + الجزء الذهبي المائل تحته
    title:          { en: "Discover Confidence in", ar: "اكتشف الثقة في" },
    titleHighlight: { en: "Every Smile",            ar: "كل ابتسامة" },

    description: {
      en: "At OL Ellabib Clinic, we bring together excellence in dental care, dermatology, and beauty to help you shine with confidence and style.",
      ar: "في عيادات OL Ellabib نجمع بين التميّز في طب الأسنان والجلدية والتجميل، لنساعدك على التألق بثقة وأناقة."
    },

    // الزرارين ← الأول بيفتح الحجز، التاني بيروح للعيادات
    primaryButton:   { en: "Book Free Consultation (Google Meet)", ar: "احجز استشارة مجانية أونلاين" },
    secondaryButton: { en: "Explore Clinics & Expertise",          ar: "استكشف العيادات والتخصصات" },

    // 🔢 شريط الأرقام ← count = الرقم (بيعد لحد ما يوصله) / prefix = اللي قبله / label = الكلام تحته
    stats: [
      { count: 1000, prefix: "+", label: { en: "Happy Smiles Perfected",       ar: "ابتسامة سعيدة" } },
      { count: 15,   prefix: "+", label: { en: "Years Medical Excellence",     ar: "عامًا من التميّز الطبي" } },
      { count: 50,   prefix: "+", label: { en: "Specialized Procedures",       ar: "إجراءً تخصصيًا" } },
      { count: 25,   prefix: "+", label: { en: "Expert Consultants & Surgeons", ar: "استشاريًا وجراحًا" } }
    ]
  },

  // ============================================================
  // 📖 القسم التاني: عن العيادة (About Us)
  // ============================================================
  about: {
    kicker:         { en: "Sovereign Integrity", ar: "نزاهة وثقة" },
    title:          { en: "Transforming Smiles &", ar: "نُجمّل الابتسامات" },
    titleHighlight: { en: "Empowering Beauty",     ar: "ونُبرز جمالك" },
    text: {
      en: "Engineered at the nexus of precision medical science and artistic mastery. At OL ELLABIB, patient journeys are curated within ultra-private clinical sanctums where hygiene, digital modeling, and personalized biology guarantee uncompromised aesthetic harmony.",
      ar: "نجمع بين دقة العلم الطبي وإتقان الفن. في OL ELLABIB تمرّ رحلة كل مريض داخل أجنحة علاجية خاصة تمامًا، حيث يضمن التعقيم الصارم والتصميم الرقمي والعلاج المخصص لكل حالة نتيجة متناغمة بلا تنازلات."
    },

    // نقاط الثقة (3 نقط بأيقونات) ← icon من Google Icons
    points: [
      { icon: "verified",
        title: { en: "Personalized Swiss-Standard Care", ar: "رعاية شخصية بمعايير سويسرية" },
        text:  { en: "Calibrated diagnostic algorithms tailored specifically to your natural facial structure.", ar: "تشخيص دقيق مصمم خصيصًا على ملامح وجهك الطبيعية." } },
      { icon: "calendar_month",
        title: { en: "Flexible Online Scheduling & Virtual Triage", ar: "حجز مرن أونلاين واستشارة عن بُعد" },
        text:  { en: "Direct remote consultations and priority private booking via our concierge desk.", ar: "استشارات مباشرة عن بُعد وحجز خاص بأولوية عبر خدمة العملاء." } },
      { icon: "security",
        title: { en: "100% Clinical Satisfaction & Safety Guarantee", ar: "ضمان الأمان والرضا الكامل" },
        text:  { en: "Sterilization exceeding European hospital standards.", ar: "تعقيم يتجاوز معايير المستشفيات الأوروبية." } }
    ],

    button: { en: "Our Clinic Story & Standards", ar: "قصتنا ومعاييرنا" },

    // 🖼️ الكارت اللي على الجنب (صورة + جملة + اسم الدكتور)
    sideImage: "assets/images/about.jpg",
    sideBadge: { en: "Prestige Medical Sanctuary", ar: "صرح طبي راقٍ" },
    quoteLine1: { en: "It wasn’t a bad day,",          ar: "لم يكن يومًا سيئًا،" },
    quoteLine2: { en: "IT WAS JUST THE WRONG CLINIC.", ar: "كانت فقط العيادة الخطأ." },
    signatureName: { en: "Dr. Omnia Ellabib", ar: "د. أمنية اللبيب" },
    signatureRole: { en: "Medical Director & Head Specialist", ar: "المدير الطبي ورئيس الأخصائيين" }
  },

  // ============================================================
  // 🦷 القسم التالت: العيادات والتخصصات (Clinics)
  // ============================================================
  clinics: {
    kicker:         { en: "Specialized Suites", ar: "أجنحة متخصصة" },
    title:          { en: "Disciplines of", ar: "تخصصات" },
    titleHighlight: { en: "Elegance & Health", ar: "الأناقة والصحة" },
    description: {
      en: "Seamlessly integrated dual faculties providing holistic facial aesthetics, laser dermatology, and restorative smile redesigns.",
      ar: "قسمان متكاملان يقدّمان تجميل الوجه الشامل، وعلاجات الجلد بالليزر، وإعادة تصميم الابتسامة."
    },

    // 📦 الكروت ← كل بلوك = كارت
    //   id       : اسم الكارت (القائمة العلوية بتروحله بـ #clinic-الاسم)
    //   wide     : true = الكارت عريض (بياخد مكان كارتين)
    //   featured : true = كارت مميز بلون ذهبي
    //   twoColumns: true = النقاط تتعرض في عمودين
    items: [
      {
        id: "dental", wide: true, twoColumns: true,
        badge: { en: "Faculty 01", ar: "القسم ٠١" },
        icon: "dentistry",
        title: { en: "Dental Excellence", ar: "تميّز الأسنان" },
        text:  { en: "Pioneering micro-invasive restorative dentistry combining German CAD/CAM 3D scanning and master-crafted veneers.", ar: "طب أسنان تجميلي وترميمي بأقل تدخل، يجمع بين المسح ثلاثي الأبعاد الألماني CAD/CAM والفينير المصنوع بإتقان." },
        points: [
          { en: "Bespoke Hollywood Smile Veneers", ar: "فينير هوليوود سمايل مخصص" },
          { en: "Painless Guided Dental Implants", ar: "زراعة أسنان موجهة بدون ألم" },
          { en: "3D Digital Invisible Aligners",   ar: "تقويم شفاف رقمي ثلاثي الأبعاد" },
          { en: "Laser Gum Depigmentation & Contouring", ar: "تفتيح وتحديد اللثة بالليزر" },
          { en: "Laser Teeth Whitening in 30 Mins", ar: "تبييض الأسنان بالليزر في ٣٠ دقيقة" }
        ],
        linkText: { en: "Explore Dental Protocols", ar: "اكتشف بروتوكولات الأسنان" },
        footnote: { en: "Swiss Master Ceramist Lab", ar: "معمل خزف بمعايير سويسرية" }
      },
      {
        id: "derma",
        badge: { en: "Faculty 02", ar: "القسم ٠٢" },
        icon: "vaccines",
        title: { en: "Aesthetic Injections & Derma", ar: "حقن التجميل والجلدية" },
        text:  { en: "Targeted natural enhancement restoring dermal volume, structural contours, and youthful hydration.", ar: "تحسين طبيعي يعيد امتلاء البشرة وتحديد الملامح ونضارة الشباب." },
        points: [
          { en: "Botox & Wrinkle Relaxers",         ar: "بوتوكس وعلاج التجاعيد" },
          { en: "Premium Hyaluronic Acid Fillers",  ar: "فيلر هيالورونيك فاخر" },
          { en: "Profhilo & Skin Bio-Remodeling",   ar: "بروفايلو وتجديد البشرة الحيوي" },
          { en: "Jawline, Chin & Cheek Sculpting",  ar: "نحت الفك والذقن والخدود" }
        ],
        linkText: { en: "View Injectable Menu", ar: "قائمة الحقن التجميلية" }
      },
      {
        id: "laser",
        badge: { en: "Faculty 03", ar: "القسم ٠٣" },
        icon: "flare",
        title: { en: "Advanced Laser & Skin Tech", ar: "الليزر وتقنيات البشرة" },
        text:  { en: "Medical-grade energy devices targeting collagen induction, pigment correction, and non-surgical lifting.", ar: "أجهزة طبية متقدمة لتحفيز الكولاجين وعلاج التصبغات والشد بدون جراحة." },
        points: [
          { en: "HIFU Non-Surgical Lift",            ar: "هايفو للشد بدون جراحة" },
          { en: "Fractional CO2 Skin Resurfacing",   ar: "فراكشنال CO2 لتجديد البشرة" },
          { en: "Painless Ice Laser Hair Removal",   ar: "ليزر إزالة الشعر بدون ألم" },
          { en: "Hollywood Carbon Laser Peeling",    ar: "تقشير كربوني هوليوود" }
        ],
        linkText: { en: "Explore Laser Devices", ar: "اكتشف أجهزة الليزر" }
      },
      {
        id: "nutrition", wide: true,
        badge: { en: "Faculty 04", ar: "القسم ٠٤" },
        icon: "vital_signs",
        title: { en: "Clinical Nutrition & Contouring", ar: "التغذية العلاجية ونحت القوام" },
        text:  { en: "Anti-inflammatory diets designed alongside non-invasive body contouring.", ar: "أنظمة غذائية علاجية مع نحت القوام بدون جراحة." },
        points: [
          { en: "Skin-Focused Diet Plans",              ar: "أنظمة غذائية لصحة البشرة" },
          { en: "Non-Invasive Cryo & RF Contouring",    ar: "نحت بالتبريد والراديو فريكونسي" },
          { en: "Lymphatic Drainage Protocols",         ar: "جلسات التصريف اللمفاوي" }
        ],
        linkText: { en: "Nutrition Protocols", ar: "برامج التغذية" }
      }
    ]
  },

  // ============================================================
  // 🏅 القسم الرابع: لماذا نحن (Why Us)
  // ============================================================
  why: {
    image: "assets/images/why.jpg", // الصورة المربعة ← مقاس مربع 800×800 تقريبًا
    sealText: { en: "Swiss Standards • Heliopolis • Cairo •", ar: "معايير سويسرية • مصر الجديدة • القاهرة •" }, // الكلام اللي بيلف في الختم
    kicker:         { en: "Uncompromising Protocols", ar: "بروتوكولات بلا تنازلات" },
    title:          { en: "Why Patients Choose", ar: "لماذا يختار المرضى" },
    titleHighlight: { en: "OL ELLABIB",          ar: "OL ELLABIB" },
    text: {
      en: "Every clinical protocol is governed by stringent European validation. We banish dental anxiety through conscious sedation options and non-contact digital impressions, turning clinical visits into restorative wellness rituals.",
      ar: "كل بروتوكول علاجي لدينا يخضع لمعايير أوروبية صارمة. نُنهي الخوف من طبيب الأسنان بخيارات التخدير الواعي والطبعات الرقمية بدون تلامس، لتصبح زيارتك تجربة راحة واستجمام."
    },
    // الكارتين الصغيرين
    features: [
      { icon: "biotech",
        title: { en: "Class-B Sterilization Autoclaves", ar: "تعقيم بأجهزة أوتوكلاف Class-B" },
        text:  { en: "Multi-stage vacuum autoclaves with verification for every patient kit.", ar: "تعقيم متعدد المراحل مع تحقق لكل أدوات مريض." } },
      { icon: "devices_other",
        title: { en: "3D Cone Beam CT Scanning", ar: "أشعة مقطعية ثلاثية الأبعاد" },
        text:  { en: "Ultra-low radiation 3D imaging for precise implant planning.", ar: "تصوير ثلاثي الأبعاد بأقل إشعاع لتخطيط دقيق للزراعة." } }
    ],
    // السطرين الذهبيين تحت
    tags: [
      { icon: "verified", text: { en: "Almaza Park Heliopolis", ar: "ألماظة بارك – مصر الجديدة" } },
      { icon: "lock",     text: { en: "100% Medical Discretion", ar: "سرية طبية تامة" } }
    ]
  },

  // ============================================================
  // 🏛️ جولة في العيادة (Clinic Tour) ← صور المكان نفسه (بعد "لماذا نحن")
  //
  // 📸 أسهل طريقة: حط صور العيادة في فولدر assets/images/clinic/ بالأسماء دي بالظبط:
  //      clinic-1.jpg ، clinic-2.jpg ، clinic-3.jpg ... وهتظهر لوحدها من غير ما تعدّل أي حاجة هنا
  //    لحد ما الصورة تتحط، مكانها بيظهر خلفية ذهبية بعلامة اللوجو
  //
  // ➕ عاوز صور أكتر؟ انسخ سطر { image: ..., caption: ... }, والصقه تحت وغيّر الرقم (clinic-7.jpg ...)
  // ➖ عاوز أقل؟ امسح السطر بتاعها بالفاصلة اللي بعده
  //
  //   image   : مسار الصورة ← مقاس عرضي 1600×1100 تقريبًا (الصورة الأولى بتظهر أكبر واحدة)
  //   caption : اسم المكان اللي في الصورة (بيظهر على الصورة ولما الزائر يكبّرها)
  //   كل 6 صور بيتعملوا مربع واحد شيك: الأولى كبيرة، والتانية والتالتة صغيرين، والباقي عريضين
  // ============================================================
  tour: {
    kicker:         { en: "The Clinic",  ar: "العيادة" },
    title:          { en: "Step Inside", ar: "جولة داخل" },
    titleHighlight: { en: "OL ELLABIB",  ar: "OL ELLABIB" },
    description: {
      en: "A calm, private space designed around your comfort. Take a look around before your visit.",
      ar: "مكان هادي وخاص متصمم عشان راحتك. اتفرّج على العيادة قبل زيارتك."
    },
    items: [
      { image: "assets/images/clinic/clinic-1.jpg", caption: { en: "Reception",          ar: "الاستقبال" } },
      { image: "assets/images/clinic/clinic-2.jpg", caption: { en: "Dental Suite",       ar: "عيادة الأسنان" } },
      { image: "assets/images/clinic/clinic-3.jpg", caption: { en: "Treatment Room",     ar: "غرفة العلاج" } },
      { image: "assets/images/clinic/clinic-4.jpg", caption: { en: "Waiting Lounge",     ar: "صالة الانتظار" } },
      { image: "assets/images/clinic/clinic-5.jpg", caption: { en: "Laser & Skin Room",  ar: "غرفة الليزر والبشرة" } },
      { image: "assets/images/clinic/clinic-6.jpg", caption: { en: "Sterilization Unit", ar: "وحدة التعقيم" } }
    ]
  },

  // ============================================================
  // 👥 القسم الخامس: فريقنا (Meet Our Team) ← شريط كروت بيلف لوحده علطول
  //
  // ➕ عشان تضيف شخص: انسخ سطرين { image: ... } بالفاصلة اللي بعدهم، والصقهم تحت، وعدّل
  // ➖ عشان تشيل شخص: امسح البلوك بتاعه بالفاصلة اللي بعده
  //
  //   image : صورة الشخص ← حطها في assets/images/team/ بنفس الاسم اللي مكتوب هنا وهتظهر لوحدها
  //           (مقاس طولي 600×750) ← لحد ما تتحط بيظهر مكانها أول حرفين من الاسم
  //   name  : الاسم   /   role : الوظيفة أو التخصص
  //   badge : (اختياري) شارة ذهبية صغيرة على الصورة زي "مالك العيادة" ← امسحها لو مش محتاجها
  //
  //   speed : سرعة اللف ← عدد الثواني اللي كل كارت بياخدها (رقم أكبر = أبطأ)
  //   الشريط بيقف لما الماوس يقف عليه، وفي العربي بيلف في الاتجاه العكسي
  // ⚠️ دي بيانات مبدئية ← حط أسماء وصور الفريق الحقيقيين
  // ============================================================
  doctors: {
    kicker:         { en: "Our People", ar: "فريق العمل" },
    title:          { en: "Meet Our", ar: "تعرّف على" },
    titleHighlight: { en: "Team",     ar: "فريقنا" },
    speed: 6,
    items: [
      { image: "assets/images/team/owner.jpg", name: { en: "Owner Name", ar: "اسم المالك" },
        role:  { en: "Founder & Clinic Owner", ar: "المؤسس ومالك العيادة" },
        badge: { en: "Owner", ar: "المالك" } },
      { image: "assets/images/team/omnia-ellabib.jpg", name: { en: "Dr. Omnia Ellabib", ar: "د. أمنية اللبيب" },
        role: { en: "Medical Director • Dermatology & Aesthetics", ar: "المدير الطبي • الجلدية والتجميل" } },
      { image: "assets/images/team/nour-moustafa.jpg", name: { en: "Dr. Nour Moustafa", ar: "د. نور مصطفى" },
        role: { en: "Dental Clinic • Cosmetic Dentistry", ar: "عيادة الأسنان • تجميل الأسنان" } },
      { image: "assets/images/team/doctor-4.jpg", name: { en: "Doctor Name", ar: "اسم الطبيب" },
        role: { en: "Specialist • Implantology", ar: "أخصائي • زراعة الأسنان" } },
      { image: "assets/images/team/doctor-5.jpg", name: { en: "Doctor Name", ar: "اسم الطبيب" },
        role: { en: "Specialist • Clinical Nutrition", ar: "أخصائي • التغذية العلاجية" } }
    ]
  },

  // ============================================================
  // 📅 القسم السادس: حجز الاستشارة (Booking)
  // ============================================================
  booking: {
    // 🔗 لينك Google Calendar Appointment Schedule
    // إزاي تجيبه: Google Calendar ← Create ← Appointment schedule ← فعّل Google Meet
    //            ← احفظ ← Share ← "Booking page" ← انسخ اللينك والصقه هنا
    // لو سبته فاضي "" هيظهر بداله زرار حجز على الواتساب
    googleCalendarUrl: "",

    badge:          { en: "Zero Commitment • 100% Complimentary", ar: "بدون أي التزام • مجانًا بالكامل" },
    title:          { en: "Reserve Your", ar: "احجز" },
    titleHighlight: { en: "Clinical Consultation", ar: "استشارتك الطبية" },
    description: {
      en: "Connect directly from home via Google Meet with our senior consultant, or schedule a private visit in our Almaza suites.",
      ar: "تواصل من بيتك عبر Google Meet مع كبير الاستشاريين، أو احجز زيارة خاصة في أجنحتنا بألماظة."
    },

    // التابين
    tabRemote: { en: "Remote Google Meet (Free 20-Min)", ar: "استشارة أونلاين مجانية (٢٠ دقيقة)" },
    tabClinic: { en: "In-Clinic Visit (Heliopolis)",     ar: "زيارة في العيادة (مصر الجديدة)" },

    remoteNote: {
      en: "Pick a time below — a Google Meet link is generated automatically and sent to your email & calendar.",
      ar: "اختار الميعاد المناسب — لينك Google Meet بيتعمل تلقائيًا ويوصلك على الإيميل والتقويم."
    },
    // اللي بيظهر لو لينك جوجل لسه مش متحط
    remoteFallback: {
      en: "Online booking calendar is coming soon. Message us on WhatsApp and we’ll send you a Google Meet link.",
      ar: "تقويم الحجز الأونلاين هيكون متاح قريب. ابعتلنا على الواتساب وهنبعتلك لينك Google Meet."
    },

    // التخصصات اللي في القائمة (بتظهر في فورم زيارة العيادة)
    departments: [
      { en: "Dental Excellence & Smile Design",       ar: "تجميل الأسنان وتصميم الابتسامة" },
      { en: "Dermatology, Aesthetics & Injections",   ar: "الجلدية والتجميل والحقن" },
      { en: "Advanced Skin Tech & Laser",             ar: "الليزر وتقنيات البشرة" },
      { en: "Clinical Nutrition & Body Contouring",   ar: "التغذية العلاجية ونحت القوام" }
    ],

    // فورم زيارة العيادة: لما الزائر يدوس "تأكيد" بيتفتح واتساب برسالة جاهزة فيها بياناته
    clinicNote: {
      en: "Your request opens WhatsApp with your details ready to send — our coordinator confirms the exact time.",
      ar: "طلبك بيفتح الواتساب ببياناتك جاهزة للإرسال — ومنسق المواعيد بيأكدلك الميعاد بالظبط."
    }
  },

  // ============================================================
  // 📸 القسم السابع: المعرض (Gallery)
  // كل بلوك = كارت. لما الزائر يدوس على الصورة بتكبر (Lightbox)
  // ============================================================
  gallery: {
    kicker:         { en: "Artistry & Clinical Precision", ar: "فن ودقة طبية" },
    title:          { en: "Highlights of", ar: "لمحات من" },
    titleHighlight: { en: "Our Expertise", ar: "خبرتنا" },
    items: [
      {
        image: "assets/images/gallery-dental.jpg", // مقاس عرضي 1200×800
        tag:   { en: "Restorative Protocol", ar: "بروتوكول ترميمي" },  // الشارة فوق على الصورة
        badge: { en: "100% Painless", ar: "بدون ألم" },                 // الشارة الذهبية تحت على الصورة
        title: { en: "Art in Every Tooth", ar: "فنّ في كل سِن" },
        meta:  { en: "3D Digital Mockup • 2 Visits", ar: "تصميم رقمي ثلاثي الأبعاد • زيارتين" },
        text:  { en: "Full arch veneer rehabilitation correcting attrition and discoloration while keeping natural texture and luminescence.", ar: "فينير كامل للفك يعالج التآكل وتغير اللون مع الحفاظ على الملمس واللمعان الطبيعي." }
      },
      {
        image: "assets/images/gallery-skin.jpg",
        tag:   { en: "Laser & Bio-Remodeling", ar: "ليزر وتجديد حيوي" },
        badge: { en: "Zero Downtime", ar: "بدون فترة نقاهة" },
        title: { en: "Skin Speaks Before Words", ar: "البشرة تتكلم قبل الكلام" },
        meta:  { en: "Profhilo + HIFU Dual Sculpt", ar: "بروفايلو + هايفو" },
        text:  { en: "Facial harmonizing and skin revitalization, restoring jawline definition and natural bounce without filler bulk.", ar: "تناسق الوجه وتجديد البشرة، مع استعادة تحديد الفك والمرونة الطبيعية بدون امتلاء مبالغ فيه." }
      }
    ]
  },

  // ============================================================
  // 💬 القسم التامن: آراء العملاء (Testimonials) ← سلايدر
  // ⚠️ دي آراء تجريبية من التصميم ← استبدلها بآراء حقيقية قبل نشر الموقع
  // ============================================================
  testimonials: {
    kicker: { en: "Voices of Our Patients", ar: "آراء مرضانا" },
    title:  { en: "“You Can Rule The World With The Right Care.”", ar: "«تقدر تحكم العالم بالرعاية الصح.»" },
    items: [
      { stars: 5,
        text: { en: "The remote consultation on Google Meet made me feel instantly confident. When I landed in Cairo for my veneers, every step was seamless and completely painless.", ar: "الاستشارة الأونلاين على Google Meet طمنتني من أول لحظة. ولما وصلت القاهرة عشان الفينير، كل خطوة كانت سلسة ومن غير أي ألم." },
        name: { en: "N. A.", ar: "ن. ع." },
        info: { en: "Riyadh • Cosmetic Dentistry", ar: "الرياض • تجميل الأسنان" } },
      { stars: 5,
        text: { en: "The private suite for veiled ladies gave me total peace of mind. Natural contouring and laser therapy at its best — no overfilled cheeks, just pure radiance.", ar: "الجناح الخاص للمحجبات خلاني مرتاحة تمامًا. نحت طبيعي وليزر على أعلى مستوى — من غير مبالغة، نضارة وبس." },
        name: { en: "F. S.", ar: "ف. ش." },
        info: { en: "Heliopolis • Skin Rejuvenation", ar: "مصر الجديدة • نضارة البشرة" } },
      { stars: 5,
        text: { en: "I had extreme dental anxiety for years until visiting OL ELLABIB. Guided implants were finished in a breeze without any swelling.", ar: "كان عندي رعب من دكتور الأسنان لسنين لحد ما زرت OL ELLABIB. الزراعة الموجهة خلصت بسهولة ومن غير أي ورم." },
        name: { en: "M. Z.", ar: "م. ز." },
        info: { en: "Geneva • Guided Implantology", ar: "جنيف • زراعة الأسنان" } },
      { stars: 5,
        text: { en: "From booking to follow-up, everything felt personal and private. The team explained every step before starting.", ar: "من الحجز للمتابعة، كل حاجة كانت شخصية وفيها خصوصية. الفريق شرحلي كل خطوة قبل ما يبدأ." },
        name: { en: "H. K.", ar: "هـ. ك." },
        info: { en: "New Cairo • Hollywood Smile", ar: "القاهرة الجديدة • هوليوود سمايل" } }
    ]
  },

  // ============================================================
  // 🔻 الفوتر (آخر الصفحة)
  // ============================================================
  footer: {
    about: {
      en: "Swiss standards in Dental & Dermatology. Redefining medical aesthetics with clinical precision and luxury care.",
      ar: "معايير سويسرية في طب الأسنان والجلدية. نعيد تعريف التجميل الطبي بدقة علمية ورعاية فاخرة."
    },
    hoursTitle:   { en: "Working Hours",      ar: "مواعيد العمل" },
    linksTitle:   { en: "Our Clinics",        ar: "عياداتنا" },
    contactTitle: { en: "Concierge & Visit",  ar: "تواصل وزيارة" },
    // روابط عمود "عياداتنا"
    links: [
      { href: "#clinic-dental", label: { en: "Dental Excellence",         ar: "تميّز الأسنان" } },
      { href: "#clinic-derma",  label: { en: "Dermatology & Aesthetics",  ar: "الجلدية والتجميل" } },
      { href: "#clinic-laser",  label: { en: "Laser & Skin Technology",   ar: "الليزر وتقنيات البشرة" } },
      { href: "#booking",       label: { en: "Book a Consultation",       ar: "احجز استشارة" } }
    ],
    copyright: { en: "OL ELLABIB Aesthetic & Medical Center. All rights reserved.", ar: "OL ELLABIB مركز التجميل والطب المتكامل. جميع الحقوق محفوظة." }
  },

  // ============================================================
  // 🔤 كلمات صغيرة متفرقة في الموقع (أزرار وعناوين فورم)
  // ============================================================
  ui: {
    bookButton:     { en: "Book Consultation", ar: "احجز استشارة" },
    labelDept:      { en: "Medical Department", ar: "التخصص" },
    labelName:      { en: "Patient Full Name", ar: "الاسم بالكامل" },
    labelPhone:     { en: "WhatsApp / Mobile Number", ar: "رقم الواتساب / الموبايل" },
    labelDate:      { en: "Preferred Date", ar: "اليوم المفضل" },
    labelTime:      { en: "Preferred Time", ar: "الوقت المفضل" },
    labelNotes:     { en: "Notes (optional)", ar: "ملاحظات (اختياري)" },
    placeholderName:  { en: "e.g. Layla Mansour", ar: "مثال: ليلى منصور" },
    placeholderPhone: { en: "+20 10X XXX XXXX", ar: "+20 10X XXX XXXX" },
    placeholderNotes: { en: "Anything you’d like the doctor to know", ar: "أي حاجة حابب الدكتور يعرفها" },
    timeMorning:    { en: "Morning", ar: "الصبح" },
    timeAfternoon:  { en: "Afternoon", ar: "بعد الظهر" },
    timeEvening:    { en: "Evening", ar: "بالليل" },
    submitClinic:   { en: "Send Visit Request via WhatsApp", ar: "ابعت طلب الزيارة على الواتساب" },
    whatsappFallbackBtn: { en: "Book on WhatsApp", ar: "احجز على الواتساب" },
    whatsappGreeting: { en: "Hello OL ELLABIB, I'd like to book an in-clinic visit:", ar: "أهلًا OL ELLABIB، حابب أحجز زيارة في العيادة:" },
    whatsappRemoteMsg: { en: "Hello OL ELLABIB, I'd like to book a free Google Meet consultation.", ar: "أهلًا OL ELLABIB، حابب أحجز استشارة مجانية على Google Meet." },
    menu:           { en: "Menu", ar: "القائمة" },
    themeToggle:    { en: "Switch light / dark mode", ar: "تبديل الوضع الفاتح / الغامق" },
    viewImage:      { en: "View image", ar: "عرض الصورة" },
    // شريط الموبايل السفلي (اتصال • واتساب • احجز)
    callShort:      { en: "Call", ar: "اتصال" },
    whatsappShort:  { en: "WhatsApp", ar: "واتساب" },
    bookShort:      { en: "Book", ar: "احجز" }
  }
};
