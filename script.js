// script.js – Stallone & Rocky Balboa Legacy
// PWA Service Worker, Mobile Drawer, Video Gallery Filtering & Search, Daily Inspiration, Modal

// Registrazione Service Worker per PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js?v=2.2.0')
      .then((reg) => console.log('PWA ServiceWorker registrato con successo:', reg.scope))
      .catch((err) => console.warn('PWA ServiceWorker errore:', err));
  });
}

// Database di fallback 100% verificato con doppiaggi autentici italiani
const FALLBACK_QUOTES = [
  {
    quote: "Ora ti dirò una cosa scontata: guarda che il mondo non è tutto rose e fiori, è davvero un postaccio misero e sporco e, per quanto forte tu possa essere, se glielo permetti ti mette in ginocchio e ti lascia senza niente per sempre. Né io, né tu, nessuno può colpire duro come fa la vita. Perciò, andando avanti, non è importante come colpisci: l'importante è come sai resistere ai colpi, come incassi e se finisci al tappeto hai la forza di rialzarti... così sei un vincente! E se credi di essere forte, lo devi dimostrare che sei forte! Perché un uomo vince solo se sa resistere! Non se ne va in giro a puntare il dito contro chi non c'entra, accusando prima questo, poi quell'altro di quanto sbaglia! I vigliacchi fanno così, e tu non lo sei! Non lo sei affatto! Ma comunque io ti vorrò sempre bene: non può essere altrimenti, tu sei mio figlio, sei il mio sangue, la cosa migliore che ho al mondo. Ma finché non avrai fiducia in te stesso, la tua non sarà vita!",
    context: "Rocky Balboa (2006) – Il celebre discorso al figlio Robert sotto la pioggia di Philadelphia (doppiaggio storico di Massimo Corvo).",
    category: "Rocky Balboa (2006)",
    movie: "Rocky VI (2006)",
    icon: "flame",
    videoId: "iAXf67fqBuM",
    videoTitle: "Rocky Balboa – Discorso al Figlio sull'Autostima (Completo HD ITA)"
  },
  {
    quote: "Lo vedi questo qui? Lo vedi? È la cosa a cui sono più affezionato sulla terra. Lo sai, Rocky Marciano me lo ha regalato. Era un suo gemello... Io adesso lo regalo a te. E sarà come il tuo angelo custode: se sentirai di non farcela, se sentirai che stai per andare giù, quest'angelo ti sussurrerà nell'orecchio e ti dirà: «Reagisci, brutto figlio di puttana, perché Mickey è con te!». D'accordo? Alzati, vigliacco, perché Mickey ti ama!",
    context: "Rocky V (1990) – Il flashback nella vecchia palestra con Mickey che regala a Rocky il gemello di Rocky Marciano (voci storiche di Sergio Fiorentini e Ferruccio Amendola).",
    category: "Lo Spirito di Rocky & Mickey",
    movie: "Rocky V (1990)",
    icon: "shield",
    videoId: "GlVcfEegeY0",
    videoTitle: "Rocky V – Il Flashback di Mickey & Il Gemello di Rocky Marciano (HD ITA)"
  },
  {
    quote: "In fondo chi se ne frega se perdo questo incontro, non mi frega niente neanche se mi spacca la testa, perché l'unica cosa che voglio è resistere: nessuno è mai riuscito a resistere con Creed. Se io riesco a reggere alla distanza, e se quando suona l'ultimo gong io sono ancora in piedi... se sono ancora in piedi, saprò per la prima volta in vita mia che non sono soltanto un bullo di periferia.",
    context: "Rocky (1976) – La confessione intima ad Adriana nella stanza da letto la notte prima dell'incontro con Apollo Creed (doppiaggio leggendario di Gigi Proietti).",
    category: "Rocky Classici (I - IV)",
    movie: "Rocky I (1976)",
    icon: "heart",
    videoId: "xHUuYiZuNmw",
    videoTitle: "Rocky I – Il Dialogo con Adriana: «Non sono soltanto un bullo di periferia» (HD ITA)"
  },
  {
    quote: "Adrianaaa! Adrianaaa! [...] Adriana: «Rocky!... Ti amo!» — Rocky: «Ti amo... ti amo! Non mi importa del verdetto... ti amo!»",
    context: "Rocky (1976) – L'incontro completo contro Apollo Creed: 15 riprese di puro cuore, l'ultimo gong in piedi e il grido d'amore disperato per Adriana.",
    category: "Rocky Classici (I - IV)",
    movie: "Rocky I (1976)",
    icon: "trophy",
    videoId: "i3DENOIuVdg",
    videoTitle: "Rocky I – Rocky Balboa vs Apollo Creed (Incontro Completo HD ITA)"
  },
  {
    quote: "Vi ringrazio, ma mi sembra che abbiate pensato più al vostro interesse che al mio... Perché quello a cui mi volete obbligare a rinunciare per la vostra tranquillità ha un prezzo troppo alto, altissimo da pagare! Con la scusa di fare il vostro lavoro, mi state impedendo di fare il mio! Se uno supera gli esami, se è idoneo ad affrontare la battaglia che lo separa dal suo obiettivo, chi può fermarlo?! Ma se superi tutte le prove, chi può dirti di no? Chi può dirtelo?! Chi?! Nessuno può dirlo! È un dovere dare ascolto a quello che sentiamo dentro... e se uno si è guadagnato il diritto ad essere quello che è, nessuno glielo toglie! Sapete, più divento vecchio e più cose devo lasciarmi alle spalle: è la vita. L'unica cosa che vi chiedo di lasciare su quel tavolo è un po' di giustizia!",
    context: "Rocky Balboa (2006) – Davanti alla Commissione Pugilistica dello Stato per riottenere la licenza da professionista (voce di Massimo Corvo).",
    category: "Rocky Balboa (2006)",
    movie: "Rocky VI (2006)",
    icon: "award",
    videoId: "KGc-B-o2B6I",
    videoTitle: "Rocky Balboa – Davanti alla Commissione Pugilistica (HD ITA)"
  },
  {
    quote: "Quando sono venuto qui non sapevo cosa mi aspettava. Ho visto che molta gente mi odiava, e io... io non sapevo come la dovevo prendere. Ma durante questo incontro ho visto cambiare le cose: cioè quello che provavate per me e quello che io provavo per voi. Sul ring eravamo in due disposti a ucciderci l'un l'altro, ma penso che sia meglio così che venti milioni di persone! Quello che sto cercando di dire è che se io posso cambiare... e voi potete cambiare... TUTTO IL MONDO PUÒ CAMBIARE!",
    context: "Rocky IV (1985) – Il discorso di Mosca dopo aver battuto Ivan Drago sul ring sovietico (voce indimenticabile di Ferruccio Amendola).",
    category: "Rocky Classici (I - IV)",
    movie: "Rocky IV (1985)",
    icon: "sparkles",
    videoId: "NUtIjV3O58A",
    videoTitle: "Rocky IV – Il Discorso di Mosca: «Tutto il mondo può cambiare!» (HD ITA)"
  },
  {
    quote: "Domani... continuiamo domani?! Non esiste domani! Non esiste domani, Rocky! Non c'è nessun domani! Devi farlo adesso! Ci serve l'occhio della tigre, Rocky!",
    context: "Rocky III (1982) – Apollo Creed che scuote Rocky sulla spiaggia per ritrovare la fame del vero combattente (doppiaggio magistrale di Vittorio Di Prima).",
    category: "Rocky Classici (I - IV)",
    movie: "Rocky III (1982)",
    icon: "compass",
    videoId: "2lOEpoi4x7E",
    videoTitle: "Rocky III – Allenamento con Apollo sulla Spiaggia: «Non esiste domani!» (HD ITA)"
  },
  {
    quote: "Rocky: «Senti, stavo pensando: se tu vuoi che io non ci ricombatto con Creed, troveremo un altro sistema per tirare avanti, capito?» — Adriana: «C'è una cosa che voglio che tu faccia per me... Vieni qui... Vinci... Vinci!» — Mickey: «Che cosa stiamo aspettando?! Muoviamoci!»",
    context: "Rocky II (1979) – Il risveglio di Adriana in ospedale che dà a Rocky la benedizione e la carica per tornare sul ring contro Apollo (voci di Simona Izzo e Ferruccio Amendola).",
    category: "Rocky Classici (I - IV)",
    movie: "Rocky II (1979)",
    icon: "heart",
    videoId: "7WMyd7akN0Y",
    videoTitle: "Rocky II – Il Risveglio di Adriana: «Voglio che vinci!» (HD ITA)"
  },
  {
    quote: "Il mondo gli ha chiuso tutte le porte in faccia, ma lui ha deciso di abbatterle. Era così al verde da vendere il suo cane per 25 dollari solo per mangiare. Ha scritto Rocky in tre giorni e ha rifiutato offerte da capogiro pur di non vendere la sua anima e recitare nel film: preferiva morire di fame piuttosto che rinunciare al suo sogno. Non importa quante volte cadi, ma quante volte ti rialzi e continui ad andare avanti. È questo che fa di una persona un vincitore!",
    context: "Sylvester Stallone (1975) – Il rifiuto di 350.000 dollari per il copione pur di interpretare lui stesso Rocky sul grande schermo.",
    category: "La Vera Storia di Sly",
    movie: "Vita Reale",
    icon: "star",
    videoId: "WX9hJ7aDoH0",
    videoTitle: "Sylvester Stallone – Dal Nulla al Mito Mondiale (HD ITA)"
  }
];

let allQuotes = [...FALLBACK_QUOTES];
let activeCategoryFilter = 'all';
let searchQuery = '';
let toastTimeout = null;

document.addEventListener('DOMContentLoaded', async () => {
  // Inizializza icone Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

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
  // Caricamento Dati Citazioni per Generatore
  // ==========================================
  try {
    const res = await fetch('quotes.json?v=2.2.0');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        allQuotes = data;
      }
    }
  } catch (err) {
    console.info('Uso citazioni fallback autentiche:', err);
  }

  setupSearchAndFilters();
  setupQuoteActions();
  setupDailyQuoteGenerator(allQuotes);

  // ==========================================
  // Filtri Categorie & Ricerca Real-Time
  // ==========================================
  function filterVideoCards() {
    const cards = document.querySelectorAll('#videoGrid .video-card');
    const emptyState = document.getElementById('videoEmptyState');
    const emptyStateMsg = document.getElementById('emptyStateMsg');
    const query = searchQuery.trim().toLowerCase();

    let visibleCount = 0;

    cards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category') || '';
      const matchesCategory = (activeCategoryFilter === 'all' || cardCategory === activeCategoryFilter);

      const textContent = (card.innerText || '').toLowerCase();
      const matchesSearch = (query === '' || textContent.includes(query));

      if (matchesCategory && matchesSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.style.display = 'block';
        if (emptyStateMsg) {
          if (query) {
            emptyStateMsg.innerHTML = `Nessuna scena corrisponde a «<strong>${escapeHtml(query)}</strong>». Prova con termini come <em>Mickey</em>, <em>figlio</em>, <em>Adriana</em> o <em>Apollo</em>.`;
          } else {
            emptyStateMsg.textContent = `Nessuna scena presente per la categoria selezionata.`;
          }
        }
      } else {
        emptyState.style.display = 'none';
      }
    }
  }

  function setupSearchAndFilters() {
    const searchInput = document.getElementById('quoteSearch');
    const clearBtn = document.getElementById('clearSearchBtn');
    const resetBtn = document.getElementById('resetVideoFilterBtn');
    const filterButtons = document.querySelectorAll('#categoryFilters .filter-btn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        if (clearBtn) {
          clearBtn.style.display = searchQuery.length > 0 ? 'block' : 'none';
        }
        filterVideoCards();
      });
    }

    if (clearBtn && searchInput) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearBtn.style.display = 'none';
        searchInput.focus();
        filterVideoCards();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        searchQuery = '';
        activeCategoryFilter = 'all';
        if (searchInput) {
          searchInput.value = '';
          if (clearBtn) clearBtn.style.display = 'none';
        }
        filterButtons.forEach((b) => {
          const isAll = b.getAttribute('data-filter') === 'all';
          b.classList.toggle('active', isAll);
          b.setAttribute('aria-selected', isAll ? 'true' : 'false');
        });
        filterVideoCards();
      });
    }

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        activeCategoryFilter = btn.getAttribute('data-filter') || 'all';
        filterVideoCards();
      });
    });
  }

  // ==========================================
  // Azioni Citazioni: Copia & Condividi
  // ==========================================
  function setupQuoteActions() {
    const grid = document.getElementById('videoGrid');
    if (!grid) return;

    grid.addEventListener('click', (e) => {
      // 1. Copia negli appunti
      const copyBtn = e.target.closest('.btn-copy-quote');
      if (copyBtn) {
        const quote = copyBtn.getAttribute('data-quote') || '';
        const context = copyBtn.getAttribute('data-context') || '';
        const fullText = `«${quote}»\n– ${context}\n\n[Rocky Balboa Legacy: https://stallone-site.vercel.app]`;

        navigator.clipboard.writeText(fullText).then(() => {
          showToast('Citazione copiata negli appunti!', 'check-circle');
        }).catch(() => {
          showToast('Errore durante la copia della citazione', 'alert-circle');
        });
        return;
      }

      // 2. Condividi con Web Share API o fallback a copia
      const shareBtn = e.target.closest('.btn-share-quote');
      if (shareBtn) {
        const quote = shareBtn.getAttribute('data-quote') || '';
        const context = shareBtn.getAttribute('data-context') || '';
        if (navigator.share) {
          navigator.share({
            title: 'Sylvester Stallone & Rocky Balboa Legacy',
            text: `«${quote}» – ${context}`,
            url: window.location.href
          }).catch((err) => {
            if (err.name !== 'AbortError') {
              copyToClipboardDirect(`«${quote}»\n– ${context}`);
            }
          });
        } else {
          copyToClipboardDirect(`«${quote}»\n– ${context}`);
        }
      }
    });
  }

  function copyToClipboardDirect(text) {
    const fullText = `${text}\n\n[Rocky Balboa Legacy: https://stallone-site.vercel.app]`;
    navigator.clipboard.writeText(fullText).then(() => {
      showToast('Testo copiato per la condivisione!', 'share-2');
    }).catch(() => {
      showToast('Impossibile copiare il testo', 'alert-circle');
    });
  }

  // ==========================================
  // Generatore Citazione del Giorno
  // ==========================================
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

// ==========================================
// Toast Notification Utility
// ==========================================
function showToast(message, iconName = 'check-circle') {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;

  const oldIcon = toast.querySelector('.toast-icon');
  if (oldIcon) {
    const newIcon = document.createElement('i');
    newIcon.setAttribute('data-lucide', iconName);
    newIcon.className = 'toast-icon';
    toast.replaceChild(newIcon, oldIcon);
    if (window.lucide) lucide.createIcons();
  }

  toast.classList.add('show');

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// ==========================================
// Utility: Sanitizzazione HTML & Attributi
// ==========================================
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttribute(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
