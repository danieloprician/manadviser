# SEO Implementation Strategy — ManAdviser

> **Obiectiv**: Poziționare în Top 3 Google pentru keywords cheie de asigurări în România  
> **Target**: 6-12 luni pentru keywords principale  
> **Model**: Intermediar exclusiv Allianz Țiriac  
> **Data**: 2026-02-23  

---

## 🎯 Analiza Situației Actuale

### Status SEO Current
❌ **CRITIC**: SPA React fără SSR — Google indexează foarte puțin  
❌ **Lipsă meta tags**: Title, description, Open Graph  
❌ **Zero structured data**: Schema.org pentru business local  
❌ **Fără sitemap**: XML sitemap lipsește  
❌ **Fără Google Business**: Local presence inexistentă  
❌ **Zero backlinks**: Autoritate domeniu 0  

### Competitorii Principali (România)

| Competitor | DA (Domain Authority) | Keywords Estimate | Strong Points |
|------------|---------------------|------------------|---------------|
| **Groupama.ro** | 58 | 8,500+ | Leader piață, conținut vast |
| **Omniasig.ro** | 52 | 6,200+ | Tradiție, SEO local solid |
| **Asiggrup.ro** | 38 | 2,800+ | Broker multi-companii, blog activ |
| **Asigurari-rca.ro** | 35 | 4,100+ | Nișă RCA, comparator |
| **ManAdviser** | **0** | **0** | ❓ **Oportunitate clean slate** |

---

## 🔍 Keyword Research & Strategy

### Primary Keywords (Volume/Lună România)

| Keyword | Volume | Difficulty | Intent | Priority |
|---------|--------|------------|--------|----------|
| **"asigurare rca"** | 12,100 | 65 | Commercial | 🔴 High |
| **"casco online"** | 8,900 | 58 | Commercial | 🔴 High |
| **"asigurare locuinta"** | 4,400 | 45 | Commercial | 🟡 Medium |
| **"asigurari allianz tiriac"** | 1,300 | 35 | **Brand affinity** | 🔴 High |
| **"polita rca online"** | 6,700 | 52 | Transactional | 🔴 High |
| **"asigurare viata"** | 3,200 | 42 | Informational | 🟡 Medium |

### Long-tail Opportunities (Low Competition)

| Keyword | Volume | Difficulty | Șanse de Succes |
|---------|--------|------------|-----------------|
| **"allianz tiriac rca pret"** | 320 | 25 | Foarte mari ✅ |
| **"cum calcul asigurare auto"** | 890 | 30 | Mari ✅ |
| **"asigurare locuinta allianz"** | 170 | 20 | Foarte mari ✅ |
| **"polita casco allianz tiriac"** | 210 | 22 | Foarte mari ✅ |
| **"asigurari online bucuresti"** | 480 | 35 | Mari ✅ |

### Local SEO Keywords

```
"asigurari auto bucuresti"      (1,200/lună)
"agent allianz tiriac"          (650/lună)  
"broker asigurari bucuresti"    (420/lună)
"rca ieftin bucuresti"          (380/lună)
```

---

## ⚡ Quick Wins (0-30 zile)

### 1. Technical SEO Foundation

#### A. React SSR Implementation
```javascript
// Next.js migration sau React SSR manual
// Componente să randeze server-side pentru SEO

// pages/HomePage.tsx  
export async function getServerSideProps() {
  return {
    props: {
      seo: {
        title: "Asigurări Auto și Locuință cu Allianz Țiriac | ManAdviser",
        description: "Obțineți rapid o cotație pentru RCA, CASCO sau asigurare locuință prin ManAdviser, intermediar autorizat Allianz Țiriac. Prețuri competitive și consiliere expertă.",
        keywords: "asigurare rca, casco online, allianz tiriac, polita auto"
      }
    }
  };
}
```

#### B. Meta Tags per Page
```html
<!-- Homepage -->
<title>Asigurări Auto și Locuință cu Allianz Țiriac | ManAdviser</title>
<meta name="description" content="Obțineți rapid o cotație pentru RCA, CASCO sau asigurare locuință prin ManAdviser, intermediar autorizat Allianz Țiriac. Prețuri competitive și consiliere expertă.">
<meta name="keywords" content="asigurare rca, casco online, allianz tiriac, polita auto, asigurari bucuresti">

<!-- Products/RCA -->
<title>RCA Online cu Allianz Țiriac - Cotație în 2 Minute | ManAdviser</title>
<meta name="description" content="Calculați și cumpărați RCA online cu Allianz Țiriac prin ManAdviser. Prețuri transparente, procesare rapidă, consiliere expertise. Începeți acum!">

<!-- Calculator -->
<title>Calculator Preț Asigurare Auto - RCA și CASCO | ManAdviser</title>
<meta name="description" content="Calculați gratuit prețul asigurării auto (RCA sau CASCO) cu calculatorul Allianz Țiriac. Rezultat instant, fără obligații.">
```

#### C. Structured Data (Schema.org)
```json
// JSON-LD pentru homepage
{
  "@context": "https://schema.org",
  "@type": "FinancialService", 
  "name": "ManAdviser",
  "description": "Intermediar autorizat de asigurări pentru Allianz Țiriac",
  "url": "https://manadviser.ro",
  "logo": "https://manadviser.ro/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Adresa]",
    "addressLocality": "București",
    "addressCountry": "RO"
  },
  "telephone": "[Telefon]",
  "email": "info@manadviser.ro",
  "founder": ["Andreea Mandrea", "Marius Nica"],
  "foundingDate": "2003",
  "areaServed": "România",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Asigurări Allianz Țiriac",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Asigurare RCA"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Asigurare CASCO"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Asigurare locuință"}}
    ]
  }
}
```

### 2. Content Optimization

#### A. Homepage Copy SEO-Friendly
```markdown
# Asigurări Auto și Locuință cu Allianz Țiriac

**ManAdviser** este **intermediarul autorizat** pentru produsele de asigurare **Allianz Țiriac** în România. Obțineți rapid o **cotație RCA**, **CASCO** sau **asigurare locuință** cu consiliere expertă și prețuri competitive.

## De ce să alegeți Allianz Țiriac prin ManAdviser?

✅ **RCA online** în doar 2 minute  
✅ **CASCO complet** cu acoperire extinsă  
✅ **Asigurare locuință** cu prețuri transparente  
✅ **Intermediar autorizat ASF** cu experiență de 20+ ani  
✅ **Suport expert** pre și post-vânzare  

[OBȚINE COTAȚIE RCA →]
```

#### B. Landing Pages Specifice
- `/rca-online` - Optimizat pentru "asigurare rca" + "rca online"
- `/casco-allianz` - Pentru "casco online" + "allianz tiriac casco"  
- `/asigurare-locuinta` - Pentru "asigurare locuinta"
- `/calculator-asigurare` - Pentru "calculator rca" + "pret asigurare"

---

## 📝 Content Marketing Strategy (30-90 zile)

### Blog SEO-Optimized

#### A. Pillar Content (Authority Building)
```markdown
1. "Ghidul Complet RCA 2026: Tot Ce Trebuie să Știi"
   - Target: "ce este rca", "obligativitate rca", "amenzi rca"
   - 3,000+ words, comprehensive guide
   
2. "CASCO vs. RCA: Diferențe, Prețuri și Ce Să Alegi în 2026"  
   - Target: "diferenta casco rca", "ce acopera casco"
   - Comparison content, high engagement
   
3. "Cum Să Alegi Asigurarea de Locuință Potrivită în România"
   - Target: "asigurare locuinta obligatorie", "ce acopera"
   
4. "Întrebări Frecvente: Asigurații Allianz Țiriac în România"
   - Target: long-tail brand questions
```

#### B. Local Content  
```markdown
1. "Asigurări Auto în București: Ghid Complet 2026"
2. "Unde să-ți Faci RCA în Cluj-Napoca: Opțiuni și Prețuri" 
3. "Asigurări Locuință pentru Apartamente în Constanța"
4. "Ghid Asigurări pentru Tineri Șoferi în România"
```

#### C. Seasonal Content
```markdown
Q1 2026: "RCA 2026: Modificări Legislative și Impact asupra Prețurilor"
Q2 2026: "Asiguări de Călătorie pentru Vacanțele de Vară"  
Q3 2026: "Pregătește-ți Mașina pentru Iarnă: CASCO și Service"
Q4 2026: "Planificare Financiară 2027: Asigurări Esențiale"
```

---

## 🏗️ Technical SEO Roadmap

### FAZA 1: Foundation (Săptămâna 1-2)
```javascript
// 1. React-Helmet sau Next.js pentru meta tags
import { Helmet } from 'react-helmet-async';

const HomePage = () => (
  <>
    <Helmet>
      <title>Asigurări Auto și Locuință cu Allianz Țiriac | ManAdviser</title>
      <meta name="description" content="[Meta description]" />
      <meta property="og:title" content="[OG Title]" />
      <meta property="og:description" content="[OG Description]" />
      <meta property="og:image" content="[OG Image URL]" />
      <link rel="canonical" href="https://manadviser.ro/" />
    </Helmet>
    {/* Page content */}
  </>
);

// 2. Sitemap.xml generator
const generateSitemap = () => {
  const pages = ['/', '/rca-online', '/casco-allianz', '/asigurare-locuinta', '/calculator', '/contact', '/despre'];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map(page => `
        <url>
          <loc>https://manadviser.ro${page}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>${page === '/' ? '1.0' : '0.8'}</priority>
        </url>
      `).join('')}
    </urlset>`;
};
```

### FAZA 2: Performance (Săptămâna 3-4)
```javascript
// 3. Core Web Vitals optimization
// - Lazy loading pentru imagini
// - Bundle splitting
// - Critical CSS inline
// - Preload key resources

// 4. Robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://manadviser.ro/sitemap.xml
```

---

## 🌍 Local SEO Strategy

### 1. Google Business Profile
```json
{
  "businessName": "ManAdviser - Intermediar Asigurări Allianz Țiriac",
  "category": "Insurance Broker",
  "address": "[Adresa completă București]",
  "phone": "[Telefon]",
  "website": "https://manadviser.ro",
  "description": "Intermediar autorizat ASF pentru asigurările Allianz Țiriac. Specializați în RCA, CASCO, asigurări locuință și viață. Consiliere expertă și prețuri competitive.",
  "services": [
    "Asigurare RCA",
    "Asigurare CASCO", 
    "Asigurare locuință",
    "Asigurare viață",
    "Consultanță asigurări"
  ],
  "hours": "Luni-Vineri: 9:00-18:00"
}
```

### 2. Local Citations (NAP Consistency)
- **BizDirectory.ro**: Listare cu NAP consistent
- **Pagini Aurii**: Business listing
- **eDestine.ro**: Companii de asigurări  
- **RISCO.ro**: Director de asigurări
- **Registrul ASF**: Link oficial către listing

---

## 📊 Tracking & Analytics Setup

### 1. Google Analytics 4
```javascript
// Enhanced ecommerce pentru quote requests
gtag('event', 'begin_checkout', {
  'currency': 'RON',
  'value': 300,
  'items': [{
    'item_id': 'rca_allianz',
    'item_name': 'Asigurare RCA',
    'item_category': 'Auto Insurance',
    'quantity': 1,
    'price': 300
  }]
});

// Conversion tracking
gtag('event', 'conversion', {
  'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
  'value': 'quote_request'
});
```

### 2. Google Search Console
```yaml
# Key pages to monitor:
- Homepage: Branded keywords + "asigurari allianz"
- /rca-online: "asigurare rca", "rca online"  
- /calculator: "calculator asigurare", "pret rca"
- /casco-allianz: "casco online", "allianz casco"

# Key queries to track:
- Brand: "manadviser", "asigurari allianz tiriac"
- Product: "rca online", "casco allianz", "asigurare locuinta"
- Informational: "ce este rca", "cum calcul asigurare"
```

---

## 💰 Budget & Resource Allocation

### Investiție Estimată (primele 6 luni)

| Categorie | Cost/Lună | Detalii |
|-----------|-----------|---------|
| **SEO Tools** | 500 RON | Ahrefs/SEMrush, GSC |  
| **Content Creation** | 2,000 RON | Copywriter + blog articles |
| **Technical Development** | 3,000 RON | SSR, optimizări |
| **Local SEO** | 800 RON | Citations, GBP optimization |
| **Link Building** | 1,500 RON | Outreach, guest posts |
| **TOTAL/LUNĂ** | **7,800 RON** | |

### ROI Așteptat
- **Luna 3**: 500+ vizite organice/lună
- **Luna 6**: 2,000+ vizite organice/lună
- **Luna 12**: 5,000+ vizite organice/lună
- **Conversie estimate**: 2-3% quote requests din organic traffic

---

## 📅 Timeline & Milestones

### Mica 1-2: Technical Foundation
- [ ] SSR implementation (React/Next.js)
- [ ] Meta tags pentru toate paginile key
- [ ] Structured data implementation  
- [ ] Sitemap.xml + robots.txt
- [ ] Google Analytics 4 + Search Console

### Săptămâna 3-6: Content & Optimization
- [ ] Landing pages optimizate (/rca-online, /casco-allianz)
- [ ] Blog setup cu primul pillar article
- [ ] Google Business Profile complet
- [ ] Local citations (10+ directoare)  
- [ ] Core Web Vitals optimization

### Luna 2-3: Authority Building  
- [ ] 8-10 blog articles publicate
- [ ] Guest posting pe site-uri relevante
- [ ] Partnerships cu Allianz Țiriac pentru co-marketing
- [ ] Email outreach pentru backlinks
- [ ] Monthly SEO performance reviews

### Luna 4-6: Advanced Tactics
- [ ] Video content pentru produse
- [ ] Interactive tools (calculatoare avansate)  
- [ ] FAQ schema implementation
- [ ] Local SEO expansion la alte orașe
- [ ] Competitor content gap analysis

---

## 🎯 Success Metrics

### KPIs Principale

| Metric | Luna 1 | Luna 3 | Luna 6 | Luna 12 |
|--------|--------|--------|--------|---------|
| **Organic Traffic** | 100 | 500 | 2,000 | 5,000+ |
| **Keywords în Top 10** | 5 | 15 | 35 | 75+ |
| **Domain Authority** | 0 | 10 | 25 | 40+ |
| **Quote Requests (Organic)** | 2 | 10 | 40 | 100+ |
| **Local Pack Visibility** | 0% | 20% | 60% | 80% |

### Target Keywords Progress

| Keyword | Target Ranking | Luna 3 | Luna 6 | Luna 12 |
|---------|---------------|--------|--------|---------|
| "asigurari allianz tiriac" | Top 3 | 15 | 8 | 2 |
| "rca online" | Top 10 | 25 | 15 | 8 | 
| "casco allianz" | Top 5 | 12 | 6 | 3 |
| "intermediar asigurari bucuresti" | Top 3 | 20 | 10 | 2 |

---

## 🚀 Advanced Tactics (Luna 6+)

### 1. Content Hub Strategy
```markdown
# Hub: "Ghidul Complet al Asigurărilor în România" 
├── RCA: Tot ce trebuie să știi (pillar)
├── CASCO: Ghid complet de acoperire  
├── Locuință: Protejare optimă
├── Călătorii: Asigurări internaționale
├── Viață: Planificare financiară
└── Business: Protecția afacerii

# Interlinking strategic între pagini
# External links către Allianz Țiriac (authority boost)
```

### 2. Video SEO
```markdown  
# YouTube Channel: "ManAdviser Asigurări"
- "Cum să îți faci RCA online în 2 minute"
- "CASCO vs RCA: Ce să alegi pentru mașina ta?"
- "5 greșeli de evitat la asigurarea locuinței"
- "Testimoniale clienți ManAdviser"

# Embed videos pe landing pages relevante
# Transcripts pentru SEO value
```

### 3. Technical EEAT (Experience, Expertise, Authority, Trust)
```markdown
# Author bylines cu biografii expert
# Certificări ASF afișate prominent  
# Testimonien și reviews afișate
# About page detaliată cu istoricul firmei
# Contact information complet și verification
# SSL certificat + security badges
```

---

## ⚠️ Riști și Mitigation

### Riscuri Identificate

| Risc | Probabilitate | Impact | Mitigare |
|------|--------------|--------|-----------|
| **Google Algorithm Change** | Medie | Mare | Diversify traffic sources, focus pe EEAT |
| **Competiție agresivă Groupama/Omniasig** | Mare | Mare | Nișă pe Allianz Țiriac, long-tail keywords |
| **Modificări legislative ASF** | Mică | Mare | Monitor changes, update content prompt |
| **Technical SEO issues cu React** | Mare | Mare | Invest heavily în SSR, monitoring |
| **Penalizare pentru thin content** | Mică | Mare | Quality-first approach, avoid keyword stuffing |

### Backup Plans
1. **Paid Advertising** backup pentru traffic critical keywords
2. **Social Media** pentru traffic alternativ  
3. **Email Marketing** pentru nurturing leads independent de Google
4. **Partnerships** cu Allianz Țiriac pentru co-marketing

---

## 📞 Implementare Immediatată

### Săptămâna aceasta:
1. **MA-006 (SEO Meta Tags)** din Product Backlog - START acum!
2. **MA-007 (Sitemap + Robots)** - can be done in 1 day
3. **Google Business Profile** setup
4. **Content brief** pentru primul pillar article

### Responsabilități:
- **Developer**: SSR implementation, technical optimizations
- **Content Writer**: Blog content creation, copy optimization  
- **Marketing**: Local SEO, citations, Google Business Profile
- **Management**: Allianz partnerships, review coordination

---

*Următorul pas: Implementarea MA-006 și MA-007 din Sprint 2, apoi content creation pentru quick wins.*