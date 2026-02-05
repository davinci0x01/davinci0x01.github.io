// main.js - Cyberpunk Blog Interactivity
// Author: 0xDaVinci

// ========== LOADING SCREEN ========== //
const loader = document.getElementById('loader');
const loaderImg = document.getElementById('loader-img');
const loaderPercent = document.getElementById('loader-percent');
const mainContent = document.getElementById('main-content');

// Blog data to simulate fetch (replace with real fetch if needed)
const blogPosts = [
  {
    title: 'ازاي تعمل مقلب في صاحبك انك هكرتة',
    desc: 'شرح تفصيلي لعمل مقلب سايبر سيكيوريتي لصديقك باستخدام تقنيات بسيطة.',
    meta: 'Cybersecurity Prank · Nov 2025',
    url: 'blog/hacking-prank.html',
    image: 'assets/blogs/hacking-prank.png'
  },
  {
    title: 'شرح تثبيت لينكس علي الهاتف بدون رووت',
    desc: 'دليل خطوة بخطوة لتثبيت Ubuntu على Termux عبر Andronix مع جميع الأوامر وروابط التحميل.',
    meta: 'Linux · Ubuntu · Feb 2026',
    url: 'blog/install-ubuntu-termux.html',
    image: 'assets/blogs/install-ubuntu-termux.png'
  },
];

// Preload images utility
function preloadImages(imageUrls, onProgress) {
  let loaded = 0;
  const total = imageUrls.length;
  if (total === 0) {
    onProgress(1);
    return Promise.resolve();
  }
  return new Promise(resolve => {
    imageUrls.forEach(url => {
      const img = new window.Image();
      img.onload = img.onerror = () => {
        loaded++;
        onProgress(loaded / total);
        if (loaded === total) resolve();
      };
      img.src = url;
    });
  });
}

async function loadBlogContentWithProgress() {
  updateLoaderProgress(0);
  // Simulate fetching blog data (replace with real fetch if needed)
  let progress = 0;
  const steps = [
    async () => { await new Promise(r => setTimeout(r, 400)); progress = 0.1; }, // Simulate network
    async () => { await new Promise(r => setTimeout(r, 300)); progress = 0.2; },
    async () => { await new Promise(r => setTimeout(r, 250)); progress = 0.3; },
  ];
  for (let step of steps) {
    await step();
    updateLoaderProgress(progress);
  }
  // Preload blog images
  const imageUrls = blogPosts.map(p => p.image);
  await preloadImages(imageUrls, (imgProgress) => {
    updateLoaderProgress(0.3 + imgProgress * 0.6);
  });
  // Prepare DOM elements (simulate heavy DOM work)
  await new Promise(r => setTimeout(r, 350));
  updateLoaderProgress(0.98);
  // Actually inject blog cards
  const blogList = document.querySelector('main.blog-list');
  if (blogList) {
    blogList.innerHTML = blogPosts.map(post => `
      <a class="blog-card" href="${post.url}">
        <img class="card-img" src="${post.image}" alt="${post.title}" loading="lazy"/>
        <div class="card-title">${post.title}</div>
        <div class="card-desc">${post.desc}</div>
        <div class="card-meta">${post.meta}</div>
      </a>
    `).join('');
  }
  updateLoaderProgress(1);
}

// ========== PAGE TRANSITIONS ========== //
function fadeOutInNavigation(href) {
  const content = document.getElementById('main-content');
  if (!content) { window.location.href = href; return; }
  content.style.transition = 'opacity 0.5s cubic-bezier(.77,0,.18,1)';
  content.style.opacity = 0;
  setTimeout(() => {
    window.location.href = href;
  }, 400);
}

// ========== NAVIGATION INTERACTIONS ========== //
document.addEventListener('DOMContentLoaded', () => {
  // Site title always goes home
  const siteTitle = document.querySelector('.site-title');
  if (siteTitle) {
    siteTitle.addEventListener('click', function(e) {
      e.preventDefault();
      // Use relative path to root index.html (works with file:// and http(s)://)
      if (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')) return;
      window.location.href = (window.location.pathname.includes('/blog/') || window.location.pathname.includes('/assets/') || window.location.pathname.includes('/css/') || window.location.pathname.includes('/js/')) ? '../index.html' : 'index.html';
    });
  }
  // Blog card navigation
  document.body.addEventListener('click', function(e) {
    const card = e.target.closest('.blog-card');
    if (card && card.href) {
      e.preventDefault();
      fadeOutInNavigation(card.getAttribute('href'));
    }
  });
  // Nav links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.href && !this.classList.contains('external')) {
        e.preventDefault();
        fadeOutInNavigation(this.getAttribute('href'));
      }
    });
  });
});


let loaderCurrentPercent = 0;
let loaderTargetPercent = 0;
let loaderInterval = null;
function updateLoaderProgress(fraction) {
  loaderTargetPercent = Math.floor(fraction * 100);
}

function startLoaderPercentAnimation() {
  if (loaderInterval) clearInterval(loaderInterval);
  loaderCurrentPercent = 0;
  loaderTargetPercent = 0;
  if (loaderPercent) loaderPercent.textContent = '0%';
  const duration = 3000; // 3 seconds
  const stepTime = 18; // ms
  const steps = Math.floor(duration / stepTime);
  let step = 0;
  loaderInterval = setInterval(() => {
    step++;
    // Linear progress for now, can be eased
    let percent = Math.min(100, Math.round((step / steps) * 100));
    if (percent < loaderTargetPercent) percent = loaderTargetPercent;
    loaderCurrentPercent = percent;
    if (loaderPercent) loaderPercent.textContent = percent + '%';
    if (percent >= 100) {
      clearInterval(loaderInterval);
    }
  }, stepTime);
}

if (loader && loaderImg && loaderPercent && mainContent) {
  let lastPercent = 0;
  let rotation = 0;
  const step = 10; // degrees per step (pixel-like)
  const imgFrames = 36; // 360/10deg
  let animFrame;
  let finished = false;

  // Start loading blog content in parallel
  const loadingPromise = loadBlogContentWithProgress();
  startLoaderPercentAnimation();

  function animateLoader() {
    // Rotation speed increases as percent increases
    const percent = loaderCurrentPercent;
    // Speed: slow at first, fast at end (ease-in)
    const minSpeed = 0.2, maxSpeed = 2.5; // rotations/sec
    const speed = minSpeed + (maxSpeed - minSpeed) * Math.pow(percent / 100, 1.7);
    // Step rotation
    rotation = (rotation + step * speed) % 360;
    loaderImg.style.transform = `rotate(${Math.round(rotation / step) * step}deg)`;
    if (!finished) animFrame = requestAnimationFrame(animateLoader);
  }
  animateLoader();

  loadingPromise.then(() => {
    finished = true;
    loaderCurrentPercent = 100;
    if (loaderPercent) loaderPercent.textContent = '100%';
    setTimeout(() => {
      loader.classList.add('fade');
      setTimeout(() => {
        loader.style.display = 'none';
        mainContent.classList.remove('hidden');
        animateCards();
      }, 700);
    }, 400);
  });
}

// ========== HAMBURGER MENU ========== //
// Hamburger menu for all pages (supports unique IDs)
function setupHamburgerMenu(hamburgerId, navLinksId) {
  const hamburger = document.getElementById(hamburgerId);
  const navLinks = document.getElementById(navLinksId);
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Close menu on link click (mobile UX)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
    // Ensure menu is not hidden by default (for info page)
    navLinks.classList.remove('hidden');
  }
}
// Main nav (index, blog, etc)
setupHamburgerMenu('hamburger', 'nav-links');
// Info page nav
setupHamburgerMenu('hamburger-info', 'nav-links-info');

// ========== BLOG CARD ANIMATION ========== //
function animateCards() {
  const cards = document.querySelectorAll('.blog-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  cards.forEach(card => observer.observe(card));
}

