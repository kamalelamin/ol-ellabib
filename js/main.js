// ╔══════════════════════════════════════════════════════════════════╗
// ║  main.js — تشغيل الموقع                                            ║
// ║                                                                  ║
// ║  الملف ده بيقرا البيانات من clinic-config.js ويرسم بيها الصفحة.     ║
// ║  ⚠️ مش محتاج تعدّل هنا عشان تغيّر كلام أو صور ← عدّل في الكونفج      ║
// ║                                                                  ║
// ║  الأجزاء:                                                          ║
// ║    1) أدوات مساعدة                                                 ║
// ║    2) اللغة (عربي/إنجليزي)                                         ║
// ║    3) الوضع (غامق/فاتح)                                            ║
// ║    4) رسم الأقسام من الكونفج                                        ║
// ║    5) القائمة والـ Dropdown وقائمة الموبايل                         ║
// ║    6) العدادات وحركة الظهور                                         ║
// ║    7) الحجز (تقويم Google + فورم الواتساب)                          ║
// ║    8) السلايدر والمعرض                                              ║
// ║    9) التشغيل                                                       ║
// ╚══════════════════════════════════════════════════════════════════╝

(function () {
  "use strict";

  const C = typeof CLINIC_CONFIG !== "undefined" ? CLINIC_CONFIG : null;
  if (!C) {
    // لو الكونفج فيه غلطة (فاصلة ناقصة مثلًا) الملف مش هيتقري
    console.error("❌ clinic-config.js فيه خطأ — راجع آخر تعديل عملته (فاصلة أو علامة تنصيص ناقصة)");
    return;
  }

  const root = document.documentElement;
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));


  // ============================================================
  // 1) أدوات مساعدة
  // ============================================================

  // اللغة الحالية
  let lang = root.lang === "ar" ? "ar" : (safeGet("ol-lang") || C.settings.defaultLang || "en");

  // t() بترجع الكلام باللغة الحالية: { en, ar } ← النص المناسب
  function t(value) {
    if (value == null) return "";
    if (typeof value === "string" || typeof value === "number") return String(value);
    return value[lang] ?? value.en ?? "";
  }

  // بتجيب قيمة من الكونفج بالمسار: get("hero.title")
  function get(path) {
    return path.split(".").reduce((obj, key) => (obj == null ? undefined : obj[key]), C);
  }

  // حماية من الرموز الخاصة جوه الكلام
  function esc(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  // localStorage بأمان (بعض المتصفحات بتقفله)
  function safeGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function safeSet(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }

  const icon = (name, cls = "") => `<span class="icon ${cls}" aria-hidden="true">${esc(name)}</span>`;

  // تحويل الأرقام لعربي (١٢٣) في النسخة العربي
  function formatNumber(n) {
    return Number(n).toLocaleString(lang === "ar" ? "ar-EG" : "en-US");
  }

  // بيتأكد إن الصورة موجودة فعلًا (ومرة واحدة بس لكل صورة حتى لو متكررة في الصفحة)
  const probeCache = new Map();
  function probe(src) {
    if (!probeCache.has(src)) {
      probeCache.set(src, new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
      }));
    }
    return probeCache.get(src);
  }

  // صورة خلفية بأمان: لو الصورة لسه متحطتش أو اسمها غلط، العنصر بياخد كلاس is-missing
  // والـ CSS بيعرض مكانها خلفية ذهبية بعلامة اللوجو بدل مربع فاضي
  // ← عشان كده تقدر تكتب اسم الصورة في الكونفج من دلوقتي، وأول ما تحط الملف هيظهر لوحده
  function setBg(el, src) {
    el.classList.remove("is-missing");
    el.style.backgroundImage = "";
    if (!src) { markMissing(el); return; }
    probe(src).then((ok) => {
      if (ok) el.style.backgroundImage = `url('${encodeURI(src)}')`;
      else markMissing(el);
    });
  }
  // الصورة ناقصة ← خلفية ذهبية، ولو كانت جوه رابط تكبير بنقفله عشان ميفتحش صورة مكسورة
  function markMissing(el) {
    el.classList.add("is-missing");
    const link = el.closest(".glightbox");
    if (!link) return;
    link.classList.remove("glightbox");
    link.classList.add("is-disabled");
    link.removeAttribute("href");
    refreshLightbox();
  }
  let lightboxTimer;
  const refreshLightbox = () => { clearTimeout(lightboxTimer); lightboxTimer = setTimeout(initLightbox, 60); };
  // بيطبّق setBg على كل عنصر جوه container عليه data-src
  const applyBgs = (container) => $$("[data-src]", container).forEach((el) => setBg(el, el.dataset.src));

  // أيقونات السوشيال ميديا (SVG)
  const SOCIAL_ICONS = {
    facebook:  '<path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8z"/>',
    instagram: '<path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM21.9 8c-.1-1.6-.4-3-1.6-4.2S17.6 2.2 16 2.1C14.4 2 9.6 2 8 2.1c-1.6.1-3 .4-4.2 1.6S2.2 6.4 2.1 8C2 9.6 2 14.4 2.1 16c.1 1.6.4 3 1.6 4.2s2.6 1.5 4.2 1.6c1.6.1 6.4.1 8 0 1.6-.1 3-.4 4.2-1.6s1.5-2.6 1.6-4.2c.1-1.6.1-6.4 0-8zm-2.1 9.8a3.3 3.3 0 0 1-1.8 1.8c-1.3.5-4.3.4-5.7.4s-4.4.1-5.7-.4a3.3 3.3 0 0 1-1.8-1.8c-.5-1.3-.4-4.3-.4-5.7s-.1-4.4.4-5.7A3.3 3.3 0 0 1 6.3 4.6c1.3-.5 4.3-.4 5.7-.4s4.4-.1 5.7.4a3.3 3.3 0 0 1 1.8 1.8c.5 1.3.4 4.3.4 5.7s.1 4.4-.4 5.7z"/>',
    tiktok:    '<path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.3v12.4a2.6 2.6 0 1 1-1.8-2.5V9.5a5.9 5.9 0 1 0 5.1 5.9V9.1a7.6 7.6 0 0 0 4.4 1.4V7.2a4.3 4.3 0 0 1-3.3-1.4z"/>',
    youtube:   '<path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15V9l5.8 3-5.8 3z"/>',
    x:         '<path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.9 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z"/>',
    linkedin:  '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3V9.75zM9.5 9.75h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-4.96c0-1.18-.02-2.7-1.65-2.7-1.65 0-1.9 1.29-1.9 2.62V21h-4V9.75z"/>'
  };


  // ============================================================
  // 2) اللغة (عربي / إنجليزي)
  // ============================================================
  function applyLang(newLang, rerender = true) {
    lang = newLang === "ar" ? "ar" : "en";
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    safeSet("ol-lang", lang);
    $$("[data-lang-btn]").forEach((b) => b.classList.toggle("is-active", b.dataset.langBtn === lang));
    if (rerender) renderAll();
  }


  // ============================================================
  // 3) الوضع (غامق / فاتح) — الافتراضي غامق
  // ============================================================
  function applyTheme(theme) {
    const value = theme === "light" ? "light" : "dark";
    root.setAttribute("data-theme", value);
    safeSet("ol-theme", value);
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.content = value === "light" ? "#fcfbf9" : "#0c0c0c";
    renderLogo(); // اللوجو ممكن يكون ليه نسخة لكل وضع
  }


  // ============================================================
  // 4) رسم الأقسام من الكونفج
  // ============================================================

  // 4.1 — كل عنصر عليه data-t بياخد نصه من الكونفج
  function renderTexts() {
    $$("[data-t]").forEach((el) => { el.textContent = t(get(el.dataset.t)); });
    $$("[data-t-placeholder]").forEach((el) => { el.placeholder = t(get(el.dataset.tPlaceholder)); });
    $$("[data-t-aria]").forEach((el) => { el.setAttribute("aria-label", t(get(el.dataset.tAria))); });

    // العناوين اللي ليها جزء ذهبي مائل: title + titleHighlight
    $$("[data-heading]").forEach((el) => {
      const sec = C[el.dataset.heading];
      const br = el.hasAttribute("data-heading-break") ? "<br />" : " ";
      el.innerHTML = `${esc(t(sec.title))}${br}<em>${esc(t(sec.titleHighlight))}</em>`;
    });

    // صور الخلفية: data-bg="hero.image"
    $$("[data-bg]").forEach((el) => setBg(el, get(el.dataset.bg)));

    // روابط التليفون والإيميل والخريطة
    $$("[data-phone-link]").forEach((a) => (a.href = "tel:" + C.clinic.phoneLink));
    $$("[data-email-link]").forEach((a) => (a.href = "mailto:" + C.clinic.email));
    $$("[data-maps-link]").forEach((a) => (a.href = C.clinic.mapsUrl || "#contact"));

    $("#year").textContent = new Date().getFullYear();
    document.title = `${C.clinic.name} | ${t(C.clinic.subtitle)}`;
  }

  // 4.2 — اللوجو (صورة لو موجودة، وإلا مكتوب) + لوجوهات العيادات في البنر
  //   الصورة بتتغير حسب الوضع (dark / light)
  function renderLogo() {
    renderBrands();
    const logo = $("#logo");
    if (!logo) return;
    const theme = root.getAttribute("data-theme") || "dark";
    const img = C.clinic.logo && C.clinic.logo[theme];
    logo.setAttribute("aria-label", C.clinic.name);

    // علامة اللوجو الباهتة اللي بتظهر مكان الصور الناقصة (الـ CSS بيستخدمها من --brand-mark)
    // (لينك كامل عشان يشتغل من جوه ملف الـ CSS اللي في فولدر تاني)
    root.style.setProperty("--brand-mark", img ? `url('${new URL(img, document.baseURI).href}')` : "none");

    // لوجو الفوتر: نفس صورة الهيدر، ولو مفيش صورة بيفضل الاسم المكتوب
    const footLogo = $("#footer-logo");
    if (footLogo) {
      footLogo.hidden = !img;
      if (img) { footLogo.src = img; footLogo.alt = C.clinic.name; }
      footLogo.parentNode.classList.toggle("has-logo", !!img);
    }

    logo.innerHTML = img
      ? `<img class="logo__img" src="${esc(img)}" alt="${esc(C.clinic.name)}" />`
      : `<span class="logo__mark">${esc(C.clinic.monogram)}</span>
         <span class="logo__text">
           <span class="logo__name">${esc(C.clinic.name)}</span>
           <span class="logo__sub">${esc(t(C.clinic.subtitle))}</span>
         </span>`;
  }

  // 4.2.1 — لوجوهات العيادات الـ3 في البنر (على اليمين جنب الكلام) ← clinic.brands
  //   جوه إطار على شكل قوس (Arch): الأول فوق، وتحته العنوان الصغير (brandsLabel)، وتحته الاتنين التانيين جنب بعض
  function renderBrands() {
    const box = $("#hero-brands");
    if (!box) return;
    const brands = C.clinic.brands || [];
    box.hidden = !brands.length;
    if (!brands.length) return;
    const theme = root.getAttribute("data-theme") || "dark";
    const brandImg = (b) => `<img class="brands__img" src="${esc(b[theme] || b.dark)}" alt="${esc(b.name)}" />`;
    const [top, ...bottom] = brands;
    const label = t(C.clinic.brandsLabel);
    box.innerHTML = `
      <div class="brands__arch">
        <div class="brands__top">${brandImg(top)}</div>
        ${label ? `<div class="brands__label"><span>${esc(label)}</span></div>` : ""}
        <div class="brands__bottom">${bottom.map(brandImg).join("")}</div>
      </div>`;
  }

  // 4.3 — القائمة العلوية + قائمة الموبايل
  function renderNav() {
    const desktop = C.nav.map((item) => {
      if (item.children) {
        return `<div class="dropdown">
          <button type="button" class="nav__link dropdown__toggle" aria-expanded="false" aria-haspopup="true">
            <span>${esc(t(item.label))}</span>${icon("expand_more")}
          </button>
          <div class="dropdown__menu" role="menu">
            ${item.children.map((c) => `<a role="menuitem" class="dropdown__item" href="${esc(c.href)}"><span>${esc(t(c.label))}</span>${icon("arrow_forward")}</a>`).join("")}
          </div>
        </div>`;
      }
      return `<a class="nav__link" href="${esc(item.href)}">${esc(t(item.label))}</a>`;
    }).join("");
    $("#nav-list").innerHTML = desktop;

    const mobile = C.nav.map((item) => {
      if (item.children) {
        return item.children.map((c) => `<a class="mobile-menu__link mobile-menu__sub" href="${esc(c.href)}"><span>${esc(t(item.label))} · ${esc(t(c.label))}</span>${icon("arrow_forward", "icon--flip")}</a>`).join("");
      }
      return `<a class="mobile-menu__link" href="${esc(item.href)}"><span>${esc(t(item.label))}</span>${icon("arrow_forward", "icon--flip")}</a>`;
    }).join("");
    $("#mobile-nav-list").innerHTML = mobile;
  }

  // 4.4 — شريط الأرقام
  function renderStats() {
    $("#stats-list").innerHTML = C.hero.stats.map((s) => `
      <div class="stat">
        <span class="stat__num" data-count="${Number(s.count)}" data-prefix="${esc(s.prefix || "")}" data-suffix="${esc(s.suffix || "")}">${esc(s.prefix || "")}${formatNumber(s.count)}${esc(s.suffix || "")}</span>
        <span class="stat__label">${esc(t(s.label))}</span>
      </div>`).join("");
  }

  // 4.4.1 — الشريط المتحرك ← أسماء العيادات (عناوين clinics.items) بتلف علطول
  function renderTicker() {
    const track = $("#ticker-list");
    if (!track) return;
    const words = (C.clinics.items || []).map((c) => t(c.title)).filter(Boolean);
    track.parentNode.hidden = !words.length;
    if (!words.length) return;
    // بنكرر الأسماء لحد ما تملا شاشة عريضة، وبعدين نسختين ورا بعض ← لف من غير نهاية
    let set = words.slice();
    while (set.join("").length < 200) set = set.concat(words);
    const html = set.map((w) => `<span class="ticker__item">${esc(w)}</span><span class="ticker__sep"></span>`).join("");
    track.innerHTML = html + html;
    track.style.setProperty("--ticker-duration", `${Math.round(set.join("").length * 0.28)}s`);
  }

  // 4.5 — نقاط الثقة في "عن العيادة"
  function renderAbout() {
    $("#about-points").innerHTML = C.about.points.map((p) => `
      <div class="trust">
        <span class="icon-circle icon-circle--sm">${icon(p.icon)}</span>
        <div>
          <h4 class="trust__title">${esc(t(p.title))}</h4>
          <p class="trust__text">${esc(t(p.text))}</p>
        </div>
      </div>`).join("");
  }

  // 4.6 — كروت العيادات
  function renderClinics() {
    $("#clinics-list").innerHTML = C.clinics.items.map((c) => {
      const classes = ["card", "clinic-card", "reveal"];
      if (c.wide) classes.push("clinic-card--wide");
      if (c.featured) classes.push("clinic-card--featured");

      const points = (c.points || []).map((p) =>
        c.twoColumns
          ? `<li>${icon("check_circle")}<span>${esc(t(p))}</span></li>`
          : `<li><span class="dot"></span><span>${esc(t(p))}</span></li>`
      ).join("");

      let foot;
      if (c.buttonText) {
        foot = `<a class="btn btn--soft" href="#booking">${esc(t(c.buttonText))}</a>`;
      } else {
        foot = `<a class="text-link" href="#booking"><span>${esc(t(c.linkText))}</span>${icon("arrow_forward")}</a>`
             + (c.footnote ? `<span class="clinic-card__note">${esc(t(c.footnote))}</span>` : "");
      }

      return `<article class="${classes.join(" ")}" id="clinic-${esc(c.id)}">
        ${c.wide ? '<div class="clinic-card__glow"></div>' : ""}
        <span class="clinic-card__mark" aria-hidden="true">${icon(c.icon)}</span>
        <div class="clinic-card__body">
          <div class="clinic-card__top">
            <span class="badge ${c.featured ? "badge--solid" : ""}">${esc(t(c.badge))}</span>
            <span class="icon-circle">${icon(c.icon)}</span>
          </div>
          <div>
            <h3 class="clinic-card__title">${esc(t(c.title))}</h3>
            <p class="clinic-card__text">${esc(t(c.text))}</p>
          </div>
          <ul class="clinic-card__points ${c.twoColumns ? "clinic-card__points--two" : ""}">${points}</ul>
        </div>
        <div class="clinic-card__foot">${foot}</div>
      </article>`;
    }).join("");
  }

  // 4.7 — لماذا نحن
  function renderWhy() {
    // حجم الخط بيتظبط أوتوماتيك عشان الكلام يكمّل الدايرة بالظبط (طول الدايرة ≈ 230)
    const seal = $("#seal-text");
    const sealText = seal.parentNode;
    seal.textContent = t(C.why.sealText) + " ";
    const fitSeal = () => {
      sealText.style.fontSize = "";
      const len = sealText.getComputedTextLength();
      if (!len) return;
      const size = parseFloat(getComputedStyle(sealText).fontSize);
      sealText.style.fontSize = Math.min(12, (size * 226) / len) + "px";
    };
    fitSeal();
    if (document.fonts) document.fonts.ready.then(fitSeal);
    $("#why-features").innerHTML = C.why.features.map((f) => `
      <div class="feature">
        ${icon(f.icon)}
        <h4 class="feature__title">${esc(t(f.title))}</h4>
        <p class="feature__text">${esc(t(f.text))}</p>
      </div>`).join("");
    $("#why-tags").innerHTML = C.why.tags.map((tag) =>
      `<span class="why__tag">${icon(tag.icon)}<span>${esc(t(tag.text))}</span></span>`).join("");
  }

  // 4.7.1 — جولة في العيادة: صور المكان في شبكة (الأولى كبيرة) ← tour.items
  //   لما الزائر يدوس على صورة بتكبر (Lightbox)، والصور الناقصة بيظهر مكانها خلفية ذهبية
  function renderTour() {
    const box = $("#tour-list");
    if (!box || !C.tour) return;
    // رقم الصورة: 01، 02 بالإنجليزي و ١، ٢ بالعربي (الصفر العربي شكله نقطة فبنشيله)
    const num = (i) => lang === "ar" ? (i + 1).toLocaleString("ar-EG") : String(i + 1).padStart(2, "0");
    box.innerHTML = (C.tour.items || []).map((p, i) => {
      const cap = t(p.caption);
      return `<a class="tour__item reveal glightbox" href="${esc(p.image || "")}" data-gallery="tour"
           data-title="${esc(cap)}" aria-label="${esc(t(C.ui.viewImage))}: ${esc(cap)}">
          <span class="tour__img" data-src="${esc(p.image || "")}"></span>
          <span class="tour__caption"><span class="tour__num">${num(i)}</span><span class="tour__name">${esc(cap)}</span></span>
          <span class="tour__zoom">${icon("zoom_in")}</span>
        </a>`;
    }).join("");
    applyBgs(box);
  }

  // 4.8 — فريقنا: شريط كروت بيلف علطول (marquee)
  //   الفكرة: بنكرر الكروت لحد ما تملا الشاشة، وبعدين بنكرر المجموعة كلها مرة كمان،
  //   والـ CSS بيحرك الشريط نص طوله ويرجع من الأول ← فبيبان كأنه بيلف من غير نهاية
  function renderDoctors() {
    const items = C.doctors.items || [];
    // أول حرفين من الاسم الإنجليزي (من غير Dr.) ← بيظهروا مكان الصورة لحد ما تتحط
    const initials = (d) => String((d.name && d.name.en) || t(d.name))
      .replace(/^(dr|doctor)\.?\s+/i, "").split(/\s+/).filter(Boolean)
      .slice(0, 2).map((w) => w[0].toUpperCase()).join("");
    const card = (d, copy) => `<article class="doctor"${copy ? ' aria-hidden="true"' : ""}>
        <div class="doctor__photo" data-src="${esc(d.image || "")}">
          <span class="doctor__monogram" aria-hidden="true">${esc(initials(d))}</span>
          ${d.badge ? `<span class="doctor__badge">${esc(t(d.badge))}</span>` : ""}
        </div>
        <div class="doctor__info">
          <h3 class="doctor__name">${esc(t(d.name))}</h3>
          <p class="doctor__role">${esc(t(d.role))}</p>
        </div>
      </article>`;

    // لو الفريق صغير بنكرره لحد 8 كروت على الأقل عشان الشريط ميبقاش فيه فراغ
    let set = items.slice();
    while (set.length && set.length < 8) set = set.concat(items);

    const track = $("#doctors-list");
    track.innerHTML = set.map((d, i) => card(d, i >= items.length)).join("")
                    + set.map((d) => card(d, true)).join("");
    track.style.setProperty("--marquee-duration", `${set.length * (C.doctors.speed || 6)}s`);
    applyBgs(track);
  }

  // 4.9 — المعرض
  function renderGallery() {
    $("#gallery-list").innerHTML = C.gallery.items.map((g) => `
      <article class="card case reveal">
        <a class="case__media glightbox" href="${esc(g.image)}" data-gallery="cases"
           data-title="${esc(t(g.title))}" data-description="${esc(t(g.text))}" aria-label="${esc(t(C.ui.viewImage))}: ${esc(t(g.title))}">
          <span class="case__img" data-src="${esc(g.image || "")}"></span>
          ${g.tag ? `<span class="case__tag">${esc(t(g.tag))}</span>` : ""}
          ${g.badge ? `<span class="case__badge">${esc(t(g.badge))}</span>` : ""}
          <span class="case__zoom">${icon("zoom_in")}</span>
        </a>
        <div class="case__body">
          <div class="case__head">
            <h3 class="case__title">${esc(t(g.title))}</h3>
            ${g.meta ? `<span class="case__meta">${esc(t(g.meta))}</span>` : ""}
          </div>
          <p class="case__text">${esc(t(g.text))}</p>
        </div>
      </article>`).join("");
    applyBgs($("#gallery-list"));
  }

  // 4.10 — آراء العملاء
  function renderTestimonials() {
    $("#testimonials-list").innerHTML = C.testimonials.items.map((r) => `
      <div class="swiper-slide">
        <div class="card review">
          <div>
            <div class="review__stars" aria-label="${r.stars || 5}/5">${icon("star").repeat(r.stars || 5)}</div>
            <p class="review__text">“${esc(t(r.text))}”</p>
          </div>
          <div class="review__foot">
            <span class="review__name">${esc(t(r.name))}</span>
            <span class="review__info">${esc(t(r.info))}</span>
          </div>
        </div>
      </div>`).join("");
  }

  // 4.11 — الفوتر
  function renderFooter() {
    const waUrl = whatsappUrl("");
    const socials = (C.clinic.social || []).filter((s) => s.url && SOCIAL_ICONS[s.icon]).map((s) =>
      `<a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.icon)}"><svg viewBox="0 0 24 24" fill="currentColor">${SOCIAL_ICONS[s.icon]}</svg></a>`).join("");
    $("#footer-icons").innerHTML =
      `<a href="${esc(C.clinic.mapsUrl || "#")}" target="_blank" rel="noopener" aria-label="Location">${icon("location_on")}</a>
       <a href="mailto:${esc(C.clinic.email)}" aria-label="Email">${icon("mail")}</a>
       <a href="tel:${esc(C.clinic.phoneLink)}" aria-label="Call">${icon("call")}</a>
       <a href="${waUrl}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon("chat")}</a>` + socials;

    $("#hours-list").innerHTML = C.clinic.hours.list.map((h) =>
      `<div><span class="hours__days">${esc(t(h.days))}</span><span>${esc(t(h.time))}</span></div>`).join("");

    $("#footer-links").innerHTML = C.footer.links.map((l) =>
      `<a href="${esc(l.href)}">${icon("arrow_right_alt")}<span>${esc(t(l.label))}</span></a>`).join("");

    const wa = $("#wa-float");
    wa.hidden = !C.settings.showWhatsappButton;
    wa.href = whatsappUrl(t(C.ui.whatsappRemoteMsg));
    const barWa = $("#mobile-bar-wa");
    if (barWa) barWa.href = wa.href;  // زرار الواتساب في شريط الموبايل
  }

  // 4.12 — قائمة التخصصات في فورم الحجز
  function renderBookingOptions() {
    const select = $("#dept-select");
    const current = select.selectedIndex;
    select.innerHTML = C.booking.departments.map((d, i) => `<option value="${i}">${esc(t(d))}</option>`).join("");
    if (current > 0) select.selectedIndex = current;
    renderCalendar();
  }

  function renderAll() {
    renderTexts();
    renderLogo();
    renderNav();
    renderStats();
    renderTicker();
    renderAbout();
    renderClinics();
    renderWhy();
    renderTour();
    renderDoctors();
    renderGallery();
    renderTestimonials();
    renderFooter();
    renderBookingOptions();
    initDropdowns();
    initReveal();
    initCounters();
    initSwiper();
    initLightbox();
    initActiveNav();
  }


  // ============================================================
  // 5) القائمة والـ Dropdown وقائمة الموبايل
  // ============================================================

  // الـ Dropdown: بيفتح بالضغط (للموبايل والتابلت) وبالماوس (للكمبيوتر)
  function initDropdowns() {
    $$(".dropdown").forEach((dd) => {
      const toggle = $(".dropdown__toggle", dd);
      toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const open = !dd.classList.contains("is-open");
        closeDropdowns();
        dd.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", open);
      });
      $$(".dropdown__item", dd).forEach((a) => a.addEventListener("click", closeDropdowns));
    });
  }
  function closeDropdowns() {
    $$(".dropdown.is-open").forEach((dd) => {
      dd.classList.remove("is-open");
      $(".dropdown__toggle", dd).setAttribute("aria-expanded", "false");
    });
  }

  // قائمة الموبايل
  function initMobileMenu() {
    const burger = $("#burger");
    const menu = $("#mobile-menu");
    const setOpen = (open) => {
      burger.setAttribute("aria-expanded", open);
      menu.hidden = !open;
      document.body.style.overflow = open ? "hidden" : "";
    };
    burger.addEventListener("click", () => setOpen(menu.hidden));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    window.addEventListener("resize", () => { if (window.innerWidth >= 1200 && !menu.hidden) setOpen(false); });
  }

  // الهيدر: شفاف فوق البنر، وبياخد خلفية أول ما الزائر ينزل بالصفحة
  // + خط ذهبي رفيع تحته بيطول مع النزول (بيوضح الزائر وصل لفين في الصفحة)
  function initHeaderScroll() {
    const header = $("#site-header");
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      header.classList.toggle("is-scrolled", window.scrollY > 24);
      header.style.setProperty("--scroll", max > 0 ? Math.min(window.scrollY / max, 1).toFixed(4) : "0");
    };
    update();
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  }

  // البنر: القوس بيتحرك حركة بسيطة عكس الماوس (على الكمبيوتر بس) ← إحساس بالعمق
  function initHeroParallax() {
    const hero = $(".hero"), brands = $("#hero-brands");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hero || !brands || !fine || reduce) return;
    let raf;
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { brands.style.setProperty("--px", x.toFixed(3)); brands.style.setProperty("--py", y.toFixed(3)); });
    });
    hero.addEventListener("pointerleave", () => { brands.style.setProperty("--px", "0"); brands.style.setProperty("--py", "0"); });
  }

  // تبديل الوضع الفاتح/الغامق: الوضع الجديد بيظهر في دايرة بتكبر من مكان الزرار
  // (في المتصفحات اللي بتدعم View Transitions، وفي الباقي بيتغير عادي)
  function toggleTheme(e) {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) { applyTheme(next); return; }
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const vt = document.startViewTransition(() => applyTheme(next));
    vt.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(.2,.7,.2,1)", pseudoElement: "::view-transition-new(root)" }
      );
    }).catch(() => {});
  }

  // تلوين رابط القسم اللي الزائر واقف عنده
  let navObserver;
  function initActiveNav() {
    if (navObserver) navObserver.disconnect();
    const links = $$(".nav > .nav__link");
    const map = new Map(links.map((a) => [a.getAttribute("href"), a]));
    navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const link = map.get("#" + entry.target.id);
        if (!link) return;
        links.forEach((l) => l.classList.remove("is-active"));
        link.classList.add("is-active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id], footer[id]").forEach((s) => navObserver.observe(s));
  }


  // ============================================================
  // 6) العدادات وحركة الظهور
  // ============================================================
  let revealObserver;
  function initReveal() {
    if (revealObserver) revealObserver.disconnect();
    if (!("IntersectionObserver" in window)) { $$(".reveal").forEach((el) => el.classList.add("is-visible")); return; }
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        el.classList.add("is-visible");
        revealObserver.unobserve(el);
        // بعد ما الحركة تخلص بنشيل كلاس الظهور عشان حركات الماوس (hover) ترجع سريعة زي ما هي
        const delay = parseFloat(el.style.getPropertyValue("--reveal-delay")) || 0;
        setTimeout(() => { el.classList.remove("reveal", "is-visible"); el.style.removeProperty("--reveal-delay"); }, (delay + 0.9) * 1000);
      });
    }, { threshold: 0.12 });
    $$(".reveal:not(.is-visible)").forEach((el) => {
      // الكروت اللي جنب بعض بتظهر ورا بعض بفرق بسيط (مش كلهم مرة واحدة)
      const sibs = $$(":scope > .reveal", el.parentElement);
      if (sibs.length > 1) el.style.setProperty("--reveal-delay", `${Math.min(sibs.indexOf(el), 5) * 0.09}s`);
      revealObserver.observe(el);
    });
  }

  // العداد بيبدأ من صفر لحد الرقم أول ما الشريط يظهر
  let countersDone = false;
  function initCounters() {
    const nums = $$(".stat__num");
    if (countersDone || !("IntersectionObserver" in window)) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obs = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      obs.disconnect();
      countersDone = true;
      if (reduce) return;
      nums.forEach((el) => {
        const target = +el.dataset.count, pre = el.dataset.prefix, suf = el.dataset.suffix;
        const start = performance.now(), dur = 1800;
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = pre + formatNumber(Math.round(target * eased)) + suf;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    obs.observe($("#stats-list"));
  }


  // ============================================================
  // 7) الحجز
  // ============================================================
  function whatsappUrl(message) {
    return `https://wa.me/${C.clinic.whatsapp}` + (message ? `?text=${encodeURIComponent(message)}` : "");
  }

  // التابات (أونلاين / في العيادة)
  function initTabs() {
    $$(".tabs__btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        $$(".tabs__btn").forEach((b) => { b.classList.toggle("is-active", b === btn); b.setAttribute("aria-selected", b === btn); });
        $$(".tab-panel").forEach((p) => (p.hidden = p.dataset.panel !== btn.dataset.tab));
      });
    });
    // أي زرار حجز في الصفحة بيرجع لتاب الأونلاين (إلا زرار كارت مميز فيه buttonText بيفتح زيارة العيادة)
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href="#booking"]');
      if (!a) return;
      const tab = a.classList.contains("btn--soft") ? "clinic" : null;
      if (tab) $(`.tabs__btn[data-tab="${tab}"]`).click();
    });
  }

  // تقويم Google Appointment Schedule
  function renderCalendar() {
    const box = $("#calendar-embed");
    const url = (C.booking.googleCalendarUrl || "").trim();
    $("#remote-note").hidden = !url; // سطر "اختار الميعاد" بيظهر بس لما التقويم موجود
    if (url) {
      // ?gv=true بيخلي جوجل يعرض نسخة مخصوصة للتضمين جوه المواقع
      const src = url + (url.includes("?") ? "&" : "?") + "gv=true";
      if (!box.querySelector("iframe")) {
        box.innerHTML = `<iframe class="calendar-frame" src="${esc(src)}" title="Google Calendar Appointment Scheduling" loading="lazy"></iframe>`;
      }
    } else {
      console.info("ℹ️ ضيف لينك Google Appointment Schedule في clinic-config.js ← booking.googleCalendarUrl");
      box.innerHTML = `<div class="calendar-fallback">
        ${icon("event_available")}
        <p>${esc(t(C.booking.remoteFallback))}</p>
        <a class="btn btn--gold" href="${whatsappUrl(t(C.ui.whatsappRemoteMsg))}" target="_blank" rel="noopener">${icon("chat")}<span>${esc(t(C.ui.whatsappFallbackBtn))}</span></a>
      </div>`;
    }
  }

  // فورم زيارة العيادة ← بيفتح واتساب برسالة جاهزة
  function initClinicForm() {
    const form = $("#clinic-form");
    const dateInput = form.elements.date;
    dateInput.min = new Date().toISOString().split("T")[0]; // مينفعش يختار يوم فات

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      ["name", "phone", "date"].forEach((n) => {
        const el = form.elements[n];
        const bad = !el.value.trim();
        el.classList.toggle("is-invalid", bad);
        if (bad && ok) { el.focus(); ok = false; }
      });
      if (!ok) return;

      const f = form.elements;
      const lines = [
        t(C.ui.whatsappGreeting),
        `• ${t(C.ui.labelDept)}: ${t(C.booking.departments[f.dept.value])}`,
        `• ${t(C.ui.labelName)}: ${f.name.value.trim()}`,
        `• ${t(C.ui.labelPhone)}: ${f.phone.value.trim()}`,
        `• ${t(C.ui.labelDate)}: ${f.date.value}`,
        `• ${t(C.ui.labelTime)}: ${t(C.ui[f.time.value])}`
      ];
      if (f.notes.value.trim()) lines.push(`• ${t(C.ui.labelNotes)}: ${f.notes.value.trim()}`);
      window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener");
    });
    form.addEventListener("input", (e) => e.target.classList.remove("is-invalid"));
  }


  // ============================================================
  // 8) السلايدر (آراء العملاء) والمعرض (تكبير الصور)
  // ============================================================
  let swiper;
  function initSwiper() {
    if (typeof Swiper === "undefined") return;
    if (swiper) swiper.destroy(true, true);
    swiper = new Swiper(".testimonials-swiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      grabCursor: true,
      autoplay: { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true },
      navigation: { prevEl: "#t-prev", nextEl: "#t-next" },
      pagination: { el: "#t-pagination", clickable: true },
      breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });
  }

  let lightbox;
  function initLightbox() {
    if (typeof GLightbox === "undefined") return;
    if (lightbox) lightbox.destroy();
    lightbox = GLightbox({ selector: ".glightbox", touchNavigation: true, loop: true });
  }


  // ============================================================
  // 9) التشغيل
  // ============================================================
  function init() {
    // الوضع: المحفوظ ← وإلا الافتراضي من الكونفج (غامق)
    applyTheme(safeGet("ol-theme") || C.settings.defaultTheme || "dark");
    applyLang(lang, false);
    renderAll();

    initMobileMenu();
    initHeaderScroll();
    initHeroParallax();
    initTabs();
    initClinicForm();

    $("#theme-toggle").addEventListener("click", toggleTheme);
    $$("[data-lang-btn]").forEach((b) => b.addEventListener("click", () => { if (b.dataset.langBtn !== lang) applyLang(b.dataset.langBtn); }));

    // قفل الـ Dropdown لما تدوس برا أو تدوس Esc
    document.addEventListener("click", (e) => { if (!e.target.closest(".dropdown")) closeDropdowns(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDropdowns(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
