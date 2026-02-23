# ManAdviser Insurance Platform — Product Backlog

> **Product**: ManAdviser — Intermediar Allianz Țiriac  
> **Date**: 2026-02-23  
> **Product Owner**: Mada (PO)  
> **Stack**: React (Vite) + .NET 8 API, Bilingual (RO/EN)  
> **Business Model**: Intermediar exclusiv pentru Allianz Țiriac Asigurări S.A.  
> **Parteneri**: Andreea Mandrea, Marius Nica | Fondat 2003  

---

## Summary Table

| ID | Story | Epic / Sprint | Points | Priority |
|----|-------|---------------|--------|----------|
| MA-001 | Remove mock/fallback data — full API connection | Sprint 1 — Critical Fixes | 8 | Critical |
| MA-002 | GDPR cookie consent banner | Sprint 1 — Critical Fixes | 5 | Critical |
| MA-003 | Privacy policy page | Sprint 1 — Critical Fixes | 3 | Critical |
| MA-004 | GDPR data deletion capability | Sprint 1 — Critical Fixes | 5 | Critical |
| MA-005 | Brand rename: InsurePro → ManAdviser | Sprint 1 — Critical Fixes | 3 | Critical |
| MA-006 | SEO meta tags & Open Graph | Sprint 2 — Growth Enablers | 5 | High |
| MA-007 | Sitemap.xml & robots.txt | Sprint 2 — Growth Enablers | 2 | High |
| MA-008 | Analytics integration (Google Analytics / Plausible) | Sprint 2 — Growth Enablers | 3 | High |
| MA-009 | WhatsApp / click-to-call floating button | Sprint 2 — Growth Enablers | 3 | High |
| MA-010 | Automated email confirmations (quotes & contacts) | Sprint 2 — Growth Enablers | 5 | High |
| MA-011 | Email notification to admin on new submissions | Sprint 2 — Growth Enablers | 3 | High |
| MA-012 | Client portal — registration & login | Sprint 3 — Client Experience | 8 | Medium |
| MA-013 | Client portal — view my quotes & status | Sprint 3 — Client Experience | 5 | Medium |
| MA-014 | Document upload on quote forms | Sprint 3 — Client Experience | 8 | Medium |
| MA-015 | Policy comparator (side-by-side) | Sprint 3 — Client Experience | 8 | Medium |
| MA-016 | Realistic price calculator | Sprint 4 — Product Enhancement | 8 | Medium |
| MA-017 | Dedicated quote forms per category | Sprint 4 — Product Enhancement | 13 | Medium |
| MA-018 | Blog / educational content system | Sprint 4 — Product Enhancement | 13 | Medium |
| MA-019 | Online payments (Netopia / Stripe) | Backlog — Long Term | 13 | Low |
| MA-020 | Digital signature for policy issuance | Backlog — Long Term | 13 | Low |
| MA-021 | Auto-renewal system | Backlog — Long Term | 8 | Low |
| MA-022 | Advanced analytics dashboard (admin) | Backlog — Long Term | 8 | Low |
| MA-023 | AI chatbot for customer support | Backlog — Long Term | 13 | Low |
| MA-024 | JWT security — httpOnly cookies + CSRF | Security (Cross-cutting) | 5 | Critical |
| | **TOTAL** | | **162** | |

---

## SPRINT 1 — Critical Fixes

### Epic: Platform Stability & Compliance

---

### MA-001 — Remove Mock/Fallback Data — Full API Connection

**As a** site visitor,  
**I want** to see real insurance data from the ManAdviser database,  
**so that** I can trust the information and make informed decisions based on actual products and pricing.

**Story Points**: 8  
**Priority**: Critical

**Context / Technical Notes**:
- `Home.jsx` (line ~31): catch block populates 6 mock categories when `/api/categories` fails
- `Products.jsx`: catch blocks populate mock categories and policies
- `Calculator.jsx` (line ~24): catch block loads 3 hardcoded mock policies; calculation fallback uses `basePrice × 1.1`
- `QuoteForm.jsx` (line ~41): catch block loads mock policies array when `/api/policies/:id` fails
- In production, if the API is down or misconfigured, users see fabricated data with no indication it is fake

**Acceptance Criteria**:

- [ ] **AC1**: Given the API is healthy, When any page loads (Home, Products, Calculator, QuoteForm), Then all data displayed comes exclusively from API responses
- [ ] **AC2**: Given the API returns an error, When the user is on any page, Then a user-friendly error state is displayed (e.g., "Serviciu temporar indisponibil / Service temporarily unavailable") instead of mock data
- [ ] **AC3**: Given the API is unreachable, When the Calculator page loads, Then the calculate button is disabled and a message explains that the service is unavailable
- [ ] **AC4**: All hardcoded mock data arrays are removed from `Home.jsx`, `Products.jsx`, `Calculator.jsx`, and `QuoteForm.jsx`
- [ ] **AC5**: A reusable error component is created that displays bilingual error messages (RO/EN)
- [ ] **AC6**: Console logs like `'Using mock data for categories'` are removed from production builds
- [ ] **AC7**: Unit tests confirm that error states render correctly when API calls fail

---

### MA-002 — GDPR Cookie Consent Banner

**As a** website visitor,  
**I want** to be informed about cookie usage and give my explicit consent,  
**so that** the platform complies with EU/Romanian GDPR regulations and I can control my data.

**Story Points**: 5  
**Priority**: Critical

**Acceptance Criteria**:

- [ ] **AC1**: Given a first-time visitor, When they land on any page, Then a cookie consent banner is displayed at the bottom of the screen with options: "Accept All", "Reject Non-Essential", and "Manage Preferences"
- [ ] **AC2**: Given the user clicks "Manage Preferences", When the preferences modal opens, Then they can toggle categories: Essential (always on, greyed out), Analytics, Marketing
- [ ] **AC3**: Given the user has made a consent choice, When they revisit the site, Then the banner does not reappear and their preferences are remembered (stored in a cookie with 12-month expiry)
- [ ] **AC4**: Given the user rejects analytics cookies, When browsing the site, Then no third-party analytics scripts are loaded
- [ ] **AC5**: The banner is displayed in the current site language (RO or EN) using the i18n system
- [ ] **AC6**: A "Cookie Settings" link is available in the footer to modify preferences at any time

---

### MA-003 — Privacy Policy Page

**As a** website visitor,  
**I want** to read a clear privacy policy,  
**so that** I understand how my personal data (name, email, phone, CNP, address) is collected, used, and protected.

**Story Points**: 3  
**Priority**: Critical

**Acceptance Criteria**:

- [ ] **AC1**: Given a visitor navigates to `/privacy` or `/politica-confidentialitate`, When the page loads, Then a comprehensive privacy policy is displayed
- [ ] **AC2**: The privacy policy includes: data controller identity (ManAdviser, Andreea Mandrea & Marius Nica), types of data collected, purpose of processing, legal basis, retention periods, third-party sharing, user rights (access, rectification, deletion, portability), contact information for DPO/complaints
- [ ] **AC3**: The policy is available in both Romanian and English, toggling with the site language switch
- [ ] **AC4**: A link to the privacy policy is present in the site footer
- [ ] **AC5**: The cookie consent banner includes a link to the privacy policy
- [ ] **AC6**: All forms (Contact, Quote, RCA) display a mandatory checkbox: "Am citit și accept Politica de Confidențialitate / I have read and accept the Privacy Policy" with a link to the policy page
- [ ] **AC7**: Forms cannot be submitted without the privacy policy checkbox being checked

---

### MA-004 — GDPR Data Deletion Capability

**As a** registered user or form submitter,  
**I want** to request deletion of my personal data,  
**so that** I can exercise my GDPR "right to be forgotten."

**Story Points**: 5  
**Priority**: Critical

**Acceptance Criteria**:

- [ ] **AC1**: Given a user, When they navigate to the privacy policy or contact page, Then they see a "Request Data Deletion" / "Solicită ștergerea datelor" option
- [ ] **AC2**: Given a user submits a data deletion request (providing their email), When the request is received, Then the system creates a deletion request record and sends a confirmation email
- [ ] **AC3**: Given an admin views the admin dashboard, When there are pending deletion requests, Then they are listed with requester email, date, and an "Execute Deletion" action
- [ ] **AC4**: Given an admin executes a deletion, When confirmed, Then all personal data (contacts, quotes) associated with that email is permanently removed from the database
- [ ] **AC5**: A new API endpoint `DELETE /api/gdpr/delete-request` is available for submitting requests
- [ ] **AC6**: A new API endpoint `DELETE /api/gdpr/execute/{requestId}` is available for admin execution (requires authentication)
- [ ] **AC7**: Deletion is logged for audit purposes (timestamp, admin who executed, email deleted — but NOT the personal data itself)

---

### MA-005 — Brand Rename: InsurePro → ManAdviser

**As a** business stakeholder,  
**I want** all references to "InsurePro" replaced with "ManAdviser" across the entire platform,  
**so that** the brand is consistent and credible.

**Story Points**: 3  
**Priority**: Critical

**Context / Technical Notes** (confirmed references):
- `en.json` line 64: `about.historyText1` — "InsurePro has grown from..." → Should be "ManAdviser"
- `ro.json` line 64: `about.historyText1` — "InsurePro a crescut de la..." → Should be "ManAdviser"  
- `en.json` / `ro.json` line 123: `contact.emailAddress` — `info@insurepro.ro` → Should be `info@manadviser.ro`
- `Footer.jsx` line 14: `<h3>InsurePro</h3>` → Should be "ManAdviser"
- `Footer.jsx` line 46: `Email: info@insurepro.ro` → Update domain
- `Footer.jsx` line 57: `© {currentYear} InsurePro` → "© {currentYear} ManAdviser - Intermediar autorizat Allianz Țiriac"  
- `Navbar.jsx` line 38: `alt="InsurePro Logo"` → "ManAdviser Logo"
- `EmailService.cs` line 36: `fromName ?? "InsurePro"` → "ManAdviser" 
- All email templates should include "Intermediar autorizat Allianz Țiriac"

**Acceptance Criteria**:

- [ ] **AC1**: Given a text search for "InsurePro" (case-insensitive), When run across the entire codebase, Then zero results are returned
- [ ] **AC2**: All translation files (`en.json`, `ro.json`) use "ManAdviser" in all text values
- [ ] **AC3**: Footer component displays "ManAdviser" as the brand name and correct email/domain
- [ ] **AC4**: Navbar logo alt text reads "ManAdviser Logo"
- [ ] **AC5**: Email templates in `EmailService.cs` display "ManAdviser" in headers, footers, and sender name
- [ ] **AC6**: `README.md` references "ManAdviser" in license and support sections
- [ ] **AC7**: Email addresses updated to `info@manadviser.ro`, `noreply@manadviser.ro`, `support@manadviser.ro` (or confirmed correct domain)
- [ ] **AC8**: Visual regression test confirms the brand name displays correctly on Home, About, Contact, and Footer

---

## SPRINT 2 — Growth Enablers

### Epic: Discoverability & Engagement

---

### MA-006 — SEO Meta Tags & Open Graph

**As a** potential customer searching for insurance in Romania,  
**I want** the ManAdviser website to appear in Google search results with rich previews and relevant titles,  
**so that** I can discover the platform and understand that we're an authorized Allianz Țiriac intermediary before clicking.

**Story Points**: 8 (increased from 5 pentru implementation comprehensivă)  
**Priority**: High

**Business Context**: SEO este critic pentru acquisitioned organică. Competiția (Groupama, Omniasig) are avantaj masiv în SEO. ManAdviser are Domain Authority 0 dar poate câștiga prin nișă Allianz Țiriac + conținut optimizat local.

**Target Keywords**:  
- Primary: "asigurare rca" (12,100/lună), "casco online" (8,900/lună)  
- Brand: "asigurari allianz tiriac" (1,300/lună), "allianz tiriac rca pret" (320/lună)  
- Local: "asigurari auto bucuresti" (1,200/lună)  

**Acceptance Criteria**:

- [ ] **AC1**: Given any page on the site, When viewed in page source, Then it contains unique `<title>`, `<meta name="description">`, and `<meta name="keywords">` tags specific to that page's content and target keywords
- [ ] **AC2**: Given the homepage, When viewed, Then the title follows pattern: "Asigurări Auto și Locuință cu Allianz Țiriac | ManAdviser" (includes primary keywords + brand)
- [ ] **AC3**: Given any page URL is shared on social media, When preview is generated, Then Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`) produce rich card with ManAdviser + Allianz Țiriac branding
- [ ] **AC4**: Given the RCA page, When indexed by Google, Then title is "RCA Online cu Allianz Țiriac - Cotație în 2 Minute | ManAdviser" and description contains "calculați", "allianz țiriac", "manadviser", "intermediar autorizat"
- [ ] **AC5**: React Helmet Async is implemented and used on all route-level components (Home, Products, Calculator, Contact, About)
- [ ] **AC6**: All meta descriptions are 150-160 characters optimal length and bilingual-aware (change with active language)
- [ ] **AC7**: Structured data (JSON-LD) for `LocalBusiness` + `FinancialService` schema is included on homepage with: business name, address, founding year (2003), founders, partner (Allianz Țiriac), services offered
- [ ] **AC8**: Canonical URLs are set for all pages to prevent duplicate content issues

---

### MA-007 — Sitemap.xml & robots.txt

**As a** search engine crawler,  
**I want** a properly structured `sitemap.xml` and `robots.txt`,  
**so that** all public pages are indexed efficiently.

**Story Points**: 2  
**Priority**: High

**Acceptance Criteria**:

- [ ] **AC1**: Given a crawler requests `/sitemap.xml`, When the response is received, Then it returns a valid XML sitemap listing all public routes: `/`, `/about`, `/products`, `/calculator`, `/contact`, and product category pages
- [ ] **AC2**: Given a crawler requests `/robots.txt`, When the response is received, Then it allows all public pages and disallows `/admin/*`
- [ ] **AC3**: The sitemap includes `<lastmod>`, `<changefreq>`, and `<priority>` for each URL
- [ ] **AC4**: The sitemap is referenced in `robots.txt` via `Sitemap:` directive
- [ ] **AC5**: Both files are served as static assets from the `public/` directory

---

### MA-008 — Analytics Integration

**As a** business owner (Andreea / Marius),  
**I want** website traffic and user behavior tracked,  
**so that** I can measure conversions, identify popular products, and make data-driven decisions.

**Story Points**: 3  
**Priority**: High

**Acceptance Criteria**:

- [ ] **AC1**: Given a user has accepted analytics cookies (see MA-002), When they browse the site, Then Google Analytics 4 (or Plausible/Umami) tracks page views
- [ ] **AC2**: Given the user has rejected analytics cookies, When they browse the site, Then no analytics scripts are loaded
- [ ] **AC3**: Custom events are tracked for: quote form submission, contact form submission, RCA form submission, calculator usage, phone number click
- [ ] **AC4**: The analytics tracking ID is configured via environment variable (`VITE_GA_TRACKING_ID`), not hardcoded
- [ ] **AC5**: Analytics data is accessible via the chosen provider's dashboard
- [ ] **AC6**: A basic conversion funnel is configured: Visit → Product View → Quote Request → (future) Purchase

---

### MA-009 — WhatsApp / Click-to-Call Floating Button

**As a** potential customer browsing the site,  
**I want** a visible floating button for WhatsApp and phone contact,  
**so that** I can instantly reach an advisor without navigating to the contact page.

**Story Points**: 3  
**Priority**: High

**Acceptance Criteria**:

- [ ] **AC1**: Given a user is on any page, When they see the bottom-right corner, Then a floating action button (FAB) is visible with a phone/WhatsApp icon
- [ ] **AC2**: Given a user clicks the FAB, When the menu expands, Then two options appear: "WhatsApp" (opens `wa.me/<number>` with a pre-filled message) and "Call" (opens `tel:<number>`)
- [ ] **AC3**: On mobile devices, the FAB is appropriately sized (min 48×48px touch target) and does not overlap other critical UI elements
- [ ] **AC4**: The phone number and WhatsApp number are configurable (not hardcoded) — sourced from translation files or environment config
- [ ] **AC5**: The WhatsApp pre-filled message is bilingual: "Bună ziua, aș dori informații despre asigurări." (RO) / "Hello, I'd like information about insurance." (EN)
- [ ] **AC6**: The FAB has a subtle entrance animation and is accessible (keyboard navigable, has `aria-label`)
- [ ] **AC7**: Given a user clicks WhatsApp on desktop, Then it opens WhatsApp Web; on mobile, it opens the WhatsApp app

---

### MA-010 — Automated Email Confirmations (Quotes & Contacts)

**As a** customer who submits a quote request or contact form,  
**I want** to receive an immediate email confirmation,  
**so that** I know my request was received and what to expect next.

**Story Points**: 5  
**Priority**: High

**Context / Technical Notes**:
- `EmailService.cs` has `SendQuoteConfirmationAsync` and `SendContactConfirmationAsync` methods but:
  - SendGrid key defaults to placeholder `"your-sendgrid-api-key"`
  - SMTP sending is commented out (`// await client.SendMailAsync(message);`)
  - Service returns `true` in dev mode without actually sending
- Email templates still reference "InsurePro" (covered by MA-005)

**Acceptance Criteria**:

- [ ] **AC1**: Given a customer submits a quote request, When the API processes it successfully, Then an email is sent to the customer's provided email with: subject "Confirmarea Cotației — ManAdviser", customer name, policy name, estimated price, and next-steps text
- [ ] **AC2**: Given a customer submits the contact form, When the API processes it successfully, Then an email is sent to the customer with: subject "Am primit mesajul dumneavoastră — ManAdviser", their name, and a response time estimate (e.g., 24 hours)
- [ ] **AC3**: The email service is configured with a working provider (SendGrid, SMTP, or similar) in the production environment
- [ ] **AC4**: Email sending failure does not block the API response to the user (async, non-blocking)
- [ ] **AC5**: Email templates are professional, mobile-responsive HTML, and use ManAdviser branding
- [ ] **AC6**: Given the email service is down, When a form is submitted, Then the submission is still saved and the failure is logged for retry

---

### MA-011 — Email Notification to Admin on New Submissions

**As an** admin (Andreea or Marius),  
**I want** to receive an email notification when a new quote request or contact form is submitted,  
**so that** I can respond promptly and not miss any leads.

**Story Points**: 3  
**Priority**: High

**Acceptance Criteria**:

- [ ] **AC1**: Given a new quote request is submitted, When the API saves it, Then an email is sent to the configured admin email address(es) with: customer name, email, phone, policy name, and submitted data
- [ ] **AC2**: Given a new contact form is submitted, When the API saves it, Then an email is sent to admin with: sender name, email, phone, subject, and message
- [ ] **AC3**: Admin notification emails include a direct link to the admin dashboard filtered to the new submission
- [ ] **AC4**: The admin email address(es) are configurable via `appsettings.json` (not hardcoded)
- [ ] **AC5**: Given multiple admins are configured, When a submission comes in, Then all configured admins receive the notification

---

## SPRINT 3 — Client Experience

### Epic: Customer Self-Service

---

### MA-012 — Client Portal: Registration & Login

**As a** potential customer,  
**I want** to create an account on ManAdviser,  
**so that** I can track my quote requests and manage my insurance interactions digitally.

**Story Points**: 8  
**Priority**: Medium

**Context / Technical Notes**:
- Currently only admin login exists (`AuthController.cs`)
- `User` model exists but only has admin role
- Need a separate customer role/flow

**Acceptance Criteria**:

- [ ] **AC1**: Given a visitor, When they click "Contul meu" / "My Account", Then they see options to Register or Log In
- [ ] **AC2**: Given a new user, When they fill in the registration form (name, email, phone, password), Then an account is created and a verification email is sent
- [ ] **AC3**: Given a registered user, When they verify their email and log in, Then they are redirected to a customer dashboard
- [ ] **AC4**: Given a logged-in customer, When they navigate, Then the navbar shows their name and a "Logout" option
- [ ] **AC5**: The `User` model is extended with a `Role` field (Admin / Customer) and appropriate authorization guards are applied
- [ ] **AC6**: Customer registration requires accepting the Privacy Policy (link to MA-003)
- [ ] **AC7**: Password requirements: minimum 8 characters, at least 1 uppercase, 1 number, 1 special character
- [ ] **AC8**: A "Forgot Password" flow is available with email-based reset

---

### MA-013 — Client Portal: View My Quotes & Status

**As a** registered customer,  
**I want** to see all my quote requests and their current status,  
**so that** I don't need to call or email to check on progress.

**Story Points**: 5  
**Priority**: Medium

**Acceptance Criteria**:

- [ ] **AC1**: Given a logged-in customer, When they navigate to "Cotațiile mele" / "My Quotes", Then they see a list of all their submitted quote requests sorted by date (newest first)
- [ ] **AC2**: Each quote displays: policy name, submission date, current status (Received / In Review / Offer Sent / Accepted / Rejected), and estimated price (if calculated)
- [ ] **AC3**: Given an admin updates a quote status in the admin dashboard, When the customer refreshes their portal, Then the updated status is reflected
- [ ] **AC4**: Given a quote has status "Offer Sent", When the customer views it, Then they see the final offer details and can accept or request changes
- [ ] **AC5**: Quotes are associated with the customer's authenticated account (by email match or user ID foreign key)
- [ ] **AC6**: The quote list is filterable by status and category

---

### MA-014 — Document Upload on Quote Forms

**As a** customer requesting an insurance quote,  
**I want** to upload required documents (ID, vehicle registration, inspection certificate, etc.),  
**so that** my request can be processed faster without back-and-forth emails.

**Story Points**: 8  
**Priority**: Medium

**Context / Technical Notes**:
- RCA form (`RCAForm.jsx`) collects vehicle/personal data but has no file upload fields
- Insurance typically requires: buletin/CI, certificat de înmatriculare, ITP (inspecție tehnică periodică)

**Acceptance Criteria**:

- [ ] **AC1**: Given a user is on the RCA form or any quote form, When they reach the documents step, Then they see file upload fields for relevant documents
- [ ] **AC2**: Accepted file types: PDF, JPG, JPEG, PNG. Maximum file size: 5 MB per file. Maximum 5 files per submission
- [ ] **AC3**: Given a user selects a file, When the file exceeds 5 MB or is an invalid type, Then a bilingual error message is shown and the upload is rejected
- [ ] **AC4**: Given a user uploads documents, When the form is submitted, Then files are stored securely (Azure Blob Storage / local encrypted storage) and linked to the quote record
- [ ] **AC5**: Given an admin views a quote in the dashboard, When the quote has attached documents, Then they can download each document
- [ ] **AC6**: Uploaded documents are scanned for basic security (file type validation, no executable content)
- [ ] **AC7**: A new API endpoint `POST /api/quotes/{id}/documents` handles multipart file uploads
- [ ] **AC8**: GDPR: uploaded documents are deleted when a data deletion request is executed (see MA-004)

---

### MA-015 — Policy Comparator (Side-by-Side)

**As a** customer browsing insurance products,  
**I want** to compare 2–3 policies side by side within the same category,  
**so that** I can easily evaluate differences in price, coverage, and features.

**Story Points**: 8  
**Priority**: Medium

**Acceptance Criteria**:

- [ ] **AC1**: Given a user is on the Products page viewing a category, When they click "Compare" on a policy card, Then the policy is added to a comparison tray (max 3)
- [ ] **AC2**: Given 2 or 3 policies are selected, When the user clicks "Compare Selected", Then a comparison view displays them in columns with aligned rows: Price, Coverage, Features, Category, and a "Request Quote" CTA per column
- [ ] **AC3**: Given the user tries to add a 4th policy, When they click "Compare", Then a toast message says "Maximum 3 policies. Remove one to add another." (bilingual)
- [ ] **AC4**: Given the user tries to compare policies from different categories, When they add a conflicting policy, Then a warning says "You can only compare policies within the same category." (bilingual)
- [ ] **AC5**: The comparison view highlights the differences (e.g., lowest price in green, missing coverage in red)
- [ ] **AC6**: The comparison tray persists while browsing the Products page but clears on navigation away
- [ ] **AC7**: On mobile, the comparison view is scrollable horizontally with sticky policy headers

---

## SPRINT 4 — Product Enhancement

### Epic: Product Depth & Content

---

### MA-016 — Realistic Price Calculator

**As a** potential customer,  
**I want** an insurance price calculator that considers real factors (age, vehicle type, experience, zone, etc.),  
**so that** I get a credible estimate that helps me plan my budget.

**Story Points**: 8  
**Priority**: Medium

**Context / Technical Notes**:
- Current formula in `Calculator.jsx` (line ~52): `calculatedPrice: basePrice * 1.1` — trivially simple
- No server-side calculation logic; the mock catch block does the "calculation"

**Acceptance Criteria**:

- [ ] **AC1**: Given a user selects an Auto/RCA policy, When they fill in the calculator form, Then they must provide: age, driving experience (years), vehicle type (sedan/SUV/truck/motorcycle), engine size (cc), county/zone, claims history (0/1/2+ in last 5 years)
- [ ] **AC2**: Given a user selects a Home policy, When they fill in the form, Then they provide: property type, area (sqm), construction year, city/zone
- [ ] **AC3**: Given valid inputs, When the user clicks "Calculate", Then the API computes a price using a weighted formula considering all provided factors and returns a price range (min–max estimate) rather than a single number
- [ ] **AC4**: The calculator clearly states: "Prețul este estimativ / This is an estimate" with a CTA to request a formal quote
- [ ] **AC5**: Calculation logic is server-side (new endpoint `POST /api/calculator/estimate`) — not in the frontend
- [ ] **AC6**: Given invalid or missing inputs, When the user clicks "Calculate", Then validation errors are displayed inline
- [ ] **AC7**: The calculator UI shows a visual breakdown (e.g., base price + age factor + zone factor = total)

---

### MA-017 — Dedicated Quote Forms per Category

**As a** customer requesting a quote for Home, Life, Health, Travel, or Business insurance,  
**I want** a form tailored to my insurance category,  
**so that** I provide the right information upfront and get a faster, more accurate response.

**Story Points**: 13  
**Priority**: Medium

**Context / Technical Notes**:
- Only Auto/RCA has a dedicated multi-step form (`RCAForm.jsx`)
- Other 5 categories use a generic simple form in `Products.jsx` (fullName, email, phone, age, address, additionalInfo)

**Acceptance Criteria**:

- [ ] **AC1 — Home (Locuință)**: Form collects: property type (apartment/house), area (sqm), construction year, address, number of rooms, security features (alarm, fire extinguisher), desired coverage level
- [ ] **AC2 — Life (Viață)**: Form collects: date of birth, smoker status, occupation, desired coverage amount, beneficiary info, existing health conditions
- [ ] **AC3 — Health (Sănătate)**: Form collects: date of birth, pre-existing conditions (checklist), desired coverage (hospitalization, dental, optical), number of persons, employer/individual
- [ ] **AC4 — Travel (Călătorii)**: Form collects: destination(s), travel dates (departure/return), number of travelers, purpose (tourism/business), adventure sports (yes/no), pre-existing conditions
- [ ] **AC5 — Business (Business)**: Form collects: company name, CUI, industry, number of employees, desired coverage types (property, liability, fleet, key-person), revenue range
- [ ] **AC6**: Each form follows the same multi-step UX pattern as the existing RCA form (progress bar, prev/next, summary before submit)
- [ ] **AC7**: All forms are bilingual (RO/EN) with field labels and validation messages in both languages
- [ ] **AC8**: All forms include the Privacy Policy consent checkbox (MA-003)
- [ ] **AC9**: Form data is saved via the existing `POST /api/quotes` endpoint with a `categoryId` and structured `additionalInfo` JSON
- [ ] **AC10**: Admin dashboard displays the category-specific fields when viewing a quote

---

### MA-018 — Blog / Educational Content System

**As a** business stakeholder,  
**I want** a blog section where we can publish educational articles about insurance,  
**so that** we improve SEO rankings, build authority, and educate potential customers.

**Story Points**: 13  
**Priority**: Medium

**Acceptance Criteria**:

- [ ] **AC1**: Given a visitor navigates to `/blog`, When the page loads, Then they see a list of published blog posts with: title, excerpt, author, date, category tag, and featured image
- [ ] **AC2**: Given a visitor clicks a blog post, When the post page loads, Then the full article is displayed with proper typography, images, and a "Related Posts" section
- [ ] **AC3**: Given an admin, When they access the admin dashboard, Then they have a "Blog" section to create, edit, publish, unpublish, and delete posts
- [ ] **AC4**: Blog post editor supports: title, slug, body (rich text / markdown), featured image upload, category tag (Insurance Tips, News, Guide), language (RO/EN or both), SEO meta title and description
- [ ] **AC5**: Blog posts have proper SEO: unique title tags, meta descriptions, Open Graph tags, canonical URLs
- [ ] **AC6**: Blog listing supports pagination (10 posts per page) and filtering by category
- [ ] **AC7**: A new `BlogPost` model and `BlogPostsController` are created in the .NET API
- [ ] **AC8**: Blog posts are accessible in both languages; articles can be linked as RO↔EN translations

---

## BACKLOG — Long Term

### Epic: Advanced Features

---

### MA-019 — Online Payments (Netopia / Stripe)

**As a** customer who has received a quote offer,  
**I want** to pay for my insurance policy directly online,  
**so that** I can complete the purchase without visiting an office.

**Story Points**: 13  
**Priority**: Low

**Acceptance Criteria**:

- [ ] **AC1**: Given a customer has an accepted quote, When they click "Pay Now", Then they are redirected to a secure payment gateway (Netopia for RON, Stripe as alternative)
- [ ] **AC2**: Given a successful payment, When the gateway callback is received, Then the quote status is updated to "Paid" and a receipt is sent via email
- [ ] **AC3**: Given a failed/cancelled payment, When the user returns, Then the quote status remains unchanged and they can retry
- [ ] **AC4**: Payment amounts match the quoted price exactly; no price manipulation is possible client-side
- [ ] **AC5**: PCI-DSS compliance: no card data touches ManAdviser servers — handled entirely by the payment gateway
- [ ] **AC6**: Payment history is visible in the client portal and admin dashboard
- [ ] **AC7**: Refund capability is available through the admin dashboard

---

### MA-020 — Digital Signature for Policy Issuance

**As a** customer,  
**I want** to sign my insurance policy electronically,  
**so that** I can complete the entire process 100% online without printing or visiting an office.

**Story Points**: 13  
**Priority**: Low

**Acceptance Criteria**:

- [ ] **AC1**: Given a customer has paid for a policy, When the admin generates the policy document, Then the customer receives an email with a link to digitally sign
- [ ] **AC2**: The digital signature solution complies with Romanian eIDAS regulations for electronic signatures
- [ ] **AC3**: Given the customer signs, When the signature is verified, Then the policy PDF is finalized with the embedded signature and stored
- [ ] **AC4**: Both parties (customer and ManAdviser) receive the signed document via email
- [ ] **AC5**: Integration with a qualified electronic signature provider (e.g., DocuSign, certSIGN Romania)

---

### MA-021 — Auto-Renewal System

**As a** customer with an existing policy,  
**I want** to be notified before my policy expires and easily renew it,  
**so that** I don't have gaps in coverage.

**Story Points**: 8  
**Priority**: Low

**Acceptance Criteria**:

- [ ] **AC1**: Given a policy is expiring in 30 days, When the daily cron job runs, Then a reminder email is sent to the customer with policy details and a "Renew Now" link
- [ ] **AC2**: A second reminder is sent at 14 days and a final one at 7 days before expiration
- [ ] **AC3**: Given a customer clicks "Renew Now", When they confirm, Then a new quote is pre-filled with previous policy data and submitted for processing
- [ ] **AC4**: Admin dashboard shows a list of policies expiring in the next 30/60/90 days
- [ ] **AC5**: Given a customer has auto-renewal enabled, When the policy approaches expiration, Then the system automatically generates a renewal quote

---

### MA-022 — Advanced Analytics Dashboard (Admin)

**As an** admin,  
**I want** a dashboard with charts showing business metrics,  
**so that** I can track performance, identify trends, and optimize operations.

**Story Points**: 8  
**Priority**: Low

**Acceptance Criteria**:

- [ ] **AC1**: Given an admin logs into the dashboard, When they view the analytics section, Then they see: total quotes (this month, trend vs last month), conversion rate (quote → paid), revenue, top categories by volume
- [ ] **AC2**: Charts include: line chart (quotes over time), bar chart (quotes by category), pie chart (status distribution), funnel (visit → quote → payment)
- [ ] **AC3**: Date range filter is available (last 7 days, 30 days, 90 days, custom range)
- [ ] **AC4**: Data is fetched via new API endpoints: `GET /api/analytics/summary`, `GET /api/analytics/quotes-over-time`, `GET /api/analytics/by-category`
- [ ] **AC5**: Dashboard is responsive and loads within 2 seconds

---

### MA-023 — AI Chatbot for Customer Support

**As a** website visitor,  
**I want** to ask questions about insurance products via a chat widget,  
**so that** I can get instant answers without waiting for a human response.

**Story Points**: 13  
**Priority**: Low

**Acceptance Criteria**:

- [ ] **AC1**: Given a visitor is on any page, When they click the chat icon, Then a chat widget opens in the bottom-right corner
- [ ] **AC2**: The chatbot can answer FAQs about: insurance categories, required documents, quote process, contact info, office hours
- [ ] **AC3**: Given the chatbot cannot answer a question, When the user persists, Then the conversation is escalated to a human with a "Leave your contact info" form
- [ ] **AC4**: The chatbot operates in both Romanian and English
- [ ] **AC5**: Chat history is stored for analytics and quality improvement
- [ ] **AC6**: Integration with Azure OpenAI or similar LLM service with a knowledge base of ManAdviser products

---

## SECURITY — Cross-Cutting

### Epic: Security Hardening

---

### MA-024 — JWT Security: httpOnly Cookies + CSRF Protection

**As a** platform operator,  
**I want** JWT tokens stored securely in httpOnly cookies instead of localStorage,  
**so that** the admin panel and future client portal are protected against XSS and token theft.

**Story Points**: 5  
**Priority**: Critical

**Context / Technical Notes**:
- Current implementation stores JWT in `localStorage` (visible to any JS on the page, vulnerable to XSS)
- `AuthController.cs` returns the token in the response body; frontend stores it manually
- Need to migrate to `Set-Cookie` with `httpOnly`, `Secure`, `SameSite=Strict`

**Acceptance Criteria**:

- [ ] **AC1**: Given a user logs in, When authentication succeeds, Then the JWT is set as an `httpOnly`, `Secure`, `SameSite=Strict` cookie by the server — NOT returned in the JSON response body
- [ ] **AC2**: Given a logged-in user makes API requests, When the browser sends the request, Then the JWT cookie is automatically included and validated by the server middleware
- [ ] **AC3**: Given the frontend, When making authenticated API requests, Then it uses `withCredentials: true` on Axios and does NOT read/write tokens from `localStorage`
- [ ] **AC4**: CSRF protection is implemented: the server generates a CSRF token (sent as a non-httpOnly cookie or response header), and the frontend includes it in a custom header (`X-CSRF-TOKEN`) on state-changing requests (POST, PUT, DELETE)
- [ ] **AC5**: Given an XSS payload is injected, When it tries to access `document.cookie` or `localStorage`, Then it cannot retrieve the JWT (httpOnly prevents JS access)
- [ ] **AC6**: Logout endpoint clears the JWT cookie with `Set-Cookie: token=; Max-Age=0; httpOnly; Secure; SameSite=Strict`
- [ ] **AC7**: All existing admin functionality continues to work with the new auth mechanism
- [ ] **AC8**: Token expiration is validated server-side; expired cookies result in a 401 response

---

## Velocity & Sprint Planning Notes

| Sprint | Total Points | Duration (suggested) | Focus |
|--------|-------------|---------------------|-------|
| Sprint 1 | 29 | 2 weeks | Stability, legal compliance, brand |
| Sprint 2 | 24 | 2 weeks | Discoverability, engagement, leads |
| Sprint 3 | 29 | 2–3 weeks | Customer self-service |
| Sprint 4 | 34 | 3 weeks | Product depth, content |
| Backlog | 55 | Future sprints | Advanced features |
| Security | 5 | Parallel with Sprint 1 | Cross-cutting |
| **Total** | **162** | | |

> **Note**: Sprint 1 includes MA-024 (Security) as a parallel track since it's Critical and enables safe deployment. Sprint capacity assumes ~30 points/sprint for a small team. Adjust based on actual velocity.

---

## Dependencies

```
MA-002 (Cookie Banner) ──► MA-008 (Analytics) — analytics must respect consent
MA-003 (Privacy Policy) ──► MA-012 (Client Registration) — registration requires privacy acceptance
MA-004 (Data Deletion) ──► MA-014 (Document Upload) — deletion must include uploaded files
MA-005 (Brand Rename) ──► MA-010 (Email Confirmations) — emails must show correct brand
MA-010 (Email Confirm) ──► MA-011 (Admin Notify) — same email infrastructure
MA-012 (Registration) ──► MA-013 (My Quotes) — requires authenticated customer
MA-013 (My Quotes)    ──► MA-019 (Payments) — payment linked to quote
MA-019 (Payments)     ──► MA-020 (Digital Signature) — sign after payment
```

---

*Generated by Mada (PO Agent) — 2026-02-23*
