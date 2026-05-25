/**
 * Standalone Course Details Controller
 * Powered by Keezenix Global
 */

// Mirror COURSE_DATABASE from main app for consistency
const COURSE_DATABASE = {
  'fullstack-dev': {
    title: 'Full Stack Development',
    category: 'Web & Systems',
    desc: 'Master modern web architectures. Learn frontend UI rendering, server-side scaling, database architectures, containerization, and secure cloud deployments. This program spans from core layouts to complex systems engineering.',
    short: {
      desc: 'A fast-paced 4–5 week intensive covering the core essentials of full-stack web development. You will build and deploy a complete web application from scratch using modern tools.',
      fee: '₹ 8,999',
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
    category: 'AI & Automation',
    desc: 'Go beyond model training. Learn neural networks, custom fine-tuning of Large Language Models (LLMs), deployment pipeline optimizations, and AI integration inside web layers.',
    short: {
      desc: 'An intensive 4–5 week bootcamp covering the practical foundations of AI/ML engineering, from Python ML libraries to deploying a simple model as a web API.',
      fee: '₹ 9,999',
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
    category: 'AI & Automation',
    desc: 'Automate workflows at scale. Build robust web scrapers, connect complex API pipelines, write automated test cases, and deploy self-healing background automation daemons.',
    short: {
      desc: 'A focused 4–5 week crash course turning you into a practical Python automator. Eliminate repetitive tasks, scrape data, and automate workflows with real scripts.',
      fee: '₹ 6,999',
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
    category: 'Engineering Growth',
    desc: 'Merge engineering logic with growth. Master complex analytics implementation, data collection pipelines, search engine algorithms, and advanced A/B testing infrastructure.',
    short: {
      desc: 'A practical 4–5 week bootcamp covering the core intersections of software engineering and growth marketing — analytics setup, SEO basics, and A/B testing.',
      fee: '₹ 7,499',
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
    category: 'Web & Systems',
    desc: 'Learn memory safety without a garbage collector. Deep-dive into ownership, lifecycles, advanced concurrency patterns, embedded systems, and compiling Rust to WebAssembly.',
    short: {
      desc: 'An intensive 4–5 week introduction to Rust — covering ownership, the borrow checker, safe concurrency, and building your first real systems-level program.',
      fee: '₹ 8,499',
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

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Parse course ID from URL query param
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('course') || 'fullstack-dev';
  const data = COURSE_DATABASE[courseId];

  if (!data) {
    // Fallback if course not found
    window.location.href = 'index.html';
    return;
  }

  // Populate static fields
  document.getElementById('details-course-title').textContent = data.title;
  document.getElementById('details-course-desc').textContent = data.desc;
  document.getElementById('details-category-badge').textContent = data.category;
  document.title = `${data.title} Details | KZ Campus`;

  // Apply visual tags or specific green class names based on category
  const mainCard = document.getElementById('details-main-card');
  const feeCard = document.getElementById('details-plan-fee-card');
  const isGreenTrack = data.category === 'AI & Automation' || data.category === 'Engineering Growth';
  
  if (isGreenTrack) {
    mainCard.classList.add('glow-green');
  }

  // Set up elements
  const tabShort = document.getElementById('tab-details-short');
  const tabLong = document.getElementById('tab-details-long');
  const planDesc = document.getElementById('details-plan-desc');
  const planFee = document.getElementById('details-plan-fee');
  const planDuration = document.getElementById('details-plan-duration');
  const curriculumList = document.getElementById('details-curriculum-list');
  const syllabusHeader = document.getElementById('syllabus-headline-text');
  const feeCardTitle = document.getElementById('fee-card-title');
  const btnEnroll = document.getElementById('btn-details-enroll');

  let activePlan = 'short';

  function renderModules(modules) {
    curriculumList.innerHTML = '';
    modules.forEach(mod => {
      const li = document.createElement('li');
      li.className = 'curriculum-item';
      li.style.animation = 'pageFadeIn 0.3s ease forwards';
      li.innerHTML = `
        <div class="curriculum-item-header">
          <span style="color: ${isGreenTrack ? 'var(--color-secondary)' : 'var(--color-primary)'};">${mod.num}</span>${mod.title}
        </div>
        <div class="curriculum-item-body">${mod.details}</div>
      `;
      curriculumList.appendChild(li);
    });
  }

  function switchPlan(plan) {
    activePlan = plan;
    if (plan === 'short') {
      tabShort.classList.add('active');
      tabLong.classList.remove('active');
      
      // Update styling tags
      feeCard.className = 'plan-fee-card fee-blue';
      feeCardTitle.textContent = 'Short Term Fee';
      planDesc.textContent = data.short.desc;
      planFee.textContent = data.short.fee;
      planDuration.textContent = 'Per Person · 4–5 Weeks';
      syllabusHeader.textContent = 'Short Term Modules';
      
      renderModules(data.short.modules);
    } else {
      tabLong.classList.add('active');
      tabShort.classList.remove('active');

      // Update styling tags
      feeCard.className = 'plan-fee-card fee-green';
      feeCardTitle.textContent = 'Long Term Fee';
      planDesc.textContent = data.long.desc;
      planFee.textContent = data.long.fee;
      planDuration.textContent = 'Per Person · 4–5 Months';
      syllabusHeader.textContent = 'Long Term Modules';
      
      renderModules(data.long.modules);
    }

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Tab click listeners
  tabShort.addEventListener('click', () => switchPlan('short'));
  tabLong.addEventListener('click', () => switchPlan('long'));

  // Enroll button listener - navigates to main index with check-out trigger!
  btnEnroll.addEventListener('click', () => {
    window.location.href = `index.html?enroll=${courseId}&plan=${activePlan}#courses`;
  });

  // Load initial view
  switchPlan('short');
});
