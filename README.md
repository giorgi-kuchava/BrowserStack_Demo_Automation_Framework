# BrowserStack Demo Automation Framework

<div align="center">

### 🧪 QA Automation Framework | Playwright + TypeScript + Page Object Model

*TypeScript-based cross-browser E2E test automation with Page Object Model structure and Playwright HTML Reporting*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/giorgi-kuchava-94bb9b359)
[![Email](https://img.shields.io/badge/Email-Contact-red?style=for-the-badge&logo=gmail)](mailto:giorgikuchava2020@gmail.com)

</div>

---

## 👋 About This Project

This is a TypeScript test automation framework built around **Playwright**, **TypeScript**, **Page Object Model (POM)** architecture, and **Playwright HTML Reporting**, structured for robust cross-browser end-to-end testing. It covers user personas, authentication, catalog browsing, shopping bag, order history, wishlists/favourites, filtering, sorting, validation, and accessibility test suites for [BrowserStack Demo](https://bstackdemo.com/), with CI/CD wired up through **GitHub Actions**.

---

## 🛠️ Tools & Technologies

- 🎭 **Playwright** — modern, fast, cross-browser web testing
- 📘 **TypeScript** — static type safety and code quality
- 📐 **Page Object Model (POM)** — modular and maintainable test architecture
- 🌐 **Cross-Browser Engine** — Chromium, Firefox, and WebKit (Safari)
- 📊 **Playwright HTML Reporter** — visual test execution reports, screenshots, and traces
- ⚙️ **GitHub Actions** — automated CI/CD pipelines

---

## 📁 Project Structure

```text
playwright/
├── .github/workflows/
│   └── playwright.yml
├── pages/
│   ├── BasePage.ts
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── CatalogPage.ts
│   ├── ShoppingCartPage.ts
│   ├── OrdersPage.ts
│   └── FavouritesPage.ts
├── tests/
│   └── e2e/
│       ├── user-personas.spec.ts
│       ├── auth.spec.ts
│       ├── happy-path.spec.ts
│       ├── edge-cases.spec.ts
│       ├── validation.spec.ts
│       └── accessibility.spec.ts
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## ⚙️ Configuration

Main test runner settings live in `playwright.config.ts`.

```typescript
baseURL: 'https://bstackdemo.com',
timeout: 30000,
expect: { timeout: 10000 },
retries: process.env.CI ? 2 : 0,
reporter: [['html', { open: 'never' }], ['line']],
use: {
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',
},
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
]
```

---

## ▶️ Run Tests

Install dependencies & browsers:

```bash
npm install
npx playwright install
```

Run the full suite across all browsers:

```bash
npm test
# or
npx playwright test
```

Run interactive visual UI mode:

```bash
npm run test:ui
```

Run headed mode (watch browser):

```bash
npm run test:headed
```

Run by specific browser:

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

Run single test file:

```bash
npx playwright test tests/e2e/user-personas.spec.ts
```

---

## ✅ Current Test Coverage

The suite includes smoke, regression, persona-specific, validation, and accessibility tests for:

- **User Personas & Account States**:
  - `image_not_loading_user`: Verifies fallback handling for missing/empty product image sources.
  - `existing_orders_user`: Validates historical placed order records, items, and recipient metadata.
  - `fav_user`: Validates pre-populated wishlist items and adding favourites directly to the cart.
  - `demouser`: Baseline standard user with full loaded images and clean history.
  - `locked_user`: Validates locked account security blocking.
- **Customer Authentication**:
  - Valid login & logout flows (`demouser`)
  - Locked account detection & validation (`locked_user`)
  - Required credentials validation (*Invalid Username / Invalid Password*)
- **Shopping Journeys & Catalog**:
  - Full product catalog rendering (25 items)
  - Adding products to the floating shopping bag
  - Subtotal and item quantity calculation
- **Filters & Ordering**:
  - Vendor filtering (Apple, Samsung, Google, OnePlus)
  - Price sorting (*lowest price upward*)
- **Search & Validation**:
  - Product search by name & empty catalog handling *(tracked with `fixme` for known demo site behavior)*
- **Keyboard Navigation & Accessibility**:
  - ARIA role-based controls & accessible vendor filter labels
  - Keyboard focus and tab-order navigation

---

## 📈 Playwright HTML Report

View the interactive report with screenshots and traces:

```bash
npm run report
# or
npx playwright show-report
```

---

## 🔄 CI/CD

This project includes automated GitHub Actions workflows under `.github/workflows/playwright.yml`.

CI automatically checks the project whenever code is pushed or a pull request is opened to `main` or `master`. The workflow:

- Sets up Node.js 20 with npm caching
- Installs all dependencies (`npm ci`)
- Downloads Playwright browser binaries with system dependencies (`npx playwright install --with-deps`)
- Runs the cross-browser test suite across Chromium, Firefox, and WebKit
- Uploads interactive HTML test reports and failure artifacts (screenshots/traces) with a 30-day retention period

**Workflow file:**
```text
.github/workflows/playwright.yml
```

### How to Use It on GitHub

1. Push this project to your GitHub repository.
2. Open the repository on GitHub.
3. Go to the **Actions** tab.
4. The `Playwright Tests` workflow runs automatically on `push` and `pull_request`.
5. You can also trigger tests manually using **Run workflow** and select a specific browser (`all`, `chromium`, `firefox`, `webkit`).

After a workflow run finishes, you can download the uploaded artifacts:
- `playwright-report` — full interactive HTML test execution report
- `test-results` — screenshots and error traces on failure

---

## 🌐 Browser Notes

- **Chromium / Google Chrome**: Full desktop emulation.
- **Firefox**: Mozilla Gecko rendering engine.
- **WebKit**: Safari rendering engine on macOS/Linux.
- **macOS Local Run**: Ensure Full Disk Access is granted to your terminal/IDE for Firefox application support permissions.

---

## 📫 Let's Connect

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/giorgi-kuchava-94bb9b359)
[![Email](https://img.shields.io/badge/Email-Contact-red?style=for-the-badge&logo=gmail)](mailto:giorgikuchava2020@gmail.com)

</div>
