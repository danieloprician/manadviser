# User Stories - Backend Implementation & Mock Data Elimination

> **Source**: Technical Analysis from [Backend Implementation Document](../technical/BACKEND_IMPLEMENTATION.md)  
> **Priority**: 🔴 **CRITICAL** - Sprint 1 Blocker  
> **Impact**: GDPR Compliance & Production Readiness  
> **Timeline**: 5-day Implementation (Feb 24-28, 2026)

---

## 📊 Epic Mapping & Story Overview

### Epic MA-100: Platform Reliability 
**Goal**: Eliminate mock data and establish reliable API-Database connectivity

| Story ID | Title | Points | Status |
|----------|-------|---------|--------|
| MA-101 | Real Insurance Data Display | 8 | 🔄 Ready |
| MA-102 | Persistent Database Configuration | 5 | 🔄 Ready |
| MA-103 | API Health Monitoring | 3 | 🔄 Ready |
| MA-104 | Seed Data Integration | 5 | 🔄 Ready |

### Epic MA-200: User Experience Enhancement
**Goal**: Transparent error handling and smooth user interactions

| Story ID | Title | Points | Status |
|----------|-------|---------|--------|
| MA-201 | Clear Error Messages | 5 | 🔄 Ready |
| MA-202 | Loading State Indicators | 3 | 🔄 Ready |
| MA-203 | Retry Mechanisms | 3 | 🔄 Ready |
| MA-204 | Empty State Handling | 2 | 🔄 Ready |

### Epic MA-300: Production Readiness
**Goal**: Deploy-ready configuration and monitoring

| Story ID | Title | Points | Status |
|----------|-------|---------|--------|
| MA-301 | Production Database Setup | 8 | 🔄 Ready |
| MA-302 | Environment Configuration | 3 | 🔄 Ready |
| MA-303 | Integration Testing Suite | 5 | 🔄 Ready |

---

## 🎯 Sprint 1 User Stories

### **MA-101: Real Insurance Data Display**
**Epic**: Platform Reliability | **Points**: 8 | **Priority**: P0

#### User Story
**As a** potential client visiting ManAdviser  
**I want** to see real Allianz Țiriac insurance categories and policies  
**So that** I can browse authentic product offerings and make informed insurance decisions

#### Background Context
Currently, when the API fails, users see mock data (generic "InsurePro" policies) instead of real Allianz Țiriac products, creating misleading information and poor user experience.

#### Acceptance Criteria

**AC1: Real Categories Display**
- **GIVEN** I visit the ManAdviser homepage
- **WHEN** the page loads
- **THEN** I should see 6 real insurance categories with Allianz Țiriac branding
- **AND** no mock/placeholder data should be visible

**AC2: Authentic Policy Information**
- **GIVEN** I browse the Products page
- **WHEN** I select a category (e.g., Auto Insurance)
- **THEN** I should see real policies like "RCA Allianz Țiriac" and "CASCO Complete Allianz Țiriac"
- **AND** pricing should reflect actual Allianz Țiriac rates
- **AND** policy descriptions should be in Romanian and English

**AC3: No Mock Data Fallbacks**
- **GIVEN** the API is functioning normally
- **WHEN** I interact with any product listings
- **THEN** all data should come from the database via API calls
- **AND** no "Using mock data" console messages should appear

#### Definition of Done
- [ ] Zero mock data usage in frontend components
- [ ] All categories and policies loaded from API calls
- [ ] Database contains real Allianz Țiriac product data
- [ ] Bilingual content (RO/EN) for all products
- [ ] Console logs clean of mock data warnings
- [ ] Manual testing confirms real data flow
- [ ] Cross-browser compatibility verified

#### Technical Implementation Notes
- Remove all `catch (error) { setData(MOCK_DATA); }` patterns
- Ensure `SeedInitialData()` populates Allianz Țiriac products
- Update policy descriptions to remove "InsurePro" references

---

### **MA-102: Persistent Database Configuration**
**Epic**: Platform Reliability | **Points**: 5 | **Priority**: P0

#### User Story
**As an** admin managing the ManAdviser platform  
**I want** database data to persist between API server restarts  
**So that** I don't lose configured policies, categories, or user data during development and testing

#### Background Context
The current InMemory database resets on every API restart, causing data loss and forcing reliance on mock data when seed data isn't properly initialized.

#### Acceptance Criteria

**AC1: Development Persistence**
- **GIVEN** I'm running the API in development mode
- **WHEN** I restart the API server
- **THEN** all insurance categories and policies should remain available
- **AND** no data should be lost between restarts

**AC2: Seed Data Initialization**
- **GIVEN** I start the API on a clean environment
- **WHEN** the application initializes
- **THEN** the database should be automatically seeded with 6 categories and 12+ policies
- **AND** seed data should include real Allianz Țiriac products

**AC3: Database File Creation**
- **GIVEN** I'm running in development mode
- **WHEN** the API starts for the first time
- **THEN** a SQLite file `insurance_dev.db` should be created in the project root
- **AND** subsequent starts should use the existing file

#### Definition of Done
- [ ] SQLite database configuration implemented
- [ ] `SeedInitialData()` called automatically on startup
- [ ] Database file persists between restarts
- [ ] Seed data includes authentic Allianz Țiriac products
- [ ] Development workflow doesn't require manual data entry
- [ ] Production configuration maintains SQL Server support

#### Technical Implementation Notes
- Replace InMemoryDatabase with UseSqlite for development
- Add database initialization in Program.cs
- Update connection strings in appsettings

---

### **MA-103: API Health Monitoring**
**Epic**: Platform Reliability | **Points**: 3 | **Priority**: P1

#### User Story
**As a** developer monitoring ManAdviser platform  
**I want** real-time API health status information  
**So that** I can quickly identify and resolve connectivity issues before users experience problems

#### Background Context
There's currently no way to verify if the API is responding correctly or if the database contains the expected data, making troubleshooting difficult when issues arise.

#### Acceptance Criteria

**AC1: Health Check Endpoint**
- **GIVEN** the API is running
- **WHEN** I call `GET /api/health`
- **THEN** I should receive a JSON response with status "healthy"
- **AND** the response should include database connection status
- **AND** the response should show counts of categories and policies

**AC2: Frontend Health Validation**
- **GIVEN** the frontend application loads
- **WHEN** the app initializes
- **THEN** an automatic health check should be performed
- **AND** any connection failures should be logged to the console
- **AND** users should be notified if the API is unavailable

**AC3: Unhealthy State Handling**
- **GIVEN** the database is unavailable
- **WHEN** I call the health endpoint
- **THEN** I should receive HTTP 500 status
- **AND** the response should indicate "unhealthy" status
- **AND** error details should be included for debugging

#### Definition of Done
- [ ] `/api/health` endpoint implemented
- [ ] Health check response includes database metrics
- [ ] Frontend automatic health validation
- [ ] Error states properly handled
- [ ] Health check logs useful debugging information

---

### **MA-104: Seed Data Integration**
**Epic**: Platform Reliability | **Points**: 5 | **Priority**: P0

#### User Story
**As a** business stakeholder ensuring accurate product representation  
**I want** the platform to display authentic Allianz Țiriac insurance products  
**So that** potential clients see accurate pricing, coverage, and product information aligned with our partnership

#### Background Context
The current seed data contains generic "InsurePro" branding and placeholder policy information that doesn't reflect our exclusive partnership with Allianz Țiriac.

#### Acceptance Criteria

**AC1: Authentic Product Catalog**
- **GIVEN** the database is seeded
- **WHEN** I browse any product category
- **THEN** all policies should clearly show "Allianz Țiriac" branding
- **AND** product names should be authentic (e.g., "RCA Allianz Țiriac", "CASCO Complete Allianz Țiriac")
- **AND** no "InsurePro" references should appear anywhere

**AC2: Realistic Pricing Structure**
- **GIVEN** I view policy details
- **WHEN** I check pricing information
- **THEN** Base prices should reflect realistic Romanian insurance market rates
- **AND** RCA should be priced around 280-400 RON annually
- **AND** CASCO should be priced around 800-1500 RON annually based on coverage

**AC3: Comprehensive Coverage Information**
- **GIVEN** I examine policy details
- **WHEN** I read coverage descriptions
- **THEN** RCA should mention legal compliance "conform legii"
- **AND** CASCO should detail specific coverages (furt, incendiu, vandalism, etc.)
- **AND** all descriptions should be available in both Romanian and English

#### Definition of Done
- [ ] All policy names include "Allianz Țiriac" branding
- [ ] Pricing reflects realistic market rates
- [ ] Coverage descriptions are comprehensive and accurate
- [ ] Bilingual content (RO/EN) for all policies
- [ ] No generic or placeholder policy information
- [ ] Seed data automatically populates on fresh installation

---

### **MA-201: Clear Error Messages**
**Epic**: User Experience Enhancement | **Points**: 5 | **Priority**: P1

#### User Story
**As a** user experiencing technical issues on ManAdviser  
**I want** clear, understandable error messages in my preferred language  
**So that** I know what went wrong and how to proceed, rather than seeing confusing technical errors

#### Background Context
Currently, when API calls fail, users either see mock data (hiding the problem) or technical error messages that don't provide actionable guidance.

#### Acceptance Criteria

**AC1: User-Friendly Error Messages**
- **GIVEN** an API call fails due to server issues
- **WHEN** I'm browsing insurance products
- **THEN** I should see a clear message like "Failed to load insurance products. Please try again."
- **AND** the message should be in Romanian or English based on my language selection
- **AND** no technical error details should be visible to me

**AC2: Actionable Error Guidance**
- **GIVEN** I encounter a connection error
- **WHEN** the error message is displayed
- **THEN** I should see specific actions I can take (e.g., "Refresh the page" or "Contact support")
- **AND** retry buttons should be provided where appropriate
- **AND** contact information should be easily accessible

**AC3: Different Error Types**
- **GIVEN** different types of failures occur
- **WHEN** I experience each type
- **THEN** timeout errors should show "Request timeout. Please check your connection."
- **AND** server errors should show "Server error. Please try again later."
- **AND** network errors should show appropriate connectivity guidance

#### Definition of Done
- [ ] User-friendly error messages in RO/EN
- [ ] Actionable guidance provided for each error type
- [ ] Technical details hidden from end users
- [ ] Retry mechanisms available where appropriate
- [ ] Error boundaries prevent app crashes
- [ ] Contact support options clearly available

---

### **MA-202: Loading State Indicators**
**Epic**: User Experience Enhancement | **Points**: 3 | **Priority**: P1

#### User Story
**As a** user browsing ManAdviser insurance products  
**I want** clear visual feedback when content is loading  
**So that** I understand the app is working and know to wait rather than clicking away

#### Background Context
With real API calls replacing mock data, there may be network delays that users need to understand through appropriate loading indicators.

#### Acceptance Criteria

**AC1: Loading Spinners**
- **GIVEN** I navigate to any page with API data
- **WHEN** the API request is in progress
- **THEN** I should see an appropriate loading spinner
- **AND** the spinner should be sized appropriately for the content area
- **AND** loading text should indicate what's being loaded (e.g., "Loading insurance products...")

**AC2: Skeleton Loading States**
- **GIVEN** I'm waiting for product lists to load
- **WHEN** the API request is in progress
- **THEN** I should see skeleton placeholders that match the expected content layout
- **AND** the transition from loading to content should be smooth
- **AND** no jarring layout shifts should occur

**AC3: Progressive Loading**
- **GIVEN** I'm on pages with multiple API calls
- **WHEN** some data loads before others
- **THEN** available content should be displayed immediately
- **AND** still-loading sections should show appropriate indicators
- **AND** the page should remain interactive where possible

#### Definition of Done
- [ ] Loading indicators on all API-dependent pages
- [ ] Appropriate sizing and positioning of loading elements
- [ ] Descriptive loading text
- [ ] Smooth transitions between loading and loaded states
- [ ] No layout shift during loading
- [ ] Progressive loading where applicable

---

### **MA-203: Retry Mechanisms**
**Epic**: User Experience Enhancement | **Points**: 3 | **Priority**: P2

#### User Story
**As a** user who encounters temporary connectivity issues  
**I want** the ability to retry failed operations  
**So that** I don't have to refresh the entire page or lose my progress when there are intermittent problems

#### Background Context
With the removal of mock data fallbacks, users need robust retry mechanisms to handle temporary API failures gracefully.

#### Acceptance Criteria

**AC1: Automatic Retry Logic**
- **GIVEN** an API call fails due to temporary network issues
- **WHEN** the failure is detected as potentially temporary (timeout, 502, 503)
- **THEN** the system should automatically retry up to 3 times with exponential backoff
- **AND** users should see "Retrying..." indicators during automatic retries
- **AND** manual retry options should remain available

**AC2: Manual Retry Buttons**
- **GIVEN** I encounter an error that prevents content from loading
- **WHEN** the error message is displayed
- **THEN** I should see a "Retry" or "Try Again" button
- **AND** clicking it should re-attempt the failed operation
- **AND** my current position and form data should be preserved

**AC3: Circuit Breaker Pattern**
- **GIVEN** multiple consecutive API failures occur
- **WHEN** the system detects consistent failures
- **THEN** it should temporarily disable automatic retries
- **AND** show a more detailed error message with support contact
- **AND** provide a manual override option for determined users

#### Definition of Done
- [ ] Automatic retry logic for transient errors
- [ ] Manual retry buttons on error states
- [ ] Circuit breaker prevents excessive retry loops
- [ ] User state preservation during retries
- [ ] Clear feedback during retry attempts
- [ ] Support contact info available for persistent issues

---

### **MA-204: Empty State Handling**
**Epic**: User Experience Enhancement | **Points**: 2 | **Priority**: P2

#### User Story
**As a** user browsing ManAdviser when data is unavailable  
**I want** helpful empty states instead of blank pages  
**So that** I understand the situation and know what actions I can take

#### Background Context
When API calls succeed but return empty results, or during initial loading states, users need informative empty state designs instead of confusing blank areas.

#### Acceptance Criteria

**AC1: Informative Empty States**
- **GIVEN** an API call succeeds but returns no data
- **WHEN** I view a product category or search results
- **THEN** I should see a helpful empty state with explanatory text
- **AND** the empty state should include relevant imagery or icons
- **AND** suggested actions should be provided

**AC2: Contextual Empty Messages**
- **GIVEN** different types of empty states
- **WHEN** I encounter them
- **THEN** search results should show "No policies match your criteria. Try different filters."
- **AND** empty categories should show "This category is currently being updated. Check back soon."
- **AND** connection issues should show "Unable to load products. Please check your connection."

**AC3: Actionable Empty States**
- **GIVEN** I'm viewing an empty state
- **WHEN** appropriate actions are available
- **THEN** I should see buttons for "Contact Support", "Try Different Category", or "Refresh"
- **AND** navigation options should help me find alternative content
- **AND** the empty state should maintain visual consistency with the rest of the app

#### Definition of Done
- [ ] Custom empty state components for different scenarios
- [ ] Contextually appropriate messages and imagery
- [ ] Actionable buttons and navigation options
- [ ] Visual consistency with overall design system
- [ ] Bilingual support (RO/EN)
- [ ] Accessibility compliance for empty states

---

### **MA-301: Production Database Setup**
**Epic**: Production Readiness | **Points**: 8 | **Priority**: P1

#### User Story
**As a** business stakeholder preparing for ManAdviser launch  
**I want** a production-ready database configuration  
**So that** we can deploy confidently with proper data persistence, security, and performance

#### Background Context
The current development setup uses SQLite, but production requires Azure SQL Database or similar enterprise-grade solution with proper security, backups, and scaling capabilities.

#### Acceptance Criteria

**AC1: Production Database Configuration**
- **GIVEN** we're deploying to production environment
- **WHEN** the application starts
- **THEN** it should connect to Azure SQL Database or equivalent production database
- **AND** connection strings should use environment variables for security
- **AND** database should be automatically created and migrated if needed

**AC2: Secure Connection Management**
- **GIVEN** the production environment
- **WHEN** database connections are established
- **THEN** all connections should use encrypted communication
- **AND** authentication should use managed identity or secure connection strings
- **AND** no sensitive credentials should be stored in configuration files

**AC3: Data Migration and Seeding**
- **GIVEN** a fresh production deployment
- **WHEN** the application initializes
- **THEN** database schema should be automatically migrated to latest version
- **AND** production seed data should be populated with real Allianz Țiriac products
- **AND** admin user accounts should be created securely

#### Definition of Done
- [ ] Azure SQL Database or equivalent production database configured
- [ ] Secure connection string management
- [ ] Automatic migration on deployment
- [ ] Production seed data with real products
- [ ] Backup and recovery procedures documented
- [ ] Performance optimization for expected load

---

### **MA-302: Environment Configuration**
**Epic**: Production Readiness | **Points**: 3 | **Priority**: P1

#### User Story
**As a** developer deploying ManAdviser to different environments  
**I want** clear separation of development, staging, and production configurations  
**So that** deployments are predictable and environment-specific settings are properly managed

#### Background Context
Current configuration mixes development and production settings, making deployment risky and configuration management unclear.

#### Acceptance Criteria

**AC1: Environment-Specific Settings**
- **GIVEN** different deployment environments
- **WHEN** the application starts in each environment
- **THEN** development should use SQLite and mock email services
- **AND** staging should use Azure SQL and test email services
- **AND** production should use Azure SQL and live email services

**AC2: Secure Secrets Management**
- **GIVEN** production deployment
- **WHEN** the application accesses sensitive configuration
- **THEN** JWT secrets should be loaded from environment variables
- **AND** SendGrid API keys should be securely managed
- **AND** database connection strings should not contain plain text passwords

**AC3: Configuration Validation**
- **GIVEN** application startup in any environment
- **WHEN** configuration is loaded
- **THEN** required settings should be validated
- **AND** missing critical configuration should prevent startup
- **AND** clear error messages should indicate what needs to be configured

#### Definition of Done
- [ ] Separate configuration files for each environment
- [ ] Environment variables for sensitive settings
- [ ] Configuration validation at startup
- [ ] Clear deployment documentation
- [ ] Secrets management strategy implemented

---

### **MA-303: Integration Testing Suite**
**Epic**: Production Readiness | **Points**: 5 | **Priority**: P2

#### User Story
**As a** quality assurance stakeholder ensuring ManAdviser reliability  
**I want** comprehensive integration testing that verifies real API-frontend connections  
**So that** we can detect integration issues before deployment and ensure mock data elimination is complete

#### Background Context
With mock data removal, integration testing becomes critical to ensure the frontend and backend work together properly with real data flows.

#### Acceptance Criteria

**AC1: API Integration Testing**
- **GIVEN** the backend API is running
- **WHEN** integration tests execute
- **THEN** all endpoints should return real data from the database
- **AND** response formats should match frontend expectations
- **AND** error scenarios should be properly handled

**AC2: Frontend-Backend Flow Testing**
- **GIVEN** both frontend and backend are running
- **WHEN** end-to-end tests execute
- **THEN** user journeys should work without mock data fallbacks
- **AND** form submissions should successfully reach the API
- **AND** data should persist properly in the database

**AC3: Mock Data Elimination Verification**
- **GIVEN** the complete application is running
- **WHEN** integration tests are executed
- **THEN** no mock data should be used anywhere in the application
- **AND** all console logs should be clean of "using mock data" messages
- **AND** all API calls should return real database data

#### Definition of Done
- [ ] Integration test suite covering all major API endpoints
- [ ] End-to-end tests for critical user journeys
- [ ] Verification tests confirming no mock data usage
- [ ] Automated test execution in CI/CD pipeline
- [ ] Test results clearly show real vs mock data usage
- [ ] Performance benchmarks for API response times

---

## 📅 Implementation Timeline

### Week 1 (Feb 24-28, 2026)

**Days 1-2: Foundation (Sprint 1 - Part A)**
- MA-102: Persistent Database Configuration
- MA-104: Seed Data Integration  
- MA-103: API Health Monitoring

**Days 3-4: User Experience (Sprint 1 - Part B)**
- MA-101: Real Insurance Data Display
- MA-201: Clear Error Messages
- MA-202: Loading State Indicators

**Day 5: Production Prep (Sprint 1 - Part C)**
- MA-301: Production Database Setup
- MA-302: Environment Configuration

**Post-Sprint 1: Enhancement**  
- MA-203: Retry Mechanisms
- MA-204: Empty State Handling
- MA-303: Integration Testing Suite

---

## 🔗 Dependencies & Risks

### Cross-Story Dependencies
- **MA-101** depends on **MA-102** and **MA-104** (need persistent data to display real insurance info)
- **MA-201** and **MA-202** should be implemented together for consistent UX
- **MA-301** depends on **MA-302** for proper environment configuration
- **MA-303** validates all other stories and should run last

### Technical Risks
1. **API Connection Issues**: If backend-frontend connectivity problems persist, may need architecture review
2. **Performance Impact**: Real API calls may be slower than mock data, requiring optimization
3. **Data Quality**: Seed data must accurately reflect Allianz Țiriac offerings
4. **Production Deployment**: Database migration and environment setup complexity

### Mitigation Strategies
- Run **MA-103** (Health Monitoring) first to establish connectivity baseline
- Implement **MA-202** (Loading States) early to handle any performance impacts gracefully
- Have rollback plan to re-enable mock data with warning messages if critical issues arise
- Staged deployment with thorough **MA-303** (Integration Testing) before production

---

## 🎯 Success Metrics

### Business Value Delivered
- **100% real data display** - no mock information presented to users
- **Improved user trust** - authentic Allianz Țiriac product information
- **Production readiness** - platform ready for GDPR-compliant launch
- **Reduced technical debt** - clean codebase without mock fallbacks

### Technical KPIs
- **API response time**: < 500ms for all endpoints
- **Error rate**: < 2% of API calls fail
- **Load time**: < 2 seconds for all pages
- **Zero console errors** related to mock data
- **100% integration test coverage** for critical user journeys

---

*Next Action: Begin Sprint 1 implementation with MA-102 (Database Configuration) and MA-104 (Seed Data Integration)*