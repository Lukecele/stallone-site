// script.js – Stallone & Rocky Balboa Legacy
// PWA Service Worker, Mobile Drawer, Quotes Filtering, Daily Inspiration, Modal

// Registrazione Service Worker per PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('PWA ServiceWorker registrato con successo:', reg.scope))
      .catch((err) => console.warn('PWA ServiceWorker errore:', err));
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  // Inizializza icone Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  let allQuotes = [];

  // ==========================================
  // Mobile Drawer Navigation (Touch & Accessible)
  // ==========================================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerClose = document.getElementById('drawerClose');

  function openDrawer() {
    if (!mobileDrawer || !drawerOverlay) return;
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('open');
    if (mobileToggle) {
      mobileToggle.classList.add('active');
      mobileToggle.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!mobileDrawer || !drawerOverlay) return;
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    if (mobileToggle) {
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer && mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  document.querySelectorAll('.drawer-link').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // ==========================================
  // Back to Top
  // ==========================================
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // Caricamento Citazioni da quotes.json
  // ==========================================
  const quoteContainer = document.getElementById('quote-list');
  try {
    const res = await fetch('quotes.json');
    if (!res.ok) throw new Error('Fetch error');
    allQuotes = await res.json();
    renderQuotes(allQuotes);
    setupFilters();
    setupDailyQuoteGenerator(allQuotes);
  } catch (err) {
    console.warn('Uso dati fallback citazioni:', err);
    allQuotes = [
      {
        quote: "Tu, io, nessuno può colpire duro come fa la vita. Perciò, andando avanti, non è importante come colpisci: l'importante è come sai resistere ai colpi, come incassi e se una volta a terra hai la forza di rialzarti. Così si vince!",
        context: "Rocky Balboa (2006) – Il discorso al figlio Robert sotto la pioggia.",
        category: "Rocky Balboa (2006)",
        movie: "Rocky VI",
        icon: "flame"
      },
      {
        quote: "Tutto quello che voglio fare è restare in piedi alla quindicesima ripresa. Se suona quell'ultimo gong e io sarò ancora in piedi, saprò di non essere soltanto un altro bullo di quartiere.",
        context: "Rocky (1976) – La notte prima dell'incontro con Apollo Creed.",
        category: "Rocky I (1976)",
        movie: "Rocky I",
        icon: "trophy"
      },
      {
        quote: "Se sai quanto vali, vai e prenditi quello che vali! Ma devi essere pronto a prendere i colpi!",
        context: "Rocky Balboa (2006) – Sulla dignità personale e sull'autostima.",
        category: "Autostima & Responsabilità",
        movie: "Rocky VI",
        icon: "shield"
      }
    ];
    renderQuotes(allQuotes);
    setupFilters();
    setupDailyQuoteGenerator(allQuotes);
  }

  function renderQuotes(quotes) {
    if (!quoteContainer) return;
    quoteContainer.innerHTML = '';

    quotes.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'quote-card';
      card.innerHTML = `
        <div>
          <div class="quote-card-header">
            <span class="quote-badge">${item.movie || item.category || 'Mito'}</span>
            <i data-lucide="${item.icon || 'flame'}"></i>
          </div>
          <p class="quote-text">«${item.quote}»</p>
        </div>
        <p class="quote-context">${item.context || 'Rocky Balboa'}</p>
      `;
      quoteContainer.appendChild(card);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.getAttribute('data-filter');
        if (filter === 'all') {
          renderQuotes(allQuotes);
        } else {
          const filtered = allQuotes.filter((q) => q.category === filter);
          renderQuotes(filtered);
        }
      });
    });
  }

  function setupDailyQuoteGenerator(quotes) {
    const textEl = document.getElementById('dailyQuoteText');
    const ctxEl = document.getElementById('dailyQuoteContext');
    const btn = document.getElementById('newQuoteBtn');

    if (!textEl || !btn || !quotes.length) return;

    let currentIndex = 0;

    btn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % quotes.length;
      const q = quotes[currentIndex];
      textEl.style.opacity = '0';
      setTimeout(() => {
        textEl.textContent = `«${q.quote}»`;
        if (ctxEl) ctxEl.textContent = `– ${q.context}`;
        textEl.style.opacity = '1';
      }, 150);
    });
  }

  // ==========================================
  // Cookie Consent Banner (GDPR)
  // ==========================================
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptCookiesBtn = document.getElementById('acceptCookiesBtn');
  const rejectCookiesBtn = document.getElementById('rejectCookiesBtn');
  const COOKIE_KEY = 'rocky_cookie_consent_v1';

  const consent = localStorage.getItem(COOKIE_KEY);
  if (!consent && cookieBanner) {
    setTimeout(() => {
      cookieBanner.classList.add('visible');
    }, 800);
  }

  function setConsent(val) {
    localStorage.setItem(COOKIE_KEY, val);
    if (cookieBanner) cookieBanner.classList.remove('visible');
  }

  if (acceptCookiesBtn) acceptCookiesBtn.addEventListener('click', () => setConsent('all'));
  if (rejectCookiesBtn) rejectCookiesBtn.addEventListener('click', () => setConsent('essential'));

  // ==========================================
  // Legal Modal Dialog
  // ==========================================
  const legalModalOverlay = document.getElementById('legalModalOverlay');
  const closeLegalModal = document.getElementById('closeLegalModal');
  const modalDismissBtn = document.getElementById('modalDismissBtn');
  const openPrivacyBtn = document.getElementById('openPrivacyBtn');
  const openCookieBtn = document.getElementById('openCookieBtn');
  const openCopyrightBtn = document.getElementById('openCopyrightBtn');
  const cookieBannerLink = document.getElementById('cookieBannerLink');

  function openLegalModal(targetId) {
    if (!legalModalOverlay) return;
    legalModalOverlay.classList.add('open');
    legalModalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (typeof targetId === 'string') {
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        setTimeout(() => targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
      }
    }
  }

  function closeLegalModalDialog() {
    if (!legalModalOverlay) return;
    legalModalOverlay.classList.remove('open');
    legalModalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openPrivacyBtn) openPrivacyBtn.addEventListener('click', () => openLegalModal('legal-privacy'));
  if (openCookieBtn) openCookieBtn.addEventListener('click', () => openLegalModal('legal-cookies'));
  if (openCopyrightBtn) openCopyrightBtn.addEventListener('click', () => openLegalModal('legal-copyright'));
  if (cookieBannerLink) cookieBannerLink.addEventListener('click', () => openLegalModal('legal-cookies'));

  if (closeLegalModal) closeLegalModal.addEventListener('click', closeLegalModalDialog);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeLegalModalDialog);

  if (legalModalOverlay) {
    legalModalOverlay.addEventListener('click', (e) => {
      if (e.target === legalModalOverlay) closeLegalModalDialog();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && legalModalOverlay && legalModalOverlay.classList.contains('open')) {
      closeLegalModalDialog();
    }
  });
});
