# GDPR Compliance Guide — ManAdviser Insurance Platform

> **Prioritate**: 🔴 **CRITICĂ**  
> **Status**: ❌ **NON-COMPLIANT** (risc legal major)  
> **Deadline**: **Imediat** — înainte de lansarea în producție  

---

## 📋 Sumar Executiv

**ManAdviser** este **intermediar exclusiv pentru Allianz Țiriac** în vânzarea de polițe de asigurare (NU reasigurare). Platforma digitală **nu respectă în prezent GDPR** și poate face obiectul unei amenzi de până la **4% din cifra de afaceri anuală** sau **20 milioane EUR** (GDPR Art. 83). Această documentația detaliază pașii critici pentru conformitate.

### Riscuri Identificate

| Risc | Severitate | Potențial Prejudiciu |
|------|-----------|---------------------|
| 🚨 **Lipsă consimțământ pentru cookie-uri** | Critic | Amendă ANSPDCP: 10.000-20.000.000 RON |
| 🚨 **Fără politică de confidențialitate** | Critic | Plângeri cliente + reputație |
| 🚨 **Nu există dreptul la ștergere** | Critic | Amendă + litigii |
| ⚠️ **Date CNP fără protecție adecvată** | Mare | Protecția datelor sensibile |
| ⚠️ **Transferuri către Allianz nespecificate în forms** | Mare | Transparența partajării cu Allianz Țiriac |

---

## 🎯 Ce Date Personale Colectăm

### Formularul de Contact (`Contact.jsx`)
```javascript
// Date colectate:
{
  fullName: 'Ioan Popescu',        // Identificabil direct
  email: 'ioan@example.com',       // Identificabil direct  
  phone: '+40720123456',           // Identificabil direct
  subject: 'Asigurare auto',       // Comportament
  message: 'Vreau o ofertă...'     // Comportament + preferințe
}
```

### Formularul RCA (`RCAForm.jsx`)
```javascript
// Date personale standard:
{
  firstName: 'Ioan',
  lastName: 'Popescu', 
  email: 'ioan@example.com',
  phone: '+40720123456',
  
  // ⚠️ DATE SENSIBILE (atenție specială GDPR):
  cnp: '1234567890123',           // CNP = categorie specială (Art. 9 GDPR)
  
  // Date comportamentale:
  drivingExperience: 10,          // Profilare
  claimsHistory: 'Nu',            // Profilare risc
  previousInsurance: 'Da'         // Comportament financiar
}
```

### Formularul de Cotații (`QuoteForm.jsx`, `Calculator.jsx`)
```javascript
{
  fullName: 'Ioan Popescu',
  email: 'ioan@example.com', 
  phone: '+40720123456',
  age: 35,                        // Indirect derivat din CNP
  address: 'Str. Libertății 12'   // Locație precisă
}
```

### Cookie-uri și Tracking
```javascript
// Fără consimțământ explicit:
- localStorage (JWT admin)          // Date de autentificare
- sessionStorage                   // Date de sesiune
- Potențial Google Analytics       // Viitoare implementare
- Cookie-uri de sesiune            // Preferințe limbă
```

---

## ⚖️ Baza Legală GDPR

### Pentru ce folosim datele:

| Tip Date | Baza Legală | Articol GDPR | Operator |
|----------|-------------|--------------|----------|
| **Contact forms** | Consimțământ explicit | Art. 6(1)(a) | ManAdviser |
| **CNP în RCA** | Obligație legală (intermediere asigurări) | Art. 6(1)(c) + Art. 9(2)(b) | ManAdviser + Allianz Țiriac |
| **Cotații transmise către Allianz** | Executarea contractului de intermediere | Art. 6(1)(b) | Allianz Țiriac (operator independent) |
| **Email marketing ManAdviser** | Consimțământ activ | Art. 6(1)(a) | ManAdviser |
| **Cookie analytics** | Consimțământ granular | Art. 6(1)(a) | ManAdviser |
| **Admin JWT** | Obligație contractuală | Art. 6(1)(b) | ManAdviser |

### ⚠️ **CNP = Categorie Specială + Obligație Legală Intermediar** 
Confirm **Art. 9 GDPR** + **Legea 32/2000** (intermediari):  
- CNP-ul este necesar pentru **identificarea unică** în sistemele Allianz Țiriac
- Baza legală: **Art. 9(2)(b) GDPR** - "prelucrarea este necesară în scopuri legate de îndeplinirea de către operator sau de către persoana vizată a obligațiilor și a drepturilor specifice în domeniul dreptului muncii, al securității sociale și al protecției sociale"
- + **Obligație legală ASF** pentru intermediari autorizați
- Măsuri de securitate suplimentare obligatorii (criptare, acces restrictionat)

---

## 📝 Cerințe GDPR de Implementat

### 1. **Transparență și Informare** (Art. 13-14)

**OBLIGATORIU pe toate formularele:**

```html
☑️ Checkbox obligatoriu:
"Am citit și accept Politica de Confidențialitate și accept prelucrarea datelor personale în scopurile menționate, inclusiv transmiterea către Allianz Țiriac pentru procesarea polițelor"

⚠️ **Mandatory disclosure**: Formularele trebuie să specifice clar că datele vor fi transmise către Allianz Țiriac pentru emiterea polițelor.

📋 Informații clare:
- Cine suntem (ManAdviser - intermediar autorizat ASF)
- Partenerul nostru exclusiv (Allianz Țiriac Asigurări) 
- În ce scopuri prelucrăm datele (intermediere + lead generation)
- Că datele vor fi transmise către Allianz Țiriac pentru procesarea polițelor
- Baza legală pentru prelucrare  
- Cu cine le partajăm (Allianz Țiriac, furnizori IT UE, autorități)
- Cât timp le păstrăm
- Drepturile tale (acces, rectificare, ștergere, portabilitate)
- Că ai dreptul să contactezi direct și Allianz Țiriac pentru datele din polițele active
```

### 2. **Drepturile Subiecților de Date** (Art. 15-22)

| Drept | Implementare Tehnică | Deadline |
|-------|---------------------|----------|
| **Acces** | API endpoint `GET /api/gdpr/data-export/{email}` | 30 zile |
| **Rectificare** | Update prin admin panel + validare | 30 zile |
| **Ștergere** | `DELETE /api/gdpr/delete/{email}` + audit | 30 zile |
| **Portabilitate** | Export JSON/CSV structurat | 30 zile |
| **Opoziție** | Opt-out pentru marketing | Imediat |

### 3. **Cookie Consent** (ePrivacy + GDPR)

```javascript
// Categorii de cookie-uri:
{
  essential: true,        // Mereu permise (nu necesită consimțământ)
  analytics: false,       // Necesită consimțământ  
  marketing: false,       // Necesită consimțământ
  preferences: false      // Necesită consimțământ
}

// Opțiuni utilizator:
- "Accept toate"
- "Reject non-esențiale"  
- "Personalizează" (granular)
```

---

## 🛠️ Plan de Implementare Tehnică

### **FAZA 1: Urgent (săptămâna 1)**

#### A. Cookie Consent Banner
```javascript
// Componenta CookieBanner.jsx
import { useState, useEffect } from 'react';

const CookieBanner = () => {
  const [consent, setConsent] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  
  // Check stored consent
  useEffect(() => {
    const stored = localStorage.getItem('cookieConsent');
    if (!stored) setShowBanner(true);
    else setConsent(JSON.parse(stored));
  }, []);
  
  const handleAcceptAll = () => {
    const consentData = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
      version: '1.0'
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    setConsent(consentData);
    setShowBanner(false);
    
    // Load analytics scripts
    if (consentData.analytics) loadGoogleAnalytics();
  };
  
  return showBanner ? (
    <div className="cookie-banner">
      {/* UI implementation */}
    </div>
  ) : null;
};
```

#### B. Privacy Policy Page
```markdown
# Politica de Confidențialitate — ManAdviser

## 1. Operatorul de date
**ManAdviser** (Intermediar asigurări)  
Reprezentant prin: Andreea Mandrea, Marius Nica  
Adresa: [adresa completă]  
Email: privacy@manadviser.ro  
Telefon: [numărul de telefon]

**Partener exclusiv**: Allianz Țiriac Asigurări  
**Activitate**: Intermediere polițe de asigurare (NU reasigurare)  
**Autorizație ASF**: [numărul autorizației de intermediar]

## 2. Datele pe care le colectăm
- **Date de identificare**: nume, prenume, email, telefon
- **Date CNP**: pentru verificarea identității (obligatoriu legal - RCA)
- **Date tehnice**: IP, browser, sistem de operare
- **Cookie-uri**: pentru funcționalitatea site-ului

## 3. În ce scopuri prelucrăm datele
- **Intermedierea asigurărilor** (transmiterea către Allianz Țiriac)
- **Realizarea de pre-cotații** și estimări de preț
- **Comunicarea cu clienții** potențiali și existenți
- **Lead qualification** pentru Allianz Țiriac
- **Îndeplinirea obligațiilor legale** (ASF, raportări intermedieri)
- **Marketing direct** (cu consimțământ) pentru servicii proprii
- **Îmbunătățirea serviciilor** de intermediere

## 4. Baza legală
- Art. 6(1)(a) GDPR - consimțământ pentru marketing
- Art. 6(1)(b) GDPR - executarea contractului
- Art. 6(1)(c) GDPR - obligație legală (CNP pentru RCA)

## 5. Cu cine partajăm datele
- **Allianz Țiriac Asigurări** (partener exclusiv - toate cotațiile și polițele)
- Furnizorii de servicii IT (hosting securizat în UE)
- Autorități publice (la solicitare legală - ASF, ANSPDCP, ANAF)

⚠️ **Important**: Allianz Țiriac poate fi **operator de date independent** pentru procesarea polițelor propriu-zise, iar ManAdviser este **operator de date** pentru activitatea de intermediere și lead generation.

## 6. Cât timp păstrăm datele
- **Date de contact** (fără polită emisă): 3 ani de la ultima interacțiune
- **Cotații transmise către Allianz Țiriac**: conform legislației asigurărilor (10 ani) 
- **Date CNP**: conform Legii 32/2000 (pentru intermediari ASF) - 5 ani
- **Cookie-uri**: maxim 12 luni
- **Loguri sistem/audit**: 2 ani

⚠️ **Notă**: Pentru polițele efectiv subscrise prin Allianz Țiriac, aceștia devin operatori independenți cu propriile lor perioade de păstrare conform reglementărilor ASF.

## 7. Drepturile dumneavoastră
Aveți dreptul la:
- **Acces**: să aflați ce date avem despre dv.
- **Rectificare**: să corectați datele greșite  
- **Ștergere**: să cereți ștergerea datelor
- **Portabilitate**: să primiți datele în format electronic
- **Opoziție**: să vă opuneți prelucrării pentru marketing

Pentru exercitarea drepturilor: privacy@manadviser.ro

**⚠️ Important**: Pentru datele din polițele active Allianz Țiriac, puteți contacta direct:  
- Email: gdpr@allianztiriac.ro  
- Telefon: 021 206 6000

## 8. Contact DPO
Email: dpo@manadviser.ro

## 9. Autoritatea de supraveghere
ANSPDCP (Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal)
```

### **FAZA 2: Implementare Tehnică (săptămâna 2)**

#### A. GDPR API Endpoints

```csharp
// Controllers/GdprController.cs
[ApiController]
[Route("api/gdpr")]
public class GdprController : ControllerBase
{
    // Data export (Art. 15)
    [HttpGet("export/{email}")]
    public async Task<IActionResult> ExportUserData(string email)
    {
        var userData = new {
            contacts = await _context.Contacts.Where(c => c.Email == email).ToListAsync(),
            quotes = await _context.Quotes.Where(q => q.Email == email).ToListAsync(),
            exportDate = DateTime.UtcNow,
            dataController = "ManAdviser",
    businessModel = "Intermediar exclusiv Allianz Țiriac",
    note = "Pentru polițele active, contactați direct Allianz Țiriac: gdpr@allianztiriac.ro"
        };
        
        return Ok(userData);
    }
    
    // Right to deletion (Art. 17)
    [HttpPost("delete-request")]
    public async Task<IActionResult> RequestDeletion([FromBody] DeleteRequestDto request)
    {
        var deleteRequest = new DataDeletionRequest {
            Email = request.Email,
            RequestDate = DateTime.UtcNow,
            Status = "Pending"
        };
        
        _context.DataDeletionRequests.Add(deleteRequest);
        await _context.SaveChangesAsync();
        
        // Send confirmation email
        await _emailService.SendDeletionConfirmationAsync(request.Email);
        
        return Ok(new { message = "Cererea de ștergere a fost înregistrată" });
    }
    
    [HttpDelete("execute-deletion/{requestId}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ExecuteDeletion(int requestId)
    {
        var request = await _context.DataDeletionRequests.FindAsync(requestId);
        if (request == null) return NotFound();
        
        // Delete all user data
        var contacts = await _context.Contacts.Where(c => c.Email == request.Email).ToListAsync();
        var quotes = await _context.Quotes.Where(q => q.Email == request.Email).ToListAsync();
        
        _context.Contacts.RemoveRange(contacts);
        _context.Quotes.RemoveRange(quotes);
        
        // Mark request as completed
        request.Status = "Completed";
        request.ExecutedDate = DateTime.UtcNow;
        request.ExecutedBy = User.Identity.Name;
        
        await _context.SaveChangesAsync();
        
        // Log for audit
        _logger.LogInformation($"GDPR deletion executed for {request.Email} by {User.Identity.Name}");
        
        return Ok();
    }
}
```

#### B. Database Changes

```csharp
// Models/DataDeletionRequest.cs
public class DataDeletionRequest
{
    public int Id { get; set; }
    public string Email { get; set; }
    public DateTime RequestDate { get; set; }
    public string Status { get; set; } // Pending, Completed, Rejected
    public DateTime? ExecutedDate { get; set; }
    public string ExecutedBy { get; set; }
    public string Reason { get; set; }
}

// Migration
public partial class AddGdprSupport : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "DataDeletionRequests",
            columns: table => new
            {
                Id = table.Column<int>(nullable: false).Annotation("SqlServer:Identity", "1, 1"),
                Email = table.Column<string>(maxLength: 255, nullable: false),
                RequestDate = table.Column<DateTime>(nullable: false),
                Status = table.Column<string>(maxLength: 50, nullable: false),
                ExecutedDate = table.Column<DateTime>(nullable: true),
                ExecutedBy = table.Column<string>(maxLength: 100, nullable: true),
                Reason = table.Column<string>(maxLength: 500, nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_DataDeletionRequests", x => x.Id);
            });
            
        migrationBuilder.CreateIndex(
            name: "IX_DataDeletionRequests_Email",
            table: "DataDeletionRequests",
            column: "Email");
    }
}
```

### **FAZA 3: Frontend Updates (săptămâna 2)**

#### A. Updated Form Components

```jsx
// components/common/GdprConsent.jsx
const GdprConsent = ({ required = true, onChange }) => {
  const { t } = useTranslation();
  const [accepted, setAccepted] = useState(false);
  
  const handleChange = (checked) => {
    setAccepted(checked);
    onChange?.(checked);
  };
  
  return (
    <div className="gdpr-consent">
      <label className="flex items-start space-x-2">
        <input 
          type="checkbox" 
          checked={accepted}
          onChange={(e) => handleChange(e.target.checked)}
          required={required}
          className="mt-1"
        />
        <span className="text-sm text-gray-700">
          {t('forms.gdprConsent')}{' '}
          <Link to="/privacy" className="text-primary underline">
            {t('forms.privacyPolicy')}
          </Link>
          {' '}{t('forms.allianzDataSharing')}
          {required && <span className="text-red-500">*</span>}
        </span>
      </label>
    </div>
  );
};
```

#### B. Updated Translations

```json
// i18n/ro.json
{
  "gdpr": {
    "cookieBanner": {
      "title": "Respectăm confidențialitatea dvs.",
      "description": "Folosim cookie-uri pentru a vă oferi cea mai bună experiență. Puteți accepta toate cookie-urile sau le puteți personaliza.",
      "acceptAll": "Accept toate",
      "rejectNonEssential": "Reject non-esențiale", 
      "managePreferences": "Personalizează",
      "essential": "Esențiale",
      "analytics": "Analiză",
      "marketing": "Marketing"
    },
    "privacyPolicy": {
      "title": "Politica de Confidențialitate",
      "lastUpdated": "Ultima actualizare: {{date}}"
    },
    "dataRequest": {
      "title": "Solicitare Date Personale",
      "description": "Solicitați o copie a datelor personale pe care le avem despre dvs.",
      "submit": "Trimite Cererea",
      "email": "Adresa de email",
      "success": "Cererea a fost trimisă. Veți primi răspunsul în maxim 30 de zile."
    },
    "deleteRequest": {
      "title": "Ștergerea Datelor",
      "description": "Solicitați ștergerea completă a datelor personale.",
      "warning": "⚠️ Această acțiune este IREVERSIBILĂ",
      "confirm": "Confirm că vreau să-mi șterg toate datele",
      "submit": "Ștergere Definitivă",
      "success": "Cererea de ștergere a fost înregistrată."
    }
  },
  "forms": {
    "gdprConsent": "Am citit și accept",
    "privacyPolicy": "Politica de Confidențialitate", 
    "allianzDataSharing": "și accept transmiterea datelor către Allianz Țiriac pentru procesarea polițelor.",
    "required": "Acest câmp este obligatoriu",
    "email": "Adresa de email",
    "submit": "Trimite"
  }
}
```

---

## 📊 Audit și Monitoring

### Loguri GDPR
```csharp
// Services/GdprAuditService.cs
public class GdprAuditLog
{
    public DateTime Timestamp { get; set; }
    public string Action { get; set; } // DataAccess, DataDeletion, DataExport, ConsentUpdate
    public string Email { get; set; }
    public string IPAddress { get; set; }
    public string UserAgent { get; set; }
    public string Details { get; set; }
    public string LegalBasis { get; set; }
}

// Usage în controllers:
_auditService.Log(new GdprAuditLog {
    Action = "DataExport",
    Email = request.Email,
    IPAddress = HttpContext.Connection.RemoteIpAddress?.ToString(),
    Details = "User requested data export via /api/gdpr/export",
    LegalBasis = "Art. 15 GDPR - Right of access"
});
```

---

## ⚡ Timeline de Implementare

| Săptămâna | Taskuri | Responsabilitate |
|-----------|---------|------------------|
| **Săptămâna 1** | Cookie banner, Privacy policy page, Form updates | Frontend Developer |
| **Săptămâna 2** | GDPR API, Database migration, Email templates | Backend Developer |
| **Săptămâna 3** | Testing, Documentation, Legal review | QA + Legal |
| **Săptămâna 4** | Production deployment, Staff training | DevOps + Management |

---

## 💰 Costuri de Non-Compliance

### Potențialele Amenzi ANSPDCP România:

| Tip Încălcare | Amendă Minimă | Amendă Maximă |
|---------------|---------------|---------------|
| **Lipsă consimțământ cookie** | 10.000 RON | 20.000.000 RON |
| **Fără politică confidențialitate** | 5.000 RON | 10.000.000 RON |
| **Nu respectă dreptul la ștergere** | 10.000 RON | 20.000.000 RON |
| **Date sensibile (CNP) neprotejate** | 20.000.000 RON | **4% cifra afaceri** |

### Exemplu Real:
- **Orange România**: amendă 2.6 milioane RON pentru încălcări GDPR
- **eMAG**: amendă pentru cookie-uri fără consimțământ

---

## 🎯 Checklist Final de Compliance

### Până la Lansare:
- [ ] ✅ Cookie consent banner implementat și funcțional
- [ ] ✅ Politica de confidențialitate publicată la `/privacy` (cu secțiuni Allianz Țiriac)
- [ ] ✅ Toate formularele au checkbox GDPR obligatoriu (inclusiv transmitere Allianz)
- [ ] ✅ API endpoints pentru accesul la date (`/api/gdpr/export`)
- [ ] ✅ API endpoints pentru ștergerea datelor (`/api/gdpr/delete`)
- [ ] ✅ Email templates actualizate cu ManAdviser branding
- [ ] ✅ Proces de handling pentru cererile de ștergere
- [ ] ✅ Coordonare cu Allianz Țiriac pentru polițele active (cine răspunde la ce)
- [ ] ✅ Audit logging pentru toate acțiunile GDPR
- [ ] ✅ Testare completă pe toate fluxurile de utilizator
- [ ] ✅ **Autorizație ASF de intermediar verificată și afisabila**

### După Lansare (30 zile):
- [ ] ✅ Training staff pentru handling cereri GDPR
- [ ] ✅ Proceduri interne documentate
- [ ] ✅ Contact DPO stabilit
- [ ] ✅ Revizuire legală cu specialist GDPR România

---

## 🆘 Contact de Urgență

Pentru întrebări GDPR:
- **Legal/GDPR Specialist**: [recomand consultanță specializată]
- **ANSPDCP**: +40 318 158 200, anspdcp@dataprotection.ro
- **Ressources**: [gdpr.eu](https://gdpr.eu), [ANSPDCP.ro](https://anspdcp.ro)

---

*Document generat: 2026-02-23 | Versiune: 1.0 | Status: DRAFT pentru review legal*