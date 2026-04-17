# ROADMAP – Susbud (budgetapp)

Uppdaterad: 2026-04-16

---

## Nuläge (snapshot)

Projektet har ett fungerande skelett: Firebase Auth är inkopplat, React Router v6 används, och komponenter för inköpsplan (form + lista) är skrivna men **kommenterade bort** i App.js. Backenden (Express + MongoDB) är påbörjad med ett enda POST-endpoint men saknar resten av CRUD.

---

## Fas 1 – Städning & säkerhet (hög prioritet, gör först)

| # | Uppgift | Prioritet | Notering |
|---|---------|-----------|----------|
| 1 | Flytta Firebase-config till `.env` | **Hög** | API-nyckel är hårdkodad i `src/index.js` – säkerhetsrisk |
| 2 | Ta bort `src/AppOld.js` | **Hög** | Oanvänd gammal kopia av App, förvirrar kodbasen |
| 3 | Ta bort `src/firebaseUser.js` | **Medel** | Helt utkommenterad, ersatt av `auth.js` |
| 4 | Ta bort `src/router/history.js` | **Låg** | Används inte – `react-router-dom` v6 hanterar history internt |
| 5 | Flytta Firebase-initialisering ur `index.js` | **Medel** | `index.js` är för React-root-rendering, inte Firebase-setup. Skapa `src/firebase.js` |
| 6 | Ta bort `getCities()`-anropet i `index.js` | **Hög** | Skräpkod från tutorial, gör ett Firestore-anrop vid varje sidladdning |

---

## Fas 2 – Beroendeuppdateringar (medel prioritet)

Kör uppdateringar stegvis – testa efter varje steg.

### Säkra (patch/minor, icke-breaking):
```
npm install cors@latest eslint-plugin-import@latest eslint-plugin-promise@latest
```

### Medelstor risk (semver-breaking men stabila):
```
npm install react@18.3.1 react-dom@18.3.1
npm install react-router-dom@6.30.3
npm install mongoose@latest  # 8 → 9: kontrollera API-ändringar
npm install firebase@10.14.1  # håll inom v10 tills v12-migrering planeras
npm install body-parser@latest
```

### Stor risk – planera separat:
| Paket | Nuvarande | Latest | Risk |
|-------|-----------|--------|------|
| `react-scripts` 5.0.1 | CRA är **deprecated** | – | Migrera till Vite (se nedan) |
| `firebase` 10 → 12 | 10.11.1 | 12.12.0 | Breaking changes i Auth/Firestore |
| `express` 4 → 5 | 4.19.2 | 5.2.1 | Async error handling ändrat |
| `eslint` 8 → 10 | 8.57.0 | 10.2.0 | Config-format ändrat (flat config) |

### Rekommendation: Migrera från CRA till Vite
`react-scripts` (Create React App) underhålls inte längre. Migrera till Vite för snabbare builds och framtidssäkrad toolchain. Gör detta i en separat branch.

---

## Fas 3 – Kärnfunktioner (nästa feature-sprint)

### 3a. Återaktivera inköpsplan-vy
- Lägg till en skyddad `/dashboard`-route för inloggad användare
- Rendera `<PurchasePlan />` i dashboard (komponenten är klar men kommenterad bort)
- Flytta nav-logik ur `<header>` till en separat `<Navbar>`-komponent

### 3b. Koppla frontend till backend
- PurchasePlan `handleSubmit` skickar just nu bara `console.log` – koppla till `POST /api/purchaseplan`
- Lägg till `GET /api/purchaseplan` i `server.js` för att ladda sparade items
- Hantera autentisering mot API (Firebase ID-token i Authorization-header)

### 3c. Komplettera backend CRUD
- `PUT /api/purchaseplan/:id` – uppdatera item
- `DELETE /api/purchaseplan/:id` – ta bort item
- Validering och felhantering

---

## Fas 4 – Planerade features (från CLAUDE.md)

| Feature | Beskrivning | Beroenden |
|---------|-------------|-----------|
| Prisuppskattning | Nyköp vs second-hand per artikel | Fas 3 klar |
| Köphistorik | Lista köpta varor, datum, pris | Backend + databas |
| Besparingsanalys | Faktisk besparing vs möjlig besparing | Historik-data |
| Konsumtionsmönster | Analys och statistik per kategori | Historik + kategorier |
| OAuth 2.0 | Social login (Google etc.) | Firebase Auth är redan redo |

---

## Teknisk skuld – sammanfattning

| Skuld | Fil | Prioritet |
|-------|-----|-----------|
| API-nyckel hårdkodad | `src/index.js:29-38` | **Hög** |
| Firebase-init blandad med React-root | `src/index.js` | **Hög** |
| Skräpanrop `getCities()` vid varje laddning | `src/index.js:62` | **Hög** |
| Dubbel auth-state-lyssning (App.js + index.js) | `src/App.js`, `src/index.js` | **Medel** |
| `PurchasePlanInputField` PropTypes kräver `label` men `PurchasePlanForm` skickar aldrig `label` | `src/components/` | **Medel** |
| `key={index}` i lista (bör vara unikt ID) | `purchasePlanList.js:14` | **Låg** |
| Routing-logik och UI blandas i `<header>` i App.js | `src/App.js` | **Låg** |
| CRA deprecated (`react-scripts`) | `package.json` | **Medel** |
