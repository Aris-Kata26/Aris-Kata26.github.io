/*=============== MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle');

/* Menu show - hidden (guarded for pages without nav toggle) */
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('show-menu');
    navToggle.classList.toggle('animate-toggle');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav-link');

const linkAction = () => {
  const navMenu = document.getElementById('nav-menu');

  if (navToggle) navToggle.classList.remove('animate-toggle');
  if (navMenu) navMenu.classList.remove('show-menu');
  if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
};

navLink.forEach((n) => n.addEventListener('click', linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
  const header = document.getElementById('header');

  this.scrollY >= 20
    ? header.classList.add('bg-header')
    : header.classList.remove('bg-header');
};

window.addEventListener('scroll', scrollHeader);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute('id'),
      sectionsClass = document.querySelector(
        '.nav-menu a[href*=' + sectionId + ']'
      );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionsClass.classList.add('active-link');
    } else {
      sectionsClass.classList.remove('active-link');
    }
  });
};

window.addEventListener('scroll', scrollActive);

/*=============== SERVICES SWIPER ===============*/
var servicesSwiper = new Swiper('.services-swiper', {
  spaceBetween: 32,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1208: {
      slidesPerView: 3,
    },
  },
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixer;
if (document.querySelector('.work-container')) {
  mixer = mixitup('.work-container', {
    selectors: {
      target: '.mix',
    },
    animation: {
      duration: 300,
    },
    load: {
      filter: '.courses',
    },
  });
}

/* Active work */
const linkWork = document.querySelectorAll('.work-item');

function activeWork() {
  linkWork.forEach((a) => {
    a.classList.remove('active-work');
  });

  this.classList.add('active-work');
}

linkWork.forEach((a) => a.addEventListener('click', activeWork));

// Set default active filter button to Courses on load
try {
  if (typeof mixer !== 'undefined' && mixer) {
    mixer.filter('.courses');
  }
} catch {}

const coursesButton = document.querySelector('.work-item[data-filter=".courses"]');
if (coursesButton) {
  linkWork.forEach((a) => a.classList.remove('active-work'));
  coursesButton.classList.add('active-work');
}

// Jump links that should trigger a specific MixItUp filter
const filterJumpLinks = document.querySelectorAll('[data-filter-target]');
if (filterJumpLinks.length) {
  filterJumpLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const filterValue = link.getAttribute('data-filter-target');
      if (!filterValue) return;

      setTimeout(() => {
        try {
          if (typeof mixer !== 'undefined' && mixer) {
            mixer.filter(filterValue);
          }
        } catch {}

        const targetBtn = document.querySelector(
          `.work-item[data-filter="${filterValue}"]`
        );
        if (targetBtn) {
          linkWork.forEach((btn) => btn.classList.remove('active-work'));
          targetBtn.classList.add('active-work');
        }
      }, 60);
    });
  });
}

/*=============== RESUME ===============*/
const accordionItems = document.querySelectorAll('.resume-item');

accordionItems.forEach((item) => {
  const header = item.querySelector('.resume-header'),
    content = item.querySelector('.resume-content'),
    icon = item.querySelector('.resume-icon i');

  header.addEventListener('click', () => {
    const isOpen = item.classList.toggle('accordion-open');

    content.style.height = isOpen ? content.scrollHeight + 'px' : '0';
    icon.className = isOpen ? 'ri-subtract-line' : 'ri-add-line';

    accordionItems.forEach((otherItem) => {
      if (
        otherItem !== item &&
        otherItem.classList.contains('accordion-open')
      ) {
        otherItem.querySelector('.resume-content').style.height = '0';
        otherItem.querySelector('.resume-icon i').classList = 'ri-add-line';
        otherItem.classList.remove('accordion-open');
      }
    });
  });
});

/*=============== TESTIMONIALS SWIPER ===============*/
var servicesSwiper = new Swiper('.testimonials-swiper', {
  spaceBetween: 32,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1208: {
      slidesPerView: 3,
    },
  },
});

/*=============== EXPERTS SWIPER ===============*/
var expertsSwiper = new Swiper('.experts-swiper', {
  spaceBetween: 32,
  pagination: {
    el: '.experts-pagination',
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1208: {
      slidesPerView: 3,
    },
  },
});

/*=============== CONTACT FORM (FORMSPREE) ===============*/
(() => {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  const statusEl = document.getElementById('contact-status');
  const submitBtn = document.getElementById('contact-submit');
  const honeypot = contactForm.querySelector('.hp-field');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (honeypot && honeypot.value.trim() !== '') {
      return;
    }

    if (statusEl) {
      statusEl.textContent = '';
      statusEl.classList.remove('success', 'error');
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-busy', 'true');
    }

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (response.ok) {
        if (statusEl) {
          statusEl.textContent = 'Thanks — your message was sent.';
          statusEl.classList.add('success');
        }
        contactForm.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      if (statusEl) {
        statusEl.textContent = 'Sorry — something went wrong. Please try again.';
        statusEl.classList.add('error');
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-busy');
      }
    }
  });
})();

/*=============== STYLE SWITCHER ===============*/
const styleSwitcher = document.getElementById('style-switcher'),
  switcherToggle = document.getElementById('switcher-toggle'),
  switcherClose = document.getElementById('switcher-close');

/* Switcher show (guarded) */
if (switcherToggle && styleSwitcher) {
  switcherToggle.addEventListener('click', () => {
    styleSwitcher.classList.add('show-switcher');
    switcherToggle.setAttribute('aria-expanded', 'true');
  });
}

/* Switcher hidden (guarded) */
if (switcherClose && styleSwitcher) {
  switcherClose.addEventListener('click', () => {
    styleSwitcher.classList.remove('show-switcher');
    if (switcherToggle) switcherToggle.setAttribute('aria-expanded', 'false');
  });
}

/*=============== THEME COLORS ===============*/
const colors = document.querySelectorAll('.style-switcher-color');

colors.forEach((color) => {
  color.onclick = () => {
    const activeColor = color.style.getPropertyValue('--hue');

    colors.forEach((c) => c.classList.remove('active-color'));
    color.classList.add('active-color');

    document.documentElement.style.setProperty('--hue', activeColor);
  };
});

/*=============== LIGHT/DARK MODE (persist + early apply) ===============*/
(function initThemeOnLoad() {
  try {
    const saved = localStorage.getItem('theme');
    const isDark = saved === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
  } catch {}
})();

let currentTheme = (function () {
  try {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
})();

// Sync switcher radios with saved theme (when present)
(() => {
  const lightInput = document.getElementById('light-theme');
  const darkInput = document.getElementById('dark-theme');
  if (lightInput && darkInput) {
    if (currentTheme === 'dark') {
      darkInput.checked = true;
      lightInput.checked = false;
    } else {
      lightInput.checked = true;
      darkInput.checked = false;
    }
  }
})();

document.querySelectorAll('input[name="body-theme"]').forEach((input) => {
  input.addEventListener('change', () => {
    currentTheme = input.value === 'dark' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    try { localStorage.setItem('theme', currentTheme); } catch {}
  });
});

/*=============== COURSE LINK CONSOLIDATION ===============*/
// Keep a single button per course card: prefer course-notes PDF if available,
// otherwise use the proof PDF. Label it uniformly as "View PDF".
document.querySelectorAll('.mix.courses .card').forEach((card) => {
  const links = Array.from(card.querySelectorAll('a.link[href]'));
  if (links.length === 0) return;

  const notesLink = links.find((a) => {
    const href = a.getAttribute('href') || '';
    return href.includes('/course-notes/');
  });

  const proofLink = links.find((a) => {
    const href = a.getAttribute('href') || '';
    return href.includes('/course-proofs/');
  });

  const chosen = notesLink || proofLink || links[0];

  // Reuse the first link element for consistency and remove the rest
  const primary = links[0];
  primary.setAttribute('href', chosen.getAttribute('href'));
  primary.setAttribute('target', '_blank');
  primary.setAttribute('rel', 'noopener noreferrer');
  primary.innerHTML = 'View PDF <i class="ri-arrow-right-line link-icon"></i>';

  // Remove all other links
  links.slice(1).forEach((a) => a.remove());
});

/*=============== PROJECT IMAGE LIGHTBOX ===============*/
(function enableLightbox() {
  const overlay = document.getElementById('lightbox');
  const overlayImg = document.getElementById('lightbox-img');
  const overlayClose = document.getElementById('lightbox-close');

  if (!overlay || !overlayImg) return;

  const open = (src, alt) => {
    overlayImg.src = src;
    overlayImg.alt = alt || '';
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    overlayImg.src = '';
    document.body.style.overflow = '';
  };

  // Click on any portfolio image
  document.querySelectorAll('.work-img').forEach((img) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.preventDefault();
      open(img.getAttribute('src'), img.getAttribute('alt'));
    });
  });

  // Close interactions
  overlay.addEventListener('click', (e) => {
    // Close only if clicking outside the image
    if (e.target === overlay) close();
  });

  if (overlayClose) overlayClose.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });
})();

/*=============== IMAGE PERFORMANCE ATTRIBUTES ===============*/
// Ensure all card images are lazy-loaded and have explicit dimensions
// to reduce bandwidth and avoid layout shift.
document.querySelectorAll('img.work-img').forEach((img) => {
  if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
  if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
  if (!img.hasAttribute('width')) img.setAttribute('width', '400');
  if (!img.hasAttribute('height')) img.setAttribute('height', '240');
});

/*=============== CV DROPDOWNS ===============*/
(function cvDropdowns() {
  const dropdowns = document.querySelectorAll('.btn-dropdown');
  if (!dropdowns.length) return;

  const closeDropdown = (dropdown) => {
    dropdown.classList.remove('open');
    const button = dropdown.querySelector('button');
    if (button) button.setAttribute('aria-expanded', 'false');
  };

  const openDropdown = (dropdown) => {
    dropdown.classList.add('open');
    const button = dropdown.querySelector('button');
    if (button) button.setAttribute('aria-expanded', 'true');
  };

  dropdowns.forEach((dropdown, index) => {
    const button = dropdown.querySelector('button');
    const menu = dropdown.querySelector('.dropdown-menu');
    if (!button || !menu) return;

    if (!button.id) button.id = `dropdown-button-${index}`;
    if (!menu.id) menu.id = `dropdown-menu-${index}`;

    button.setAttribute('aria-controls', menu.id);
    menu.setAttribute('aria-labelledby', button.id);

    button.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = dropdown.classList.contains('open');
      dropdowns.forEach((d) => closeDropdown(d));
      if (!isOpen) openDropdown(dropdown);
    });
  });

  document.addEventListener('click', (e) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(e.target)) closeDropdown(dropdown);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') dropdowns.forEach((dropdown) => closeDropdown(dropdown));
  });
})();

/*=============== DECORATIVE SHAPE ALTS ===============*/
(function ensureDecorativeAltText() {
  document.querySelectorAll('img.shape').forEach((img) => {
    if (!img.hasAttribute('alt') || img.getAttribute('alt') === null) {
      img.setAttribute('alt', '');
    }
    img.setAttribute('aria-hidden', 'true');
  });
})();

/*=============== SCROLL REVEAL ===============*/
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
  );

  items.forEach((el) => {
    if (el.classList.contains('reveal--instant')) {
      el.classList.add('is-visible');
      return;
    }
    observer.observe(el);
  });
})();
