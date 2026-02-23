# ManAdviser — Intermediar Allianz Țiriac

Platformă digitală de intermediere asigurări pentru polițele Allianz Țiriac cu frontend React și backend .NET 8.

**🎯 Partener exclusiv**: Allianz Țiriac Asigurări S.A.  
**🏢 Activitate**: Intermediere polițe de asigurare (nu reasigurare)  
**📄 Autorizație ASF**: [numărul autorizației]

## 📚 Documentation

- **[Complete Documentation](docs/README.md)** - Overview of all documentation
- **[Product Backlog](docs/product/PRODUCT_BACKLOG.md)** - User stories, sprint planning, and requirements
- **[Business Analysis](docs/business/)** - Market research and business strategy
- **[Technical Docs](docs/technical/)** - Architecture, API, and development guides

## Project Overview

### Categorii Allianz Țiriac Disponibile
- 🚗 Asigurări Auto (RCA, CASCO)
- 🏠 Asigurări Locuință
- ❤️ Asigurări de Viață
- 🏥 Asigurări de Sănătate
- ✈️ Asigurări de Călătorie
- 💼 Asigurări Business

---

## Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS
- React Router v6
- Axios for API calls
- React Hook Form for forms
- react-i18next for translations
- Zustand for state management

### Backend
- ASP.NET Core 10
- Entity Framework Core
- SQL Server / PostgreSQL
- JWT Authentication
- Swagger/OpenAPI documentation

### Database
- SQL Server (LocalDB) / PostgreSQL
- Entity Framework Core ORM

## Installation & Setup

### Prerequisites
- Node.js 18+
- .NET 8+ SDK
- SQL Server / PostgreSQL

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

### Backend Setup
```bash
cd InsuranceAPI
dotnet restore
dotnet ef database update
dotnet run
```
Backend API runs on: http://localhost:5000
Swagger UI: http://localhost:5000/swagger

## API Endpoints

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/{id}` - Get category by ID

### Policies
- `GET /api/policies` - Get all policies
- `GET /api/policies?categoryId=1` - Get policies by category
- `GET /api/policies/{id}` - Get policy by ID
- `POST /api/policies` - Create policy (Admin)
- `PUT /api/policies/{id}` - Update policy (Admin)
- `DELETE /api/policies/{id}` - Delete policy (Admin)

### Quotes
- `GET /api/quotes` - Get all quotes
- `POST /api/quotes/calculate` - Calculate price
- `POST /api/quotes` - Create quote
- `PUT /api/quotes/{id}/status` - Update quote status

### Contacts
- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create contact
- `PUT /api/contacts/{id}/read` - Mark as read
- `DELETE /api/contacts/{id}` - Delete contact

## Project Structure

### Frontend
```
frontend/
├── src/
│   ├── components/
│   │   ├── common/ (Navbar, Footer, Breadcrumb)
│   │   ├── home/ (Hero, Features, Categories)
│   │   ├── products/ (ProductList, Card, Filter)
│   │   ├── calculator/ (PriceCalculator)
│   │   ├── contact/ (ContactForm)
│   │   └── admin/ (Admin components)
│   ├── pages/ (Home, Products, Calculator, Contact, About, NotFound)
│   ├── context/ (Auth, Language)
│   ├── services/ (API calls)
│   ├── i18n/ (Translations RO/EN)
│   ├── utils/ (Helpers, constants)
│   ├── styles/ (Global CSS, Tailwind)
│   └── App.jsx
└── package.json
```

### Backend
```
InsuranceAPI/
├── Models/ (Policy, Quote, Contact, User, Category)
├── Controllers/ (API endpoints)
├── Data/ (DbContext, migrations)
├── Services/ (Business logic)
├── DTOs/ (Data transfer objects)
├── Program.cs (Configuration)
└── InsuranceAPI.csproj
```

## Database Schema

### PolicyCategory
- Id, Name_Ro, Name_En, Description_Ro, Description_En, Icon, Order, CreatedAt

### Policy
- Id, Name, Type, Description_Ro, Description_En, BasePrice, Coverage, CategoryId, Details_Ro, Details_En, IsActive, CreatedAt, UpdatedAt

### Quote
- Id, Email, PolicyId, PersonalDataJson, CalculatedPrice, Status, CreatedAt

### Contact
- Id, FullName, Email, Phone, Message, Subject, IsRead, CreatedAt

### User (Admin)
- Id, Email, PasswordHash, FirstName, LastName, Role, IsActive, CreatedAt, LastLogin

## Configuration

### Environment Variables

**.env** (Frontend)
```
VITE_API_URL=http://localhost:5000/api
```

**appsettings.json** (Backend)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=InsuranceDb;..."
  },
  "Jwt": {
    "Secret": "your-secret-key",
    "Issuer": "InsuranceAPI",
    "ExpirationMinutes": 1440
  }
}
```

## Features Implementation

### Phase 1: Foundation (Completed)
- ✅ Project structure
- ✅ Database models & migrations
- ✅ API controllers (CRUD)
- ✅ React pages and components
- ✅ Tailwind CSS styling
- ✅ i18n translations (RO/EN)

### Phase 2: Completed ✅
- ✅ JWT Authentication (configured & working)
- ✅ Email Service (SendGrid ready with templates)
- ✅ FluentValidation (DTO validation)
- ✅ Admin Panel (fully functional)
- ✅ FontAwesome icons integration

### Phase 3: Future
- ⏳ Testing (Jest, NUnit)
- ⏳ Performance optimization
- ⏳ Deployment setup
- ⏳ API documentation
- ⏳ Analytics integration

## Development

### Running Both Services
```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd InsuranceAPI
dotnet run
```

### Build for Production
```bash
# Frontend
npm run build

# Backend
dotnet publish -c Release
```

## Testing

### Frontend Tests
```bash
npm test
```

### Backend Tests
```bash
dotnet test
```

## Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
# Deploy 'dist' folder
```

### Backend Deployment (Azure/AWS)
```bash
dotnet publish -c Release -o ./publish
# Upload to cloud service
```

## Color Scheme
- Primary: #007ab3 (Professional Blue)
- Accent: #00a0d2 (Light Blue)
- Success: #28a745 (Green)
- Warning: #ffc107 (Yellow)
- Danger: #dc3545 (Red)
- Background: #f5f5f5 (Light Gray)
- Text: #333333 (Dark Gray)

## Contributing
Please submit pull requests to the main branch.

## License
Proprietary - InsurePro Insurance Platform

## Support
For issues and questions, contact: support@insurepro.ro

---

**Last Updated:** February 13, 2026
**Version:** 0.1.0 (Initial Setup)
