// ============================================
// Language Management System
// ============================================

const LanguageManager = {
  currentLanguage: localStorage.getItem('language') || 'en',
  
  init() {
    this.setupLanguage();
    this.attachEventListeners();
  },

  setupLanguage() {
    // Set initial language on page load
    this.setLanguage(this.currentLanguage);
  },

  setLanguage(lang) {
    if (lang !== 'en' && lang !== 'ar') return;
    
    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update HTML lang attribute
    document.getElementById('htmlElement').lang = lang;
    
    // Set document direction
    if (lang === 'ar') {
      document.body.dir = 'rtl';
      document.body.setAttribute('dir', 'rtl');
    } else {
      document.body.dir = 'ltr';
      document.body.setAttribute('dir', 'ltr');
    }
    
    // Update all translatable elements
    this.updateContent();
    
    // Update button text
    this.updateLanguageButton();
  },

  updateContent() {
    const elements = document.querySelectorAll('[data-en][data-ar]');
    elements.forEach(element => {
      const text = this.currentLanguage === 'en' 
        ? element.getAttribute('data-en')
        : element.getAttribute('data-ar');
      element.textContent = text;
    });
  },

  updateLanguageButton() {
    const button = document.getElementById('languageToggle');
    if (button) {
      button.innerHTML = this.currentLanguage === 'en' 
        ? '<span class="lang-text">العربية</span>' 
        : '<span class="lang-text">English</span>';
    }
  },

  toggle() {
    const newLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
    this.setLanguage(newLanguage);
  },

  attachEventListeners() {
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
      languageToggle.addEventListener('click', () => this.toggle());
    }
  }
};

// ============================================
// Scroll Reveal Animation
// ============================================

const observerOptions = {
  threshold: 0.12
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

// ============================================
// Active Navigation Link Highlighting
// ============================================

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ============================================
// Mobile Hamburger Menu
// ============================================

const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

// ============================================
// Smooth Scroll Navigation
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu if open
      hamburger.classList.remove('open');
      navLinksContainer.classList.remove('open');
    }
  });
});

// ============================================
// Navbar Background on Scroll
// ============================================

const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('solid');
  } else {
    nav.classList.remove('solid');
  }
});

// ============================================
// Initialize on DOM Ready
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  LanguageManager.init();
});