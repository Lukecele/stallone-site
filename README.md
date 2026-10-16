# 🥊 Sylvester Stallone & Rocky Balboa – Portale Motivazionale & Discorsi Storici

> *"«Non è importante come colpisci: l'importante è come sai resistere ai colpi, come incassi e se hai la forza di rialzarti. Così si vince!»"*  
> — **Rocky Balboa**

Un portale web e Progressive Web App (PWA) moderna, immersiva e curata nei dettagli, dedicata all'iconografia cinematografica di **Sylvester Stallone** e alla leggenda di **Rocky Balboa**: dai discorsi motivazionali più celebri alla filosofia del non mollare mai alla quindicesima ripresa.

[![Live Demo on Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://stallone-site.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg?style=for-the-badge)](LICENSE)

🌐 **Sito Live su Vercel**: [https://stallone-site.vercel.app](https://stallone-site.vercel.app)

---

## ✨ Funzionalità Principali

- **🥊 Database Citazioni & Discorsi Storici (`quotes.json`)**:
  - Dagli intramontabili monologhi di *Rocky Balboa (2006)* al celebre discorso al figlio, fino alle battute di *Rocky I*, *Rocky IV* e della saga cinematografica.
  - Filtri dinamici per categoria (*Resilienza*, *Motivazione*, *Ring*, *Lezioni di Vita*).
  - Generatore istantaneo di frasi casuali con feedback visivo.
  - Funzione copia negli appunti e condivisione rapida.
- **🎬 Hub Multimediale & Discorsi Iconici**:
  - Sezione dedicata all'ascolto e alla visione dei discorsi più toccanti della cinematografia mondiale.
- **📱 PWA & Pieno Supporto Offline**:
  - Service Worker (`sw.js`) per fruizione e lettura anche senza connessione internet.
  - Web App Manifest personalizzato installabile su smartphone (iOS/Android) e Desktop.
- **🎨 Design Cinematografico ad Alto Impatto**:
  - UI scura con accenti rossi cremisi e oro antico, atmospheric glow e texture visive.
  - Font epici e raffinati: *Cinzel*, *Plus Jakarta Sans* e *Playfair Display*.
  - Totalmente responsive con layout studiato per ogni dimensione di schermo.

---

## 🛠️ Tecnologie Utilizzate

- **HTML5 semantico** completo di Open Graph, Twitter Cards e metadati SEO.
- **CSS3 Vanilla**: grid e flexbox avanzati, variabili CSS, gradienti ed effetti glow.
- **JavaScript Vanilla (ES6+)**: gestione asincrona dati, interattività UI, player multimediale e PWA.
- **Lucide Icons**: libreria icone moderna e ultra-leggera.
- **Vercel**: hosting e continuous delivery globale.

---

## 🚀 Avvio Locale

Non ci sono librerie o bundler complessi da installare. Per eseguire il progetto in locale:

```bash
# Clona il repository
git clone https://github.com/Lukecele/stallone-site.git
cd stallone-site

# Avvia un web server rapido (es. con Python 3)
python3 -m http.server 8080

# Oppure con Node / npx
npx serve .
```

Visita `http://localhost:8080` nel tuo browser.

---

## 📁 Struttura del Progetto

```text
stallone-site/
├── assets/             # Icone, immagini storiche, poster e manifest
├── index.html          # Pagina web principale e hub multimediale
├── manifest.json       # Configurazione Progressive Web App
├── quotes.json         # Database JSON delle citazioni e dei discorsi
├── robots.txt          # Istruzioni per web crawlers
├── script.js           # Motore interattivo, filtri e gestione PWA
├── sitemap.xml         # Mappa URL per motori di ricerca
├── style.css           # Grafica cinematografica e animazioni responsive
└── sw.js               # Service Worker per caching e offline
```

---

## 👤 Autore & Contatti

Realizzato da [@Lukecele](https://github.com/Lukecele).
