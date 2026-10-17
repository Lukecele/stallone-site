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

## ⚖️ Note Legali, Licenza Gratuita & Diritto d'Autore

- **Licenza di Utilizzo Gratuito (MIT License)**: Il codice sorgente dell'interfaccia grafica e dell'applicazione web è distribuito gratuitamente sotto [Licenza MIT](LICENSE). Chiunque è libero di consultare, studiare, copiare, biforcare (*fork*) e riutilizzare il codice per scopi legittimi e non commerciali.
- **Natura del Progetto (100% No-Profit)**: Questo sito web è un'opera no-profit ad uso culturale, cinematografico, commemorativo e didattico, priva di qualsiasi finalità commerciale, monetizzazione o scopo di lucro.
- **Assoluta Assenza di Rivendicazione di Copyright su Sylvester Stallone e Rocky**: Il nome e l'immagine di Sylvester Stallone, i personaggi di Rocky Balboa e Rambo, i marchi e i dialoghi cinematografici appartengono inderogabilmente ed esclusivamente a **Sylvester Stallone**, **Balboa Productions**, **Metro-Goldwyn-Mayer Studios Inc. (MGM)** e **United Artists Corporation**. Sanctuary / Stallone-Site e il suo autore **non rivendicano alcun diritto d'autore o proprietà intellettuale** su tali opere.
- **Diritto di Citazione (Art. 70 L. 633/1941 & Direttiva UE 2001/29/CE)**: Le frasi, i monologhi e i riferimenti filmici sono riportati in conformità all'art. 70 della Legge 633/1941 sul diritto d'autore e ai principi del *Fair Use*, per finalità illustrative, didattiche e di critica cinematografica. L'uso dell'immagine avviene ai sensi degli artt. 96 e 97 L. 633/1941 (personaggio di notorietà pubblica per fini culturali).
- **Incorporamento Video (YouTube IFrame API)**: I video sono incorporati tramite player ufficiale YouTube in conformità alla giurisprudenza della Corte di Giustizia dell'Unione Europea (*sentenze Svensson C-466/12 e BestWater C-348/13*). Nessun file multimediale risiede sui server del sito.
- **Notice & Take Down**: I titolari dei diritti possono richiedere in qualsiasi momento la modifica o rimozione tempestiva scrivendo a `luca.celebrano1@gmail.com` o aprendo una segnalazione su [GitHub Issues](https://github.com/Lukecele/stallone-site/issues). Per i dettagli legali completi consultare [LEGAL.md](LEGAL.md).

---

## 👤 Autore & Contatti

Realizzato da [@Lukecele](https://github.com/Lukecele).
- **Sito Live**: [https://stallone-site.vercel.app](https://stallone-site.vercel.app)
- **Licenza**: [MIT License (Gratuita & No-Profit)](LICENSE)
