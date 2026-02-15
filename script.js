// Main JavaScript for ImagineStories Website

// Get current language from localStorage or default to English
let currentLang = localStorage.getItem('language') || 'en';

// Language flags mapping
const languageFlags = {
    'en': '🇬🇧',
    'fr': '🇫🇷',
    'es': '🇪🇸',
    'it': '🇮🇹',
    'de': '🇩🇪',
    'ar': '🇸🇦',
    'he': '🇮🇱'
};

// RTL languages
const rtlLanguages = ['ar', 'he'];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial language
    setLanguage(currentLang);
    
    // Setup language selector
    setupLanguageSelector();
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
});

// Set language and update UI
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Update HTML direction for RTL languages
    if (rtlLanguages.includes(lang)) {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
    
    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang);
    
    // Update all translated elements
    updateTranslations();
    
    // Update language button
    updateLanguageButton();
}

// Update all elements with data-i18n attribute
function updateTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(translations[currentLang], key);
        
        if (translation) {
            element.textContent = translation;
        }
    });
}

// Get nested translation by dot notation key
function getNestedTranslation(obj, key) {
    return key.split('.').reduce((o, i) => (o ? o[i] : null), obj);
}

// Update language button text and flag
function updateLanguageButton() {
    const langBtn = document.getElementById('currentLang');
    if (langBtn) {
        const langName = currentLang.toUpperCase();
        const flag = languageFlags[currentLang];
        langBtn.innerHTML = `<span class="flag">${flag}</span> ${langName}`;
    }
}

// Setup language selector dropdown
function setupLanguageSelector() {
    const langBtn = document.getElementById('currentLang');
    const langDropdown = document.getElementById('langDropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    
    if (!langBtn || !langDropdown) return;
    
    // Toggle dropdown
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
            langDropdown.classList.remove('active');
        }
    });
    
    // Handle language selection
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedLang = option.getAttribute('data-lang');
            setLanguage(selectedLang);
            langDropdown.classList.remove('active');
            
            // Scroll to top smoothly after language change
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Setup mobile menu toggle
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!mobileMenuBtn || !navMenu) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// Setup smooth scrolling for anchor links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

// Animation on scroll (optional enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and other animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .step-card, .screenshot-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Download button tracking (optional - for analytics)
function trackDownload(platform) {
    console.log(`Download clicked: ${platform}`);
    // Add your analytics tracking here
    // Example: gtag('event', 'download', { platform: platform });
}

// Contact form handling (if you add a contact form later)
function handleContactForm(e) {
    e.preventDefault();
    // Add your form handling logic here
    console.log('Contact form submitted');
}
