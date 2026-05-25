/**
 * KZ Campus - EdTech Web Application Controller
 * Powered by Keezenix Global
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  initNavigation();
  initRouting();
  initTestimonialSlider();
  initCourseSystem();
  initInternshipSystem();
  initContactSystem();
  initNewsletter();
});

/* ==========================================================================
   ROUTING & SCROLL ACTIONS
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('main-navbar');
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  // Change navbar appearance on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Hamburger Toggle
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navMenu.classList.toggle('mobile-open');
  });

  // Close mobile menu when clicking a nav link
  navMenu.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-item')) {
      menuToggle.classList.remove('open');
      navMenu.classList.remove('mobile-open');
    }
  });
}

function initRouting() {
  const views = document.querySelectorAll('.page-view');
  const navLinks = document.querySelectorAll('.nav-item');

  function handleRoute() {
    let hash = window.location.hash.substring(1) || 'home';
    
    // Simple routing matching
    let targetView = document.getElementById(`${hash}-view`);
    if (!targetView) {
      hash = 'home';
      targetView = document.getElementById('home-view');
    }

    // Toggle active view
    views.forEach(view => {
      view.classList.remove('active');
    });
    targetView.classList.add('active');

    // Highlight active nav item
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-page') === hash) {
        link.classList.add('active');
      }
    });

    // Scroll to top of page on navigation
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Listen for hash change and page load
  window.addEventListener('hashchange', handleRoute);
  handleRoute(); // Execute once on load
}

/* ==========================================================================
   ALUMNI TESTIMONIAL SLIDER
   ========================================================================== */
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('#testimonial-dots .dot');
  let currentSlide = 0;
  let sliderInterval;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  function startAutoplay() {
    sliderInterval = setInterval(nextSlide, 7000);
  }

  function resetAutoplay() {
    clearInterval(sliderInterval);
    startAutoplay();
  }

  // Dots click handler
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const index = parseInt(dot.getAttribute('data-goto'));
      showSlide(index);
      resetAutoplay();
    });
  });

  // Start autoplay immediately
  startAutoplay();
}

/* ==========================================================================
   COURSES SYSTEM (SYLLABUS DATA, MODAL, FILTERS & SEARCH)
   ========================================================================== */
const COURSE_DATABASE = {
  'fullstack-dev': {
    title: 'Full Stack Development',
    short: {
      desc: 'A fast-paced 4–5 week intensive covering the core essentials of full-stack web development. You will build and deploy a complete web application from scratch using modern tools.',
      fee: '₹ 8,999',
      feeRaw: 8999,
      modules: [
        { num: 'Week 1', title: 'HTML, CSS & JavaScript Essentials', details: 'Deep dive into semantic HTML5, responsive CSS Flexbox/Grid, and ES6+ JavaScript fundamentals.' },
        { num: 'Week 2', title: 'React & Component Architecture', details: 'Build interactive UIs with React, manage state with hooks, and handle routing with React Router.' },
        { num: 'Week 3', title: 'Node.js & REST API Basics', details: 'Create a backend with Node.js and Express, design RESTful endpoints, and handle JWT authentication.' },
        { num: 'Week 4', title: 'Database Integration & Deployment', details: 'Connect to MongoDB/PostgreSQL, containerize with Docker, and deploy to cloud platforms.' }
      ]
    },
    long: {
      desc: 'A comprehensive 4–5 month cohort transforming you into a full-stack architect capable of building, scaling, and deploying enterprise-grade web applications end-to-end.',
      fee: '₹ 29,999',
      feeRaw: 29999,
      modules: [
        { num: 'Month 1', title: 'Advanced Frontend & Frameworks', details: 'Deep dive into ES6+, DOM mechanics, React components, state management with Redux/Zustand, and complex layout systems.' },
        { num: 'Month 2', title: 'Server-Side Architecture & GraphQL', details: 'Build scalable APIs with Node.js, Express, GraphQL, JWT authentication, rate limiting, and role-based access control.' },
        { num: 'Month 3', title: 'Database Design, ORM & Caching', details: 'Design schemas with PostgreSQL, master Prisma ORM, implement Redis caching, and optimize complex queries.' },
        { num: 'Month 4', title: 'Testing, DevOps & Cloud Deployment', details: 'Write unit/integration tests, build CI/CD pipelines with GitHub Actions, Dockerize services, and deploy on AWS EC2.' },
        { num: 'Month 5', title: 'Capstone Project & Career Prep', details: 'Build a production-grade full-stack project, code review sessions, portfolio polishing, and mock interviews.' }
      ]
    }
  },
  'fullstack-ai': {
    title: 'Full Stack AI Engineering',
    short: {
      desc: 'An intensive 4–5 week bootcamp covering the practical foundations of AI/ML engineering, from Python ML libraries to deploying a simple model as a web API.',
      fee: '₹ 9,999',
      feeRaw: 9999,
      modules: [
        { num: 'Week 1', title: 'Python for AI & Data Wrangling', details: 'NumPy, Pandas, data cleaning, feature engineering, and exploratory data analysis with Matplotlib/Seaborn.' },
        { num: 'Week 2', title: 'Machine Learning Fundamentals', details: 'Supervised/unsupervised learning, scikit-learn pipelines, model evaluation, and cross-validation techniques.' },
        { num: 'Week 3', title: 'Neural Networks & Deep Learning Basics', details: 'Build feedforward networks with PyTorch, understand backpropagation, and train CNNs on image datasets.' },
        { num: 'Week 4', title: 'Model Deployment as a Web API', details: 'Wrap trained models in FastAPI, containerize with Docker, and host on cloud for live inference.' }
      ]
    },
    long: {
      desc: 'A rigorous 4–5 month program covering the full AI engineering lifecycle — from deep learning theory and LLMs to building production-grade AI-powered web products.',
      fee: '₹ 34,999',
      feeRaw: 34999,
      modules: [
        { num: 'Month 1', title: 'Foundations of Deep Learning', details: 'Linear algebra, gradient descent, CNNs, RNNs, PyTorch framework, and training optimization techniques.' },
        { num: 'Month 2', title: 'NLP & Transformer Architecture', details: 'Tokenization, attention mechanisms, BERT/GPT variants, and fine-tuning with HuggingFace libraries.' },
        { num: 'Month 3', title: 'Generative AI & LLM Fine-Tuning', details: 'Retrieval Augmented Generation (RAG), vector databases, LoRA fine-tuning, and prompt engineering.' },
        { num: 'Month 4', title: 'MLOps & Inference at Scale', details: 'Triton Inference Server, containerized model APIs, quantization, drift monitoring, and automated retraining pipelines.' },
        { num: 'Month 5', title: 'AI-Powered Full Stack Product', details: 'Build a complete AI product integrating React frontend, FastAPI backend, and a deployed LLM — end to end.' }
      ]
    }
  },
  'python-auto': {
    title: 'Python Automation Engineer',
    short: {
      desc: 'A focused 4–5 week crash course turning you into a practical Python automator. Eliminate repetitive tasks, scrape data, and automate workflows with real scripts.',
      fee: '₹ 6,999',
      feeRaw: 6999,
      modules: [
        { num: 'Week 1', title: 'Python Core & File System Automation', details: 'Script shell commands, automate file/folder management, handle exceptions, and work with OS and pathlib libraries.' },
        { num: 'Week 2', title: 'Web Scraping with BeautifulSoup & Playwright', details: 'Extract structured data from websites, handle dynamic pages, bypass pagination, and store results in CSV/JSON.' },
        { num: 'Week 3', title: 'API Integrations & Webhooks', details: 'Connect Python scripts to Slack, Google Sheets, Stripe, and internal APIs. Build webhook listeners.' },
        { num: 'Week 4', title: 'Scheduling & QA Automation', details: 'Set up Cron jobs, write PyTest suites, and build alert systems for script failures.' }
      ]
    },
    long: {
      desc: 'A thorough 4–5 month program building professional Python automation engineers who can design, deploy, and maintain end-to-end automation ecosystems at scale.',
      fee: '₹ 24,999',
      feeRaw: 24999,
      modules: [
        { num: 'Month 1', title: 'Python Engine & Operating Systems', details: 'Automate file management, script shell controls, configure concurrency threads, and handle custom exception tracking.' },
        { num: 'Month 2', title: 'Web Scraping & Browser Automation', details: 'Advanced BeautifulSoup, Scrapy pipelines, Playwright for SPAs, anti-bot bypass strategies, and proxy rotation.' },
        { num: 'Month 3', title: 'API Bridges & Data Pipelines', details: 'Synchronize data between HubSpot, Stripe, Slack, Google Sheets using webhooks, REST APIs, and message queues.' },
        { num: 'Month 4', title: 'Testing, Monitoring & Reliability', details: 'PyTest advanced patterns, Hypothesis testing, real-time monitoring dashboards, and self-healing script architectures.' },
        { num: 'Month 5', title: 'Automation Portfolio & Deployment', details: 'Package automations as CLI tools, schedule on cloud servers (AWS Lambda / GCP Cloud Run), and build a live portfolio.' }
      ]
    }
  },
  'growth-eng': {
    title: 'Growth Engineering Cohort',
    short: {
      desc: 'A practical 4–5 week bootcamp covering the core intersections of software engineering and growth marketing — analytics setup, SEO basics, and A/B testing.',
      fee: '₹ 7,499',
      feeRaw: 7499,
      modules: [
        { num: 'Week 1', title: 'Analytics Tracking & Tag Managers', details: 'Set up Google Analytics 4, configure GTM tags/triggers, and track custom events across user journeys.' },
        { num: 'Week 2', title: 'Technical SEO Fundamentals', details: 'Implement structured data, optimize Core Web Vitals, manage robots.txt/sitemaps, and audit with tools.' },
        { num: 'Week 3', title: 'A/B Testing & Feature Flags', details: 'Design controlled experiments, implement feature flags, run split tests, and interpret statistical results.' },
        { num: 'Week 4', title: 'CRM Integration & Growth Loops', details: 'Sync event data to HubSpot/Segment, build referral loops, and automate lifecycle email triggers.' }
      ]
    },
    long: {
      desc: 'A comprehensive 4–5 month program building elite growth engineers who code the full analytics, experimentation, and data pipeline stack powering high-growth products.',
      fee: '₹ 26,999',
      feeRaw: 26999,
      modules: [
        { num: 'Month 1', title: 'Analytics Telemetry & Tag Management', details: 'Configure GTM with server-side containers, manage consent modes, track complex funnel events, and audit data layers.' },
        { num: 'Month 2', title: 'Technical SEO & Rendering Engineering', details: 'Schema markups, Next.js SSR/ISR, Core Web Vitals optimization, international SEO, and structured data testing.' },
        { num: 'Month 3', title: 'Experimentation & A/B Engine Design', details: 'Feature flag systems, multi-variate tests, Bayesian stats, sequential testing, and guardrail metrics.' },
        { num: 'Month 4', title: 'CRM Data Pipelines & Attribution', details: 'Event streaming via Segment, building custom attribution models, Kafka pipelines, and BI dashboard creation.' },
        { num: 'Month 5', title: 'Growth Systems Capstone', details: 'Build a full-stack growth instrumentation system from tracking to experimentation to reporting for a live product.' }
      ]
    }
  },
  'rust-prog': {
    title: 'Systems Programming in Rust',
    short: {
      desc: 'An intensive 4–5 week introduction to Rust — covering ownership, the borrow checker, safe concurrency, and building your first real systems-level program.',
      fee: '₹ 8,499',
      feeRaw: 8499,
      modules: [
        { num: 'Week 1', title: 'Rust Fundamentals & Ownership', details: 'Variables, data types, ownership rules, borrowing, and lifetimes — the foundation of Rust memory safety.' },
        { num: 'Week 2', title: 'Structs, Enums, Traits & Generics', details: 'Build custom types, implement traits for polymorphism, use generics, and leverage the powerful Option/Result enum.' },
        { num: 'Week 3', title: 'Error Handling & Collections', details: 'Master idiomatic error propagation with ?, iterators, closures, and the standard collection library.' },
        { num: 'Week 4', title: 'Concurrency & CLI Project Build', details: 'Spawn threads, share data with Arc/Mutex, and build a complete CLI application to add to your portfolio.' }
      ]
    },
    long: {
      desc: 'A rigorous 4–5 month deep-dive into systems programming with Rust — covering advanced memory management, async concurrency, WebAssembly, and real-world backend services.',
      fee: '₹ 27,999',
      feeRaw: 27999,
      modules: [
        { num: 'Month 1', title: 'Ownership, Borrowing & Memory Model', details: 'Compiler mechanics, stack vs heap, reference lifetimes, smart pointers (Box, Rc, Arc), and unsafe Rust introduction.' },
        { num: 'Month 2', title: 'Custom Types, Traits & Macros', details: 'Struct composition, rich enums, trait objects, derive macros, procedural macros, and the newtype pattern.' },
        { num: 'Month 3', title: 'Async Rust & Safe Concurrency', details: 'Tokio runtime, async/await patterns, Mutex/RwLock, message passing with channels, and rayon data parallelism.' },
        { num: 'Month 4', title: 'Web Servers, WASM & FFI', details: 'Build REST APIs with Axum/Actix, compile to WebAssembly for the browser, and interface with C via FFI.' },
        { num: 'Month 5', title: 'Systems Project & Open Source Contribution', details: 'Design and ship a production Rust crate, write comprehensive documentation, publish to crates.io, and contribute to an open-source project.' }
      ]
    }
  }
};

function initCourseSystem() {
  const searchBox = document.getElementById('course-search-box');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const courseCards = document.querySelectorAll('.course-card');

  // ── Detail Modal elements ──────────────────────────────────────────────
  const courseModal       = document.getElementById('course-details-modal');
  const closeCourseBtn    = document.getElementById('close-course-modal-btn');
  const modalCloseBtn     = document.getElementById('modal-syllabus-close-btn');
  const modalEnrollBtn    = document.getElementById('modal-enroll-now-btn');
  const mCourseTitle      = document.getElementById('modal-course-title');
  const mShortDesc        = document.getElementById('modal-short-desc');
  const mLongDesc         = document.getElementById('modal-long-desc');
  const mShortFee         = document.getElementById('modal-short-fee');
  const mLongFee          = document.getElementById('modal-long-fee');
  const mShortCurriculum  = document.getElementById('modal-short-curriculum');
  const mLongCurriculum   = document.getElementById('modal-long-curriculum');
  const tabShort          = document.getElementById('tab-short');
  const tabLong           = document.getElementById('tab-long');
  const panelShort        = document.getElementById('panel-short');
  const panelLong         = document.getElementById('panel-long');

  // ── Search & Filter ────────────────────────────────────────────────────
  function filterCourses() {
    const query          = searchBox.value.toLowerCase().trim();
    const activeCategory = document.querySelector('.filter-tab.active').getAttribute('data-filter');
    courseCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const keywords  = card.getAttribute('data-keywords');
      const title     = card.querySelector('h3').textContent.toLowerCase();
      const desc      = card.querySelector('p').textContent.toLowerCase();
      const matchesSearch   = title.includes(query) || desc.includes(query) || keywords.includes(query);
      const matchesCategory = activeCategory === 'all' || category === activeCategory;
      card.style.display = (matchesSearch && matchesCategory) ? 'flex' : 'none';
    });
  }

  searchBox.addEventListener('input', filterCourses);
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      filterCourses();
    });
  });

  // ── Helper: render curriculum list ────────────────────────────────────
  function renderModules(container, modules) {
    container.innerHTML = '';
    modules.forEach(mod => {
      const li = document.createElement('li');
      li.className = 'curriculum-item';
      li.innerHTML = `
        <div class="curriculum-item-header">
          <span>${mod.num}</span>${mod.title}
        </div>
        <div class="curriculum-item-body">${mod.details}</div>
      `;
      container.appendChild(li);
    });
  }

  // ── Plan Tab Switching inside detail modal ────────────────────────────
  function switchPlanTab(plan) {
    if (plan === 'short') {
      tabShort.classList.add('active');   tabLong.classList.remove('active');
      panelShort.style.display = '';      panelLong.style.display = 'none';
    } else {
      tabLong.classList.add('active');    tabShort.classList.remove('active');
      panelLong.style.display = '';       panelShort.style.display = 'none';
    }
  }

  tabShort.addEventListener('click', () => switchPlanTab('short'));
  tabLong.addEventListener('click',  () => switchPlanTab('long'));

  // ── Open detail modal ─────────────────────────────────────────────────
  let currentCourseId = null;

  function openDetailModal(courseId) {
    const data = COURSE_DATABASE[courseId];
    if (!data) return;
    currentCourseId = courseId;

    mCourseTitle.textContent = data.title;
    mShortDesc.textContent   = data.short.desc;
    mLongDesc.textContent    = data.long.desc;
    mShortFee.textContent    = data.short.fee;
    mLongFee.textContent     = data.long.fee;

    renderModules(mShortCurriculum, data.short.modules);
    renderModules(mLongCurriculum,  data.long.modules);

    // Reset to short tab
    switchPlanTab('short');

    courseModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function closeDetailModal() {
    courseModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Hook up event listeners to all course cards and buttons to open the detail popup modal
  courseCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      const btn = card.querySelector('.btn-view-course');
      if (!btn) return;
      
      e.preventDefault();
      const courseId = btn.getAttribute('data-course-id');
      openDetailModal(courseId);
    });
  });

  closeCourseBtn.addEventListener('click', closeDetailModal);
  modalCloseBtn.addEventListener('click',  closeDetailModal);
  courseModal.addEventListener('click', e => { if (e.target === courseModal) closeDetailModal(); });

  // ── Enroll Now: determine which plan tab is active, pass to payment modal
  modalEnrollBtn.addEventListener('click', () => {
    const activePlan = tabShort.classList.contains('active') ? 'short' : 'long';
    closeDetailModal();
    openEnrollmentModal(currentCourseId, activePlan);
  });

  // ── Initialize the payment/enrollment modal ───────────────────────────
  initEnrollmentModal();
}

function initEnrollmentModal() {
  const enrollModal      = document.getElementById('enrollment-modal');
  const closeBtn         = document.getElementById('close-enrollment-modal-btn');
  const enrollForm       = document.getElementById('enrollment-form');
  const labelText        = document.getElementById('enroll-course-label');
  const hiddenCourseId   = document.getElementById('enroll-course-id-hidden');
  const hiddenPlan       = document.getElementById('enroll-selected-plan');
  const priceShortEl     = document.getElementById('enroll-price-short');
  const priceLongEl      = document.getElementById('enroll-price-long');
  const summaryPlanName  = document.getElementById('summary-plan-name');
  const summaryPrice     = document.getElementById('summary-price');
  const radioShort       = document.getElementById('radio-short');
  const radioLong        = document.getElementById('radio-long');
  const cardShort        = document.getElementById('enroll-plan-short');
  const cardLong         = document.getElementById('enroll-plan-long');

  // Inputs
  const nameInput  = document.getElementById('enroll-name');
  const emailInput = document.getElementById('enroll-email');
  const phoneInput = document.getElementById('enroll-phone');
  const cardInput  = document.getElementById('enroll-card');
  const expInput   = document.getElementById('enroll-expiry');
  const cvvInput   = document.getElementById('enroll-cvv');

  // Error spans
  const nameError  = document.getElementById('enroll-name-error');
  const emailError = document.getElementById('enroll-email-error');
  const phoneError = document.getElementById('enroll-phone-error');
  const cardError  = document.getElementById('enroll-card-error');
  const expError   = document.getElementById('enroll-expiry-error');
  const cvvError   = document.getElementById('enroll-cvv-error');

  let currentData = null;

  // ── Update summary bar when plan radio changes ─────────────────────────
  function updateSummary() {
    if (!currentData) return;
    const isShort = radioShort.checked;
    hiddenPlan.value = isShort ? 'short' : 'long';
    summaryPlanName.textContent = isShort ? 'Short Term (4–5 Weeks)' : 'Long Term (4–5 Months)';
    summaryPrice.textContent    = isShort ? currentData.short.fee : currentData.long.fee;
    cardShort.classList.toggle('selected', isShort);
    cardLong.classList.toggle('selected',  !isShort);
  }

  radioShort.addEventListener('change', updateSummary);
  radioLong.addEventListener('change',  updateSummary);

  // ── Card number formatting (groups of 4) ──────────────────────────────
  cardInput.addEventListener('input', () => {
    let v = cardInput.value.replace(/\D/g, '').substring(0, 16);
    cardInput.value = v.replace(/(\d{4})(?=\d)/g, '$1 ');
  });

  // ── Expiry auto-slash ────────────────────────────────────────────────
  expInput.addEventListener('input', () => {
    let v = expInput.value.replace(/\D/g, '').substring(0, 4);
    if (v.length >= 3) v = v.substring(0,2) + ' / ' + v.substring(2);
    expInput.value = v;
  });

  // ── Open enrollment modal (called from detail modal) ──────────────────
  window.openEnrollmentModal = function(courseId, defaultPlan = 'short') {
    const data = COURSE_DATABASE[courseId];
    if (!data) return;
    currentData = data;

    labelText.textContent    = data.title;
    hiddenCourseId.value     = courseId;
    priceShortEl.textContent = data.short.fee;
    priceLongEl.textContent  = data.long.fee;

    // Set default plan radio
    radioShort.checked = (defaultPlan === 'short');
    radioLong.checked  = (defaultPlan === 'long');
    updateSummary();

    // Reset form fields & errors
    enrollForm.reset();
    // keep radio state after reset
    radioShort.checked = (defaultPlan === 'short');
    radioLong.checked  = (defaultPlan === 'long');
    updateSummary();
    [nameInput, emailInput, phoneInput, cardInput, expInput, cvvInput].forEach(i => i.classList.remove('input-error'));
    [nameError, emailError, phoneError, cardError, expError, cvvError].forEach(e => e.classList.remove('visible'));

    enrollModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  };

  function closeEnrollModal() {
    enrollModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeEnrollModal);
  enrollModal.addEventListener('click', e => { if (e.target === enrollModal) closeEnrollModal(); });

  // ── Payment form validation & submit ──────────────────────────────────
  function validate(input, errorEl, condition) {
    const ok = condition(input.value.trim());
    input.classList.toggle('input-error', !ok);
    errorEl.classList.toggle('visible', !ok);
    return ok;
  }

  enrollForm.addEventListener('submit', e => {
    e.preventDefault();
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cardRx  = /^[\d ]{19}$/;        // 16 digits + 3 spaces
    const expRx   = /^\d{2} \/ \d{2}$/;
    const cvvRx   = /^\d{3}$/;

    const v1 = validate(nameInput,  nameError,  v => v.length >= 2);
    const v2 = validate(emailInput, emailError, v => emailRx.test(v));
    const v3 = validate(phoneInput, phoneError, v => v.length >= 7);
    const v4 = validate(cardInput,  cardError,  v => cardRx.test(v));
    const v5 = validate(expInput,   expError,   v => expRx.test(v));
    const v6 = validate(cvvInput,   cvvError,   v => cvvRx.test(v));

    if (!(v1 && v2 && v3 && v4 && v5 && v6)) return;

    const planLabel = radioShort.checked ? 'Short Term' : 'Long Term';
    const planFee   = radioShort.checked ? currentData.short.fee : currentData.long.fee;
    closeEnrollModal();
    showToast('🎉 Enrollment Confirmed!', `${nameInput.value.trim()} enrolled in ${labelText.textContent} — ${planLabel} plan (${planFee}). Welcome to KZ Campus!`);
  });
}

/* ==========================================================================
   INTERNSHIPS SYSTEM (APPLICATION OVERLAYS)
   ========================================================================== */
function initInternshipSystem() {
  const internModal = document.getElementById('internship-apply-modal');
  const closeBtn = document.getElementById('close-intern-modal-btn');
  const roleLabel = document.getElementById('modal-intern-role-label');
  const roleHidden = document.getElementById('intern-role-hidden');
  
  const form = document.getElementById('internship-form');
  const nameInput = document.getElementById('intern-name');
  const nameError = document.getElementById('intern-name-error');
  const emailInput = document.getElementById('intern-email');
  const emailError = document.getElementById('intern-email-error');
  const portInput = document.getElementById('intern-portfolio');
  const portError = document.getElementById('intern-portfolio-error');
  const stmtInput = document.getElementById('intern-statement');
  const stmtError = document.getElementById('intern-statement-error');

  function openApplyModal(roleName) {
    roleLabel.textContent = roleName;
    roleHidden.value = roleName;

    // Reset Form & Validation Errors
    form.reset();
    [nameInput, emailInput, portInput, stmtInput].forEach(inp => inp.classList.remove('input-error'));
    [nameError, emailError, portError, stmtError].forEach(err => err.classList.remove('visible'));

    internModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeApplyModal() {
    internModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Hook apply buttons in table
  document.querySelectorAll('.btn-apply-intern').forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.getAttribute('data-role');
      openApplyModal(role);
    });
  });

  closeBtn.addEventListener('click', closeApplyModal);
  internModal.addEventListener('click', (e) => {
    if (e.target === internModal) closeApplyModal();
  });

  // Apply Form Validation & Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Name Validation
    const nameVal = nameInput.value.trim();
    if (!nameVal) {
      nameInput.classList.add('input-error');
      nameError.classList.add('visible');
      isValid = false;
    } else {
      nameInput.classList.remove('input-error');
      nameError.classList.remove('visible');
    }

    // Email Validation
    const emailVal = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal || !emailRegex.test(emailVal)) {
      emailInput.classList.add('input-error');
      emailError.classList.add('visible');
      isValid = false;
    } else {
      emailInput.classList.remove('input-error');
      emailError.classList.remove('visible');
    }

    // Portfolio Validation
    const portVal = portInput.value.trim();
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!portVal || !urlRegex.test(portVal)) {
      portInput.classList.add('input-error');
      portError.classList.add('visible');
      isValid = false;
    } else {
      portInput.classList.remove('input-error');
      portError.classList.remove('visible');
    }

    // Statement Validation (>= 30 characters)
    const stmtVal = stmtInput.value.trim();
    if (stmtVal.length < 30) {
      stmtInput.classList.add('input-error');
      stmtError.classList.add('visible');
      isValid = false;
    } else {
      stmtInput.classList.remove('input-error');
      stmtError.classList.remove('visible');
    }

    if (!isValid) return;

    // Submit Simulated Application
    closeApplyModal();
    showToast('Application Submitted!', `Thank you ${nameVal}. Our careers board has received your profile.`);
  });
}

/* ==========================================================================
   CONTACT FORM VALIDATION
   ========================================================================== */
function initContactSystem() {
  const form = document.getElementById('contact-support-form');
  
  const nameInput = document.getElementById('contact-name');
  const nameError = document.getElementById('contact-name-error');
  const emailInput = document.getElementById('contact-email');
  const emailError = document.getElementById('contact-email-error');
  const subjectInput = document.getElementById('contact-subject');
  const subjectError = document.getElementById('contact-subject-error');
  const msgInput = document.getElementById('contact-message');
  const msgError = document.getElementById('contact-message-error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Name Validation
    const nameVal = nameInput.value.trim();
    if (!nameVal) {
      nameInput.classList.add('input-error');
      nameError.classList.add('visible');
      isValid = false;
    } else {
      nameInput.classList.remove('input-error');
      nameError.classList.remove('visible');
    }

    // Email Validation
    const emailVal = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal || !emailRegex.test(emailVal)) {
      emailInput.classList.add('input-error');
      emailError.classList.add('visible');
      isValid = false;
    } else {
      emailInput.classList.remove('input-error');
      emailError.classList.remove('visible');
    }

    // Subject Validation
    const subVal = subjectInput.value;
    if (!subVal) {
      subjectInput.classList.add('input-error');
      subjectError.classList.add('visible');
      isValid = false;
    } else {
      subjectInput.classList.remove('input-error');
      subjectError.classList.remove('visible');
    }

    // Message Validation (>= 10 characters)
    const msgVal = msgInput.value.trim();
    if (msgVal.length < 10) {
      msgInput.classList.add('input-error');
      msgError.classList.add('visible');
      isValid = false;
    } else {
      msgInput.classList.remove('input-error');
      msgError.classList.remove('visible');
    }

    if (!isValid) return;

    // Submit Simulation
    form.reset();
    showToast('Message Dispatched', `Hi ${nameVal}, our admissions and support team will reply within 12 hours.`);
  });
}

/* ==========================================================================
   NEWSLETTER NEWSLETTER SUBSCRIPTION
   ========================================================================== */
function initNewsletter() {
  const form = document.getElementById('newsletter-subscription-form');
  const emailInput = document.getElementById('news-email');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailValue = emailInput.value.trim();
    if (!emailValue) return;

    form.reset();
    showToast('Subscribed Successfully!', 'You are now on our list for incoming cohort releases.');
  });
}

/* ==========================================================================
   DYNAMIC TOAST NOTIFICATIONS
   ========================================================================== */
let toastTimeout;
function showToast(title, description, isError = false) {
  const toast = document.getElementById('toast-notif');
  const toastTitle = document.getElementById('toast-title');
  const toastDesc = document.getElementById('toast-desc');

  // Set message details
  toastTitle.textContent = title;
  toastDesc.textContent = description;

  if (isError) {
    toast.classList.add('error-toast');
  } else {
    toast.classList.remove('error-toast');
  }

  // Animate toast entry
  clearTimeout(toastTimeout);
  toast.classList.add('show');

  // Auto hide toast
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}
